import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import create from 'zustand';

interface UserRole {
  role: 'admin' | 'organizer' | 'participant';
  permissions: string[];
}

interface UserData extends UserRole {
  id: string;
  email: string;
  name: string;
  parish?: string;
  phone?: string;
}

interface AuthState {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
        setUser(null);
      }
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setUser(null);
      } else if (profile) {
        setUser({
          id: userId,
          email: profile.email,
          name: profile.name,
          role: profile.role,
          permissions: profile.permissions,
          parish: profile.parish,
          phone: profile.phone,
        });
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, userData: Omit<UserData, 'id'>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            role: userData.role,
            permissions: userData.permissions,
          }
        }
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };
}
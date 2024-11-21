import React from 'react';
import { Search, Calendar, MapPin, Filter } from 'lucide-react';
import { EventFilters } from '../hooks/useEventFilters';

interface SearchFilterProps {
  filters: EventFilters;
  onFilterChange: (filters: EventFilters) => void;
}

export default function SearchFilter({ filters, onFilterChange }: SearchFilterProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-6 -mt-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Text Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent"
              value={filters.query}
              onChange={(e) => onFilterChange({ ...filters, query: e.target.value })}
            />
          </div>

          {/* Date Filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent"
              value={filters.date}
              onChange={(e) => onFilterChange({ ...filters, date: e.target.value })}
            />
          </div>

          {/* Location Filter */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent"
              value={filters.location}
              onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            />
          </div>

          {/* Event Type Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent appearance-none bg-white"
              value={filters.type}
              onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="Mass">Mass</option>
              <option value="Adoration">Adoration</option>
              <option value="Retreats">Retreats</option>
              <option value="Youth">Youth</option>
              <option value="Parish Events">Parish Events</option>
              <option value="Conferences">Conferences</option>
              <option value="Prayer Groups">Prayer Groups</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
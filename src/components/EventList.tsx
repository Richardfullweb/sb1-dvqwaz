import React from 'react';
import EventCard from './EventCard';
import CategoryFilter from './CategoryFilter';
import SearchFilter from './SearchFilter';
import { useEventFilters } from '../hooks/useEventFilters';
import { events } from '../data/events';

export default function EventList() {
  const { filters, setFilters, filteredEvents } = useEventFilters(events);

  return (
    <div>
      <div className="bg-red-600 pt-32 pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Find Catholic Events Near You</h1>
          <p className="text-red-100 text-lg">Discover and participate in spiritual events in your community</p>
        </div>
      </div>

      <SearchFilter filters={filters} onFilterChange={setFilters} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <CategoryFilter />
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
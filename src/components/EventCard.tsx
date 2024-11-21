import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Event } from '../types/event';

export default function EventCard(event: Event) {
  return (
    <Link to={`/event/${event.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
        <div className="relative h-48">
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {event.category}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
          <p className="text-gray-600 mb-4">{event.parish}</p>
          
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{format(event.date, 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
          
          <button className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
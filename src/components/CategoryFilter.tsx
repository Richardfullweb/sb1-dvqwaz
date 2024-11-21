import React from 'react';

const categories = [
  'All Events',
  'Mass',
  'Adoration',
  'Retreats',
  'Youth',
  'Parish Events',
  'Conferences',
  'Prayer Groups'
];

export default function CategoryFilter() {
  return (
    <div className="flex space-x-4 overflow-x-auto py-4 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full whitespace-nowrap
            ${category === 'All Events' 
              ? 'bg-red-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
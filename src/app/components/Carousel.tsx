import React from 'react';

const Carousel = () => {
  return (
    <div className="relative w-full h-64 bg-gray-800">
      <div className="absolute inset-0 flex items-center justify-between">
        <button className="bg-gray-900 text-white p-2 rounded-full">‹</button>
        <button className="bg-gray-900 text-white p-2 rounded-full">›</button>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 p-4">
        <span className="w-2 h-2 bg-white rounded-full"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
      </div>
    </div>
  );
};

export default Carousel;
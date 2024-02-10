import React from 'react';
import performanceSVG from '../images/performance.svg';

const PerformanceTrack = () => {
  return (
    <section className="relative pb-4">
      {/* Background image with opacity */}
      <div className="absolute inset-0 bg-cover bg-center bg-gray-100 opacity-15" style={{ backgroundImage: `url(${performanceSVG})` }}></div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 relative z-10">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-6">Performance Tracking</h2>
        <p className="text-purple-900 mb-8">Track your progress with detailed performance insights.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8 mb-8">
          <div className="flex flex-col items-center">
            <i className="material-icons text-4xl text-blue-500 mb-2">trending_up</i>
            <p className="text-lg font-semibold">Visualize Progress</p>
          </div>
          <div className="flex flex-col items-center">
            <i className="material-icons text-4xl text-yellow-500 mb-2">emoji_events</i>
            <p className="text-lg font-semibold">Achievements</p>
          </div>
          <div className="flex flex-col items-center">
            <i className="material-icons text-4xl text-red-500 mb-2">thumb_down_alt</i>
            <p className="text-lg font-semibold">Identify Weak Areas</p>
          </div>
        </div>
        <a href="#" className="bg-purple-500 text-white py-3 px-6 rounded-lg inline-block hover:bg-purple-600 transition duration-300 ease-in-out">Start Tracking Now</a>
      </div>
    </section>
  );
}

export default PerformanceTrack;

import React from 'react';
import Stories from './Stories';
import Progressbar from './Progressbar';
import Topspace from './Topspace';
import Dashfooter from './Dashfooter';
import PerformanceCharts from './PerformanceCharts';

const CardContainer = () => {
  return (
    <div className='ml-14' >
      <Topspace title="Dashboard" />
      {/* Add border and shadow to this div */}
      <div className="border-t-2 border-b-2 border-gray-300 shadow-md p-0 mb-0">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="w-full md:w-1/2 ml-1 md:pr-0 mb-4 md:mb-0 flex justify-center">
            {/* Child component 1 */}
            <Stories />
          </div>
          <div className="w-full ml-1 md:w-1/2 md:pl-2 flex justify-center">
            {/* Child component 2 */}
            <Progressbar />
          </div>
        </div>
      </div>
      <div>
        <PerformanceCharts/>
      </div>
      <div className="w-full mt-2">
                <Dashfooter/>
            
      </div>
    </div>
  );
};

export default CardContainer;

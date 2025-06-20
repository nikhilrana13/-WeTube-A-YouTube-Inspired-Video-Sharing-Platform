import React from 'react';
import '../Pagecomponents/customcss/Shimmercss.css';

const ShimmerEffectCard = () => {
  return (
     <div className='min-h-screen p-5 relative'>
      {/* Background shimmer (blurred) */}
      <div className="absolute top-0 left-0 w-full h-[300px] z-0 bg-gray-300 shimmer blur-sm" />

      {/* Foreground shimmer card */}
      <div className='relative z-10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-lg  flex flex-col md:flex-row gap-5 p-3 rounded-md'>
        {/* Profile Picture shimmer */}
        <div className='md:w-[200px] w-[100px] h-[100px] md:h-[200px] rounded-full bg-gray-300 shimmer' />

        {/* Text placeholders */}
        <div className='flex flex-col gap-3 flex-1'>
          <div className='flex flex-col gap-2'>
            <div className='h-6 md:h-8 w-1/2 bg-gray-300 rounded shimmer' />
            <div className='h-4 w-full bg-gray-300 rounded shimmer' />
            <div className='h-4 w-3/4 bg-gray-300 rounded shimmer' />
          </div>

          {/* Button shimmer */}
          <div className='flex mt-3'>
            <div className='h-8 w-40 bg-gray-300 rounded-full shimmer' />
          </div>
        </div>
      </div>
    </div>
  );
};



export default ShimmerEffectCard;

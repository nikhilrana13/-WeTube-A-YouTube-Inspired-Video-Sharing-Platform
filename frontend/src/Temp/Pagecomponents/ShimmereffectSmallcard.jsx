import React from 'react';

const VideoCardShimmerSmall = () => {
  return (
    <div className='flex gap-3 p-2 w-full md:max-w-[500px] animate-pulse'>
      {/* Thumbnail Skeleton */}
      <div className='rounded-md bg-neutral-300 dark:bg-neutral-700 w-[200px] h-[120px]'></div>

      {/* Text Skeletons */}
      <div className='flex flex-col gap-2 flex-1'>
        <div className='h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-[80%]'></div>
        <div className='h-3 bg-neutral-300 dark:bg-neutral-700 rounded w-[60%]'></div>
        <div className='h-3 bg-neutral-300 dark:bg-neutral-700 rounded w-[50%]'></div>
      </div>
    </div>
  );
};

export default VideoCardShimmerSmall;
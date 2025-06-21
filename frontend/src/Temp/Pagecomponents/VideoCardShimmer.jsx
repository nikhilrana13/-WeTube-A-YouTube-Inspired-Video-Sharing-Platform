import React from 'react';

const VideoCardShimmer = () => {
  return (
    <div className="animate-pulse p-5">
      <div className="bg-gray-300 dark:bg-neutral-700 rounded-lg aspect-video mb-3"></div>
      <div className="flex gap-3">
        <div className="bg-gray-300 dark:bg-neutral-700 h-9 w-9 rounded-full"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="bg-gray-300 dark:bg-neutral-700 h-4 w-3/4 rounded"></div>
          <div className="bg-gray-300 dark:bg-neutral-700 h-3 w-1/2 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardShimmer;
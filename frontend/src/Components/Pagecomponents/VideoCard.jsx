import React from 'react';
import { NavLink } from 'react-router-dom';

const VideoCard = ({thumbnailURL, title, VideoId, views,createdAt,channelprofilepicture,name}) => {
  return (
      <NavLink className="group  p-5" to={`/video/${VideoId}`}>
      <div className="relative ">
        <img className="rounded-lg aspect-video" src={thumbnailURL} alt={title} />
        <p className="absolute bottom-2 right-2 text-sm bg-black bg-opacity-50 text-white px-1.5 font-medium rounded-md">
          {/* {duration} */}
        </p>
      </div>
      <div className="flex gap-3 py-3 px-2">
        <img className="h-9 w-9 rounded-full" src={channelprofilepicture} alt={name} />
        <div>
          <h2 className="group-hover:text-blue-500 font-semibold leading-snug line-clamp-2 dark:text-neutral-300" title={title}>
            {title}
          </h2>
          <p className="text-sm font-[500] mt-1 text-neutral-700 hover:text-neutral-500 dark:text-neutral-300">
            {name}
          </p>
          <p className="text-sm font-[500] text-neutral-700 dark:text-neutral-300">
            {views} Views • {createdAt}
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export default VideoCard;

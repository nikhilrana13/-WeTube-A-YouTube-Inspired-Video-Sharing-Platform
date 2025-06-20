import React from 'react';

const SideVideoCard = ({thumbnail,title,views,createdAt,name}) => {
  return (
    <div className='flex gap-3 p-2  w-full md:max-w-[500px]'>
            <img src={thumbnail} className='rounded-md w-[200px]  '  alt="" />
        
        <div className='flex flex-col gap-1'>
            <h2 className="group-hover:text-blue-500 text-[0.9rem] md:w-[220px] font-semibold leading-snug line-clamp-2 dark:text-neutral-300">{title}</h2>
            <span className="text-sm font-[500] mt-1 text-neutral-700 hover:text-neutral-500 dark:text-neutral-300">{name}</span>
            <span className="text-sm font-[500] text-neutral-700 dark:text-neutral-300">{views} Views • {createdAt}</span>
        </div>
    </div>
  );
}

export default SideVideoCard;

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PenBoxIcon, Plus, VideoIcon} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const VideoCreateDropdown = () => {
  return (
    <DropdownMenu>
  <DropdownMenuTrigger className='bg-[#7E7E81] hover:bg-gray-600  text-sm font-[500] px-3 py-2 flex items-center text-white rounded-full'><Plus className='mr-2'/>Create</DropdownMenuTrigger>
  <DropdownMenuContent >
    <DropdownMenuSeparator />
    <NavLink to="/uploadvideo">
 <DropdownMenuItem className='flex items-center text-sm cursor-pointer gap-2'><VideoIcon className='mr-2' />Upload Video</DropdownMenuItem>
    </NavLink>
    <NavLink to="/createchannel">
      <DropdownMenuItem className='flex items-center text-sm cursor-pointer gap-2'><PenBoxIcon className='mr-2 '/>Create a Channel</DropdownMenuItem>
    </NavLink>
  </DropdownMenuContent>
</DropdownMenu>
  );
}

export default VideoCreateDropdown;

import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, UserCircle, VideotapeIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import UserAllvideos from './UserAllvideos';

const UserProfileDropdown = ({ SignOut, Username, picture,channelId }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {
                    picture ? (
                        <img onError={(e) => {
                            // fallback image if the image fails to load
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=";
                        }} src={picture} className="h-8 w-8 rounded-full" />
                    ) : (
                        <UserCircle className="h-8 w-8 rounded-full" />
                    )
                }
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <div className='flex flex-col gap-4'>
                        <span className="text-sm font-medium leading-none">{Username}</span>
                        <NavLink to={`/channel/${channelId}`}  className="text-[0.9rem] text-blue-500 cursor-pointer leading-none ">View my channel</NavLink>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={SignOut} className="flex items-center cursor-pointer text-[0.9rem]"><LogOut className='mr-2' />Sign Out</DropdownMenuItem>
                <DropdownMenuItem >
                    <NavLink to="/myvideos" className="flex items-center cursor-pointer text-[0.9rem]">
                        <VideotapeIcon className='mr-2' /> Manage Videos 
                        </NavLink>
                    </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    );
}


export default UserProfileDropdown;

import React, { useState } from 'react';
import logo from '../../assets/wetubelogo.png'
import { Menu, Mic, MoonStar, Search, Sun } from "lucide-react";
import { Button } from '../ui/button';
import VideoCreateDropdown from './VideoCreateDropdown';
import UserProfileDropdown from './UserProfileDropdown';
import { UserCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '@/Redux/AuthSlice';
import {auth,GoogleProvider} from "../../firebase";
import { signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Navbar = ({Searchinput,setSearchinput}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.Auth.user);
    // console.log("user",user)



// handle sign in and sign out
 const handleLogin = async()=>{
    try {
       await signOut(auth);
       const result = await signInWithPopup(auth,GoogleProvider);
    //    console.log("result",result)
       const token = await result.user.getIdToken();
       const response = await axios.post("http://localhost:4000/api/auth/login",{},{
        headers:{
          authorization:`Bearer ${token}`,
          "Content-Type":"application/json"
        },
        withCredentials:true
       })
      
       if(response.data){
        // console.log("user logged in",response.data)
         dispatch(SetUser(response.data.user));
         navigate("/");
       }
    } catch (error) {
      console.log("failed to login",error)
    }
  }
  const handleLogout = async()=>{
    try {
       const user = auth.currentUser;
       const token = user ? await user.getIdToken():"";
       
       const response = await axios.get("http://localhost:4000/api/auth/logout",{
        headers:{
          authorization:`Bearer ${token}`,
          "Content-Type":"application/json"
        },
        withCredentials:true
       })
       if(response.data){
        // console.log("user logged out",response.data)
        dispatch(SetUser(null));
        navigate("/");
       }
       await signOut(auth); // logout from firebase
      
    } catch (error) { 
      console.log("failed to logout",error)
    }
  }
    return (
        <header className="sticky top-0 z-10 bg-white dark:bg-neutral-900">
            <nav className="flex items-center justify-between py-2 pb-5 px-4">
                {/* Rendering left section of the navbar */}
                <HeaderLeftSection />
                {/* Search input and mic section */}
                <div className="h-10 flex gap-3 w-[600px] max-lg:w-[500px] max-md:hidden">
                    <form action="#" className="flex w-full">
                        <input
                            className="border border-neutral-300 w-full h-full rounded-l-full px-4 outline-none focus:border-blue-500 dark:bg-neutral-900 dark:border-neutral-500 dark:focus:border-blue-500 dark:text-neutral-300"
                            type="search"
                            placeholder="Search"
                            required
                            value={Searchinput}
                            onChange={(e)=>setSearchinput(e.target.value)}
                        />
                        <button className="border border-neutral-300 px-5 border-l-0 rounded-r-full hover:bg-neutral-100 dark:border-neutral-500 hover:dark:bg-neutral-700">
                            <Search className="dark:text-neutral-400" />
                        </button>
                    </form>
                    <button className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-700">
                        <Mic className="dark:text-neutral-400" />
                    </button>
                     
                </div>
                {/* User profile section */}
                <div className="flex items-center   gap-4">
                    {/* search button for mobile */}
                     <button className="p-2 rounded-full md:hidden hover:bg-neutral-200 hover:dark:bg-neutral-700">
                         <Search className="dark:text-neutral-400" />
                    </button>
                     {
                        user ? (
                            <>
                             <VideoCreateDropdown />
                             <UserProfileDropdown channelId={user?.channelId} Username={user?.name || "User"} picture={user?.picture } SignOut={handleLogout} />
                            </>
                        ) : (
                            <button onClick={handleLogin} type='button' className='px-4 flex font-[600] text-blue-500 hover:bg-blue-100  py-2 rounded-full border items-center gap-2'>
                                <UserCircle className="text-blue-500" />
                                Sign in
                            </button>
                        )
                     }
                    
                </div>
            </nav>
        </header>
    );
};
// Component for the left section of the navbar
export const HeaderLeftSection = ({ toggleSidebar }) => {
    return (
        <div className="flex gap-4 items-center">
            <button
                onClick={toggleSidebar}
                className="p-2 rounded-full hover:bg-neutral-200 hover:dark:bg-neutral-700"
            >
                <Menu className="dark:text-neutral-400" />
            </button>
            <a className="flex items-center gap-2" href="/">
                <img src={logo} className='max-w-[120px] bg-black rounded-full p-2' alt="Logo" />
                {/* <h2 className="text-xl font-bold dark:text-neutral-300">WeTube</h2> */}
            </a>
        </div>
    );
};





export default Navbar;

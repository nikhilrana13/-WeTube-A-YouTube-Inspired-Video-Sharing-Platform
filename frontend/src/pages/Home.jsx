import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Pagecomponents/Navbar';
import { NavLink, Outlet } from 'react-router-dom';
import { Gamepad, HomeIcon, Loader2, Music, ShoppingBagIcon, TrendingUp, VideoIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { SetVideos } from '@/Redux/VideoSlice';
import VideoCard from '@/components/Pagecomponents/VideoCard';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
import VideoCardShimmer from '@/components/Pagecomponents/VideoCardShimmer';
dayjs.extend(relativeTime)


const Home = () => {
  const [Searchinput, setSearchinput] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [allVideo, setallVideo] = useState([]);
  const dispatch = useDispatch();

  // fetch all videos
  useEffect(()=>{
     const fetchVideos = async()=>{
        try {
          setLoading(true);
        const response = await axios.get("http://localhost:4000/api/video/allvideos", {withCredentials:true});
        if(response.data){
          const Showallvideo = response?.data?.videos;
          // if search input condition is true then filter videos by search input otherwise show all videos
          const filteredVideos = Searchinput ? Showallvideo.filter((video) => video.title.toLowerCase().includes(Searchinput.toLowerCase())) : Showallvideo;
          setallVideo(filteredVideos);
          // console.log("filteredVideos",filteredVideos);
          dispatch(SetVideos(Showallvideo));
        }
       } catch (error) {
        console.log("failed to fetch videos",error);
       } finally{
        setTimeout(() => {
          setLoading(false);
        }, 2000);
       }
     }
     fetchVideos();
  },[location.pathname,Searchinput])
  // format video created date 
  const createdAt = (data)=>{
    const timeAgo = dayjs(data).fromNow();
    return timeAgo
  }
   
  return (
     <div className="min-h-screen">
      {/* Navbar */}
      <Navbar Searchinput={Searchinput} setSearchinput={setSearchinput}  />
      {/* Sidebar and Main Content */}
      <div className=' w-full flex'>
          <div className='w-[18%] min-h-screen '>
                <div className='border-b p-3 flex flex-col gap-4 '>
                <NavLink to= "/" className={({ isActive})=>isActive ? `flex flex-col md:flex-row items-center gap-5 bg-[#F2F2F2] hover:bg-[#E6E6E6] py-3 px-4 text-sm font-[500] text-black rounded-md`:`flex flex-col md:flex-row items-center gap-5 py-3 px-4 text-sm font-[500] text-black rounded-md hover:bg-[#F2F2F2]`}>
                    <HomeIcon className="w-6 h-6 text-black" />
                    Home
                </NavLink>
                 <NavLink to= "shorts" className={({ isActive})=>isActive ? `flex flex-col md:flex-row  items-center gap-5 bg-[#F2F2F2] hover:bg-[#E6E6E6] py-3 px-4 text-sm font-[500] text-black rounded-md`:`flex flex-col md:flex-row items-center gap-5 py-3 px-4 text-sm font-[500] text-black hover:bg-[#F2F2F2] rounded-md `}>
                    <VideoIcon className="w-6 h-6 text-black" />
                    Shorts
                </NavLink>
                 <NavLink to= "music" className={({ isActive})=>isActive ? `flex border flex-col md:flex-row items-center gap-5 bg-[#F2F2F2] hover:bg-[#E6E6E6] py-3 px-4 text-sm font-[500] text-black rounded-md`:`flex flex-col md:flex-row items-cente gap-5 py-3 px-4 text-sm font-[500] text-black rounded-md hover:bg-[#F2F2F2]`}>
                    <Music className="w-6 h-6 text-black" />
                    Music
                </NavLink>
            </div>
            <div className='p-3 flex flex-col gap-4 '>
                <NavLink to= "trending" className={({ isActive})=>isActive ? `flex flex-col md:flex-row items-center gap-5 bg-[#F2F2F2] hover:bg-[#E6E6E6] py-3 px-4 text-sm font-[500] text-black rounded-md`:`flex flex-col md:flex-row items-center gap-5 py-3 px-4 text-sm font-[500] text-black rounded-md hover:bg-[#F2F2F2]`}>
                    <TrendingUp className="w-6 h-6 text-black" />
                    Trending
                </NavLink>
                 <NavLink to= "shopping" className={({ isActive})=>isActive ? `flex flex-col md:flex-row items-center gap-5 bg-[#F2F2F2] hover:bg-[#E6E6E6] py-3 px-4 text-sm font-[500] text-black rounded-md`:`flex flex-col md:flex-row items-center gap-5 py-3 px-4 text-sm font-[500] text-black rounded-md hover:bg-[#F2F2F2]`}>
                    <ShoppingBagIcon className="w-6 h-6 text-black" />
                    Shopping
                </NavLink>
                 <NavLink to= "music" className={({ isActive})=>isActive ? `flex flex-col md:flex-row items-center gap-5 bg-[#F2F2F2] hover:bg-[#E6E6E6] py-3 px-4 text-sm font-[500] text-black rounded-md`:`flex flex-col md:flex-row items-center gap-5 py-3 px-4 text-sm font-[500] text-black rounded-md hover:bg-[#F2F2F2]`}   >
                    <Music className="w-6 h-6 text-black" />
                    Music
                </NavLink>
                  <NavLink to= "gaming" className={({ isActive})=>isActive ? `flex flex-row md:flex-row items-center gap-5 bg-[#F2F2F2] hover:bg-[#E6E6E6] py-3 px-4 text-sm font-[500] text-black rounded-md`:`flex flex-row md:flex-row items-center gap-5 py-3 px-4 text-sm font-[500] text-black rounded-md hover:bg-[#F2F2F2]`}>
                    <Gamepad className="w-6 h-6 text-black" />
                    Gaming
                </NavLink>

              
            </div>
          </div>
           
           <div className='w-full md:w-[w-82%] p-5 '>
            <Outlet />
              {/* videos card */}
             {
              loading ? (
                <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-5 pb-6'>
                  {
                    Array(9).fill().map((_,index)=>{
                      return (
                        <VideoCardShimmer key={index} />
                      )
                    })
                  }
                </div>
              ):allVideo?.length > 0 ? (

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-5 pb-6">
                  {
                    allVideo?.map((video)=>{
                      return (
                      <VideoCard key={video._id} title={video?.title || "No title"} thumbnailURL={video?.thumbnail} VideoId={video?._id} views={video?.views.length} createdAt={createdAt(video?.createdAt)} channelprofilepicture={video?.channelId?.profilepicture}  name={video?.channelId?.name || "No name"}  />
                      )
                    })
                  }
             
                 </div>

              ):(
                <div className='flex items-center justify-center mt-10'>
 <h1 className="text-2xl text-center justify-end font-semibold text-neutral-500">No video found</h1>
                </div>
               
              )
             }
           </div>
          
      </div>
         
          


      </div>
  );
}

export default Home;

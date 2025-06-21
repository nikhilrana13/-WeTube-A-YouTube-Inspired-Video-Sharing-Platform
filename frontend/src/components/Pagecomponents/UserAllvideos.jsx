import React, { useEffect } from 'react';
import { data, NavLink } from 'react-router-dom';
import { ArrowLeft, CrossIcon, DeleteIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserAllvideos = () => {
    const [Videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const fetchVideos = async ()=>{
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/video/uservideos`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwttoken")}`
                },
                withCredentials: true
            });
            if(response.data){
                setVideos(response.data?.user?.videos);
                // console.log("videos",response.data?.user?.videos);
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
  },[])
// handle delete video
   const DeleteVideo = async(id)=>{
       try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/video/delete/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
            withCredentials:true
        });
        if(response.data){
            toast.success(response?.data?.message || "Video deleted successfully");
            const filteredVideos = Videos.filter(video=>video._id !== id);
            setVideos(filteredVideos);
        }
       } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to delete video");
       }
   }
  return (
     <div class="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
    <NavLink to="/">
    <ArrowLeft className="dark:text-neutral-400 hover:bg-[#F2F2F2]  rounded-md" />
    </NavLink>
  <h2 class="text-2xl font-semibold mt-5 mb-6">Your Uploaded Videos</h2>
     {loading ? (
          <Loader2 className="dark:text-neutral-400 cursor-pointer mx-auto animate-spin hover:bg-[#F2F2F2]  rounded-md" />
     ):Videos.length > 0 ? (
         <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left font-medium text-gray-700">Sr. No</th>
          <th class="px-4 py-2 text-left font-medium text-gray-700">Title</th>
          <th class="px-4 py-2 text-left font-medium text-gray-700">Upload Date</th>
          <th class="px-4 py-2 text-left font-medium text-gray-700">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
    {Videos.map((video,index)=>{
        return(
        <tr key={video._id}>
        <td class="px-4 py-2">{index + 1}</td>
        <td class="px-4 py-2">{video.title}</td>
        <td class="px-4 py-2">{new Date(video.createdAt).toLocaleDateString("en-GB")}</td>
        <td class="px-4 py-2">
            <DeleteIcon onClick={()=>DeleteVideo(video._id)} className="dark:text-neutral-400 cursor-pointer hover:bg-[#F2F2F2]  rounded-md" />
        </td>
        </tr>
            )
        })}
       
      </tbody>
    </table>
   </div>
):(
        <p className='text-center mt-10 text-[#7E7E81] text-[1.2rem]'>No videos found</p>
     )
     }
     
</div>
  
  )
}

export default UserAllvideos;

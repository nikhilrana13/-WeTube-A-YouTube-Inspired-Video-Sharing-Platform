import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { ArrowDownLeft, ArrowLeft, Loader2, MoveLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Input } from '../ui/input';

const VideoUpload = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit,reset, formState: { errors } } = useForm();

  const onSubmit = async(data)=>{
         const formdata = new FormData();
         formdata.append("title",data.title);
         formdata.append("description",data.description);
         formdata.append("Video",data.Video[0]);
         formdata.append("thumbnail",data.thumbnail[0]);
          for(const pair of formdata.entries()){
            console.log(pair[0]+ ', ' + pair[1]);
          }
      try {
        setLoading(true);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/video/upload`,formdata,{
          headers:
          { Authorization:`Bearer ${localStorage.getItem("jwttoken")}`,'Content-Type':'multipart/form-data'},withCredentials:true});
        if(response.data){
           toast.success(response?.data?.message || "Video uploaded successfully");
           reset();
          //  console.log("video uploaded",response.data.video);
        }
        
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to upload video");
      }finally{
        setLoading(false);
      }
  }
     
  return (
    <>   
    <div class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
    <NavLink to="/">
    <ArrowLeft className="dark:text-neutral-400 hover:bg-[#F2F2F2]  rounded-md" />
    </NavLink>
  <h2 class="text-2xl font-semibold mb-6 mt-4">Upload a New Video</h2>
  <form onSubmit={handleSubmit(onSubmit)} class="space-y-6">
    <div>
      <label class="block text-sm font-medium mb-1">Title</label>
      <input
        type="text"
        class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        placeholder="Enter video title"
        {...register("title", { required: true })}
      />
    </div>
    {errors.title && <span className="text-red-500">Title is required</span>}
    <div>
      <label class="block text-sm font-medium mb-1">Description</label>
      <textarea
        rows="4"
        class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200 resize-none"
        placeholder="Enter video description"
        {...register("description", { required: true })}
      ></textarea>
      {errors.description && <span className="text-red-500">Description is required</span>}
    </div>
      <div>
      <label class="block text-sm font-medium mb-1">Thumbnail</label>
      <Input
        type="file"
        accept="image/*"
        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        {...register("thumbnail", { required: true })}
      />
    </div> 

    <div>
      <label class="block text-sm font-medium mb-1">Video File</label>
      <Input
        type="file"
        accept="video/*"
        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        {...register("Video", { required: true })}
      />
    </div>
    {errors.Video && <span className="text-red-500">Video is required</span>}
    <div class="flex justify-end">
   
        <button
        type="submit"
        class="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-200"
      >
        {loading ? (
           <div>
             <Loader2 className="animate-spin mr-2 " />
           </div>
        ):(
          "Upload Video"
        )}
      </button>
     
    </div>
  </form>
</div>
    </>
 

  );
}

export default VideoUpload;

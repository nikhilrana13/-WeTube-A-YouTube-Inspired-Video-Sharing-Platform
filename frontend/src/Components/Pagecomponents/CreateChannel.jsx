import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Loader2 } from 'lucide-react';

const CreateChannel = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const OnSubmit = async(data)=>{
        const formdata = new FormData();
        formdata.append("name",data.name);
        formdata.append("description",data.description);
        formdata.append("coverimage",data.coverimage[0]);
        formdata.append("profilepicture",data.profilepicture[0]);
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:4000/api/channel/create",formdata,{withCredentials:true});
            if(response.data){
                toast.success(response?.data?.message || "Channel created successfully");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create channel");
        }finally{
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }
  return (
     <div class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
    <NavLink to="/">
    <ArrowLeft className="dark:text-neutral-400 hover:bg-[#F2F2F2]  rounded-md" />
    </NavLink>
  <h2 class="text-2xl font-semibold mb-6 mt-4">Create Channel</h2>
  <form onSubmit={handleSubmit(OnSubmit)} class="space-y-6">
    <div>
      <label class="block text-sm font-medium mb-1">name</label>
      <input
        type="text"
        class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        placeholder="Enter a name "
        {...register("name", { required: true })}
      />
    </div>
    {errors.title && <span className="text-red-500">name is required</span>}
    <div>
      <label class="block text-sm font-medium mb-1">Description</label>
      <textarea
        rows="4"
        class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200 resize-none"
        placeholder="Enter a description"
        {...register("description", { required: true })}
      ></textarea>
      {errors.description && <span className="text-red-500">Description is required</span>}
    </div>
      <div>
      <label class="block text-sm font-medium mb-1">Cover image</label>
      <Input
        type="file"
        accept="image/*"
        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        {...register("coverimage", { required: true })}
      />
    </div> 

    <div>
      <label class="block text-sm font-medium mb-1">Profile picture</label>
      <Input
        type="file"
        accept="image/*"
        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        {...register("profilepicture", { required: true })}
      />
    </div>
    {errors.video && <span className="text-red-500">profile picture is required</span>}
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
          "Create Channel"
        )}
      </button>
    </div>
  </form>
</div>
  );
}

export default CreateChannel;

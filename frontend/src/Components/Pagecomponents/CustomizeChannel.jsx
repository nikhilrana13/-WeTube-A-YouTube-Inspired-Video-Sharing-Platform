import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
const CustomizeChannel = ({channelid}) => {
  const navigate = useNavigate();
  const [loading,SetLoading] = useState(false);
  const [coverimage,SetCoverImage] = useState([]);
  const [updateChannel,SetUpdateChannel] = useState({});
  const [profilepicture,SetProfilePicture] = useState([]);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // fetch channel details
  useEffect(()=>{
       const fetchChanneldetails = async () => {
           try {
            const response = await axios.get(`http://localhost:4000/api/channel/${channelid}`,{withCredentials:true})
            if(response.data){
               setValue("name",response.data.channel.name);
               setValue("description",response.data.channel.description);
               SetCoverImage("coverimage",response.data.channel.coverimage);
               SetProfilePicture("profilepicture",response.data.channel.profilepicture);
               SetUpdateChannel(response.data.channel);
              //  console.log("channel detail",response.data.channel);
            }
           } catch (error) {
             console.log("failed to fetch channel details",error)
           }
       }
        fetchChanneldetails();
  },[channelid])

  const onSubmit = async(data)=>{
         const formdata = new FormData();
         formdata.append("name",data.name);
         formdata.append("description",data.description);
         formdata.append("coverimage",data.coverimage[0]);
         formdata.append("profilepicture",data.profilepicture[0]);
        //  for (const pair of formdata.entries()){
        //   console.log(pair[0]+ ', ' + pair[1]);
        //  }
          try {
             SetLoading(true);
             const response = await axios.put(`http://localhost:4000/api/channel/update/${channelid}`,formdata,{withCredentials:true});
             if(response.data){
                toast.success(response?.data?.message || "Channel updated successfully");
                SetUpdateChannel(response?.data?.updateChannel)
                navigate("/")
             }
          } catch (error) {
            ("failed to update channel",error)
          }finally{
            setTimeout(() => {
              SetLoading(false);
            }, 1000);
          }

        }
  return (
     <Dialog>
        <DialogTrigger asChild>
           <Button className='bg-[#7E7E81] cursor-pointer hover:bg-gray-600  text-sm font-[500] px-3 py-2 flex items-center text-white rounded-full'>Customize Channel</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Channel Details</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
           <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" name="name" {...register("name")}   />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <textarea className='resize-none border' id="description"  name="description" {...register("description")} ></textarea>
            </div>
             <div className="grid gap-3">
              <Label htmlFor="coverimage">CoverImage</Label>
              <Input type="file" accept="image/*" onChange={(e)=>{SetCoverImage(e.target.files[0])}}   className='resize-none border' {...register("coverimage")}  id="coverimage" name="coverimage" ></Input>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="profilepicture">ProfilePicture</Label>
              <Input type="file" accept="image/*"  className='resize-none border' onChange={(e)=>{SetProfilePicture(e.target.files[0])}} id="profilepicture" {...register("profilepicture")} name="profilepicture" ></Input>
            </div>

          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{loading ? "Updating..." : "Save changes"}</Button>
          </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
  );
}

export default CustomizeChannel;

import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { BellIcon, Loader2, Share2Icon, ThumbsDown, ThumbsUp } from 'lucide-react';
import { NavLink, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios, { all } from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import SideVideoCard from './SideVideoCard';
import VideoCardShimmerSmall from './ShimmereffectSmallcard';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { use } from 'react';
dayjs.extend(relativeTime);

const EachVideoDetail = ({}) => {
  const [videoloading, setvideoloading] = useState(false);
  const [Views, setViews] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [Like, setLike] = useState(false);
  const [channeldetail, setchanneldetail] = useState({});
  const [allComment, setallComment] = useState([]);
  const [Comment, setComment] = useState(false);
  const Currentuser = useSelector((state) => state.Auth.user?._id);
  const [Subcribe, setSubcribe] = useState(false);
  const Video = useSelector((state) => state.Video.videos);
  const [allvideo, setallvideo] = useState([]);
  const [loading, setLoading] = useState(false);
  const id = useParams();
  const extractid = id.videoid;
  // console.log("extractid",extractid);
  const [videoDetails, setVideoDetails] = useState({});
  // fetch video details
  useEffect(() => {
    const FetchVideodetials = async () => {
      try {
        setvideoloading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/video/${extractid}`, { 
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwttoken")}`
          },
          withCredentials: true
         });
        if (response.data) {
          setVideoDetails(response?.data?.video);
          // console.log("video details", response?.data?.video);
        }
      } catch (error) {
        console.log("failed to fetch video details", error);
      }finally{
        setTimeout(() => {
          setvideoloading(false);
        }, 2000);
      }
    }
    FetchVideodetials();
  }, [extractid]);
  const createdAt = (data) => {
    const timeAgo = dayjs(data).fromNow();
    return timeAgo
  }
  // fetch all videos
  useEffect(() => {
    const fetchvideos = async () => {
      try {
        setLoading(true);
        const AllVideos = Video;
        setallvideo(AllVideos);
      } catch (error) {
        console.log("failed to fetch videos", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }
    fetchvideos();
  }, [Video])
  // extract channel id 
  let channelId = videoDetails?.channelId?._id;
  channelId = channelId;
  // handle subscribe function 
  const handleSubcribeAndUnsubcribe = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscriber/subscribe`, { channelId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwttoken")}`
        },
        withCredentials: true
      });
      if (response.data) {
        toast.success(response?.data?.message || "Subscribed successfully");
        if (response.data?.message.includes("Subscribed")) {
          setSubcribe(true);
        } else {
          setSubcribe(false);
        }
        // update video after subscribe
        const updatedVideo = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/video/${extractid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwttoken")}`
          },
          withCredentials: true
        });
        if (updatedVideo?.data?.video) {
          setVideoDetails(updatedVideo?.data?.video);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to subscribe");
    }
  }
  //  handle subscribe state
  useEffect(() => {
    if (videoDetails?.channelId?.Subscribers?.includes(Currentuser)) {
      setSubcribe(true);
    } else {
      setSubcribe(false);
    }
  }, [videoDetails, Currentuser]);

  // handle like and unlike
  const handleLikeAndDislike = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/like/${extractid}`, {}, { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwttoken")}`
        },
        withCredentials: true
       });
      if (response.data) {
        toast.success(response?.data?.message || "Liked successfully");
        //  console.log("response",response?.data);
      }
      if (response.data?.message.includes("Liked")) {
        setLike(true);
      } else {
        setLike(false);
      }
      //  update video after like
      const updatedVideo = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/video/${extractid}`, { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwttoken")}`
        },
        withCredentials: true
       });
      if (updatedVideo?.data?.video) {
        setVideoDetails(updatedVideo?.data?.video);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to like Video");
    }
  }
  // handle like state
  useEffect(() => {
    if (videoDetails?.likes?.includes(Currentuser)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [videoDetails, Currentuser]);
  // handle comment submit
  const OnSubmit = async (data) => {
    const commenttext = data.commenttext;
    //  console.log("comment",comment);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/comment/add/${extractid}`, { commenttext }, { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwttoken")}`
        },
        withCredentials: true
       });
      if (response.data) {
        // console.log("response",response?.data);
        toast.success(response?.data?.message || "comment added successfully");
        reset();
        const updatedComment = response?.data?.comment;
        setallComment((prevcomment) => [updatedComment, ...prevcomment]);
        const updatedVideo = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/video/${extractid}`, { 
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwttoken")}`
          },
          withCredentials: true
         });
        if (updatedVideo?.data?.video) {
          setVideoDetails(updatedVideo?.data?.video);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add comment");
    }
  }
  // Show all comments
  const fetchallcomments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/comment/show/${extractid}`, { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwttoken")}`
        },
        withCredentials: true
       });
      if (response.data) {
        setallComment(response?.data?.comments);
        // console.log("comments",response?.data?.comments);
        const updatedVideo = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/video/${extractid}`, { 
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwttoken")}`
          },
          withCredentials: true
         });
        if (updatedVideo?.data?.video) {
          setVideoDetails(updatedVideo?.data?.video);
        }
      }
    } catch (error) {
      console.log("failed to fetch comments", error);
    }
  }
  useEffect(() => {
    fetchallcomments();
  }, [extractid])
  // extract current user
  const user = useSelector((state) => state.Auth.user);
  // console.log("user", user);
  const CurrentUserChannelId = user?.channelId;

// fetch channel details
  useEffect(() => {
    const fetchchanneldetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/channel/${CurrentUserChannelId}`, { 
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwttoken")}`
          },
          withCredentials: true
         });
        if (response.data) {
          setchanneldetail(response?.data?.channel);
          // console.log("channel detail", response?.data?.channel);
        }
      } catch (error) {
        console.log("failed to fetch channel details", error);
      }
    }
    fetchchanneldetails();
  }, [Currentuser]);

  // handle views
  useEffect(()=>{
       const fetchViews = async()=>{
        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/view/${extractid}`,{},{
            headers:{
              Authorization:`Bearer ${localStorage.getItem("jwttoken")}`
            },
            withCredentials:true
          });
          if(response.data){
            // console.log("response",response?.data?.message);
            setViews(response?.data?.video);
            // console.log("views",response?.data?.views);
            const updatedVideo = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/video/${extractid}`, { 
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwttoken")}`
              },
              withCredentials: true
             });
            if (updatedVideo?.data?.video) {
              setVideoDetails(updatedVideo?.data?.video);
            }
          }
        } catch (error) {
          console.log("failed to fetch views",error);
        }
       }  
       fetchViews();
      
    },[extractid])



  return (
    <div className='w-full'>
      <Navbar />
      <div className='w-full  p-[7vw] flex gap-5  flex-col lg:flex-row min-h-screen main'>
        {
          videoloading ? (
          <div className='animate-pulse  w-full md:w-[65%] space-y-4'>
      <div className='w-full h-[300px] bg-gray-300 rounded-md'></div>
      <div className='h-6 bg-gray-300 rounded w-3/4'></div>
      <div className='flex items-center gap-4 mt-4'>
        <div className='w-10 h-10 rounded-full bg-gray-300'></div>
        <div className='space-y-2'>
          <div className='h-4 bg-gray-200 rounded w-32'></div>
          <div className='h-3 bg-gray-200 rounded w-24'></div>
        </div>
        <div className='h-8 w-24 bg-gray-300 rounded-full ml-auto'></div>
      </div>
      <div className='h-24 bg-gray-200 rounded mt-4'></div>
    </div>
          ):Object.keys(videoDetails).length > 0 ? (
             <div className='w-full md:w-[65%]' >
               {/* video player */}
          <div className='videoplayer w-full '>
            <video src={videoDetails?.Video} className='w-full rounded-md  ' autoPlay controls></video>
          </div>
          {/* video description  */}
          <div className=' mt-3'>
            <h4 className='text-[1rem] sm:text-[1.2rem] font-[700] text-black'>{videoDetails?.title || "no title"}</h4>
            {/* channel details */}
            <div className='flex flex-col justify-between md:flex-row  gap-3'>
              <div className='flex gap-5 p-2  items-center '>
                <Avatar>
                  <AvatarImage src={videoDetails?.channelId?.profilepicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <h4 className='text-[0.9rem] font-[700] text-black'>{videoDetails?.channelId?.name}</h4>
                  <p className='text-[0.9rem] font-[400] text-neutral-500'>{videoDetails?.channelId?.Subscribers?.length || "0"} </p>
                </div>
                <button onClick={handleSubcribeAndUnsubcribe} className={`${Subcribe ? " px-4 py-3 rounded-full bg-[#F2F2F2] text-black" : "bg-black text-white px-3 py-2 rounded-full"}`}>
                  {
                    Subcribe ? <BellIcon className='text-[0.8rem] ' /> : "Subscribe"
                  }
                </button>
              </div>
              {/* video likes button */}
              <div className='flex gap-4 items-center'>
                <button onClick={handleLikeAndDislike} className='bg-[#F2F2F2] flex text-black px-8 py-2   rounded-full'>{Like ? <ThumbsDown className='mr-2' /> : <ThumbsUp className='mr-2' />} <span className='font-[400]'>{videoDetails?.likes?.length}</span> </button>
                <button className='bg-[#F2F2F2] flex text-black px-8 py-2   rounded-full'><Share2Icon className='mr-2' /> <span>Shares</span> </button>
              </div>
            </div>
            {/* video description */}
            <div className=' rounded-md mt-5 bg-[#F2F2F2] p-3'>
              <div className=''>
                <div className='flex gap-3'>
                  <span className='font-[500]'>{videoDetails?.views?.length} views</span>
                  <span className='font-[500]'>{createdAt(videoDetails?.createdAt)}</span>
                </div>
                {/* video description content */}
                <p className='font-[400] mt-5 leading-6'>
                  {videoDetails?.description?.split('\n').map((line, index) => (
                    <p key={index} className='mb-2'>{line}</p>
                  ))}
                </p>
              </div>
            </div>
          </div>
          {/* commnets */}
          <div className='p-3'>
            <div className='flex flex-col gap-3'>
              <span className='text-[1.2rem] text-black font-[700]'>{allComment?.length} Comments</span>
              <div className='flex gap-3'>
                {Currentuser && channeldetail ? (
                  <Avatar>
                    <AvatarImage
                      src={
                        channeldetail?.profilepicture?.trim()
                          ? channeldetail.profilepicture
                          : user?.picture
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ) : (
                  <span className='text-[1rem] text-black font-[500]'>
                    {Currentuser ? 'Create a channel' : 'Login to comment'}
                  </span>
                )}
                {
                  Currentuser ? (
                    <>
                      <Input placeholder='Add a comment' className='bg-[#F2F2F2] border-none w-full' {...register("commenttext")} />
                      <Button type='button' onClick={handleSubmit(OnSubmit)} className='bg-black px-3 py-2  text-white'>Add</Button>
                    </>
                  ) : ("")
                }



              </div>

              {/* comments */}
              <div className='comment box'>
                {
                  Comment ? (
                    <Loader2 className='animate-spin W-6 h-6' />
                  ) : allComment?.length > 0 ? (
                    <>
                      <div className='flex mt-5 flex-col gap-3'>
                        {
                          allComment?.map((comment) => {
                            return (
                              <div className='flex gap-3'>
                                <Avatar>
                                  <AvatarImage src={comment?.channelId?.profilepicture} />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col gap-1'>
                                  <div className='flex items-center gap-3'>
                                    <span className='font-[500]'>{comment?.channelId?.name}</span>
                                    <span className='text-[0.9rem] font-[400] text-neutral-500'>{createdAt(comment?.createdAt)}</span>
                                  </div>
                                  <span className='text-[0.9rem] font-[400] text-neutral-500'>{comment?.commenttext}</span>
                                </div>

                              </div>
                            )
                          })
                        }
                      </div>
                    </>) : (
                    <h3 className='text-center text-[1.2rem] mt-5 font-[600]'>No comments found</h3>
                  )
                }


              </div>
            </div>


          </div>

              </div>

          ):(
            <h3 className='text-center text-[1.2rem] mt-5 font-[600]'>No video found</h3>
          )
        }
      
        <div className='w-full md:w-[35%] min-h-screen ' >
          {
            loading ? (
              <div className='grid grid-cols-1  gap-4 '>
                {
                  Array(7).fill().map((_, index) => {
                    return (
                      <VideoCardShimmerSmall key={index} />
                    )
                  })
                }
              </div>
            ) : allvideo?.length > 0 ? (
              <div className='grid grid-cols-1  gap-2'>
                {
                  allvideo?.map((video) => {
                    return (
                      <NavLink className="" to={`/video/${video?._id}`} key={video?._id}>
                        <SideVideoCard title={video?.title} thumbnail={video?.thumbnail} views={video?.views.length} createdAt={createdAt(video?.createdAt)} name={video?.channelId?.name} />
                      </NavLink>
                    )
                  })
                }
              </div>
            ) : (
              <h3 className='text-center text-[1.2rem] mt-5 font-[600]'>No videos found</h3>
            )
          }
        </div>

      </div>


    </div>
  );
}

export default EachVideoDetail;


import React, { useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../ui/button';
import ShimmerEffectCard from './ShimmerEffectCard';
import CustomizeChannel from './CustomizeChannel';

const ViewUserChannel = () => {
    const { channelid } = useParams();
    // console.log("channelid", channelid)
    const [loading, setLoading] = useState(false);
    const [channelDetail, setChannelDetail] = useState({});
    // fetch channel details 
    useEffect(() => {
        const fetchChanneldetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/channel/${channelid}`, { withCredentials: true });
                if (response.data) {
                    setChannelDetail(response?.data?.channel)
                    // console.log("channel detail", response?.data?.channel)
                }
            } catch (error) {
                console.log("failed to fetch channel details", error)
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        }
        fetchChanneldetails();
    }, [channelid])
    return (
        <>
          {
            loading ? (
                <ShimmerEffectCard />
            ):Object.keys(channelDetail).length > 0 ? (
            <div className='min-h-screen p-5 mt-2 relative'>
            {/* Background image + blur */}
            <div
                className="absolute top-0 left-0 w-full h-[300px] z-0 bg-cover bg-center blur-sm"
                style={{ backgroundImage: `url(${channelDetail?.coverimage})` }}
            ></div>
            <div className='relative z-10 mt-[200px] bg-white/70 dark:bg-neutral-900/70  backdrop-blue-md shadow-lg border flex flex-col md:flex-row gap-5 p-3 rounded-md  '>
                <img src={channelDetail?.profilepicture} className='md:max-w-[200px] max-w-[100px] rounded-full' alt="" />
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2 '>
                        <h1 className='font-bold text-[1.3rem] md:text-[2rem] '>{channelDetail?.name}</h1>
                        <p><span className='text-[#7E7E81]'>Description :</span> {channelDetail?.description}</p>
                    </div>
                    <div className='flex  mt-3'>
                        <CustomizeChannel channelid={channelid} />
                    </div>

                </div>

            </div>
        </div>
            ):(
                <p className='text-center mt-10 text-[#7E7E81] text-[1.2rem]'>No channel found please create a channel</p>
            )
          }
        </>
    );
}

export default ViewUserChannel;

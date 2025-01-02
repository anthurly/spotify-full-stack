import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';
import { useState } from 'react';
import { useEffect } from 'react';

const DisplayRecent = ({album}) => {

    const [albumData,setAlbumData] = useState("")
    const [songsData,setSongsData] = useState([])
    const {playWithId}   = useContext(PlayerContext);
    
    useEffect(()=>{
      callSearchAPI()
      // albumsData.map((item)=>{
      //   if (item._id === id) {
      //     setAlbumData(item);
      //   }
      // })
    },[])
  const callSearchAPI = async () => {
    try {
        const response = await fetch(`http://localhost:4000/api/song/recent`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        if(data.success){
          setSongsData(data.songs)
        }
        console.log("Search results:", data);
    } catch (error) {
        console.error("Error searching:", error);
    }
};

  return  (
    <>
      {/* <Navbar/> */}
      <h4>Recently listened songs </h4>
      {songsData && songsData.length > 0 &&  
        <div>
          <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
        <p><b className='mr-4'>#</b>Title</p>
        <p>Album</p>
        <p className='hidden sm:block'>Singer</p>
        <img className='m-auto w-4' src={assets.clock_icon} alt="" />
      </div>
      <hr />
        </div>
      }
     
      {songsData && songsData.length > 0 ?
        songsData.map((item,index)=>(
            <div onClick={()=>playWithId(item._id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
                <p className='text-white'>
                    <b className='mr-4 text-[#a7a7a7]'>{index+1}</b>
                    <img className='inline w-10 mr-5' style={{width:50,height:50,objectFit:'cover'}}  src={item?.image} alt="" />
                    {item?.name}
                </p>
                <p className='text-[15px]'>{item?.album}</p>
                <p className='text-[15px] hidden sm:block'>{item?.actor}</p>
                <p className='text-[15px] text-center'>{item?.duration}</p>
            </div>
        )) : <h4 style={{marginTop:20}}>Song not found</h4>
      }
    </>)
}

export default DisplayRecent
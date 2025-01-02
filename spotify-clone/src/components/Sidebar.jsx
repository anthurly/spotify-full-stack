import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log('Search query:', searchQuery);
            navigate(`song/search/${searchQuery}`); // Kiểm tra giá trị
            // callSearchAPI(searchQuery); // Gọi API tìm kiếm
        }
    };

    const navigate = useNavigate();

  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
      <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
        <div onClick={()=>navigate('/')} className='flex items-center gap-3 pl-8 cursor-pointer'>
            <img className='w-6' src={assets.home_icon} alt="" />
            <p className='font-bold'>Home</p>
        </div>
        <div className='ap-3 pl-8 '>
            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <img className='w-6' src={assets.search_icon} alt="" />
              <input 
              onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật giá trị searchQuery
              onKeyDown={handleKeyDown} // Bắt sự kiện nhấn phím
              placeholder='Search by name song' name="search" style={{background:'#242424',marginTop:8,outline:'none',width:'260px',padding:"4px 8px"}}/>
            </div>
        </div>
      </div>
      <div className='bg-[#121212] h-[85%] rounded'>
        <div className='p-4 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <img className='w-8' src={assets.stack_icon} alt="" />
                <p className='font-semibold'>Your Library</p>
            </div>
            <div className='flex items-center gap-3'>
                <img className='w-5' src={assets.arrow_icon} alt="" />
                <img className='w-5' src={assets.plus_icon} alt="" />
            </div>
        </div>
        
         <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
          <h1>View Your Recently Played Songs</h1>
          <p className='font-light'>Click the button below to see your recent tracks.</p>
          <a href='/recent-track' style={{textDecoration:'none',color:'#fff'}}>
            <button className='px-4 btn-success py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>
                Show Recent Tracks
            </button>
          </a>
      </div>

       {/* <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
            <h1>Create your first playlist</h1>
            <p className='font-light'>it's easy we will help you</p>
            <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Create Playlist</button>
        </div>
        <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4'>
            <h1>Let's findsome podcasts to follow</h1>
            <p className='font-light'>we'll keep you update on new episodes</p>
            <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Browse podcasts</button>
        </div> */}
      </div>
    </div>
  )
}

export default Sidebar

import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const SongItem = ({name,createdAt,image,desc,id,actor}) => {
  console.log("check",createdAt,actor)
    const {playWithId} = useContext(PlayerContext)

  return (
    <div onClick={()=>playWithId(id)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
      <img className='rounded' style={{width:'150px',height:'150px',objectFit:'cover'}} src={image} alt="" />
      <p className='font-bold mt-2 mb-1'>Bài hát: {name}</p>
      <p className='text-slate-200 text-sm'>Singer: {actor}</p>
    </div>
  )
}

export default SongItem

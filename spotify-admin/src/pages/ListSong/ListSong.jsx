import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { url } from '../../App';
import { toast } from 'react-toastify';

const ListSong = () => {

  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {

      const response = await axios.get(`${url}/api/song/list`);

      console.log(response);

      if (response.data.success) {
        setData(response.data.songs)
      }

    } catch (error) {
      toast.error("Error occur");
    }
  }

  const removeSong = async (id) => {
    try {

      const response = await axios.post(`${url}/api/song/remove`, { id });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      }

    } catch (error) {
      toast.error("Error occur")
    }
  }

  useEffect(() => {
    fetchSongs();
  }, [])

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
      <table className="table-auto border-collapse border border-gray-300 text-sm mr-5 w-full bg-gray-100">
      <thead>
        <tr className=" border border-gray-300 bg-gray-100">
          <th className=" px-3 py-2 text-left">Image</th>
          <th className=" px-3 py-2 text-left">Name</th>
          <th className=" px-3 py-2 text-left">Singer</th>
          <th className=" px-3 py-2 text-left">Album</th>
          <th className=" px-3 py-2 text-left">Duration</th>
          <th className=" px-3 py-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="odd:bg-white even:bg-gray-50">
            <td className=" px-3 py-2 text-left text-center">
              <img 
                style={{ height: 50, width: 50, objectFit: 'cover' }} 
                src={item.image} 
                alt="" 
              />
            </td>
            <td className=" px-3 py-2 text-left">{item.name}</td>
            <td className=" px-3 py-2 text-left">{item.actor}</td>
            <td className=" px-3 py-2 text-left">{item.album}</td>
            <td className=" px-3 py-2 text-left">{item.duration}</td>
            <td className=" px-3 py-2 text-left cursor-pointer" >
            <button
              type="button"
              onClick={() => removeSong(item._id)}
              style={{
                padding: '4px 6px',
                border: '1px solid red',
                backgroundColor: 'transparent',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.1)')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
              className="btn btn-success"
            >
              X
            </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    </div>
  )
}

export default ListSong

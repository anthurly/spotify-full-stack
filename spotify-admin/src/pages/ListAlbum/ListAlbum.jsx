import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { url } from '../../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {

  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {

      const response = await axios.get(`${url}/api/album/list`);

      if (response.data.success) {
        setData(response.data.albums)
      }

    } catch (error) {
      toast.error("Error occur");
    }
  }

  const removeAlbum = async (id) => {
    try {

      const response = await axios.post(`${url}/api/album/remove`, { id });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums();
      }

    } catch (error) {
      toast.error("Error occur")
    }
  }

  useEffect(() => {
    fetchAlbums();
  }, [])

  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div className=''>
      <table className="table-auto border-collapse border border-gray-300 text-sm w-full bg-gray-100">
        <thead>
          <tr className="border border-gray-300 bg-gray-100">
            <th className="px-3 py-2 text-left">Image</th>
            <th className="px-3 py-2 text-left">Name</th>
            <th className="px-3 py-2 text-left">Description</th>
            <th className="px-3 py-2 text-left">Album Colour</th>
            <th className="px-3 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50">
              <td className="px-3 py-2 text-center">
                <img
                  style={{ height: 50, width: 50, objectFit: 'cover' }}
                  src={item.image}
                  alt=""
                />
              </td>
              <td className="px-3 py-2 text-left">{item.name}</td>
              <td className="px-3 py-2 text-left">{item.desc}</td>
              <td className="px-3 py-2 text-left">
                <input type="color" value={item.bgColour} readOnly />
              </td>
              <td className="px-3 py-2 text-left cursor-pointer">
                <button
                  type="button"
                  style={{
                    padding: '4px 6px',
                    border: '1px solid red',
                    backgroundColor: 'transparent',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.1)')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                  className="btn btn-success"
                  onClick={() => removeAlbum(item._id)}
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

export default ListAlbum

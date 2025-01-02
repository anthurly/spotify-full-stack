import React, { useContext, useState, useEffect } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import { PlayerContext } from '../context/PlayerContext';

const DisplayHome = () => {
  const [translateX, setTranslateX] = useState(0);
  const { songsData, albumsData } = useContext(PlayerContext);

  // Tự động slide
  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX((prev) => {
        const maxTranslate = -(albumsData.length - 3) * 33.33; // Dịch tối đa theo số album
        return prev <= maxTranslate ? 0 : prev - 33.33; // Reset hoặc dịch tiếp
      });
    }, 3000); // Slide mỗi 3 giây
    return () => clearInterval(interval);
  }, [albumsData]);

  return (
    <>
      <Navbar />
      {/* Albums Section */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(${translateX}%)`,
              width: `${albumsData.length * 33.33}%`,
            }}
          >
            {albumsData.map((item, index) => (
              <div key={index} className="flex-none w-1/3 px-2">
                <AlbumItem
                  name={item.name}
                  desc={item.desc}
                  id={item._id}
                  image={item.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Songs Section */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's Biggest Hits</h1>
        <div className="flex overflow-auto" style={{overflow:'auto'}}>
          {songsData.map((item, index) => (
            <SongItem
              createdAt={item?.createdAt}
              key={index}
              actor={item?.actor}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;

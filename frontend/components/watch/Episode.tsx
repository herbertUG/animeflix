import React, { useState } from 'react';

import { setEpisode } from '@slices/episode';
import { useDispatch, useSelector } from '@store/store';

export interface PageButtonProps {
  start: number;
  end: number;
  onClick: () => void;
}

const PageButton: React.FC<PageButtonProps> = ({ start, end, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-md bg-gray-700 px-2 py-1 text-gray-300 transition duration-75 ease-out hover:bg-gray-800 active:scale-90"
    >
      {start}-{end}
    </button>
  );
};

const Episode: React.FC = () => {
  const episodes = useSelector((store) => store.gogoApi.totalEpisodes);

  const dispatch = useDispatch();

  const [currentPage, setPage] = useState(1);

  // Show 100 episodes per page.
  // for 123 episodes there should be 2 pages
  const pages = Math.ceil(episodes / 100);

  const episodeArray = Array.from({ length: episodes }, (_, i) => i + 1);

  return (
    <div>
      <div className="m-2 flex">
        <span className="text-gray-300 md:text-lg">Episodes</span>
      </div>

      {episodes && (
        <div className="m-2">
          <div className="flex space-x-2">
            <div className="flex flex-wrap space-x-2">
              {new Array(pages).fill(1).map((_v, i) => (
                <PageButton
                  key={i + 1}
                  start={i * 100 + 1}
                  end={i * 100 + 100 > episodes ? episodes : i * 100 + 100}
                  onClick={() => setPage(i + 1)}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-11 gap-x-2 gap-y-1 py-1 sm:grid-cols-[repeat(16,_minmax(0,_1fr))] lg:grid-cols-[repeat(20,_minmax(0,_1fr))]  xl:grid-cols-[repeat(25,_minmax(0,_1fr))]">
            {episodeArray
              .slice((currentPage - 1) * 100, currentPage * 100)
              .map((v) => (
                <div
                  className="cursor-pointer font-medium text-[#C3073F] hover:text-white hover:underline"
                  key={v}
                  onClick={() => dispatch(setEpisode(v))}
                >
                  {v}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Episode;

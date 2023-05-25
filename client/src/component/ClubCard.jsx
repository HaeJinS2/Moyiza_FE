import React from "react";
import { useNavigate } from "react-router-dom";

function ClubCard({ category, title, content, thumbnail, id, maxGroupSize }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/detail/${id}`)}
      className="flex w-full h-[261px] px-2 shadow-md justify-center"
    >
      <div className="flex justify-around items-center">
        <div className="flex w-[240.5px] h-[261px] items-center justify-center ">
          <img
            className="rounded-md bg-cover"
            src={thumbnail}
            alt="clubThumbnail"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full px-4 py-6">
          <div className="flex justify-between text-xs text-slate-400">
            <div># {category}</div>
            <div> 1 / {maxGroupSize}</div>
          </div>
          <div className="text-md font-bold">{title}</div>
          <div className="text-sm">{content}</div>
      </div>
    </div>
  );
}

export default ClubCard;

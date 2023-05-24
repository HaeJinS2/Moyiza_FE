import React from "react";
import { useNavigate } from "react-router-dom";

function ClubCard({ category, title, content, thumbnail,id }) {
  const navigate = useNavigate()
  return (
    <div 
    onClick={() =>
      navigate(`/detail/${id}`)
    }
    className="flex w-[588px] h-[261px] bg-slate-400">
      <div className="flex justify-around items-center">
        <div className="w-[240.5px] h-[218.5px] bg-blue-400">
          <img src={thumbnail} alt="clubThumbnail" />
        </div>
      </div>
      <div className="w-full px-2 py-5">
        <div className="flex justify-between">
          <div>{category}</div>
          <div>인원</div>
        </div>
        <div>{title}</div>
        <div>{content}</div>
      </div>
    </div>
  );
}

export default ClubCard;

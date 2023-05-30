import React from "react";
import { useNavigate } from "react-router-dom";

function ClubCard({ tag, title, content, thumbnail, id, maxGroupSize,nowMemberCount }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/detail/${id}`)}
      className="cursor-pointer flex w-full border-[1px] h-[231px] justify-center px-2"
    >
      <div className="flex justify-around items-center">
        <div className="flex w-[210px] h-auto ml-[2px] items-center justify-center">
          <img
            className="rounded-full bg-cover w-[210px] h-[210px] pl-[-5px]"
            src={thumbnail}
            alt="clubThumbnail"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full pl-4 pr-2 py-6">
          <div className="flex justify-between text-xs text-slate-400">
            <div> {tag.map(tag => ` #${tag}`)}</div>
            <div> {nowMemberCount} / {maxGroupSize}</div>
          </div>
          <div className="text-md font-bold">{title}</div>
          <div className="text-sm">{content}</div>
      </div>
    </div>
  );
}

export default ClubCard;

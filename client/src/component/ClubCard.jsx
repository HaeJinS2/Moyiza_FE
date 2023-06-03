import React from "react";
import { useNavigate } from "react-router-dom";

function ClubCard({
  tag,
  title,
  content,
  thumbnail,
  id,
  maxGroupSize,
  nowMemberCount,
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/detail/${id}`)}
      className="cursor-pointer flex w-full border-[1px] h-[260px] items-center justify-center px-2"
    >
      <div className="aspect-square flex w-full h-full items-center relative overflow-hidden rounded-xl">
        <img
          className="rounded-md w-[219px] h-[219px]"
          src={thumbnail}
          alt="clubThumbnail"
        />
      </div>
      <div className="flex flex-col gap-4 w-full h-full pl-4 pr-2 py-6">
        <div className="flex justify-between text-xs text-orange-400">
          <div className="flex gap-2">
            {tag.map((tag) => {
              return (
                <div className="rounded-full border-2 px-2 py-1 border-orange-400">
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex h-full justify-between flex-col">
          <div>
            <div className="border-b-[1.5px] border-black w-full text-xl font-bold">{title}</div>
            <div className="text-sm">{content}</div>
          </div>
          <div className=" text-neutral-400 text-sm">
            {nowMemberCount} / {maxGroupSize}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubCard;

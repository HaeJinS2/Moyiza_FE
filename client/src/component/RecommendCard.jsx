import React from "react";
import { useNavigate } from "react-router-dom";

function RecommendCard({
  thumbnail,
  title,
  content,
  nowMemberCount,
  maxGroupSize,
  tag,
  page,
  id
}) {
  const navigate = useNavigate()
  return (
    <>
      {page === "club" ? (
        <div 
        onClick={() => navigate(`/club/${id}`)}
        className="relative flex flex-col justify-center cursor-pointer">
          <div className="absolute z-10 top-3 left-10 flex justify-between text-xs rounded-2xl  text-white">
            <div className="flex gap-2 ">
              {tag.map((tag) => {
                return (
                  <div className="rounded-full bg-orange-400 px-2 py-1 ">
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" flex-col flex items-center justify-centeroverflow-hidden rounded-xl">
            <img
              className="aspect-square rounded-2xl w-[219px] h-[219px] object-cover"
              src={thumbnail ? thumbnail : `${process.env.PUBLIC_URL}/images/favicon.png`}
              alt="clubThumbnail"
            />

            <div className="w-[219px] text-[1rem] font-semibold">{title.length >= 12 ? title.slice(0,17) + "..." : title}</div>
            <div className="w-[219px] text-sm">
              {content.length >= 18 ? content.slice(0, 18) + "..." : content}
            </div>
            <div className="w-[219px] text-neutral-400 text-sm">
              {nowMemberCount} / {maxGroupSize}
            </div>
          </div>
        </div>
      ) : (
        <div 
        onClick={()=> navigate(`/oneday/${id}`)}
        className="relative flex flex-col justify-center cursor-pointer">
          <div className="absolute z-10 top-3 left-10 flex justify-between text-xs rounded-2xl  text-white">
            <div className="flex gap-2">
              {tag?.map((tag) => {
                return (
                  <div className="rounded-full px-2 py-1 bg-[#0BB159]">
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" flex-col flex items-center justify-centeroverflow-hidden rounded-xl">
            <img
              className="rounded-2xl w-[219px] h-[219px] aspect-square object-cover "
              src={thumbnail ? thumbnail : `${process.env.PUBLIC_URL}/images/favicon.png`}
              alt="clubThumbnail"
            />

            <div className="w-[219px] text-xl font-semibold">{title.length >= 12 ? title.slice(0,17) + "..." : title}</div>
            <div className="w-[219px] text-sm">{content.length >= 18 ? content.slice(0, 18) + "..." : content}</div>
            <div className="w-[219px] text-neutral-400 text-sm">
              {nowMemberCount} / {maxGroupSize}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecommendCard;

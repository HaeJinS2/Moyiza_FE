import React from "react";

function RecommendCard({
  thumbnail,
  title,
  content,
  nowMemberCount,
  maxGroupSize,
  tag,
  page
}) {
  return (
    <>
     {page === 'club'?(<div className="relative flex flex-col justify-center">
        <div className="absolute z-10 top-3 left-6 flex justify-between text-xs text-orange-400">
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
        <div className="aspect-square flex-col flex w-full h-full items-center justify-center relative overflow-hidden rounded-xl">
          <img
            className="rounded-md w-[219px] h-[219px] object-cover"
            src={thumbnail}
            alt="clubThumbnail"
          />

          <div className="w-[219px] text-xl font-bold">{title}</div>
          <div className="w-[219px] text-sm">{content}</div>
          <div className="w-[219px] text-neutral-400 text-sm">
            {nowMemberCount} / {maxGroupSize}
          </div>
        </div>
      </div>) :(<div className="relative flex flex-col justify-center">
        <div className="absolute z-10 top-3 left-6 flex justify-between text-xs text-green-400">
          <div className="flex gap-2">
            {tag?.map((tag) => {
              return (
                <div className="rounded-full border-2 px-2 py-1 border-green-400">
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
        <div className="aspect-square flex-col flex w-full h-full items-center justify-center relative overflow-hidden rounded-xl">
          <img
            className="rounded-md w-[219px] h-[219px] object-cover"
            src={thumbnail}
            alt="clubThumbnail"
          />

          <div className="w-[219px] text-xl font-bold">{title}</div>
          <div className="w-[219px] text-sm">{content}</div>
          <div className="w-[219px] text-neutral-400 text-sm">
            {nowMemberCount} / {maxGroupSize}
          </div>
        </div>
      </div>)} 
    </>
  );
}

export default RecommendCard;

import React from "react";

function ClubEventCard({ category, title, content, thumbnail, id, maxGroupSize }) {
  return (
    <div
      className="cursor-pointer flex w-full h-[261px] px-2 shadow-md justify-center"
    >
      <div className="flex justify-around items-center">
        <div className="flex flex-col w-full h-[261px] items-center justify-center relative ">
          <div>금요일</div>
          <div className="text-5xl absolute top-32">28</div>
          <img
            className="rounded-md bg-cover"
            src={`${process.env.PUBLIC_URL}/images/calender.svg`}
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

export default ClubEventCard;

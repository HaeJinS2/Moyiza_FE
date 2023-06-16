import React from "react";

function ClubReviewCard() {
  return (
    <div className="cursor-pointer flex w-[340.6px] h-[114.89px] px-4 border-2 items-center justify-between rounded-[10px]">
      <div className="w-[81.48px] h-[81.48px] bg-slate-500 rounded-[10px] mr-4">
        
      </div>
        <div className="flex justify-between flex-col w-[205px] h-full py-4">
          <div className="flex justify-between">
            <div className="text-[1rem] font-semibold">제목</div>
            <div className="text-[0.875rem] text-[#747474]">일시</div>
          </div>
          <div className="flex justify-between">
            <div className="text-[0.875rem] text-[#747474]">좋아요</div>
            <div className="text-[0.875rem] text-[#747474]">닉네임</div>
          </div>
      </div>
    </div>
  );
}

export default ClubReviewCard;

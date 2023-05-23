import React from "react";

function ClubCard() {
  return (
    <div className="flex w-[588px] h-[261px] bg-slate-400">
      <div className="flex justify-around items-center">
        <div className="w-[240.5px] h-[218.5px] bg-blue-400"></div>
      </div>
      <div className="w-full px-2 py-5">
        <div className="flex justify-between">
          <div>태그</div>
          <div>인원</div>
        </div>
        <div>클럽 이름</div>
        <div>클럽 설명</div>
      </div>
    </div>
  );
}

export default ClubCard;

import React from "react";

function RecentClub() {
  return (
    <>
      <div className="flex flex-col justify-end">
        <div className="flex flex-col flex-wrap w-40">최근 본 클럽</div>
        <div className="flex flex-col">
          <div className="w-full h-40">클럽 이미지</div>
          <div>클럽 제목</div>
        </div>
      </div>
    </>
  );
}

export default RecentClub;

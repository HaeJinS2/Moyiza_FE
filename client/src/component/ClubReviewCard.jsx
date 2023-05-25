import React from "react";
import { useNavigate } from "react-router-dom";

function ClubReviewCard({
  category,
  title,
  content,
  thumbnail,
  id,
  maxGroupSize,
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/detail/${id}`)}
      className="cursor-pointer flex w-full h-[261px] px-2 shadow-md justify-center flex-col"
    >
      <div className="flex flex-row justify-between">
        <div className="flex">
          <div className="w-[60px] h-[60px] bg-blue-400">프로필</div>
          <div>닉네임</div>
        </div>
        <div>게시 날짜</div>
      </div>
      <div className="w-full h-2/4">후기 내용</div>
    </div>
  );
}

export default ClubReviewCard;

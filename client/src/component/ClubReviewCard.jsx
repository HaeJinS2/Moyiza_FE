import React from "react";
import { useNavigate } from "react-router-dom";

function ClubReviewCard({ isOwner, onEdit, eventReview }) {
  console.log("eventReview",eventReview)
  const navigate = useNavigate();
  return (
    <>
      <div 
      onClick={()=>navigate(`/detailreview`,{state: {id: eventReview.reviewId}})}
      className="cursor-pointer flex w-[340.6px] h-[114.89px] px-4 border-2 items-center justify-between rounded-[10px] relative">
        <div className="w-[81.48px] h-[81.48px] bg-slate-500 rounded-[10px] mr-4"></div>
        <div className="flex justify-between flex-col w-[205px] h-full py-4">
          <div className="flex justify-between">
            <div className="text-[1rem] font-semibold">{eventReview.title}</div>
            <div className="text-[0.875rem] text-[#747474]">{eventReview.createdAt.split('T')[0]}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-[0.875rem] text-[#747474]">{eventReview.numLikes}</div>
            <div className="text-[0.875rem] text-[#747474]">{eventReview.writerNickname}</div>
          </div>
        </div>
        {isOwner && onEdit && (
        <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="absolute top-10 right-[-35px]"
        >
          <img
          alt='remove_review'
            src={`${process.env.PUBLIC_URL}/images/detail/review_remove.svg`}
          />
        </div>
      )}
      </div>

    </>
  );
}

export default ClubReviewCard;

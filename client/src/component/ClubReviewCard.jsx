import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteAPI } from "../axios";
import swal from "sweetalert";

function ClubReviewCard({ isOwner, onEdit, eventReview }) {
  console.log("eventReview", eventReview)
  const navigate = useNavigate();

  const deleteReviewBtn = (event, id) => {
    event.stopPropagation()
    deleteAPI(`/review/${id}`, {}).then((res) => {
      swal("삭제완료!")
    }).catch((err) => {
      console.log(err)
    })
  }
  
  return (


    <>
      <div
        onClick={() => navigate(`/detailreview`, { state: { id: eventReview.reviewId } })}
        className="cursor-pointer flex w-[340.6px] h-[114.89px] px-4 border-2 items-center justify-between rounded-[10px] relative">
        <div className="w-[81.48px] h-[81.48px] bg-slate-500 rounded-[10px] mr-4">
          <img
          className="rounded-[10px]"
          src={eventReview?.imageList[0]}
          alt="reviewImg"
          />

        </div>
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
            onClick={(e) => deleteReviewBtn(e, eventReview.reviewId)}
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

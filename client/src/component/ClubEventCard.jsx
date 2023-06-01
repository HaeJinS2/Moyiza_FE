import React, { useState } from "react";
import DetailEvent from "../pages/DetailEvent";

function ClubEventCard({
  title,
  handleJoinEvent,
  content,
  size,
  attendantsNum,
  clubId,
  eventId,
  startTime,
  location,
}) {
  const dateObj = new Date(startTime);
  const [modalIsOpen, setIsOpen] = useState(false);
  const dayArr = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const monthArr = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const handleDetailClubButton = () => {
    setIsOpen(true);
  };

  console.log(clubId, eventId);
  return (
    <div className="flex">
      <div
        onClick={handleDetailClubButton}
        className="cursor-pointer flex w-full h-auto px-2 shadow-md justify-center "
      >
        <div className="flex justify-around items-center">
          <div className="flex flex-col w-full h-auto items-center justify-center relative pt-4 ">
            <div className="absolute top-[20px] ">
              {dayArr[dateObj.getDay()]}
            </div>
            <div className="text-sm absolute top-[92px]">
              {monthArr[dateObj.getMonth()]}
            </div>

            <div className="text-5xl absolute top-[120px]">
              {dateObj.getDate()}
            </div>
            <img
              className="bg-cover"
              src={`${process.env.PUBLIC_URL}/images/calender.svg`}
              alt="clubThumbnail"
            />
            <div className="flex flex-col w-full justify-center">
              <div>{title}</div>
              <div>1/{size}</div>
            </div>
          </div>
        </div>
      </div>
      <DetailEvent handleJoinEvent={handleJoinEvent} clubId={clubId} eventId={eventId} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default ClubEventCard;

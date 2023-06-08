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
  handleLeaveEvent,
  image,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleDetailClubButton = () => {
    setIsOpen(true);
  };

  console.log(clubId, eventId);
  return (
    <div className="flex">
      <div
        onClick={handleDetailClubButton}
        className="cursor-pointer w-[260px] h-[340px] flex flex-col  px-2 shadow-md justify-center "
      >
        {/* <div className="flex justify-around items-center"> */}
        <div className="aspect-square flex w-full h-auto items-center justify-center relative overflow-hidden rounded-xl">
          <img
            className="rounded-md w-[219px] h-[219px]"
            src={image}
            alt="clubThumbnail"
          />
        </div>
        <div className="pl-3">타이틀</div>
        <div className="flex justify-around gap-10">
          <div>8명</div>
          <div>날짜</div>
          <div>장소</div>
        </div>
      </div>
      <DetailEvent
        image={image}
        handleLeaveEvent={handleLeaveEvent}
        handleJoinEvent={handleJoinEvent}
        clubId={clubId}
        eventId={eventId}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

export default ClubEventCard;

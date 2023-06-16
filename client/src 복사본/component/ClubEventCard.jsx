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
  const month = startTime.split("T")[0].split("-")[1];
  const date = startTime.split("T")[0].split("-")[2];
  console.log(month, date);
  console.log(clubId, eventId);
  return (
    <div className="flex">
      <div
        onClick={handleDetailClubButton}
        className="cursor-pointer w-[260px] h-[340px] flex flex-col  px-2 border-[1px] rounded-2xl justify-center "
      >
        {/* <div className="flex justify-around items-center"> */}
        <div className="aspect-square flex w-full h-auto items-center justify-center relative overflow-hidden rounded-xl">
          <img
            className="rounded-2xl w-[219px] h-[219px]"
            src={image}
            alt="clubThumbnail"
          />
        </div>
        <div className="pl-3 py-2">{title}</div>
        <div className="flex justify-around gap-1 text-sm items-center">
          <div className="flex items-center">
            <img
              src={`${process.env.PUBLIC_URL}/images/club/club_people.png`}
              alt="club_people"
            />
            {attendantsNum}/{size}
          </div>
          <div className="flex items-center">
            <img
              src={`${process.env.PUBLIC_URL}/images/club/club_calender.png`}
              alt="club_calender"
            />
            {month}월 {date}일
          </div>
          <div className="flex items-center">
            <img
              src={`${process.env.PUBLIC_URL}/images/club/club_location.png`}
              alt="club_location"
            />
            {location.split(" ")[0] === "서울"
              ? location.split(" ")[1]
              : location.split(" ")[0]}
          </div>
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

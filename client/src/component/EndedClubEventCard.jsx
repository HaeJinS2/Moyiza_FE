import React, { useState } from "react";
import DetailEvent from "../pages/DetailEvent";

function EndedClubEventCard({
  title,
  handleJoinEvent,
  content,
  size,
  attendantsNum,
  clubId,
  eventId,
  startTime,
  location,
  image,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleDetailClubButton = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div
        onClick={handleDetailClubButton}
        className="flex items-center justify-center w-[350px] h-[96px] border-[1px] gap-x-2 rounded-2xl"
      >
        <div className="w-[60px] h-[60px] flex justify-center">
          <img 
          className="rounded-2xl"
          src={image} alt="event_image" />
        </div>
        <div className="flex justify-center w-[255px] flex-col gap-3">
          <div>{title}</div>
          <div className="flex w-full justify-between">
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
              <span className="flex items-center">
                {startTime.split("T")[0].split("-")[1]}월
                {startTime.split("T")[0].split("-")[2]}일
              </span>
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
      </div>
        <DetailEvent
        image={image}
        clubId={clubId}
        eventId={eventId}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}

export default EndedClubEventCard;

import React from "react";

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
  return (
    <>
      <div className="flex items-center w-[360px] h-[96px] shadow-cms rounded-xl">
        <div className="w-[60px] h-[60px] flex justify-center">
          <img src={image} alt="event_image" />
        </div>
        <div className="flex justify-center w-[300px] flex-col gap-3 px-2">
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
              {startTime.split("T")[0]}
            </div>
            <div className="flex items-center">
              <img
                src={`${process.env.PUBLIC_URL}/images/club/club_location.png`}
                alt="club_location"
              />
              {location}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EndedClubEventCard;

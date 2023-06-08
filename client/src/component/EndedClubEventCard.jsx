import React from 'react'

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
  image
}) {
  return (
    <>
    <div className='flex items-center w-[360px] h-[96px] shadow-cms rounded-xl'>
      <div className='w-[60px] h-[60px] flex justify-center'>
        <img src={image} alt='event_image'/>
      </div>
      <div className='flex justify-center w-[300px] flex-col gap-3 px-2'>
        <div>{title}</div>
        <div className='flex w-full justify-between'>
          <div>{attendantsNum}/{size}</div>
          <div>{startTime.split("T")[0]}</div>
          <div>{location}</div>

        </div>
      </div>
    </div>
    </>
  )
}

export default EndedClubEventCard
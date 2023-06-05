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
}) {
  return (
    <>
    <div className='flex items-center w-[360px] h-[96px]'>
      <div className='w-[60px] h-[60px] bg-black'>이미지</div>
      <div className='flex justify-center w-[300px] flex-col gap-3 px-2'>
        <div>타이틀</div>
        <div className='flex w-full justify-between'>
          <div>8명</div>
          <div>날짜</div>
          <div>장소</div>

        </div>
      </div>
    </div>
    </>
  )
}

export default EndedClubEventCard
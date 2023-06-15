import React from 'react'

function WriteReview() {
    return (
        <div>
            <div className='flex flex-col justify-center items-center  h-[100vh]'>
                <div className='flex flex-col gap-y-3'>
                    <div className='flex flex-col items-center justify-center  gap-y-3'>
                        <div
                            className='text-[29px] font-semibold text-[#FF7F1D]'
                        >제목</div>
                        <input
                            type="text"
                            maxLength={30}
                            placeholder='제목(30자)'
                            className='border-[1px] rounded-[20px] w-[812px] h-[52px] p-4' />
                        <textarea
                            placeholder='내용'
                            className='border-[1px] rounded-[20px] w-[812px] h-[192px] p-4' />
                    </div>
                    <div className='flex gap-x-3'>
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className='w-[56px] h-[56px] bg-[#E8E8E8] rounded-2xl flex items-center justify-center'
                            >
                                <img
                                    className='w-[20px] h-[18.5px]'
                                    src={`${process.env.PUBLIC_URL}/images/camera.png`}
                                    alt='camera'
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button className='bg-[#FF7700] w-[200px] h-[60px] rounded-[60px] text-white text-[24px]'>완료</button>
            </div>
        </div>
    )
}

export default WriteReview
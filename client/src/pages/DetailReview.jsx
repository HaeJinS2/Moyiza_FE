import React, { useEffect, useState } from 'react'
import { getAPI } from '../axios'

function DetailReview() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAPI(`/review/15`).then((res) => {
            setData(res.data)
            console.log("res.data", res.data)
        }).catch((err) => {
            console.log(err)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='flex flex-col h-[100vh] items-center justify-center gap-y-4'>
            <div className='text-[20px] font-semibold'>
                {data?.title}
            </div>
            <div className='flex flex-col items-center justify-center w-[545px] h-[718px] border-[1px] gap-y-4 rounded-2xl bg-white'>
                <div className='w-[449px] h-[277px] bg-[#747474] rounded-2xl'>
                    {data?.imageList?.map((item) => {
                        return (
                            <img
                                className='object-fill aspect-square w-[449px] h-[277px]'
                                src={item}
                                alt="reviewImg"
                            />
                        )
                    })}

                </div>
                <div className='flex justify-between w-[449px]'>
                    <div className='flex items-center gap-x-4'>
                        <div className='w-[68px] h-[68px] bg-[#747474] rounded-full'>
                            <img
                                className='w-[68px] h-[68px] rounded-full'
                                src={data?.writerProfileUrl}
                                alt="profileImg"
                            />
                        </div>
                        <div>{data?.writerNickname}</div>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <div>
                            이모티콘
                        </div>
                        <div>
                            {data?.numLikes}
                        </div>
                    </div>
                </div>
                <div className='w-[449px] h-[250px]'>
                    {data.textContent}
                </div>
            </div>
        </div>
    )
}

export default DetailReview
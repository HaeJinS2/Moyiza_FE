import React, { useEffect, useState } from 'react'
import { getAPI, deleteAPI, postAPI } from '../axios'
import { AnimatePresence, motion } from "framer-motion";
import { HeartCheckbox } from '../component/HeartCheckBox';
// import swal from 'sweetalert';
import { useLocation } from 'react-router-dom';

function DetailReview() {
    const { state } = useLocation();
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState(false);
    const [progressEventPage, setProgressEventPage] = useState(0);
    const [progressTuple, setProgressTuple] = useState([null, progressEventPage]);
    if (progressTuple[1] !== progressEventPage) {
        setProgressTuple([progressTuple[1], progressEventPage]);
    }
    let progressPrev = progressTuple[0];
    let progressDirection = progressEventPage > progressPrev ? 1 : -1;


    useEffect(() => {
        getAPI(`/review/${state.id}`).then((res) => {
            setData(res.data)
        }).catch((err) => {
            console.log(err)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const likedReviewBtn = (e) => {
        if (!checked) {
            postAPI(`/review/${state.id}/like`, {}).then((res) => {
                // swal("포스트!")
                setChecked(e);
                getAPI(`/review/${state.id}`).then((res) => {
                    setData(res.data)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => console.log(err))
        } else {
            deleteAPI(`/review/${state.id}/like`, {}).then((res) => {
                // swal("딜리트!")
                setChecked(e);
                getAPI(`/review/${state.id}`).then((res) => {
                    setData(res.data)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => console.log(err))
        }
    }

    // const deleteReviewBtn = () => {
    //     deleteAPI(`/review/${state.id}`, {}).then((res) => {
    //         swal("삭제완료!")
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }

    useEffect(() => {
        setChecked(data.isLikedByUser)
    }, [data.isLikedByUser])

    return (
        <div className='flex flex-col h-[100vh] items-center justify-center gap-y-4 '>
            <div className='text-[20px] font-semibold'>
                {data?.title}
            </div>
            <div className='flex flex-col items-center justify-center w-[545px] h-[718px] border-[1px] gap-y-4 rounded-2xl bg-white '>

                {/* <div className='w-[449px] h-[277px] bg-[#747474] rounded-2xl'>
                    {data?.imageList?.map((item) => {
                        return (
                            <img
                                className='object-fill aspect-square w-[449px] h-[277px]'
                                src={item}
                                alt="reviewImg"
                            />
                        )
                    })}

                </div> */}

                <div className="flex justify-center w-full h-[277px] text-black items-center overflow-hidden relative">

                    <AnimatePresence custom={progressDirection}>
                        <motion.div
                            key={progressEventPage}
                            variants={varients}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={progressDirection}
                            transition={{ duration: 0.5 }}
                            className={`h-[200px] absolute top-0 right-0 flex z-10 justify-center items-center w-full `}
                        >
                            {data?.imageList?.slice(progressEventPage * 1, progressEventPage * 1 + 1).map((item) => {
                                return (
                                    <img
                                        className='object-fill aspect-square w-[449px] h-[277px] bg-[#747474] rounded-2xl relative top-9'
                                        src={item}
                                        alt="reviewImg"
                                    />
                                )
                            })}
                        </motion.div>
                    </AnimatePresence>

                    <button
                        className='absolute left-12 top-[100px] z-10'
                        onClick={() => setProgressEventPage(progressEventPage === 0 ? data.imageList.length - 1 : progressEventPage - 1)}
                    >
                        <img
                            className='opacity-80'
                            alt="prev_button"
                            src={`${process.env.PUBLIC_URL}/images/prev_button.svg`}
                        />
                    </button>

                    <button
                        className='absolute right-12 top-[100px] z-10'
                        onClick={() => setProgressEventPage(progressEventPage === data.imageList.length - 1 ? 0 : progressEventPage + 1)}
                    >
                        <img
                            className='opacity-80'
                            alt="next_button"
                            src={`${process.env.PUBLIC_URL}/images/next_button.svg`}
                        />
                    </button>
                </div>

                <div>



                </div>
                <div className='flex flex-col gap-y-8'>
                    <div className='flex flex-col w-[449px]'>
                        <div className='flex justify-between '>
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
                            <div className='flex items-center'>
                                <div>
                                    <HeartCheckbox
                                        likeBtn={likedReviewBtn}
                                        checked={checked}
                                        setChecked={setChecked}
                                    />
                                </div>
                                <div className='w-[10px]'>
                                    {data?.numLikes}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='w-[449px] h-[200px]'>
                            {data.textContent}
                        </div>
                    </div>
                    <div>
                        {/* <button onClick={deleteReviewBtn}>삭제버튼</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
let varients = {
    enter: (direction) => ({ x: direction * 700 }),
    center: { x: 0 },
    exit: (direction) => ({ x: direction * -700 }),
};

export default DetailReview
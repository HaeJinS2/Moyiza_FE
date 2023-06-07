import React, { useEffect } from 'react'
import { useState } from 'react';
import Modal from "react-modal";
import useCurrentLocation from '../hooks/useCurrentLocation';
import { getAPI } from '../axios';
import { useRecoilValue} from "recoil";
import { userNicknameState } from "../states/userStateTmp";
function NearbyEvents() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [dataLat, setDataLat] = useState([]);
    const [dataLng, setDataLng] = useState([]);
    // const [distances, setDistances] = useState([]);
    const nicknameState = useRecoilValue(userNicknameState);

    console.log(data)
    console.log("받은 위치", dataLat, dataLng)
    const geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 1000 * 60 * 1,
        maximumAge: 1000 * 3600 * 24,
    };
    const { getLocation, location } = useCurrentLocation(geolocationOptions);

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    const latlng = () => {
        // getAPI(`/oneday/recommend?lat=37.574187&lon=126.976882`)
        getAPI(`/oneday/recommend?lat=${location?.latitude}&lon=${location?.longitude}`)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    const handleButtonClick = () => {
        setLoading(true);
        getLocation();
        openModal();
    };

    useEffect(() => {
        setLoading(true);
        getLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (location) {
            setLoading(true);
            latlng();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    useEffect(() => {
        if (data) {
            const latitudes = data.map((item) => item.oneDayLatitude);
            const longitudes = data.map((item) => item.oneDayLongitude);
            setDataLat(latitudes);
            setDataLng(longitudes);
        }
    }, [data]);

    function formatDate(dateTimeString) {
        const dateObj = new Date(dateTimeString);
        const formattedDate = dateObj.toLocaleDateString('ko-KR', {
        //   year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
        //   minute: 'numeric',
          hour12: true,
        });
        
        return formattedDate;
      }
      

    return (
        <div>
            <button
                onClick={() => handleButtonClick()}
            >내위치기반원데이추천</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Create Club Modal"
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                        zIndex: 1000,
                    },
                    content: {
                        color: "#000000",
                        background: "#08B159",
                        width: "642px",
                        maxHeight: "815px",
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "20px",
                        // gap: "10px",
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                    },
                }}
            >
                <div>
                    {loading ? "Loading..." :
                        location ? (
                            <>
                                <div>
                                    {/* {location.latitude} {location.longitude} */}
                                </div>
                                {data.map((d) => {
                                    const formattedDate = formatDate(d.oneDay.oneDayStartTime);
                                    return (
                                        <div className='overflow-auto h-[815px] w-[642px] py-6 flex justify-center items-center '>
                                            <div className='flex flex-col justify-center items-center gap-y-4'>
                                                <div className='text-white font-semibold text-[30px] flex flex-col items-center '>
                                                    <span>{nicknameState.userNickname}님 근처에</span>
                                                    <span>모임이 진행되고있어요!</span>
                                                </div>
                                                <div className='w-[470px] h-[25px] flex justify-end text-white'>
                                                    <span>총 {data.length}개</span>
                                                </div>
                                                <div className='w-[470px] h-[114px] bg-white rounded-[20px] gap-x-4 flex justify-center items-center'>
                                                    <div className='w-[80px] h-[80px] bg-[#797979] rounded-[20px]'>
                                                        <img src={d?.oneDay?.oneDayImage} alt="onedayImg">
                                                        </img>
                                                    </div>
                                                    <div className='w-[330px] h-[80px] flex flex-col justify-between items-center'>
                                                        <div className='w-full h-[25px]   flex justify-between'>
                                                            <span className='text-[24px]'>
                                                            {d?.oneDay?.oneDayTitle}
                                                            </span>
                                                            <div className='px-2 w-auto border border-[#08B159] rounded-[20px] bg-white text-[#08B159]'>
                                                            {d.oneDay.category}
                                                            </div>
                                                        </div>
                                                        <div className='w-full h-[25px] flex justify-between text-[19px] text-[#A4A4A4]'>
                                                            <div>{formattedDate}</div>
                                                            <div>{d.oneDay.attendantsNum}/{d.oneDay.oneDayGroupSize}</div>
                                                            <div>{(d.distance * 1000).toFixed(1)}M</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* 제목: {d?.oneDay?.oneDayTitle}
                                                내용: {d.oneDay.oneDayContent}
                                                카테고리: {d.oneDay.category}
                                                그룹사이즈: {d.oneDay.size}
                                                이미지: 이미지~
                                                주소: 주소~
                                                시작일: {d.oneDay.oneDayStartTime}
                                                거리: {(d.distance * 1000).toFixed(1)}M */}
                                                {/* <div className='w-[470px] h-[114px] bg-white rounded-[20px] gap-x-4 flex justify-center items-center'>
                                                    <div className='w-[80px] h-[80px] bg-[#797979] rounded-[20px]'></div>
                                                    <div className='w-[330px] h-[80px] flex flex-col justify-between items-center'>
                                                        <div className='w-full h-[25px]   flex justify-between'>
                                                            <span className='text-[24px]'>
                                                                러닝 할 사람
                                                            </span>
                                                            <div>
                                                                운동
                                                            </div>
                                                        </div>
                                                        <div className='w-full h-[25px] flex justify-between text-[19px] text-[#A4A4A4]'>
                                                            <div>1</div>
                                                            <div>2</div>
                                                            <div>3</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-[470px] h-[114px] bg-white rounded-[20px] gap-x-4 flex justify-center items-center'>
                                                    <div className='w-[80px] h-[80px] bg-[#797979] rounded-[20px]'></div>
                                                    <div className='w-[330px] h-[80px] flex flex-col justify-between items-center'>
                                                        <div className='w-full h-[25px]   flex justify-between'>
                                                            <span className='text-[24px]'>
                                                                러닝 할 사람
                                                            </span>
                                                            <div>
                                                                운동
                                                            </div>
                                                        </div>
                                                        <div className='w-full h-[25px] flex justify-between text-[19px] text-[#A4A4A4]'>
                                                            <div>1</div>
                                                            <div>2</div>
                                                            <div>3</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-[470px] h-[114px] bg-white rounded-[20px] gap-x-4 flex justify-center items-center'>
                                                    <div className='w-[80px] h-[80px] bg-[#797979] rounded-[20px]'></div>
                                                    <div className='w-[330px] h-[80px] flex flex-col justify-between items-center'>
                                                        <div className='w-full h-[25px]   flex justify-between'>
                                                            <span className='text-[24px]'>
                                                                러닝 할 사람
                                                            </span>
                                                            <div>
                                                                운동
                                                            </div>
                                                        </div>
                                                        <div className='w-full h-[25px] flex justify-between text-[19px] text-[#A4A4A4]'>
                                                            <div>1</div>
                                                            <div>2</div>
                                                            <div>3</div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                <button 
                                                onClick={closeModal}
                                                className='flex justify-center items-center w-[50px] h-[50px] bg-white shadow-cms rounded-full'>X</button>

                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )
                            : ''}
                </div>
            </Modal>
        </div>
    )
}

export default NearbyEvents
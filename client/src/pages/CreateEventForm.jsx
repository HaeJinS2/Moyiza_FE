import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { getHeaderAPI } from "../axios";
import DatePicker from 'react-datepicker';
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "../component/Navbar";
// import { useNavigate } from "react-router-dom";
import { FiCalendar } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { textVariant } from "../utils/motion";
import { format } from 'date-fns'
import imageCompression from 'browser-image-compression';
import { filePostAPI } from '../axios';

function CreateEvent() {
    // const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const [location, setLocation] = useState('');

    // const initialDate = new Date();
    // const [startDate, setStartDate] = useState(initialDate);
    // const [dateString, setDateString] = useState(initialDate.toISOString().split('T')[0]);
    // const [time, setTime] = useState(null);
    // const [timeString, setTimeString] = useState('');

    const [dateTime, setDateTime] = useState(null);
    const [dateTimeString, setDateTimeString] = useState('');
    const [eventGroupsize, setEventGroupSize] = useState('');
    const [inputValue, setInputValue] = useState("");
    const [map, setMap] = useState(null);

    const [userLat, setUserLat] = useState(null);
    const [userLng, setUserLng] = useState(null);

    const [userAddress, setUserAddress] = useState("");
    const [marker, setMarker] = useState(null);
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState('');
    const [preview, setPreview] = useState(null);

    // console.log(startDate, dateString)
    const { id } = useParams();


    useEffect(() => {
    }, [userLat, userLng, userAddress])

    useEffect(() => {
        if (map && inputValue) {
            let url = `https://dapi.kakao.com/v2/local/search/address.json?query=${inputValue}`;
            getHeaderAPI(url, {
                headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MAPS_API_KEY_REST}` },
            })
                .then((response) => {
                    let address = response.data.documents[0];
                    let lat = address.y;
                    let lng = address.x;

                    let moveLatLon = new window.kakao.maps.LatLng(lat, lng);
                    map.setCenter(moveLatLon);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [inputValue, map]);


    useEffect(() => {

        initializeMap();
    }
        , [])
    //     if (modalIsOpen) {
    //         const delay = setTimeout(initializeMap, 100);
    //         return () => clearTimeout(delay);
    //     }
    // }, [modalIsOpen]);

    useEffect(() => {
        if (map) {
            const handleMapClick = (mouseEvent) => {
                let latlng = mouseEvent.latLng;
                let lat = latlng.getLat();
                let lng = latlng.getLng();

                // 이전 마커가 있다면 제거
                if (marker) {
                    marker.setMap(null);
                }

                // 클릭한 위치에 마커 생성
                let newMarker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(lat, lng)
                });

                // 마커를 지도에 표시
                newMarker.setMap(map);

                // 마커 상태 업데이트
                setMarker(newMarker);

                // 위도 경도 상태 업데이트
                setUserLat(lat);
                setUserLng(lng);

                let url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`;
                getHeaderAPI(url, {
                    headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MAPS_API_KEY_REST}` },
                })
                    .then((response) => {
                        let address = response.data.documents[0].address;
                        setUserAddress(address.address_name);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            };

            window.kakao.maps.event.addListener(map, "click", handleMapClick);

            return () => {
                window.kakao.maps.event.removeListener(map, "click", handleMapClick);
            };
        }
    }, [map, marker]);

    const initializeMap = () => {
        if (window.kakao && window.kakao.maps) {
            let mapContainer = document.getElementById("map");
            let mapOption = {
                center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                level: 3,
            };

            let mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);
            setMap(mapInstance);
        }
    }
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCreateButton = () => {
        const data = { eventTitle: title, eventContent: content, eventLocation: userAddress, eventLatitude: "" + userLat, eventLongitude: "" + userLng, eventStartTime: dateTimeString, eventGroupSize: Number(eventGroupsize) }
        const formData = new FormData();

        if (selectedFile) {
            formData.append("image", selectedFile);
        }
        const blob = new Blob([JSON.stringify(data)], {
            type: "application/json",
        });

        formData.append("data", blob);
        //   formData.append("data", data);

        filePostAPI(`/club/${id}/event`,
            // eventTitle: title, eventContent: content, eventLocation: userAddress, eventLatitude: "" + userLat, eventLongitude: "" + userLng, eventStartTime: dateTimeString, eventGroupSize: Number(eventGroupsize),
            formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            transformRequest: [
                function () {
                    return formData;
                },
            ],
        }).then((response) => {
            navigate(-1)
        }).catch((error) => {
            console.error(error)
        })
    }

    // const handleDateChange = (date) => {
    //     setStartDate(date);

    //     const dateString = date.toISOString().split('T')[0];
    //     setDateString(dateString);
    // };
    // console.log(dateString)

    // const handleTimeChange = (time) => {
    //     setTime(time);
    //     let hours = time.getHours();
    //     let minutes = time.getMinutes();
    //     let seconds = time.getSeconds();

    //     hours = hours < 10 ? '0' + hours : hours;
    //     minutes = minutes < 10 ? '0' + minutes : minutes;
    //     seconds = seconds < 10 ? '0' + seconds : seconds;

    //     const timeString = `${hours}:${minutes}:${seconds}`;
    //     setTimeString(timeString)
    //     console.log(timeString);
    // }
    const handleDateTimeChange = (date) => {
        setDateTime(date)
        const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm");
        setDateTimeString(formattedDate)
    };
    const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <button className="flex items-center justify-center  shadow-md w-80 h-12 rounded-lg mb-4 border-1" onClick={onClick} ref={ref}>
            <FiCalendar className="mr-2" />
            {value || '일시를 선택!'}
        </button>
    ));


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true
        };

        try {
            const resizingFile = await imageCompression(file, options);
            setSelectedFile(resizingFile);
            let reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result);
            }
            if (resizingFile) {
                reader.readAsDataURL(resizingFile);
            }

            event.preventDefault();
            const formData = new FormData();

            if (resizingFile) {
                formData.append("image", resizingFile);

            }

        } catch (error) {
            console.error('Error:', error);
        }
        // setSelectedFile(null);
    };

    // const CustomInput2 = React.forwardRef(({ value, onClick }, ref) => (
    //     <button className="flex items-center justify-center  shadow-md w-80 h-12 rounded-lg mb-4 border-1" onClick={onClick} ref={ref}>
    //         <FiCalendar className="mr-2" />
    //         {value || '시간을 선택!'}
    //     </button>
    // ));

    return (
        <>
            <Navbar />
            <div className='min-h-screen pt-[140px] flex flex-col items-center justify-center'>
                <motion.div
                    variants={textVariant(0.5)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.3 }}
                    className='flex flex-1 flex-col items-center justify-center  gap-y-[15px]'>
                    <div className='flex flex-1 flex-col items-center justify-center  gap-y-[15px] '>
                        <div className="flex justify-start items-center gap-x-2 w-full">
                            {preview && (
                                <img className="w-[70px] h-[70px]" src={preview} alt="preview" />
                            )}
                            <input
                                type="file"
                                id="fileInput"
                                onChange={handleFileChange}
                            />
                        </div>
                        <input
                            placeholder='title'
                            className='shadow-md w-80 h-12 rounded-lg mb-4 border-1' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input
                            placeholder='content'
                            className='shadow-md w-80 h-12 rounded-lg mb-4 border-1' value={content} onChange={(e) => setContent(e.target.value)} />
                        {/* <input 
                        placeholder='location'
                        className='shadow-md w-80 h-12 rounded-lg mb-4 border-1' value={location} onChange={(e) => setLocation(e.target.value)} /> */}
                        <GlobalStyle />
                        <div className='flex flex-col z-[999]'>
                            startDate
                            <StyledDatePicker
                                className="shadow-md"
                                dateFormat="yyyy'년'MM'월'dd'일' HH'시'mm'분'"
                                showIcon
                                minDate={new Date()}
                                selected={dateTime}
                                onChange={handleDateTimeChange}
                                customInput={<CustomInput />}
                                showTimeSelect
                            />
                            {/* <StyledDatePicker
                                className="shadow-md"
                                dateFormat="yyyy-MM-dd"
                                showIcon
                                selected={startDate}
                                onChange={handleDateChange}
                                customInput={<CustomInput />}
                            />
                            <DatePicker
                                className="border border-gray-300 p-2 rounded-md shadow-md bg-white"
                                selected={time}
                                showIcon
                                customInput={<CustomInput2 />}
                                onChange={handleTimeChange}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            /> */}
                        </div>

                        {/* <div className='relative w-10 h-10'>
    {time === null &&
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-99">
            시간을 선택해주세요.
        </div>} */}

                        {/* </div> */}
                        <input
                            placeholder='eventGroupSize'
                            className='shadow-md w-80 h-12 rounded-lg mb-4 border-1' value={eventGroupsize} onChange={(e) => setEventGroupSize(e.target.value)} />
                        <div className='flex flex-col gap-y-4  items-center justify-center '>
                            <input className='w-80 h-[50px] shadow-md'
                                placeholder='장소를 검색하세요 (예: xx동)'
                                type="text" onChange={handleInputChange} />
                            <div id="map" style={{ width: "500px", height: "400px" }}></div>
                        </div>
                        <button onClick={handleCreateButton}>이벤트생성하기버튼</button>
                    </div>
                </motion.div>
            </div>
        </>
    )
}



const StyledDatePicker = styled(DatePicker).attrs({
    calendarClassName: 'my-calendar'
})``;

const GlobalStyle = createGlobalStyle`
.my-calendar {
    background-color: #fff;
    
}
.react-datepicker {
    font-size: 1rem;
}
.react-datepicker__current-month {
    font-size: 1rem;
    color: #fff;
}
.react-datepicker__day {
    width: 2rem;
    line-height: 2rem;
    
}
.react-datepicker__day-name {
    width: 2rem;
    line-height: 2rem;
    color: #fff;
}
.react-datepicker__header {
    background-color: #FB7185;
    color: white;
}
.react-datepicker__day--selected {
    background-color: red;
}
`;


export default CreateEvent;
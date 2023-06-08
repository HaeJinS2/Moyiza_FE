import React, { useEffect, useState } from 'react'
import { getHeaderAPI } from "../axios";
import DatePicker from 'react-datepicker';
import styled, { createGlobalStyle } from "styled-components";
import { FiCalendar } from 'react-icons/fi';
import { format } from 'date-fns'
import imageCompression from 'browser-image-compression';
import { filePostAPI } from '../axios';
import Modal from "react-modal";

function CreateEventModal({ id, getClubEventLists }) {
    const [isOpen, setIsOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [dateTime, setDateTime] = useState(null);
    const [dateTimeString, setDateTimeString] = useState('');
    const [eventGroupsize, setEventGroupSize] = useState('');
    const [inputValue, setInputValue] = useState("");
    const [map, setMap] = useState(null);

    const [userLat, setUserLat] = useState(null);
    const [userLng, setUserLng] = useState(null);

    const [userAddress, setUserAddress] = useState("");
    const [marker, setMarker] = useState(null);

    const [selectedFile, setSelectedFile] = useState('');
    const [preview, setPreview] = useState(null);

    // console.log(startDate, dateString)
    // const { id } = useParams();


    useEffect(() => {
        console.log("userLat", userLat, "userLng", userLng, userAddress)
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
        if (isOpen) {
            initializeMap();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isOpen) {
            const delay = setTimeout(initializeMap, 100);
            return () => clearTimeout(delay);
        }
    }, [isOpen]);

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
                        console.log(response.data.documents[0])
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
        try {
            if (window.kakao && window.kakao.maps) {
                let mapContainer = document.getElementById("map");
                let mapOption = {
                    center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                    level: 3,
                };

                let mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);
                setMap(mapInstance);
            }
        } catch (error) {
            console.error(error);
        }
    };
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
            console.log(response)
            getClubEventLists();
            closeModal();
        }).catch((error) => {
            console.error(error)
        })
    }

    const handleDateTimeChange = (date) => {
        setDateTime(date)
        const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm");
        setDateTimeString(formattedDate)
        console.log(dateTimeString)
    };
    const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <button className="flex items-center text-[#979797]  w-[150px] h-[40px] px-2 rounded-lg text-[20px] bg-[#F1F1F1]" onClick={onClick} ref={ref}>
            <FiCalendar className="mr-2" />
            {value || '언제?'}
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
            console.log('Compressed file:', resizingFile);
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

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false);
        setTitle('');
        setContent('');
        setUserAddress('');
        setUserLat('');
        setUserLng('');
        setDateTimeString('');
        setEventGroupSize('');
    };
    return (
        <div>
            <button
                className="bg-orange-400 text-white flex justify-center items-center w-[63.42px] h-[60px] rounded-full text-5xl "
                onClick={openModal}>+</button>
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
                        background: "white",
                        width: "642px",
                        maxHeight: "900px",
                        minHeight: "815px",
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
                    <div className='overflow-auto h-[900px] w-[642px] py-6 flex flex-col justify-center items-center '>
                        <div className='flex flex-col items-center justify-center  gap-y-[15px] '>
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
                            <div className='flex flex-col gap-y-4 justify-center items-center'>
                                <div className='flex gap-x-2 justify-center items-center'>
                                    <span className='w-[83px]  text-[24px]'>이벤트명</span>
                                    <input
                                        placeholder='이벤트 이름이 뭔가요?'
                                        className='w-[405px] h-[40px] px-2 rounded-lg bg-[#F1F1F1] text-[20px]' value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className='flex w-[496px] justify-between items-center'>
                                    <div className='flex items-center  gap-x-2'>
                                        <GlobalStyle />
                                        <div className='flex items-center gap-x-1'>
                                            <img className='w-[14.68px] h-[14.68px]' src={`${process.env.PUBLIC_URL}/images/createEvent/date.png`} alt="createEventIcon" />
                                            <span className='w-[63.42px] text-[24px]'>일시</span>
                                        </div>
                                        <div className='flex z-[999] gap-x-2'>

                                            <StyledDatePicker
                                                className="shadow-md"
                                                dateFormat="MM'.'dd HH'시'"
                                                showIcon
                                                selected={dateTime}
                                                onChange={handleDateTimeChange}
                                                customInput={<CustomInput />}
                                                showTimeSelect
                                            />
                                        </div>
                                    </div>
                                    <div className='flex gap-x-2 items-center'>
                                        <div className='flex items-center gap-x-1'>
                                            <img className='w-[14.68px] h-[14.68px]' src={`${process.env.PUBLIC_URL}/images/createEvent/maxgroup.png`} alt="createEventIcon" />
                                            <span className='text-[24px]'>인원</span>
                                        </div>
                                        <input
                                            placeholder='몇명이서?'
                                            className='w-[150px] h-[40px] px-2 rounded-lg bg-[#F1F1F1] text-[20px]' value={eventGroupsize} onChange={(e) => setEventGroupSize(e.target.value)} />
                                    </div>

                                </div>
                                <div className='flex gap-x-2 items-center'>
                                    <div className='flex items-center gap-x-1'>
                                        <img className='w-[14.68px] h-[14.68px]' src={`${process.env.PUBLIC_URL}/images/createEvent/location.png`} alt="createEventIcon" />
                                        <span className='w-[63.42px] text-[24px]'> 장소 </span>
                                    </div>
                                    <input className='w-[405px] h-[40px] px-2 rounded-lg bg-[#F1F1F1] text-[20px]'
                                        placeholder='어디서 볼까요?'
                                        type="text" onChange={handleInputChange} />
                                </div>
                                <div className='flex gap-x-2 items-center'>
                                    <span className='w-[83px] z-50  text-[24px]'></span>
                                    <div className='w-[405px] h-[111px]'>
                                        <div id="map" style={{ width: "100%", height: "100%" }}></div>
                                    </div>
                                </div>
                                <div className='flex gap-x-2 items-start'>
                                    <div className='flex items-center gap-x-1'>
                                        <img className='w-[14.68px] h-[14.68px]' src={`${process.env.PUBLIC_URL}/images/createEvent/content.png`} alt="createEventIcon" />
                                        <span className='w-[63.42px] z-50 text-[24px]'>내용</span>
                                    </div>
                                    <input
                                        placeholder='이벤트 내용을 작성해주세요.'
                                        className='w-[405px] h-[234px] px-2 rounded-lg bg-[#F1F1F1] text-[20px]' value={content} onChange={(e) => setContent(e.target.value)} />
                                </div>
                                <div className='flex gap-x-4'>
                                    <button
                                        className='w-[308px] h-[60px] text-white bg-[#FF7700] rounded-[30px] text-[28px]'
                                        onClick={handleCreateButton}>이벤트 열기</button>
                                    <button
                                        onClick={closeModal}
                                        className='w-[177px] h-[60px] text-white rounded-[30px] bg-[#747474] text-[28px]'>
                                        닫기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
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


export default CreateEventModal
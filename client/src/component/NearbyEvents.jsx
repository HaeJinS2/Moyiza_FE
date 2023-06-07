import React, { useEffect } from 'react'
import { useState } from 'react';
import Modal from "react-modal";
import useCurrentLocation from '../hooks/useCurrentLocation';
import { getAPI } from '../axios';

function NearbyEvents() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [dataLat, setDataLat] = useState([]);
    const [dataLng, setDataLng] = useState([]);
    const [distances, setDistances] = useState([]);

    console.log(data)
    console.log("받은 위치", dataLat, dataLng)
    console.log("거리", distances)
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

    useEffect(() => {
        if (location?.latitude && location?.longitude) {
            const myLatitude = location.latitude
            const myLongitude = location.longitude

            const distances = []; // distances 배열 초기화

            for (let i = 0; i < dataLat.length; i++) {
                const distance = calculateDistance(myLatitude, myLongitude, dataLat[i], dataLng[i]);
                distances.push(distance);
            }

            // 거리 데이터를 상태로 업데이트
            setDistances(distances);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataLat, dataLng, location]);

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // 지구의 반지름 (단위: km)

        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance * 1000;
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
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
                        width: "550px",
                        height: "800px",
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        padding: "20px",
                        borderRadius: "10px",
                        gap: "10px",
                    },
                }}
            >
                <div>
                    {loading ? "Loading..." :
                        location ? (
                            <>
                                <div>
                                    {location.latitude} {location.longitude}
                                </div>
                                {data.map((d) => {
                                    return (
                                        <div>
                                            제목: {d?.oneDay?.oneDayTitle}
                                            내용: {d.oneDay.oneDayContent}
                                            카테고리: {d.oneDay.category}
                                            그룹사이즈: {d.oneDay.size}
                                            이미지: 이미지~
                                            주소: 주소~
                                            시작일: {d.oneDay.oneDayStartTime}
                                            거리: {(d.distance*1000).toFixed(1)}M
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
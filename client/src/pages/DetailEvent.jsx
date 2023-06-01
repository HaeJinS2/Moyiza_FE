import React, { useEffect, useState } from "react";
import Modal from "react-modal";
// import { getAPI, postAPI } from "../axios";
import "../index.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { getAPI } from "../axios";
// import { getHeaderAPI } from '../axios';
import { useRecoilState } from "recoil";
import { userNicknameState } from "../states/userStateTmp";


Modal.setAppElement("#root");

function DetailEvent({ handleJoinEvent, clubId, eventId, modalIsOpen, setIsOpen }) {
  // const [modalIsOpen, setIsOpen] = useState(false);
  // const [inputValue, setInputValue] = useState("");
  const [map, setMap] = useState(null);
  // const [userLat, setUserLat] = useState(null);
  // const [userLng, setUserLng] = useState(null);
  // const [userAddress, setUserAddress] = useState("");
  const [marker, setMarker] = useState(null);
  const [content, setContent] = useState({});
  const [nicknameState, setNicknameState] = useRecoilState(userNicknameState);

  // 내가 참석중이라면 true 아니면 false
  const [isNicknameExists, setIsNicknameExists] = useState(false);

  console.log(content.eventAttendantList);
  console.log(marker);

  useEffect(() => {
    const token = Cookies.get("ACCESS_TOKEN");
    console.log(token);
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setNicknameState({ userNickname: decoded.nickName });
        console.log("Decoded sub: ", decoded.nickName);
        console.log(nicknameState);
      } catch (error) {
        console.error("토큰 오류", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAPI(`/club/${clubId}/event/${eventId}`)
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clubId, eventId]);

  useEffect(() => {
    const nicknameExists = content?.eventAttendantList?.some(user => user.userName === nicknameState.userNickname);
    setIsNicknameExists(nicknameExists);
  }, [content, nicknameState]);

  console.log(isNicknameExists)
  console.log(content);
  console.log(nicknameState.userNickname)
  // useEffect(() => {
  //     console.log(userLat, userLng)
  // }, [userLat, userLng])

  // useEffect(() => {
  //     if (map && inputValue) {
  //         let url = `https://dapi.kakao.com/v2/local/search/address.json?query=${inputValue}`;
  //         getHeaderAPI(url, {
  //             headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MAPS_API_KEY_REST}` },
  //         })
  //             .then((response) => {
  //                 let address = response.data.documents[0];
  //                 let lat = address.y;
  //                 let lng = address.x;

  //                 let moveLatLon = new window.kakao.maps.LatLng(lat, lng);
  //                 map.setCenter(moveLatLon);
  //             })
  //             .catch((error) => {
  //                 console.log(error);
  //             });
  //     }
  // }, [inputValue, map]);

  useEffect(() => {
    const initializeMap = () => {
      if (modalIsOpen && window.kakao && window.kakao.maps) {
        let mapContainer = document.getElementById("map");
        let mapOption = {
          center: new window.kakao.maps.LatLng(
            content.eventLatitude,
            content.eventLongitude
          ),
          level: 3,
        };

        let mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(mapInstance);
      }
    };

    if (modalIsOpen) {
      const delay = setTimeout(initializeMap, 100);
      return () => clearTimeout(delay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen]);

  useEffect(() => {
    if (map) {
      // const handleMapClick = (mouseEvent) => {
      // let latlng = mouseEvent.latLng;
      let lat = content.eventLatitude;
      let lng = content.eventLongitude;
      // let lat = latlng.getLat();
      // let lng = latlng.getLng();

      // 이전 마커가 있다면 제거
      // if (marker) {
      //     marker.setMap(null);
      // }

      // 클릭한 위치에 마커 생성
      let newMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(lat, lng),
      });

      // 마커를 지도에 표시
      newMarker.setMap(map);

      // 마커 상태 업데이트
      setMarker(newMarker);

      // 위도 경도 상태 업데이트
      // setUserLat(lat);
      // setUserLng(lng);

      // let url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`;
      // getHeaderAPI(url, {
      //     headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MAPS_API_KEY_REST}` },
      // })
      //     .then((response) => {
      //         let address = response.data.documents[0].address;
      //         setUserAddress(address.address_name);
      //         console.log(response.data.documents[0])
      //     })
      //     .catch((error) => {
      //         console.log(error);
      //     });
      // };

      // window.kakao.maps.event.addListener(map, "click", handleMapClick());

      // return () => {
      //     window.kakao.maps.event.removeListener(map, "click", handleMapClick);
      // };
    }
  }, [map, content.eventLatitude, content.eventLongitude]);

  // const handleInputChange = (e) => {
  //     setInputValue(e.target.value);
  // };

  // const handleDetailClubButton = () => {
  //     setIsOpen(true)
  // }

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* <button 
            className='text-white'
            onClick={handleDetailClubButton}>이벤트 상세보기 버튼</button> */}

      <Modal
        isOpen={modalIsOpen}
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
            height: "870px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            borderRadius: "10px",
            gap: "10px",
          },
        }}
      >
        <div className="flex justify-between w-full">
          {/* <div className="flex justify-end w-full gap-x-2">
            <button className="w-[40px] h-[40px] bg-slate-400 rounded-full text-white">
              Join
            </button>

            <button
              onClick={closeModal}
              className="bg-gray-300 rounded-full w-[40px] h-[40px] text-white"
            >
              X
            </button>
          </div> */}
        </div>
        {/* <div className="flex justify-between">
          <span>{content.eventTitle}</span>
          <span>2/5</span>
        </div> */}
        {/* <div className="border w-full mb-4"></div> */}
        <div className="flex justify-center flex-col items-center gap-[30px]">
          <h3 className="text-2xl  px-3 ">
            {content.eventTitle ? content.eventTitle : "제목없음"}
          </h3>
          <div className="flex justify-between gap-3  p-3 w-full">
            <span>
              {content.eventStartTime
                ? content.eventStartTime.split("T")[0]
                : "일시없음"}
            </span>
            <span>
              {content.eventLocation ? content.eventLocation : "장소없음"}
            </span>
          </div>

          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-[30px] items-center ">
              <div className="w-[500px] h-[120px] bg-gray-200 rounded-[10px] p-5">
                {content.eventContent ? content.eventContent : "내용없음"}
              </div>
            </div>
            {/* <input className='w-[500px] h-[50px] shadow-md'
                            placeholder='장소를 검색하세요 (예: xx동)'
                            type="text" onChange={handleInputChange} /> */}
            <div id="map" style={{ width: "500px", height: "400px" }}></div>
          </div>
          <button
            onClick={() => handleJoinEvent(clubId, eventId)}
            className="w-[300px] h-[40px] bg-slate-400 text-white">
            Join
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 rounded-full w-[40px] h-[40px] text-white"
          >
            X
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default DetailEvent;

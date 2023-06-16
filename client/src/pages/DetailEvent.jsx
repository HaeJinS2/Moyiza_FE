import React, { useEffect, useState } from "react";
import Modal from "react-modal";
// import { getAPI, postAPI } from "../axios";
import "../index.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { deleteAPI, getAPI, postAPI } from "../axios";
// import { getHeaderAPI } from '../axios';
import { useRecoilState } from "recoil";
import { userNicknameState } from "../states/userStateTmp";
import { HeartCheckbox } from "../component/HeartCheckBox";

Modal.setAppElement("#root");

function DetailEvent({
  handleJoinEvent,
  clubId,
  eventId,
  modalIsOpen,
  setIsOpen,
  handleLeaveEvent,
  image,
  page,
  isLikedByUser,
}) {
  // const [modalIsOpen, setIsOpen] = useState(false);
  // const [inputValue, setInputValue] = useState("");
  // eslint-disable-next-line
  const [map, setMap] = useState(null);
  // const [userLat, setUserLat] = useState(null);
  // const [userLng, setUserLng] = useState(null);
  // const [userAddress, setUserAddress] = useState("");
  const [marker, setMarker] = useState(null);
  const [content, setContent] = useState({});
  const [nicknameState, setNicknameState] = useRecoilState(userNicknameState);

  // 내가 참석중이라면 true 아니면 false
  const [isNicknameExists, setIsNicknameExists] = useState(false);
  const [checked, setChecked] = useState(false);

  console.log(content.eventAttendantList, marker);

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
  }, [clubId, eventId, isNicknameExists]);

  useEffect(() => {
    const nicknameExists = content?.eventAttendantList?.some(
      (user) => user.userNickName === nicknameState.userNickname
    );
    setIsNicknameExists(nicknameExists);
  }, [content, nicknameState]);

  console.log(isNicknameExists);
  console.log("123", content);
  console.log(nicknameState.userNickname);

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
  useEffect(() => {
    setChecked(isLikedByUser);
  }, [isLikedByUser]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const likeDetailBtn = (e) => {
    if (!checked) {
      postAPI(`/club/${clubId}/event/${eventId}/like`, {})
        .then((res) => {
          // swal("포스트!")
          setChecked(e);
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      deleteAPI(`/club/${clubId}/event/${eventId}/like`, {})
        .then((res) => {
          // swal("딜리트!")
          setChecked(e);
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  const eventStartTime = content?.eventStartTime;
  const month = eventStartTime?.split("T")[0].split("-")[1];
  const date = eventStartTime?.split("T")[0].split("-")[2];
  const time = () => {
    if (eventStartTime?.split("T")[1].split(":")[0] > 12) {
      return `오후 ${eventStartTime?.split("T")[1].split(":")[0] - 12}시`;
    } else {
      return `오전 ${eventStartTime?.split("T")[1].split(":")[0]}시`;
    }
  };
  const minute = eventStartTime?.split("T")[1].split(":")[1];

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
            width: "680px",
            height: "600px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            borderRadius: "10px",
            gap: "10px",
          },
        }}
      >
        {/* <div className="flex justify-between w-full"> */}
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
        {/* </div> */}
        {/* <div className="flex justify-between">
          <span>{content.eventTitle}</span>
          <span>2/5</span>
        </div> */}
        {/* <div className="border w-full mb-4"></div> */}
        {/* <div className="flex justify-center flex-col items-center gap-[30px]">
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
            </div> */}
        {/* <input className='w-[500px] h-[50px] shadow-md'
                            placeholder='장소를 검색하세요 (예: xx동)'
                            type="text" onChange={handleInputChange} /> */}
        {/* <div id="map" style={{ width: "500px", height: "400px" }}></div>
          </div> */}
        <div className="flex flex-col w-full h-full gap-[15px] items-center">
          <div className="flex justify-between w-full">
            <div className="w-[220px]">참여중인지아닌지</div>
            <div className="flex text-2xl w-[220px] justify-center text-[#ff7f1d] font-semibold items-center">
              <p>{content.eventTitle}</p>
            </div>
            <div className="w-[220px] text-right">
              <HeartCheckbox
                likeBtn={likeDetailBtn}
                checked={checked}
                setChecked={setChecked}
              />
            </div>
          </div>
          <div>
            <img className=" object-cover" src={image} alt="empty" />
          </div>
          <div className="flex justify-between items-center w-[587px] h-[59px] bg-neutral-100 rounded-2xl p-4 pt-6">
            <div className="flex flex-col justify-center items-center">
              <img
                src={`${process.env.PUBLIC_URL}/images/detail/detail_calender.svg`}
                alt="detail_calender"
              />
              <div>
                {month}.{date}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img
                src={`${process.env.PUBLIC_URL}/images/detail/detail_clock.svg`}
                alt="detail_clock"
              />
              <div>
                {time()} {minute}분
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img
                src={`${process.env.PUBLIC_URL}/images/detail/detail_location.svg`}
                alt="detail_location"
              />
              <div>{content.eventLocation}</div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <img
                src={`${process.env.PUBLIC_URL}/images/detail/detail_people.svg`}
                alt="detail_people"
              />
              <div>
                {content.eventAttendantListSize} / {content.eventGroupSize}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-[588px] h-[101px] rounded-2xl bg-neutral-100">
            <p>{content.eventContent}</p>
          </div>
          <div className="flex justify-center gap-[30px] ">
            <button
              onClick={closeModal}
              className="bg-gray-300 rounded-full font-semibold w-[200px] h-[60px] text-[1.25rem] text-white"
            >
              닫기
            </button>
            {isNicknameExists ? (
              page === "endedEvent" ? (
                <button className="w-[200px] h-[60px] rounded-full font-semibold bg-[#ff7f1d] text-[1.25rem] text-white">
                  후기 작성하기
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleLeaveEvent(clubId, eventId, () =>
                      setIsNicknameExists(false)
                    )
                  }
                  className="w-[200px] h-[60px] rounded-full font-semibold bg-[#ff7f1d] text-[1.25rem] text-white"
                >
                  탈퇴하기
                </button>
              )
            ) : (
              page !== "endedEvent" && (
                <button
                  onClick={() =>
                    handleJoinEvent(clubId, eventId, () =>
                      setIsNicknameExists(true)
                    )
                  }
                  className="w-[200px] h-[60px] rounded-full bg-[#ff7f1d] text-[1.25rem] text-white"
                >
                  참여하기
                </button>
              )
            )}
          </div>
          
        </div>
        {/* </div> */}
      </Modal>
    </div>
  );
}

export default DetailEvent;

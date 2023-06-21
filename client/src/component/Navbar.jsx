import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SearchBar from "./SearchBar";
import { getAPI } from "../axios";
import { useRecoilState, useRecoilValue } from "recoil";
// import { roomIdStates, roomMsgStates, } from "../states/chatState";
import { roomIdListStates, roomIdStates, roomMsgStates, roomInfoStates } from "../states/chatState";

import { isLoggedInState } from '../states/userStateTmp';
import { reloadChatStates } from '../states/chatState';
import swal from 'sweetalert';
import { getCookie, parseJwt } from "../utils/jwtUtils";

// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import { userState } from "../states/userState";


function Navbar({ clientRef }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // 로그인 상태 여부를 관리할 상태값 추가
  const navigate = useNavigate();
  // const [roomId, setRoomId] = useState([]);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [roomIdState, setRoomIdState] = useRecoilState(roomIdStates);
  const [isLoggedIn2, setIsLoggedIn2] = useRecoilState(isLoggedInState);
  // eslint-disable-next-line
  const [roomIdListState, setRoomIdListState] = useRecoilState(roomIdListStates);
  // eslint-disable-next-line
  const [roomInfoState, setRoomInfoState] = useRecoilState(roomInfoStates);
  const [currentChatType, setCurrentChatType] = useState('CLUB');
  const [filteredRoomId, setFilteredRoomId] = useState([]);
  const roomMsgState = useRecoilValue(roomMsgStates);
  const [filteredData, setFilteredData] = useState([]);
  const [reloadChatState, setReloadChatState] = useRecoilState(reloadChatStates);

  const [data, setData] = useState([]);
  // const [userId, setUserId] =useState('')
  // const user = useRecoilValue(userState);
  const chatModalRef = useRef();
  const profileModalRef = useRef();
  //console.log("채팅방 목록 data", data)
  const [nickname, setNickname] = useState(null);
  const [profileImage ,setProfileImage] = useState(null);
  let userId = ''
  // 쿠키에서 ACCESS_TOKEN 값을 가져옵니다.
  const accessToken = getCookie('ACCESS_TOKEN');

  if (accessToken) {
    // ACCESS_TOKEN 값을 파싱하여 JSON 페이로드를 추출합니다.
    const payload = parseJwt(accessToken)
    // user_id 값을 추출합니다.
    userId = payload.userId
  }

useEffect(() => {
  const fetchData = async () => {
      try {
          // GET 요청 수행
          const response = await getAPI('/userInfo')

          // 응답이 성공적인지 확인
          if (response.status === 200) {
              const responseData = response?.data;
              setNickname(responseData?.nickname || "");
              setProfileImage(responseData?.profileImage || "");
              
          }
      } catch (error) {
          console.error(error.response.message);
          // 에러 상태 처리 또는 에러 페이지로 리디렉션 처리
      }
  };
  fetchData();
}, []);

  useEffect(() => {
    if (Cookies.get("ACCESS_TOKEN")) {
      const fetchClubChat = getAPI(`/chat/clubchat`);
      const fetchOneDayChat = getAPI(`/chat/onedaychat`);

      Promise.all([fetchClubChat, fetchOneDayChat]).then((responses) => {
        const clubChatData = responses[0].data;
        const oneDayChatData = responses[1].data;

        if (Array.isArray(clubChatData) && Array.isArray(oneDayChatData)) {
          const mergedData = [...clubChatData, ...oneDayChatData];

          const uniqueData = mergedData.filter((item, index, self) =>
            index === self.findIndex((t) => t.chatId === item.chatId)
          );

          const allChatIds = uniqueData.map((item) => item.chatId);

          setRoomIdListState(allChatIds);
          setData(uniqueData);
          setRoomInfoState(uniqueData);
        }
      });
      setReloadChatState(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn2, reloadChatState]);

  useEffect(() => {
    // 로그인 여부를 확인하고 상태값 업데이트
    const cookie = Cookies.get("ACCESS_TOKEN");
    setIsLoggedIn(cookie ? true : false);
  }, [isLoggedIn]);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setIsLoggedIn2(false);
    setRoomIdState([])
    Cookies.remove("REFRESH_TOKEN");
    Cookies.remove("ACCESS_TOKEN");
    navigate("/");
    swal("로그아웃 되었습니다.");
    if (clientRef.current) {
      clientRef.current.deactivate();
    }
  };

  // const goHome = () => {
  //   navigate('/');
  // }


  const goMyInfo = () => {
    // navigate("/mypage/");
    navigate(`user/mypage/${userId}`);
  };

  // useEffect(() => {
  //   console.log("roomMsgState",roomMsgState)
  // }, [roomMsgState])

  const [isScrolled, setIsScrolled] = useState(false);

  const checkScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const handleRoomIdState = (id) => {
    const tmpId = new Set([...roomIdState, id])
    roomIdState.length <= 2 ?
      setRoomIdState([...tmpId])
      :
      swal("세개까지만 띄울 수 있어요!")
  }

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  useEffect(() => {
  }, [data])
  // chatModal 또는 profileModal이 켜져있을때 모달의 외부를 클릭하면 모달이 닫히도록 하는 함수
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        chatModalOpen &&
        chatModalRef.current &&
        !chatModalRef.current.contains(event.target)
      ) {
        setChatModalOpen(false);
      }
      if (
        profileModalOpen &&
        profileModalRef.current &&
        !profileModalRef.current.contains(event.target)
      ) {
        setProfileModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chatModalOpen, profileModalOpen]);

  useEffect(() => {
    if (currentChatType === null) {
      setFilteredData(data);
    } else {
      const tmp = data.filter(item => item.chatType === currentChatType);
      const roomIdArr = tmp.map((item) => {
        return item.chatId
      })
      setFilteredRoomId(roomIdArr)
      setFilteredData(tmp);
    }
  }, [data, currentChatType]);


  const handleButtonClick = (e, chatType) => {
    e.stopPropagation(); // 이벤트 전파를 막습니다.
    setCurrentChatType(chatType);
  }

  //   const filteredData = getFilteredData();
  // console.log("filteredData", filteredData)

  return (
    <>
      <div className="fixed z-20">
        <div
          className={`flex justify-center bg-white w-[100vw]  transition-all duration-200 ease-in-out 
      ${isScrolled ? " border-b-[1px] border-gray-300" : ""}`}
        >
          <div
            className={`flex w-[1200px] justify-between items-center transition-all duration-200 ease-in-out  ${isScrolled ? "h-[70px]" : "h-[80px]"
              }`}
          >
            <div className="w-full flex justify-between items-center ">
              <div className="flex justify-between items-center text-lg gap-x-2 ml-[-10px]">
                <img
                  className="cursor-pointer ml-[10px]"
                  onClick={() => navigate("/")}
                  src={`${process.env.PUBLIC_URL}/images/logo.svg`}
                  width="104px"
                  alt="moyizaLogo"
                />
              </div>

              <SearchBar />
              <div className="w-[150px] flex items-center text-md font-semibold justify-center gap-4">
                {isLoggedIn2 ? (
                  //로그인 상태인 경우
                  <>
                    <div
                      ref={chatModalRef}
                      onClick={() => {
                        chatModalOpen
                          ? setChatModalOpen(false)
                          : setChatModalOpen(true);
                      }}
                      className="cursor-pointer relative "
                    >
                      <img
                        className="w-[60px] h-[60px] relative"
                        src={`${process.env.PUBLIC_URL}/images/chat_icon.svg`}
                        alt="chat_icon"
                      />
                      <div className="absolute left-5 top-9 flex bg-red-500 text-white text-xs h-[20px] w-[30px] items-center justify-center
                      rounded-[10px]
                      ">{roomMsgState.length}</div>
                      {chatModalOpen && (
                        <>
                          <div className="absolute top-[70px] right-[-110px] border-[1px] rounded-[25px]">

                            <div className="flex justify-between px-4 py-2 bg-white rounded-t-[25px] border-b border-gray-300">
                              <div className="text-[30px] font-semibold px-4">채팅</div>

                              <button
                                className="px-4 text-[28px]"
                                onClick={() => setChatModalOpen(false)}>
                                X
                              </button>
                            </div>
                            <div className="w-[370px] h-[360px]  overflow-auto">
                              <div className="flex py-4 px-8  gap-y-2 gap-x-1  bg-white">
                                <button
                                  className={`${currentChatType === 'CLUB' ? "text-[#FF7F1D] bg-[#FFE8DC] w-[75px] h-[27px] rounded-2xl" : "text-[#747474]  w-[75px] h-[27px]"}`}
                                  onClick={(e) => handleButtonClick(e, 'CLUB')}>일상속</button>
                                <button
                                  className={`${currentChatType === 'ONEDAY' ? "text-[#FF7F1D] bg-[#FFE8DC] w-[75px] h-[27px] rounded-2xl" : "text-[#747474]  w-[75px] h-[27px]"}`}
                                  onClick={(e) => handleButtonClick(e, 'ONEDAY')}>하루속</button>
                              </div>
                              <div className="bg-white h-[301px] w-full rounded-b-2xl">
                                {filteredData?.map((item, i) => {
                                  const matchingState = roomMsgState.slice().reverse().find(state => state.chatId === item.chatId);
                                  const contentToDisplay = matchingState ? matchingState : item.lastMessage;
                                  return (
                                    <>
                                      <button
                                        className={`w-[355px]  px-4 gap-x-4 flex items-center justify-start py-2

                                      ${
                                          // id === currentRoom
                                          // ? "bg-slate-400"
                                          // :
                                          "bg-white"
                                          }`}
                                        key={filteredRoomId[i]}
                                        onClick={
                                          () => {
                                            handleRoomIdState(filteredRoomId[i])
                                            setChatModalOpen(false);
                                          }
                                          // connectToRoom(id)
                                        }
                                      >
                                        <div className="flex items-center justify-center gap-x-4 px-4 py-1">
                                          <div>
                                            <div className="w-[52px] h-[52px] rounded-full">
                                              <img
                                                className=" aspect-square  rounded-full object-cover"
                                                src={`${filteredData[i]?.chatThumbnail}`} alt="club_thumbnail" />
                                            </div>
                                          </div>
                                          <div className="flex flex-col items-start">
                                            <div>{item?.roomName}</div>
                                            <div className="font-normal">{contentToDisplay?.content}</div>
                                          </div>
                                        </div>
                                      </button>
                                    </>
                                  )
                                }
                                )}</div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div
                      onClick={() => swal("아직 준비중인 기능입니다!")}
                      className="cursor-pointer"
                    >
                      <img
                        className="w-[60px] h-[60px]"
                        src={`${process.env.PUBLIC_URL}/images/alarm_icon.svg`}
                        alt="alarm_icon"
                      />
                    </div>
                    <div
                      ref={profileModalRef}
                      onClick={() => {
                        profileModalOpen
                          ? setProfileModalOpen(false)
                          : setProfileModalOpen(true);
                      }}
                      className="cursor-pointer relative"
                    >

                      <img
                        className="w-[60px] h-[60px] "
                        src={`${process.env.PUBLIC_URL}/images/profile_icon.svg`}
                        alt="profile_icon"
                      />
                      {profileModalOpen && (
                        <div className="absolute bg-white z-10 flex flex-col items-start top-[70px] right-0 shadow-cm rounded-xl">
                          <div className="mt-[12px]">
                            <div className="text-[24px] mb-[11px] mt-[11px] ml-[30px]">프로필</div>
                            <hr className="mb-[12px]" />
                            <div className="flex flex-col ml-[30px]">
                              {/* 닉네임 */}
                              <div 
                              onClick={goMyInfo}
                              className="flex w-[230px] items-center mb-[12px] ">
                                <img src={profileImage} 
                                alt='user_profile'
                                className="w-[48px] h-[48px] mr-[16px] bg-black rounded-full"/>
                                <div>{nickname}</div>
                                
                              </div>
                             
                              {/* 로그아웃 */}
                              <div className="flex flex-row flex-start mb-[12px]">
                                <img
                                  className="w-[40px] h-[40px] mr-[23px]"
                                  src={`${process.env.PUBLIC_URL}/images/logout.svg`}
                                  alt="logout_icon"
                                />
                                <button onClick={logoutHandler}>로그아웃
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  //로그인 상태 아닌 경우
                  <>
                    <div></div>
                    <div></div>
                    <div
                      onClick={() => navigate("/login")}
                      className="flex cursor-pointer w-[70px] h-[60px] items-center"
                    >
                      로그인
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
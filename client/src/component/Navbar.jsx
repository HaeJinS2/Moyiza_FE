import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SearchBar from "./SearchBar";
import { getAPI } from "../axios";
import { useRecoilState } from "recoil";
import { roomIdStates } from "../states/chatState";
import { isLoggedInState } from '../states/userStateTmp';
import swal from 'sweetalert';
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import { userState } from "../states/userState";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // 로그인 상태 여부를 관리할 상태값 추가
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState([]);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [roomIdState, setRoomIdState] = useRecoilState(roomIdStates);
  const [isLoggedIn2, setIsLoggedIn2] = useRecoilState(isLoggedInState);
  const [data, setData] = useState([]);
  const chatModalRef = useRef();
  const profileModalRef = useRef();

  useEffect(() => {
    if(Cookies.get("ACCESS_TOKEN")) {
      getAPI(`/chat`)
      .then((response) => {
        console.log("dataa",response.data)
        if (Array.isArray(response.data)) {
          const chatIds = response.data.map((item) => item.chatId);
          setRoomId(chatIds);
          setData(response.data)
        }
      })
      .catch((error) => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
    // 로그인 여부를 확인하고 상태값 업데이트
    const cookie = Cookies.get("ACCESS_TOKEN");
    setIsLoggedIn(cookie ? true : false);
  }, [isLoggedIn]);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setIsLoggedIn2(false);
    Cookies.remove("REFRESH_TOKEN");
    Cookies.remove("ACCESS_TOKEN");
    navigate("/");
    alert("로그아웃 되었습니다.");
  };

  // const goHome = () => {
  //   navigate('/');
  // }

  const goMyInfo = () => {
    navigate("/user/mypage");
  };

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


  return (
    <>
      <div className="fixed z-20">
        <div
          className={`flex justify-center bg-white w-[100vw]  transition-all duration-200 ease-in-out 
      ${isScrolled ? " border-b-[1px] border-gray-300" : ""}`}
        >
          <div
            className={`flex w-[1200px] justify-between items-center transition-all duration-200 ease-in-out  ${isScrolled ? "h-[100px]" : "h-[120px]"
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
                        className="w-[60px] h-[60px]"
                        src={`${process.env.PUBLIC_URL}/images/chat_icon.svg`}
                        alt="chat_icon"
                      />
                      {chatModalOpen && (
                        <>
                          <div className="absolute top-[70px] right-[-110px] shadow-cm rounded-[25px]">

                            <div className="flex justify-between px-4 py-2 bg-white rounded-t-[25px] border-b border-gray-300">
                              <div className="text-3xl px-4">채팅</div>

                              <button
                              className="px-4"
                              onClick={() => setChatModalOpen(false)}>
                                X
                              </button>
                            </div>
                            <div className="w-[360px] h-[400px]  overflow-auto">
                              {roomId?.map((id, i) => (
                                <>
                                  <button
                                    className={`w-[345px]  px-4 gap-x-4 flex items-center justify-start py-2
                                  ${
                                      // id === currentRoom
                                      // ? "bg-slate-400"
                                      // :
                                      "bg-white"
                                      }`}
                                    key={id}
                                    onClick={
                                      () => {
                                        handleRoomIdState(id)
                                        setChatModalOpen(false);
                                      }
                                      // connectToRoom(id)
                                    }
                                  >
                                    <div className="flex items-center justify-center gap-x-4 px-4 py-1">
                                      <div>
                                        <div className="w-[52px] h-[52px] bg-black rounded-full"></div>
                                      </div>
                                      <div className="flex flex-col items-start">
                                        <div>{data[i]?.roomName ? data[i]?.roomName : "이름 없는 채팅방"}</div>
                                        <div className="font-normal">미리볼내용</div>
                                      </div>
                                    </div>
                                  </button>
                                </>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div
                      onClick={() => alert("아직 준비중인 기능입니다!")}
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
                        className="w-[60px] h-[60px]"
                        src={`${process.env.PUBLIC_URL}/images/profile_icon.svg`}
                        alt="profile_icon"
                      />
                      {profileModalOpen && (
                        <div className="absolute bg-white z-10 flex flex-col items-start gap-3 p-2 top-[70px] right-0 shadow-cm rounded-t-xl">
                          <div className="flex w-[240px] gap-2 items-center">
                            <div className="w-[52px] h-[52px] bg-black rounded-full"></div>
                            <div>닉네임</div>
                          </div>
                          <button onClick={goMyInfo}>프로필 수정하기</button>

                          <button onClick={logoutHandler}>로그아웃</button>
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

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SearchBar from "./SearchBar";
import { getAPI } from "../axios";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import { userState } from "../states/userState";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // 로그인 상태 여부를 관리할 상태값 추가
  const navigate = useNavigate();
  // const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState([]);
  // const [currentRoom, setCurrentRoom] = useState("");
  // const messagesEndRef = useRef(null);
  // const errorCount = useRef(0); // 에러 카운트 상태를 직접 관리
  // const clientRef = useRef(null); // client를 useRef로 설정
  // const subscriptionRef = useRef(null);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const chatModalRef = useRef();
  const profileModalRef = useRef();

  useEffect(() => {
    getAPI(`/chat`)
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          const chatIds = response.data.map((item) => item.chatId);
          setRoomId(chatIds);
        }
      })
      .catch((error) => console.log(error));
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
    // console.log(Cookies)
    Cookies.remove("REFRESH_TOKEN");
    Cookies.remove("ACCESS_TOKEN");
    navigate("/");
    alert("로그아웃 되었습니다.");
  };

  // const goHome = () => {
  //   navigate('/');
  // }

  const goMyInfo = () => {
    navigate("/user/profile");
  };

  const [isScrolled, setIsScrolled] = useState(false);

  const checkScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

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

  // const connectToRoom = (roomId) => {
  //   const token = Cookies.get("ACCESS_TOKEN");

  //   // clientRef.current(WebSocket 클라이언트)가 존재하는지 확인
  //   if (clientRef.current) {
  //     // 클라이언트의 채팅방 구독이 존재하는지 확인, 존재하면 unsubscribe
  //     if (subscriptionRef.current) {
  //       subscriptionRef.current.unsubscribe();
  //     }

  //     // 새로운 구독 생성
  //     subscriptionRef.current = clientRef.current.subscribe(
  //       `/chat/${roomId}`,
  //       (message) => {
  //         if (message.body) {
  //           let newMessage = JSON.parse(message.body);
  //           setMessages((prevMessages) => [...prevMessages, newMessage]);
  //         }
  //       }
  //     );
  //     setCurrentRoom(roomId);
  //     getAPI(`/chat/${roomId}`).then((res) => {
  //       console.log(res);
  //       setMessages(res.data.content);
  //     });
  //   }
  //   // 클라이언트가 없는 경우 새 클라이언트 생성하고 구독
  //   else {
  //     const newClient = new Client({
  //       webSocketFactory: () =>
  //         new SockJS(`${process.env.REACT_APP_SERVER_URL}/chat/connect`),
  //       debug: (str) => {
  //         console.log(str);
  //       },
  //       onConnect: (frame) => {
  //         console.log("Connected: " + frame);

  //         // 새로운 구독 생성
  //         subscriptionRef.current = newClient.subscribe(
  //           `/chat/${roomId}`,
  //           (message) => {
  //             if (message.body) {
  //               let newMessage = JSON.parse(message.body);
  //               setMessages((prevMessages) => [...prevMessages, newMessage]);
  //             }
  //           }
  //         );
  //       },
  //       beforeConnect: () => {
  //         newClient.connectHeaders["ACCESS_TOKEN"] = `Bearer ${token}`;
  //       },
  //       onStompError: (frame) => {
  //         console.log("Broker reported error: " + frame.headers["message"]);
  //         console.log("Additional details: " + frame.body);
  //         if (errorCount.current < 1) {
  //           errorCount.current += 1;
  //         }
  //       },
  //     });

  //     const originalOnWebSocketClose =
  //       newClient.onWebSocketClose.bind(newClient);

  //     newClient.onWebSocketClose = (evt) => {
  //       if (errorCount.current >= 1) {
  //         console.log("연결 실패 해서 끊김!");
  //         newClient.deactivate();
  //         errorCount.current = 0;
  //         return;
  //       }

  //       originalOnWebSocketClose(evt);
  //     };

  //     newClient.activate();
  //     // 현재 누른 roomId 값 저장
  //     setCurrentRoom(roomId);
  //     getAPI(`/chat/${roomId}`).then((res) => {
  //       console.log(res);
  //       setMessages(res.data.content);
  //     });

  //     // Set the new client as current
  //     clientRef.current = newClient;
  //   }
  // };

  return (
    <>
      <div className="fixed z-20">
        <div
          className={`flex justify-center bg-white w-[100vw]  transition-all duration-200 ease-in-out 
      ${isScrolled ? " border-b-[1px] border-gray-300" : ""}`}
        >
          <div
            className={`flex w-[1200px] justify-between items-center transition-all duration-200 ease-in-out  ${
              isScrolled ? "h-[100px]" : "h-[120px]"
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
                {isLoggedIn ? (
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
                          <div className="absolute top-[70px] right-[-110px] shadow-cm rounded-t-xl">
                            <div className="flex justify-between px-4 pt-2  ">
                              <div className="text-3xl">채팅</div>
                              <button onClick={() => setChatModalOpen(false)}>
                                X
                              </button>
                            </div>

                            {roomId?.map((id) => (
                              <>
                                <button
                                  className={`w-[360px]  px-4 gap-x-4 flex items-center justify-start border-b-2 py-2
                                  ${
                                    // id === currentRoom
                                    // ? "bg-slate-400"
                                    // :
                                    "bg-slate-300"
                                  }`}
                                  key={id}
                                  onClick={
                                    () => {
                                      navigate("/chat");
                                      setChatModalOpen(false);
                                    }
                                    // connectToRoom(id)
                                  }
                                >
                                  <div>
                                    <div className="w-[52px] h-[52px] bg-black rounded-full"></div>
                                  </div>
                                  <div className="flex flex-col items-start">
                                    <div>Room {id}</div>
                                    <div>미리볼내용</div>
                                  </div>
                                </button>
                              </>
                            ))}
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
                      onClick={() => navigate("/logins")}
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

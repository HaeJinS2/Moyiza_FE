import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { userEmailState, userIdState } from "../states/userStateTmp";
// import { userState } from "../states/userState";
import { getAPI } from "../axios";
import Navbar from "../component/Navbar";
import { logEvent, setAmplitudeUserId } from "../utils/amplitude";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [emailState, setEserEmailState] = useRecoilState(userEmailState);
  // eslint-disable-next-line
  const [userId, setUserId] = useRecoilState(userIdState);
  // const [user, setUser] = useRecoilState(userState);
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState([]);
  // const roomIdTmp = [1, 2, 3, 19, 11, 12, 13, 14, 15, 16, 17];
  const [currentRoom, setCurrentRoom] = useState("");
  const [headerState, setHeaderState] = useState({})
  const messagesEndRef = useRef(null);
  const errorCount = useRef(0); // 에러 카운트 상태를 직접 관리
  const clientRef = useRef(null); // client를 useRef로 설정
  const subscriptionRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get("ACCESS_TOKEN");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("토큰 오류", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    getAPI(`/chat/clubchat`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          const chatIds = response.data.map((item) => item.chatId);
          setRoomId(chatIds);
        }
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    const token = Cookies.get("ACCESS_TOKEN");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setEserEmailState({ user: decoded });
      } catch (error) {
        console.error("토큰 오류", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (currentRoom)
{    getAPI(`/chat/${currentRoom}`).then((res) => {
      setMessages(res.data.content.reverse());
    });}
  }, [currentRoom])

  const connectToRoom = (roomId) => {
    const token = Cookies.get("ACCESS_TOKEN");

    // clientRef.current(WebSocket 클라이언트)가 존재하는지 확인
    if (clientRef.current) {
      // 클라이언트의 채팅방 구독이 존재하는지 확인, 존재하면 unsubscribe
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }

      // 새로운 구독 생성
      subscriptionRef.current = clientRef.current.subscribe(
        `/chat/${roomId}`,
        (message) => {
          if (message) {
            if (message.headers.lastReadMessage) {
              setHeaderState(message.headers)
            }
            let newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        }
      );
      setCurrentRoom(roomId);
    }
    // 클라이언트가 없는 경우 새 클라이언트 생성하고 구독
    else {
      const newClient = new Client({
        webSocketFactory: () =>
          new SockJS(`${process.env.REACT_APP_SERVER_URL}/chat/connect`),
        debug: (str) => {
        },
        onConnect: (frame) => {

          // 새로운 구독 생성
          subscriptionRef.current = newClient.subscribe(
            `/chat/${roomId}`,
            (message) => {
              if (message) {
                if (message.headers.lastReadMessage) {
                  setHeaderState(message.headers)
                }
                let newMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
              }
            }
          );
        },
        beforeConnect: () => {
          newClient.connectHeaders["ACCESS_TOKEN"] = `Bearer ${token}`;
        },
        onStompError: (frame) => {
          if (errorCount.current < 1) {
            errorCount.current += 1;
          }
        },
      });

      const originalOnWebSocketClose =
        newClient.onWebSocketClose.bind(newClient);

      newClient.onWebSocketClose = (evt) => {
        if (errorCount.current >= 1) {
          newClient.deactivate();
          errorCount.current = 0;
          return;
        }

        originalOnWebSocketClose(evt);
      };

      newClient.activate();
      // 현재 누른 roomId 값 저장
      setCurrentRoom(roomId);
      // Set the new client as current
      clientRef.current = newClient;
    }
  };

  useEffect(() => {
    if(headerState.lastReadMessage){
      let updatedMessages = [...messages]; 
      let indexStart = updatedMessages.findIndex(msg => msg.chatRecordId === Number(headerState.lastReadMessage));
      if (indexStart !== -1) {
          for (let i = indexStart + 1 ; i < updatedMessages.length; i++) {
              if (updatedMessages[i].unreadCount > 0) {
                  updatedMessages[i] = { ...updatedMessages[i], unreadCount: updatedMessages[i].unreadCount - 1 };
              }
          }
      }
      setMessages(updatedMessages);  
      setHeaderState({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[headerState])

  const sendMessage = (msg) => {
    const token = Cookies.get("ACCESS_TOKEN");
    if (input && clientRef.current) {
      clientRef.current.publish({
        destination: `/app/chat/${currentRoom}`,
        headers: { ACCESS_TOKEN: `Bearer ${token}` },
        body: JSON.stringify(msg),
      });
    }
    setInput("");
  };
  const handleOnKeyPress = (e) => {
    logEvent("Send Chatting", {
      name: "handleOnKeyPress",
      page: "Chat",
      userEmail: emailState.userEmail,
    });
    setAmplitudeUserId(emailState.userEmail);
    if (e.key === "Enter") {
      sendMessage({
        content: input,
      });
    }
  };

  // Render the messages from the server.
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-31.89px)]">
        <div className="flex justify-between w-[1000px] h-[600px] border-[1px]">
          <div className="flex flex-col justify-between w-[700px]">
            <div className="flex flex-col h-[530px] p-2 overflow-y-auto">
              {messages.map((message, index) => {
                return emailState.user.userId === message?.senderId ? (
                  <div className="flex justify-end">
                    <div key={index} className=" flex-end">
                      <div className="flex justify-end">
                        보낸사람 : {message.senderNickname}
                      </div>
                      <div className="flex gap-x-1 items-center justify-end">
                        <span>{message.unreadCount}</span>
                        <div className="flex p-[10px] rounded-lg m-[10px] gap-[10px] text-white bg-[#0084ff]">
                          내용 : {message.content + " "}
                        </div>
                        <img src={message.profileUrl} className="rounded-full w-[40px] h-[40px]" alt="user_profile_image" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={index}>
                    <div>
                      <div>보낸사람 : {message.senderNickname}</div>
                    </div>
                    <div className="flex gap-x-1 items-center">
                      <img src={message.profileUrl} className="rounded-full w-[40px] h-[40px]" alt="user_profile_image" />
                      <div className="flex p-[10px] rounded-lg m-[10px] gap-[10px] bg-[#E5E5E9]">
                        내용 : {message.content + " "}
                      </div>
                      <span>{message.unreadCount}</span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center h-[60px] px-2 gap-x-2 bg-slate-100 ">
              <input
                className="px-2 rounded-lg w-full h-[50px] focus:outline-none focus:ring-0"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="내용을 입력해주세요"
                onKeyPress={handleOnKeyPress}
              />
              <button
                className={`h-[50px] w-[100px] rounded-lg ${input ? "bg-[#FF7701] " : "bg-[#a5a5a5] text-gray-500"
                  } `}
                onClick={() =>
                  sendMessage({
                    content: input,
                    senderNickname: emailState.userEmail,
                  })
                }
                disabled={!input}
              >
                Send
              </button>
            </div>
          </div>
          <div className="flex w-[300px] h-[600px] border-l overflow-y-auto">
            <div className="flex flex-col w-full  gap-1">
              <div className="">
                {roomId?.map((id) => (
                  <button
                    className={`w-full h-[60px]  px-4 gap-x-4 flex flex-col items-start justify-center border-b-2
                    ${id === currentRoom ? "bg-slate-400" : "bg-slate-300"}`}
                    key={id}
                    onClick={() => connectToRoom(id)}
                  >
                    <div>Room {id}</div>
                    <div>미리볼내용</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;

import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { userEmailState } from "../states/userStateTmp";
// import { userState } from "../states/userState";
import { getAPI } from "../axios";
import Container from "../component/Container";
import Navbar from "../component/Navbar";
import { logEvent, setAmplitudeUserId } from "../utils/amplitude";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [emailState, setEserEmailState] = useRecoilState(userEmailState);
  // const [user, setUser] = useRecoilState(userState);
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState([]);
  // const roomIdTmp = [1, 2, 3, 19, 11, 12, 13, 14, 15, 16, 17];
  const [currentRoom, setCurrentRoom] = useState("");
  const messagesEndRef = useRef(null);
  const errorCount = useRef(0); // 에러 카운트 상태를 직접 관리
  const clientRef = useRef(null); // client를 useRef로 설정
  const subscriptionRef = useRef(null);

  console.log(emailState);
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

  // useEffect(() => {
  //   getAPI(`/chat/1`)
  //     .then((response) => {
  //       console.log("/chat/1",response);

  //     })
  //     .catch((error) => console.log(error));
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [roomId]);

  useEffect(() => {
    const token = Cookies.get("ACCESS_TOKEN");
    console.log(token);
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setEserEmailState({ userEmail: decoded.sub });
        console.log("Decoded sub: ", decoded.sub);
        console.log(emailState);
      } catch (error) {
        console.error("토큰 오류", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // useEffect(() => {
  //   clientRef.current = new Client({ // clientRef.current에 직접 할당
  //     webSocketFactory: () => new SockJS("http://3.34.182.174/chat/connect"),
  //     debug: (str) => {
  //       console.log(str);
  //     },
  //     onConnect: (frame) => {
  //       console.log("Connected: " + frame);

  //       clientRef.current.subscribe("/chat/clubchat/19", (message) => { // clientRef.current 사용
  //         if (message.body) {
  //           let newMessage = JSON.parse(message.body);
  //           setMessages((prevMessages) => [...prevMessages, newMessage]);
  //         }
  //       });
  //     },
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   });

  //   clientRef.current.activate(); // clientRef.current 사용

  //   return () => {
  //     if (clientRef.current) { // clientRef.current 확인
  //       clientRef.current.deactivate();
  //     }
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
          if (message.body) {
            let newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        }
      );
      setCurrentRoom(roomId);
      getAPI(`/chat/${roomId}`).then((res) => {
        console.log(res);
        setMessages(res.data.content);
      });
    }
    // 클라이언트가 없는 경우 새 클라이언트 생성하고 구독
    else {
      const newClient = new Client({
        webSocketFactory: () =>
          new SockJS(`${process.env.REACT_APP_SERVER_URL}/chat/connect`),
        debug: (str) => {
          console.log(str);
        },
        onConnect: (frame) => {
          console.log("Connected: " + frame);

          // 새로운 구독 생성
          subscriptionRef.current = newClient.subscribe(
            `/chat/${roomId}`,
            (message) => {
              if (message.body) {
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
          console.log("Broker reported error: " + frame.headers["message"]);
          console.log("Additional details: " + frame.body);
          if (errorCount.current < 1) {
            errorCount.current += 1;
          }
        },
      });

      const originalOnWebSocketClose =
        newClient.onWebSocketClose.bind(newClient);

      newClient.onWebSocketClose = (evt) => {
        if (errorCount.current >= 1) {
          console.log("연결 실패 해서 끊김!");
          newClient.deactivate();
          errorCount.current = 0;
          return;
        }

        originalOnWebSocketClose(evt);
      };

      newClient.activate();
      // 현재 누른 roomId 값 저장
      setCurrentRoom(roomId);
      getAPI(`/chat/${roomId}`).then((res) => {
        console.log(res);
        setMessages(res.data.content);
      });

      // Set the new client as current
      clientRef.current = newClient;
    }
  };

  const sendMessage = (msg) => {
    const token = Cookies.get("ACCESS_TOKEN");
    console.log(currentRoom);
    console.log(msg);
    console.log(clientRef);
    console.log(emailState.userEmail);
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
      useremail: emailState.userEmail,
    });
    setAmplitudeUserId(emailState.userEmail);
    if (e.key === "Enter") {
      sendMessage({
        content: input,
        senderNickname: emailState.userEmail,
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
                return emailState.userEmail === message.senderNickname ? (
                  <div className="flex justify-end">
                    <div key={index} className=" flex-end">
                      <div className="flex justify-end">
                        보낸사람 : {message.senderNickname}
                      </div>
                      <div className="flex gap-x-1 items-center justify-end">
                        <div className="flex p-[10px] rounded-lg m-[10px] gap-[10px] text-white bg-[#0084ff]">
                          {console.log(message)}
                          내용 : {message.content + " "}
                        </div>
                        <div className="rounded-full bg-black w-[40px] h-[40px]"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={index}>
                    <div>
                      <div>보낸사람 : {message.senderNickname}</div>
                    </div>
                    <div className="flex gap-x-1 items-center">
                      <div className="rounded-full bg-black w-[40px] h-[40px]"></div>
                      <div className="flex p-[10px] rounded-lg m-[10px] gap-[10px] bg-[#E5E5E9]">
                        내용 : {message.content + " "}
                      </div>
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
                className={`h-[50px] w-[100px] rounded-lg ${
                  input ? "bg-[#FF7701] " : "bg-[#a5a5a5] text-gray-500"
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

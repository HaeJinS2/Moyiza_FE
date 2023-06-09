import React, { useEffect, useRef, useState } from 'react'
// import { useRecoilValue } from "recoil";
// import { roomIdStates } from "../states/chatState";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { getAPI } from '../axios';
import { useRecoilState } from "recoil";
import { userIdState } from "../states/userStateTmp";
import { roomIdStates } from '../states/chatState';

function ChatWindow({ roomIdState, style }) {
    const [messages, setMessages] = useState([]);
    const [tmpMessage, setTmpMessage] = useState([{ userId: "dd", senderId: "xx", content: "내용1" },
    { userId: "xx@xx.xx", senderId: "xx@xx.xx", content: "내용2" },
    { userId: "dd", senderId: "xx", content: "내용1" },
    { userId: "xx@xx.xx", senderId: "xx@xx.xx", content: "내용2" },
    { userId: "dd", senderId: "xx", content: "내용1" },
    { userId: "xx@xx.xx", senderId: "xx@xx.xx", content: "내용2" }]);
    // const roomIdState = useRecoilValue(roomIdStates);
    const [input, setInput] = useState("");
    const [userId, setUserId] = useRecoilState(userIdState);
    const [roomIdList, setRoomIdList] = useRecoilState(roomIdStates);
    const [headerState, setHeaderState] = useState({})

    console.log("messagess", messages)

    const messagesEndRef = useRef(null);
    const errorCount = useRef(0); // 에러 카운트 상태를 직접 관리
    const clientRef = useRef(null); // client를 useRef로 설정
    const subscriptionRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const token = Cookies.get("ACCESS_TOKEN");
        console.log(token);
        if (token) {
            try {
                const decoded = jwt_decode(token);
                setUserId(decoded.userId);
                console.log("Decoded sub: ", decoded.userId);
            } catch (error) {
                console.error("토큰 오류", error);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage({
                content: input,
            });
        }
    };

    // const connectToRoom = (roomId) => {
    //     const token = Cookies.get("ACCESS_TOKEN");

    //     // clientRef.current(WebSocket 클라이언트)가 존재하는지 확인
    //     if (clientRef.current) {
    //         // 클라이언트의 채팅방 구독이 존재하는지 확인, 존재하면 unsubscribe
    //         if (subscriptionRef.current) {
    //             subscriptionRef.current.unsubscribe();
    //         }

    //         // 새로운 구독 생성
    //         subscriptionRef.current = clientRef.current.subscribe(
    //             `/chat/${roomId}`,
    //             (message) => {
    //                 if (message.body) {
    //                     let newMessage = JSON.parse(message.body);
    //                     setMessages((prevMessages) => [...prevMessages, newMessage]);
    //                 }
    //             }
    //         );
    //         // setCurrentRoom(roomId);
    //         // getAPI(`/chat/${roomId}`).then((res) => {
    //         //     console.log(res);
    //         //     setMessages(res.data.content);
    //         // });
    //     }
    //     // 클라이언트가 없는 경우 새 클라이언트 생성하고 구독
    //     else {
    //         const newClient = new Client({
    //             webSocketFactory: () =>
    //                 new SockJS(`${process.env.REACT_APP_SERVER_URL}/chat/connect`),
    //             debug: (str) => {
    //                 console.log(str);
    //             },
    //             onConnect: (frame) => {
    //                 console.log("Connected: " + frame);

    //                 // 새로운 구독 생성
    //                 subscriptionRef.current = newClient.subscribe(
    //                     `/chat/${roomId}`,
    //                     (message) => {
    //                         if (message.body) {
    //                             let newMessage = JSON.parse(message.body);
    //                             setMessages((prevMessages) => [...prevMessages, newMessage]);
    //                         }
    //                     }
    //                 );
    //             },
    //             beforeConnect: () => {
    //                 newClient.connectHeaders["ACCESS_TOKEN"] = `Bearer ${token}`;
    //             },
    //             onStompError: (frame) => {
    //                 console.log("Broker reported error: " + frame.headers["message"]);
    //                 console.log("Additional details: " + frame.body);
    //                 if (errorCount.current < 1) {
    //                     errorCount.current += 1;
    //                 }
    //             },
    //         });

    //         const originalOnWebSocketClose =
    //             newClient.onWebSocketClose.bind(newClient);

    //         newClient.onWebSocketClose = (evt) => {
    //             if (errorCount.current >= 1) {
    //                 console.log("연결 실패 해서 끊김!");
    //                 newClient.deactivate();
    //                 errorCount.current = 0;
    //                 return;
    //             }

    //             originalOnWebSocketClose(evt);
    //         };

    //         newClient.activate();
    //         // 현재 누른 roomId 값 저장
    //         // setCurrentRoom(roomId);
    //         // getAPI(`/chat/${roomId}`).then((res) => {
    //         //     console.log(res);
    //         //     setMessages(res.data.content);
    //         // });

    //         // Set the new client as current
    //         clientRef.current = newClient;
    //     }
    // };


    // useEffect (() => {
    //     getAPI(`/chat/${roomIdState}`).then((res) => {
    //         console.log(res);
    //         setMessages(res.data.content);
    //         setTmpMessage([...tmpMessage,res.data.content]);
    //     });
    // },[roomIdState])

    console.log("messages~", messages)

    // useEffect(() => {
    //     getAPI(`/chat/${roomIdState}`).then((res) => {
    //         console.log(res);
    //         // setMessages(res.data.content);
    //         setMessages(res.data.content.reverse());
    //         setTmpMessage([...tmpMessage, res.data.content]);
    //     });
    // }, [roomIdState])

    // 수정 전 코드
    // useEffect(() => {
    //     const token = Cookies.get("ACCESS_TOKEN");
    //     if (!roomIdState) { return; }
    //     // clientRef.current(WebSocket 클라이언트)가 존재하는지 확인
    //     if (clientRef.current) {
    //         // 클라이언트의 채팅방 구독이 존재하는지 확인, 존재하면 unsubscribe
    //         if (!clientRef.current.connected) {
    //             console.log("No underlying STOMP connection.");
    //             return;
    //         }

    //         if (subscriptionRef.current) {
    //             subscriptionRef.current.unsubscribe();
    //         }

    //         // 새로운 구독 생성
    //         subscriptionRef.current = clientRef.current.subscribe(
    //             `/chat/${roomIdState}`,
    //             (message) => {
    //                 if (message.body) {
    //                     if (message.headers.lastReadMessage) {
    //                         setHeaderState(message.headers)
    //                     }
    //                     let newMessage = JSON.parse(message.body);
    //                     setMessages((prevMessages) => [...prevMessages, newMessage]);
    //                 }
    //             }
    //         );
    //         // setCurrentRoom(roomId);
    //         getAPI(`/chat/${roomIdState}`).then((res) => {
    //             console.log(res);
    //             // setMessages(res.data.content);
    //             setMessages(res.data.content.reverse());
    //             setTmpMessage([...tmpMessage, res.data.content]);
    //         });
    //     }
    //     // 클라이언트가 없는 경우 새 클라이언트 생성하고 구독
    //     else {
    //         const newClient = new Client({
    //             webSocketFactory: () =>
    //                 new SockJS(`${process.env.REACT_APP_SERVER_URL}/chat/connect`),
    //             debug: (str) => {
    //                 console.log(str);
    //             },
    //             onConnect: (frame) => {
    //                 console.log("Connected: " + frame);

    //                 // 새로운 구독 생성
    //                 subscriptionRef.current = newClient.subscribe(
    //                     `/chat/${roomIdState}`,
    //                     (message) => {
    //                         if (message.body) {
    //                             if (message.headers.lastReadMessage) {
    //                                 setHeaderState(message.headers)
    //                             }
    //                             let newMessage = JSON.parse(message.body);
    //                             setMessages((prevMessages) => [...prevMessages, newMessage]);
    //                         }
    //                     }
    //                 );
    //             },
    //             beforeConnect: () => {
    //                 newClient.connectHeaders["ACCESS_TOKEN"] = `Bearer ${token}`;
    //             },
    //             onStompError: (frame) => {
    //                 console.log("Broker reported error: " + frame.headers["message"]);
    //                 console.log("Additional details: " + frame.body);
    //                 if (errorCount.current < 1) {
    //                     errorCount.current += 1;
    //                 }
    //             },
    //         });

    //         const originalOnWebSocketClose =
    //             newClient.onWebSocketClose.bind(newClient);

    //         newClient.onWebSocketClose = (evt) => {
    //             if (errorCount.current >= 1) {
    //                 console.log("연결 실패 해서 끊김!");
    //                 newClient.deactivate();
    //                 errorCount.current = 0;
    //                 return;
    //             }

    //             originalOnWebSocketClose(evt);
    //         };

    //         newClient.activate();
    //         // 현재 누른 roomId 값 저장
    //         // setCurrentRoom(roomId);
    //         getAPI(`/chat/${roomIdState}`).then((res) => {
    //             console.log(res);
    //             // setMessages(res.data.content);
    //             setMessages(res.data.content.reverse());
    //             setTmpMessage([...tmpMessage, res.data.content]);
    //         });

    //         // Set the new client as current
    //         clientRef.current = newClient;
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [roomIdState])


    // 수정 후 코드
    useEffect(() => {
        const token = Cookies.get("ACCESS_TOKEN");
        if (!roomIdState) { return; }
        
        const handleGetAPI = async () => {
          try {
            const res = await getAPI(`/chat/${roomIdState}`);
            console.log(res);
            console.log('1번이 먼저 실행')
            setMessages(res.data.content.reverse());
            setTmpMessage([...tmpMessage, res.data.content]);
            
            // 새로운 구독 생성
            subscriptionRef.current = clientRef.current.subscribe(
              `/chat/${roomIdState}`,
              (message) => {
                if (message.body) {
                  if (message.headers.lastReadMessage) {
                    setHeaderState(message.headers)
                  }
                  let newMessage = JSON.parse(message.body);
                  setMessages((prevMessages) => [...prevMessages, newMessage]);
                }
              }
            );
          } catch (error) {
            console.error(error);
          }
        };
      
        // clientRef.current(WebSocket 클라이언트)가 존재하는지 확인
        if (clientRef.current) {
          // 클라이언트의 채팅방 구독이 존재하는지 확인, 존재하면 unsubscribe
          if (!clientRef.current.connected) {
            console.log("No underlying STOMP connection.");
            return;
          }
      
          if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
          }
      
          handleGetAPI();
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
      
              handleGetAPI();
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
          handleGetAPI();
      
          // Set the new client as current
          clientRef.current = newClient;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [roomIdState]);
      

    useEffect(() => {
        if (headerState.lastReadMessage) {
            let updatedMessages = [...messages];
            let indexStart = updatedMessages.findIndex(msg => msg.chatRecordId === Number(headerState.lastReadMessage));
            if (indexStart !== -1) {
                console.log('2번이 나중에 실행돼야 함')
                for (let i = indexStart ; i < updatedMessages.length; i++) {
                    if (updatedMessages[i].unreadCount > 0) {
                        updatedMessages[i] = { ...updatedMessages[i], unreadCount: updatedMessages[i].unreadCount - 1 };
                    }
                }
            }
            console.log(1)
            setMessages(updatedMessages);
            setHeaderState({})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headerState])

    const sendMessage = (msg) => {
        const token = Cookies.get("ACCESS_TOKEN");
        console.log(roomIdState);
        console.log(msg);
        console.log(clientRef);
        if (input && clientRef.current) {
            clientRef.current.publish({
                destination: `/app/chat/${roomIdState}`,
                headers: { ACCESS_TOKEN: `Bearer ${token}` },
                body: JSON.stringify(msg),
            });
        }
        setInput("");
    };

    const removeChatRoom = (id) => {
        if (subscriptionRef.current) {
            const removeRoom = roomIdList.filter((item) => item !== roomIdState)
            setRoomIdList(removeRoom)
            subscriptionRef.current.unsubscribe();
        }
    }

    return (
        <div>
            <div style={style}
                className="w-[360px] h-[488px] fixed flex-col right-5 bottom-5 z-10 shadow-cm rounded-3xl bg-white flex outline-none"
            >
                <div className=''>
                    <div className='flex h-[55px] px-4 justify-between items-center gap-x-[10px]'>
                        <div className='flex gap-x-2'>
                            <div>이미지</div>
                            <span>클럽명</span>
                        </div>
                        <div>
                            <button
                                onClick={() => removeChatRoom(roomIdState)}
                                className='text-[#FF7700] font-semibold text-[20px] w-[30px] h-[30px] text-right'>X</button>
                        </div>
                    </div>
                    <div className="w-[360px] h-px bg-gray-200"></div>
                </div>
                <div className='h-[370px] w-full overflow-y-auto'>
                    {messages.map((message, index) => {
                        const sentAt = message.sentAt
                        const formattedTime = new Date(sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                        return userId === message.senderId ? (
                            <div className="flex justify-end px-4">
                                <div key={index} className=" flex-end">
                                    <div className="flex justify-end">
                                        {message.senderNickname}
                                    </div>
                                    <div className="flex gap-x-1 items-center justify-end">
                                        <div className='text-[8px] h-[50px] flex mx-[-5px] items-end gap-x-2'>
                                            <span>{message.unreadCount}</span>
                                            <span>{formattedTime}</span>
                                        </div>
                                        <div className="flex p-[10px] rounded-lg m-[10px] gap-[10px] text-white bg-[#0084ff]">
                                            {console.log(message)}
                                            {message.content + " "}
                                        </div>
                                        <img src={message.senderProfileUrl} className="rounded-full w-[40px] h-[40px]" alt="user_profile_image" />
                                    </div>
                                </div>
                            </div>
                        ) : -1 === message.senderId ? (
                            <div className="flex items-center justify-center">
                                <div key={index}>
                                    <div className="flex gap-x-1 items-center justify-center">
                                        <div className="flex items-center justify-center w-[300px] p-[5px] rounded-lg m-[10px] gap-[10px] bg-[#E5E5E9]">
                                            {message.content + " "}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-start px-4">
                                <div key={index}>
                                    <div>
                                        <div className="flex justify-start">
                                            {message.senderNickname}
                                        </div>
                                    </div>
                                    <div className="flex gap-x-1 items-center">
                                        <img src={message.senderProfileUrl} className="rounded-full w-[40px] h-[40px]" alt="user_profile_image" />
                                        <div className="flex p-[10px] rounded-lg m-[10px] gap-[10px] bg-[#E5E5E9]">
                                            {message.content + " "}
                                        </div>
                                        <div className='text-[8px] h-[50px] flex mx-[-5px] items-end gap-x-2'>
                                            <span>{formattedTime}</span>
                                            <span>{message.unreadCount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
                <div>
                    <div className="w-[360px] h-px bg-gray-200"></div>
                    <div className='flex h-[55px] items-center px-4 gap-x-3'>
                        <button className='bg-[#FF7701] h-[28px] w-[28px] rounded-full text-white flex items-center justify-center'>+</button>
                        <input
                            onKeyPress={handleOnKeyPress}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="px-2 rounded-3xl w-[206px] h-[28px] bg-gray-200 focus:outline-none focus:ring-0"
                            placeholder="내용을 입력해주세요"
                        />
                        <button
                            onClick={() => sendMessage({
                                content: input,
                            })}
                            className='w-[70px] h-[28px] bg-[#FF7701] text-white rounded-3xl'>전송</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow
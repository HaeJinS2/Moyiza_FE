import React, { useEffect, useRef, useState } from 'react'
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { getAPI } from '../axios';
import { useRecoilState } from "recoil";
import { userIdState } from "../states/userStateTmp";
import { roomIdStates, roomMsgStates } from '../states/chatState';

function ChatWindow({ roomIdState, style, clientRef, subscriptionRefAlarm, roomInfo }) {
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
    // eslint-disable-next-line
    const [roomMsgState, setRoomMsgState] = useRecoilState(roomMsgStates);
    const [headerState, setHeaderState] = useState({})
    const [page, setPage] = useState(2);
    
    const messagesEndRef = useRef(null);
    const errorCount = useRef(0); // 에러 카운트 상태를 직접 관리
    // const clientRef = useRef(null); // client를 useRef로 설정
    const subscriptionRef = useRef(null);
    const isHandleGetAPIRunning = useRef(false);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


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

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage({
                content: input,
            });
        }
    };


    // 수정 후 코드
    // 1. 이미 구독이 있으면 구독취소
    // 2. 겟요청으로 방내용 가져오고 채팅방 구독
    // 3. else -> 

  // Fetches new data
  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const res = await getAPI(`/chat/${roomIdState}?size=17&page=${nextPage}`);
    const reversedContent = [...res.data.content].reverse();
    setMessages((prevMessages) => [...reversedContent, ...prevMessages]);
    setPage(nextPage);
  };

  // Checks if user has scrolled to the bottom
  const handleScroll = (e) => {
    const { scrollTop } = e.currentTarget;
    if (scrollTop === 0) {
      fetchMoreData();
    }
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    useEffect(() => {
        const token = Cookies.get("ACCESS_TOKEN");

        if (!roomIdState) { return; }
        // if (roomIdState === prevRoomIdStateRef.current) { return; }


        const handleGetAPI = async () => {

            if (isHandleGetAPIRunning.current) { return; }
            isHandleGetAPIRunning.current = true;
            try {
                const res = await getAPI(`/chat/${roomIdState}?size=8&page=0`);

                setMessages(res.data.content.reverse());
                setTmpMessage([...tmpMessage, res.data.content]);

                if (clientRef.current.connected) {

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
                    subscriptionRefAlarm?.current[roomIdState].unsubscribe();
                }


            } catch (error) {
                console.error(error);
            } finally {
                isHandleGetAPIRunning.current = false; // <--- 실행 완료로 표시
            }
        };
        if (clientRef.current && clientRef.current.connected && subscriptionRefAlarm.current) {
            // if (!clientRef.current.connected) {
            //     console.log("No underlying STOMP connection.");
            //     return;
            // }
            // if (subscriptionRef.current) {
            //     console.log(123)
            //     subscriptionRef.current.unsubscribe();
            // }
            handleGetAPI();



        }
        else {
            const newClient = new Client({
                webSocketFactory: () =>
                    new SockJS(`${process.env.REACT_APP_SERVER_URL}/chat/connect`),
                debug: (str) => {
                },
                onConnect: (frame) => {
                    handleGetAPI();
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
                newClient.activate();
                originalOnWebSocketClose(evt);
            };

            newClient.activate();
            clientRef.current = newClient;

            newClient.debug = function (str) {
                // Do nothing. This will effectively silence the logs.
              };
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomIdState, subscriptionRefAlarm, clientRef]);




    useEffect(() => {
        if (headerState.lastReadMessage) {
            let updatedMessages = [...messages];
            let indexStart = updatedMessages.findIndex(msg => msg.chatRecordId === Number(headerState.lastReadMessage));
            if (indexStart !== -1) {
                for (let i = indexStart + 1; i < updatedMessages.length; i++) {
                    if (updatedMessages[i].unreadCount > 0) {
                        updatedMessages[i] = { ...updatedMessages[i], unreadCount: updatedMessages[i].unreadCount - 1 };
                    }
                }
            }
            setMessages(updatedMessages);
            setHeaderState({})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headerState])

    const sendMessage = (msg) => {
        const token = Cookies.get("ACCESS_TOKEN");
        if (clientRef.current.connected) {
            if (input && clientRef.current) {
                clientRef.current.publish({
                    destination: `/app/chat/${roomIdState}`,
                    headers: { ACCESS_TOKEN: `Bearer ${token}` },
                    body: JSON.stringify(msg),
                });
            }
            setInput("");
        } else {
            // If not connected, show an error message
            console.error('Unable to send message. Client is not connected.');
        }
    };

    const removeChatRoom = (id) => {
        if (subscriptionRef.current) {
            const removeRoom = roomIdList.filter((item) => item !== roomIdState)
            setRoomIdList(removeRoom)
            subscriptionRef.current.unsubscribe();
            if (subscriptionRefAlarm.current) {
                subscriptionRefAlarm.current[id] = clientRef.current.subscribe(
                    `/chatalarm/${id}`,
                    (message) => {
                        if (message.body) {
                            let newMessage = JSON.parse(message.body);
                            setRoomMsgState((prevMessages) => [...prevMessages, newMessage]);
                        }
                    }
                );
            }
        }
    }

    return (
        <div>
            <div style={style}
                className="w-[360px] h-[488px] fixed flex-col right-5 bottom-5 z-10 shadow-cm rounded-3xl bg-white flex outline-none"
            >
                <div className=''>
                    <div className='flex h-[55px] px-4 justify-between items-center gap-x-[10px]'>
                        <div className='flex gap-x-2 items-center'>
                            <img
                            className='aspect-square object-cover h-[36px] w-[36px] rounded-full'
                            src={roomInfo?.chatThumbnail}
                            alt="chat_thumbnail"
                            />
                            <span className='text-[24px]'>{roomInfo?.roomName}</span>
                        </div>
                        <div>
                            <button
                                onClick={() => removeChatRoom(roomIdState)}
                                className='text-[#FF7700] font-semibold text-[20px] w-[30px] h-[30px] text-right'>X</button>
                        </div>
                    </div>
                    <div className="w-[360px] h-px bg-gray-200"></div>
                </div>
                <div 
                onScroll={handleScroll}
                className='h-[370px] w-full overflow-y-auto'>
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
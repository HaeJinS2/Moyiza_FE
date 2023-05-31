import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useRecoilState } from 'recoil';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { userEmailState } from "../states/userStateTmp";
import { getAPI } from "../axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [emailState, setEserEmailState] = useRecoilState(userEmailState);
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');
  const [roomId, setRoomId] = useState('');
  const roomIdTmp = [1, 2, 3, 19]
  const [currentRoom, setCurrentRoom] = useState('');

  const clientRef = useRef(null); // client를 useRef로 설정
  const subscriptionRef = useRef(null); 
  
  useEffect(() => {
    getAPI(`/user/mypage`).then((res) => {
      setRoomId(res.data)
      console.log(roomId)
    })
      .catch((error) => console.log(error))
  }, [roomId])

  useEffect(() => {
    const token = Cookies.get("ACCESS_TOKEN");
    console.log(token)
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setEserEmailState({ userEmail: decoded.sub })
        console.log("Decoded sub: ", decoded.sub);
        console.log(emailState)
      } catch (error) {
        console.error("토큰 오류", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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
    // clientRef.current(WebSocket 클라이언트)가 존재하는지 확인
    if (clientRef.current) {
      //  클라이언트의 채팅방 구독이 존재하는지 확인, 존재하면 unsubscribe
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      // 새로운 구독 생성
      subscriptionRef.current = clientRef.current.subscribe(`/chat/clubchat/${roomId}`, (message) => {
        if (message.body) {
          let newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });
    } else {
      // 클라이언트가 없는 경우 새 클라이언트 생성하고 구독
      clientRef.current = new Client({
        webSocketFactory: () => new SockJS("http://3.34.182.174/chat/connect"),
        debug: (str) => {
          console.log(str);
        },
        onConnect: (frame) => {
          console.log("Connected: " + frame);
          // 새로운 구독 생성
          subscriptionRef.current = clientRef.current.subscribe(`/chat/clubchat/${roomId}`, (message) => {
            if (message.body) {
              let newMessage = JSON.parse(message.body);
              setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
          });
        },
      });
      clientRef.current.activate();
    }
    // 현재 누른 roomId 값 저장
    setCurrentRoom(roomId);
    setMessages([]);
  };
  const sendMessage = (msg) => {
    console.log(currentRoom)
    console.log(msg);
    console.log(clientRef);
    console.log(emailState.userEmail)
    if (clientRef.current) {
      clientRef.current.publish({
        destination: `/app/send/clubchat/${currentRoom}`,
        body: JSON.stringify(msg),
      });
    }
    setInput('')
    setInput2('')
  };

  // Render the messages from the server.
  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li className="flex gap-[10px]" key={index}>
            {console.log(message)}
            내용 : {message.content + " "}
            보낸사람 : {message.senderNickname}
          </li>
        ))}
      </ul>

      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="내용" />
      <button
        className="border-2 border-rose-400"
        onClick={() =>
          sendMessage({ content: input, senderNickname: emailState.userEmail })
        }
      >
        Send Message1
      </button>
      <br />
      <input value={input2} onChange={(e) => setInput2(e.target.value)} placeholder="내용" />
      <button
        className="border-2 border-rose-400"
        onClick={() => sendMessage({ content: input2, senderNickname: (emailState.userEmail) })}
      >
        Send Message2
      </button>
      {roomIdTmp.map((id) => (
        <button className="w-[100px] h-[50px] bg-slate-300" key={id} onClick={() => connectToRoom(id)}>Room {id}</button>
      ))}
    </div>
  );
};

export default Chat;

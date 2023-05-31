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

  const clientRef = useRef(null); // client를 useRef로 설정

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


  useEffect(() => {
    clientRef.current = new Client({ // clientRef.current에 직접 할당
      webSocketFactory: () => new SockJS("http://3.34.182.174/chat/connect"),
      debug: (str) => {
        console.log(str);
      },
      onConnect: (frame) => {
        console.log("Connected: " + frame);

        clientRef.current.subscribe("/chat/clubchat/19", (message) => { // clientRef.current 사용
          if (message.body) {
            let newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        });
      },
          // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    clientRef.current.activate(); // clientRef.current 사용

    return () => {
      if (clientRef.current) { // clientRef.current 확인
        clientRef.current.deactivate();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (msg) => {
    console.log(msg);
    console.log(clientRef);
    console.log(emailState.userEmail)
    if (clientRef.current) {
      clientRef.current.publish({
        destination: "/app/send/clubchat/19",
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
    </div>
  );
};

export default Chat;

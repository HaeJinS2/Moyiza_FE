import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const clientRef = useRef(null); // client를 useRef로 설정

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
    if (clientRef.current) {
      clientRef.current.publish({
        destination: "/app/send/clubchat/19",
        body: JSON.stringify(msg),
      });
    }
  };

  // Render the messages from the server.
  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {console.log(message)}
            {message.content}
            {message.senderNickname}
          </li>
        ))}
      </ul>

      <button
        className="border-2 border-rose-400"
        onClick={() =>
          sendMessage({ content: "Hello, server!", senderNickname: "2" })
        }
      >
        Send Message
      </button>
      <button
        className="border-2 border-rose-400"
        onClick={() => sendMessage({ content: "Hello, 123!", user: "3" })}
      >
        Send Message
      </button>
    </div>
  );
};

export default Chat;

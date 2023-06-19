import React, { useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { userNicknameState, isLoggedInState } from './states/userStateTmp';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import Router from './shared/Router';
import { initAmplitude } from './utils/amplitude';
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { roomIdListStates, roomMsgStates } from './states/chatState'

function AppContent() {
  // eslint-disable-next-line
  const [nicknameState, setNicknameState] = useRecoilState(userNicknameState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const roomIdListState = useRecoilValue(roomIdListStates);
  const [roomMsgState, setRoomMsgState] = useRecoilState(roomMsgStates);

  const token = Cookies.get('ACCESS_TOKEN');

  const errorCount = useRef(0); // 에러 카운트 상태를 직접 관리
  const clientRef = useRef(null); // client를 useRef로 설정
  const subscriptionRef = useRef({});

  useEffect(() => {
    const token = Cookies.get('ACCESS_TOKEN');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setNicknameState({ userNickname: decoded.nickName });
        setIsLoggedIn(true)
      } catch (error) {
        console.error('토큰 오류', error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);



  useEffect(() => {


    const handleSub = () => {
      // if (clientRef.current && clientRef.current.connected) {
      roomIdListState.forEach((id) => {
        if (subscriptionRef.current) {
          if (subscriptionRef.current[id]) {
          } else {
          subscriptionRef.current[id] = clientRef.current.subscribe(
            `/chatalarm/${id}`,
            (message) => {
              if (message.body) {
                let newMessage = JSON.parse(message.body);
                setRoomMsgState((prevMessages) => [...prevMessages, newMessage]);
              }
            }
          );
        }}
      });
      // }

    }

    if(isLoggedIn) {
    if (clientRef.current && clientRef.current.connected) {
      handleSub();
    } else {
      
      const newClient = new Client({
        webSocketFactory: () =>
          new SockJS(`${process.env.REACT_APP_SERVER_URL}/chat/connect`),
        debug: (str) => {
          console.log(str);
        },
        onConnect: (frame) => {
          console.log("Connected: " + frame);
          handleSub();
        },
        beforeConnect: () => {
          newClient.connectHeaders["ACCESS_TOKEN"] = `Bearer ${token}`;
        },
        onStompError: (frame) => {
          console.log("Broker reported error: " + frame.headers["message"]);
          console.log("Additional details: " + frame.body);
          if (errorCount.current < 3) {
            errorCount.current += 1;
          }
        },
      });

      const originalOnWebSocketClose =
        newClient.onWebSocketClose.bind(newClient);

        newClient.onWebSocketClose = (evt) => {
          console.log("WebSocket connection closed.~!~!");  // 로그 추가
          if (errorCount.current >= 3) {
            console.log("Connection failed!");
            newClient.deactivate();
            errorCount.current = 0;
            return;
          }
        
          originalOnWebSocketClose(evt);
        };
        
        

      newClient.activate();
      clientRef.current = newClient;

      newClient.debug = function (str) {
        // Do nothing. This will effectively silence the logs.
      };
    }
  }
    // setClient(clientRef)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomIdListState, isLoggedIn]);

  useEffect(() => {
  }, [roomMsgState])

  useEffect(() => {
    initAmplitude();
  }, []);

  return <Router clientRef={clientRef} subscriptionRefAlarm={subscriptionRef} />;
}

export default AppContent;
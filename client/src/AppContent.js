import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userNicknameState, isLoggedInState } from './states/userStateTmp';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import Router from './shared/Router';
import { initAmplitude } from './utils/amplitude';

function AppContent() {
  const [nicknameState, setNicknameState] = useRecoilState(userNicknameState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const token = Cookies.get('ACCESS_TOKEN');




  useEffect(() => {
    const token = Cookies.get('ACCESS_TOKEN');
    console.log("token", token);
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setNicknameState({ userNickname: decoded.nickName });
        setIsLoggedIn(true)
        console.log('Decoded sub: ', decoded.nickName);
        console.log(nicknameState);
      } catch (error) {
        console.error('토큰 오류', error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    console.log("로그인했나?", isLoggedIn)
  }, [isLoggedIn])


  useEffect(() => {
    initAmplitude();
  }, []);

  return <Router />;
}

export default AppContent;
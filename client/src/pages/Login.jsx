import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import axios from 'axios';
import { userState } from '../states/userState';
import { useRecoilState } from 'recoil';
import { parseJwt, setCookie } from '../utils/jwtUtils';
import Navbar from '../component/Navbar';
// import kakao from '../component/img/kakao.png';
// import naver from '../component/img/naver.png';
// import google from '../component/img/google.png'

function Login() {
    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();

    console.log({ user })

    const goSignUp = () => {
        navigate('/signup');
    };

    const goMain = () => {
        navigate('/');
    };

    const handleFind = () => {
        alert('준비 중입니다');
      };

    const [userloginInput, setUserloginInput] = useState({
        email: '',
        password: ''
    });

    const emailChangeHandler = (e) => {
        setUserloginInput({
            ...userloginInput,
            email: e.target.value
        });
    };

    const pwChangeHandler = (e) => {
        setUserloginInput({
            ...userloginInput,
            password: e.target.value
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const url = `http://3.34.182.174/user/login`;
        const data = {
            ...userloginInput
        };
        try {
            const response = await axios.post(url, data);

            const accessToken = response.headers.access_token;
            const refreshToken = response.headers.refresh_token;

            const jwt1 = accessToken.replace('Bearer ', '');
            const jwt2 = refreshToken.replace('Bearer ', '');
            setCookie('ACCESS_TOKEN', jwt1, 1)
            setCookie('REFRESH_TOKEN', jwt2, 1);
            const email = parseJwt(jwt1).sub;
            setUser(email);

            // 사용자를 로컬 스토리지에 저장
            localStorage.setItem('user', email);

            // await axios.get('http://3.34.182.174/user/mypage',{ email },{ headers:{ ACCESS_TOKEN: jwt}})

            // loginMutation.mutate(response.data);
            // console.log(response.data);
            alert('로그인 성공');
            goMain();
        } catch (error) {
            console.log(error);
            alert('로그인 실패');
            setUserloginInput({ email: '', password: '' });
        }
    };

    const postAPI = async (url, data) => {
        const response = await axios.post(url, data);
        return response.data;
        //         const accessToken = Cookies.get('ACCESS_TOKEN');
        //   const refreshToken = Cookies.get('REFRESH_TOKEN');

        //   const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${accessToken}`
        //   };

        //   try {
        //     const response = await axios.post(url, data, { headers });
        //     return response.data;
        //   } catch (error) {
        //     if (error.response && error.response.status === 401 && refreshToken) {
        //       // 토큰 갱신 로직 수행
        //       const refreshUrl = 'http://3.34.182.174/user/refresh';
        //       const refreshData = {
        //         refreshToken
        //       };

        //       try {
        //         const refreshResponse = await axios.post(refreshUrl, refreshData);
        //         const newAccessToken = refreshResponse.data.ACCESS_TOKEN;
        //         const newRefreshToken = refreshResponse.data.REFRESH_TOKEN;

        //         // 갱신된 토큰을 쿠키에 저장
        //         Cookies.set('ACCESS_TOKEN', newAccessToken);
        //         Cookies.set('REFRESH_TOKEN', newRefreshToken);

        //         // 갱신된 토큰을 헤더에 포함하여 다시 요청
        //         const newHeaders = {
        //           'Content-Type': 'application/json',
        //           'Authorization': `Bearer ${newAccessToken}`
        //         };

        //         const retryResponse = await axios.post(url, data, { headers: newHeaders });
        //         return retryResponse.data;
        //       } catch (refreshError) {
        //         // 토큰 갱신 실패 시 로그아웃 처리 등 필요한 작업 수행
        //         // ...
        //       }
        //     }

        //     // 그 외의 오류 처리
        //     throw error;
        //   }
    };

    const loginMutation = useMutation(postAPI, {
        onSuccess: (data) => {
            console.log('data', data);
            Cookies.set('ACCESS_TOKEN', data.ACCESS_TOKEN);
            Cookies.set('REFRESH_TOKEN', data.REFRESH_TOKEN);
        },
        onError: (error) => {
            // alert('로그인 실패!');
            console.log(loginMutation)
        }

    });

    const isEmail = (email) => {
        const emailRegex = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
        return emailRegex.test(email);
    };

    const isEmailValid = isEmail(userloginInput.email);

    const isPw = (pw) => {
        const pwRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return pwRegex.test(pw);
    };

    const isPwValid = isPw(userloginInput.password);

    const isAllValid = isEmailValid && isPwValid;

    const activeBtn = isAllValid ? undefined : 'disabled';

    // const [userEmail, setUserEmail] = useState('');
    // const [, setUser] = useRecoilState(userState);
    useEffect(() => {
        const emailCookie = getCookie('email');
        if (emailCookie) {
            setUser(emailCookie);
        }
    }, [setUser]);

    const getCookie = (name) => {
        const matches = document.cookie.match(
            new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
        );
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    // {/* 회원가입 이동 */}
    // {/* <div style={{ display: 'flex' }} className="flex items-center justify-center">
    //     <Desc>Don't have an account?</Desc>
    //     <button className="bg-white text-rose-400 rounded-xl px-4 py-1 shadow hover:shadow-lg " onClick={goSignUp}>
    //         Create Profile
    //     </button>
    // </div> */}

    return (
        <>
            <Navbar />
            <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <LoginContainer
                    style={{ marginTop: '120px', width: '500px', height: '650px' }}
                    className=" p-8 shadow-md w-full h-full rounded-lg bg-gray-50 flex items-center justify-center"
                >
                    <form
                        onSubmit={submitHandler}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                    >
                        <div className="mb-3 mt-3" style={{ minHeight: '48px' }}>
                            <input placeholder="이메일" value={userloginInput.email} onChange={emailChangeHandler} className="shadow-md w-80 h-10 rounded-lg mb-3 px-3.5 py-2 " />
                            {!isEmailValid && userloginInput.email.length > 0 && (
                                <p className="inputCheck text-rose-400 text-xs absolute ">* 이메일 양식을 맞춰주세요!</p>
                            )}

                        </div>
                        <div className="mb-3 mt-3" style={{ minHeight: '48px' }}>
                            <input placeholder="비밀번호" value={userloginInput.password} onChange={pwChangeHandler} className="shadow-md w-80 h-10 rounded-lg mb-3 px-3.5 py-2" />

                            {!isPwValid && userloginInput.password.length > 0 && (
                                <p className="inputCheck text-rose-400 text-xs absolute">* 비밀번호는 대소문자, 숫자, 특수문자 포함 8자리 이상 적어주세요!</p>
                            )}
                        </div>

                        <button className={`${activeBtn} bg-rose-400 text-white rounded-xl w-80 h-10 mt-4 shadow hover:shadow-lg`}>
                            Login
                        </button>
                    </form>
                    <Signup className={`mt-11`}>
                        <div onClick={goSignUp} style={{ cursor: 'pointer' }}>회원가입</div>
                        <div>|</div>
                        <div onClick={handleFind} style={{ cursor: 'pointer' }}>이메일 찾기</div>
                        <div>|</div>
                        <div onClick={handleFind} style={{ cursor: 'pointer' }}>비밀번호 찾기</div>
                    </Signup>
                    <Social className={`mt-11`}>
                        <a href="/oauth2/authorization/kakao">
                            <button type='button' style={{ display: 'flex', backgroundColor: '#FEE500', color: '#191919' }} className={`text-white rounded-xl w-80 h-10 mt-4 shadow hover:shadow-lg flex items-center justify-center`}>
                                {/* <img src={kakao} alt='' className="mr-2 w-10 h-10 object-contain" style={{backgroundColor: 'transparent'}}></img> */}
                                카카오톡 로그인</button>
                        </a>
                        <a href="/oauth2/authorization/naver">
                            <button type='button' style={{ display: 'flex', backgroundColor: '#2db300', color: 'white' }} className={`text-white rounded-xl w-80 h-10 mt-4 shadow hover:shadow-lg flex items-center justify-center`}>
                                {/* <img src={naver} alt='' className="mr-2 w-10 h-10 object-contain"></img> */}
                                네이버 로그인</button>
                        </a>
                        <a href="/oauth2/authorization/google">
                            <button type='button' style={{ display: 'flex', backgroundColor: 'white', color: '#191919' }} className={`text-white rounded-xl w-80 h-10 mt-4 shadow hover:shadow-lg flex items-center justify-center`}>
                                {/* <img src={google} alt='' className="mr-2 w-10 h-10 object-contain"></img> */}
                                구글 로그인</button>
                        </a>
                    </Social>
                </LoginContainer>
            </div>
        </>
    );
}

export default Login;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Signup = styled.div`
  display: flex;
  align-items: center;
  color: #626262;
  width: 300px;
  justify-content: space-between;
`
const Social = styled.div`
display: flex;
align-items: center;
flex-direction: column;
`
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import { useMutation } from 'react-query';
// import Cookies from 'js-cookie';
import axios from 'axios';
import { userState } from '../states/userState';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../states/userStateTmp';
import { parseJwt, setCookie } from '../utils/jwtUtils';
// import Navbar from '../component/Navbar';
import kakao from '../component/img/kakao.png';
import naver from '../component/img/naver.png';
import google from '../component/img/google.png'
import swal from 'sweetalert';

function Login() {
    // 소셜로그인   

    const KAKAO_AUTH_URL = `https://hohomii.shop:8443/oauth2/authorization/kakao?redirect_uri=https://mo2za.com/oauth/redirect`;
    const NAVER_AUTH_URL = `https://hohomii.shop:8443/oauth2/authorization/naver?redirect_uri=https://mo2za.com/oauth/redirect`;
    const GOOGLE_AUTH_URL = `https://hohomii.shop:8443/oauth2/authorization/google?redirect_uri=https://mo2za.com/oauth/redirect`;
    
    const [isLoggedIn2, setIsLoggedIn2] = useRecoilState(isLoggedInState);
    console.log(isLoggedIn2)
    const kakaologin = () => {
        window.location.href = KAKAO_AUTH_URL;
    }
    const naverlogin = () => {
        window.location.href = NAVER_AUTH_URL;
    }
    const googlelogin = () => {
        window.location.href = GOOGLE_AUTH_URL;
    }

    // const handleAuthorizationCode = async () => {
    //     const url = new URL(window.location.href);
    //     const code = url.searchParams.get('code');
    //     const currentUrl = window.location.href;
    //     console.log('code', code);

    //     if (code) {
    //         try {
    //             let apiUrl = '';

    //             if (currentUrl.includes('/oauth2/code/kakao')) {
    //                 apiUrl = `http://13.125.51.14/login/oauth2/code/kakao`;
    //                 console.log('code', code);
    //             } else if (currentUrl.includes('/oauth2/code/naver')) {
    //                 console.log('code', code);
    //                 apiUrl = `http://ec2-13-125-51-14.ap-northeast-2.compute.amazonaws.com/login/oauth2/code/naver`;
    //             } else if (currentUrl.includes('/oauth2/code/google')) {
    //                 apiUrl = `http://ec2-13-125-51-14.ap-northeast-2.compute.amazonaws.com/login/oauth2/code/google`;
    //                 console.log('code', code);
    //             }

    //             const response = await axios.post(apiUrl, { code });
    //             console.log(response.data); // 백엔드로부터 받은 응답 데이터 출력

    //         } catch (error) {
    //             console.error(error);
    //             // 오류 처리
    //         }
    //     } else {
    //         console.log('인가 코드가 없습니다.');
    //     }
    // };

    // 페이지 로드 시 인가 코드 처리
    // useEffect(() => {
    //     handleAuthorizationCode();
    // }, []);
    //--------------------------------------------------------------------
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
        swal('준비 중입니다'); 
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
        const url = `${process.env.REACT_APP_SERVER_URL}/login`;
        const data = {
            ...userloginInput
        };
        try {
            const response = await axios.post(url, data);

            const accessToken = response.headers.access_token;
        
            // const refreshToken = response.headers.refresh_token;

            const jwt1 = accessToken.replace('Bearer ', '');
            // const jwt2 = refreshToken.replace('Bearer ', '');
            setCookie('ACCESS_TOKEN', jwt1, 1)
            // setCookie('REFRESH_TOKEN', jwt2, 1);
            const email = parseJwt(jwt1);
            
            setUser(email);

            // 사용자를 로컬 스토리지에 저장
            localStorage.setItem('user', email);
            setIsLoggedIn2(true)
            swal('로그인 성공');
            goMain();
            
        } catch (error) {
            console.log(error);
            swal('로그인 실패');
            setUserloginInput({ email: '', password: '' });
        }
    };

    // const postAPI = async (url, data) => {
    //     const response = await axios.post(url, data);
    //     return response.data;
    // };

    // const loginMutation = useMutation(postAPI, {
    //     onSuccess: (data) => {
    //         console.log('data', data);
    //         Cookies.set('ACCESS_TOKEN', data.ACCESS_TOKEN);
    //         Cookies.set('REFRESH_TOKEN', data.REFRESH_TOKEN);
    //     },
    //     onError: (error) => {
    //         // alert('로그인 실패!');
    //         console.log(loginMutation)
    //     }

    // });

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

    return (
        <>
            <div
                class="flex items-center justify-center"
            >
                <LoginContainer
                    style={{ marginTop: '200px', width: '590px', height: '670px' }}
                    className=" p-8 shadow-md w-full h-full rounded-[50px] bg-gray-50 flex items-center justify-center"
                >
                    <form
                        onSubmit={submitHandler}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                    >
                        <div className="mb-3 mt-3" style={{ minHeight: '48px' }}>
                            <input placeholder="이메일" value={userloginInput.email} onChange={emailChangeHandler} className="shadow-md w-80 h-10 rounded-[50px] mb-3 px-3.5 py-2 " />
                            {!isEmailValid && userloginInput.email.length > 0 && (
                                <p className="inputCheck text-rose-400 text-xs absolute ">* 이메일 양식을 맞춰주세요!</p>
                            )}

                        </div>
                        <div className="mb-3 mt-3" style={{ minHeight: '48px' }}>
                            <input placeholder="비밀번호" value={userloginInput.password} onChange={pwChangeHandler} type="password" className="shadow-md w-80 h-10 rounded-[50px] mb-3 px-3.5 py-2" />

                            {!isPwValid && userloginInput.password.length > 0 && (
                                <p className="inputCheck text-rose-400 text-xs absolute">* 비밀번호는 대소문자, 숫자, 특수문자 포함 8자리 이상 적어주세요!</p>
                            )}
                        </div>

                        <button style={{ backgroundColor: '#FF7F1E' }} className={`${activeBtn} text-white rounded-[50px] w-80 h-10 mt-4 shadow hover:shadow-lg`}>
                            Login
                        </button>
                    </form>
                    <Signup className={`mt-11`}>
                        <div onClick={goSignUp} style={{ cursor: 'pointer' }}>회원가입</div>
                        <div className={`text-gray-400 opacity-50`}>|</div>
                        <div onClick={handleFind} style={{ cursor: 'pointer' }}>이메일 찾기</div>
                        <div className={`text-gray-400 opacity-50`}>|</div>
                        <div onClick={handleFind} style={{ cursor: 'pointer' }}>비밀번호 찾기</div>
                    </Signup>
                    <Social>
                        <button onClick={kakaologin} type='button' style={{ display: 'flex', backgroundColor: 'white' }} className={`rounded-[50px] w-80 h-10 mt-4 shadow hover:shadow-lg flex items-center flex-start`}>
                            <img src={kakao} alt='' className="m-3 p-2 h-full object-contain" style={{ backgroundColor: 'transparent' }}></img>
                            <div className={`mr-4 text-gray-400 opacity-50`}>|</div>
                            카카오톡 로그인</button>

                        <button onClick={naverlogin} type='button' style={{ display: 'flex', backgroundColor: 'white' }} className={`rounded-[50px] w-80 h-10 mt-4 shadow hover:shadow-lg flex items-center flex-start`}>
                            <img src={naver} alt='' className="m-3 p-2 h-full object-contain"></img>
                            <div className={`mr-4 text-gray-400 opacity-50`}>|</div>
                            네이버 로그인</button>

                        <button onClick={googlelogin} type='button' style={{ display: 'flex', backgroundColor: 'white' }} className={`rounded-[50px] w-80 h-10 mt-4 shadow hover:shadow-lg flex items-center flex-start`}>
                            <img src={google} alt='' className="m-3 p-2 h-full object-contain"></img>
                            <div className={`mr-4 text-gray-400 opacity-50`}>|</div>
                            구글 로그인</button>
                    </Social>
                </LoginContainer>
            </div>
        </>
    )
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Signup = styled.div`
  display: flex;
  align-items: center;
  color: #626262;
  width: 300px;
  justify-content: space-between;
`

const Social = styled.div`
    margin-top: 20px;
`
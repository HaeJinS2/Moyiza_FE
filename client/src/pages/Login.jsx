import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import axios from 'axios';
import { userState } from '../states/userState';
import { useRecoilState } from 'recoil';

function Login() {
    // const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();

    const goSignUp = () => {
        navigate('/signup');
    };

    const goMain = () => {
        navigate('/');
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
            loginMutation.mutate(response.data);
            console.log(response.data);
            alert('로그인 성공');
            goMain();
        } catch (error) {
            alert('로그인 실패');
            setUserloginInput({ email: '', password: '' });
        }
    };

    const postAPI = async (url, data) => {
        const response = await axios.post(url, data);
        return response.data;
    };

    const loginMutation = useMutation(postAPI, {
        onSuccess: (data) => {
            console.log('data', data);
            Cookies.set('ACCESS_TOKEN', data.ACCESS_TOKEN);
            Cookies.set('REFRESH_TOKEN', data.REFRESH_TOKEN);
        },
        onError: (error) => {
            // alert('로그인 실패!');
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
    const [, setUser] = useRecoilState(userState);
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
        <LoginContainer>
            <div style={{ display: 'flex' }}>
                <Desc>Don't have an account?</Desc>
                <button className="bg-white text-rose-400 rounded-xl px-4 py-1 shadow hover:shadow-lg" onClick={goSignUp}>
                    Create Profile
                </button>
            </div>
            <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>email</div>
                <input value={userloginInput.email} onChange={emailChangeHandler} className="shadow-md w-64 h-10 rounded-lg mb-4" />
                {!isEmailValid && userloginInput.email.length > 0 && (
                    <p className="inputCheck text-rose-400">* 이메일 양식을 맞춰주세요!</p>
                )}
                <div>password</div>
                <input value={userloginInput.password} onChange={pwChangeHandler} className="shadow-md w-64 h-10 rounded-lg mb-4" />

                {!isPwValid && userloginInput.password.length > 0 && (
                    <p className="inputCheck text-rose-400">* 비밀번호는 대소문자, 숫자, 특수문자 포함 8자리 이상 적어주세요!</p>
                )}
                <button className={`${activeBtn} bg-rose-400 text-white rounded-xl px-4 py-1 shadow hover:shadow-lg`}>
                    Login
                </button>
            </form>
        </LoginContainer>
    );
}

export default Login;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Desc = styled.div``;

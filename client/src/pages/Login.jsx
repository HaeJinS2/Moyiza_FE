import React, { useState } from 'react'
import { postAPI } from '../axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


function Login() {
    //회원가입 페이지 이동
    const navigate = useNavigate();

    const goSignUp = () => {
        navigate('/signup')
    }
    //----------------------------------------------------
    const [userloginInput, SetUserloginInput] = useState({
        email: '',
        password: ''
    });

    const emailChangeHandler = (e) => {
        SetUserloginInput({
            ...userloginInput, email: e.target.value
        })
    }
    const pwChangeHandler = (e) => {
        SetUserloginInput({
            ...userloginInput, password: e.target.value
        })
    }

    //버튼 클릭시 리렌더링 방지
    const submitHandler = (e) => {
        e.preventDefault()
        const url = `/user/login`;
        const data = {
            ...userloginInput
        };
        postAPI(
            url, {
            ...userloginInput
        }
        )
    }


    //유효성 검사-------------------------------------
    // 이메일 유효성 검사
    const isEmail = email => {
        const emailRegex = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
        return emailRegex.test(email);
    };
    const isEmailValid = isEmail(userloginInput.email);
    // 패스워드 유효성 검사
    const isPw = pw => {
        const pwRegex =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return pwRegex.test(pw);
    };
    const isPwValid = isPw(userloginInput.pw);

    // 전체 유효성 검사 후 버튼 활성화
    const isAllValid =
        isEmailValid &&
        isPwValid;
        
    const activeBtn = isAllValid ? 'undefined' : 'disabled';


    console.log(userloginInput);

    return (
        <LoginContainer>
            <div style={{ display: 'flex' }}>
                <Desc>
                    Don't have an account?
                </Desc>
                <button className="bg-white text-rose-400 rounded-xl px-4 py-1 shadow hover:shadow-lg" onClick={goSignUp}>Create Profile</button>
            </div>
            <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>email</div>
                <input value={userloginInput.email} onChange={emailChangeHandler} className="shadow-md w-64 h-10 rounded-lg mb-4" />
                {!isEmailValid && (
                    <p
                        className="inputCheck text-rose-400"
                        style={{ display: userloginInput.email.length > 0 ? 'block' : 'none' }}
                    >
                        * 이메일 양식을 맞춰주세요!
                    </p>
                )}
                <div>password</div>
                <input value={userloginInput.password} onChange={pwChangeHandler} className="shadow-md w-64 h-10 rounded-lg mb-4" />

                {!isPwValid && (
                    <p
                        className="inputCheck text-rose-400"
                        style={{ display: userloginInput.password.length > 0 ? 'block' : 'none' }}
                    >
                        * 비밀번호는 대소문자, 숫자, 특수문자 포함 8자리 이상 적어주세요!
                    </p>
                )}
                <button className={`${activeBtn} bg-rose-400 text-white rounded-xl px-4 py-1 shadow hover:shadow-lg`}>Login</button>
            </form>
        </LoginContainer>
    )
}

export default Login;

const LoginContainer = styled.div`
    display: flex;
    align-items: center;
`
const Desc = styled.div``
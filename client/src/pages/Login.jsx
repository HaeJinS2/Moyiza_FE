import React, { useState } from 'react'
import { postAPI } from '../axios';
import styled from 'styled-components';
import Container from '../component/Container';

function Login() {
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


    //유효성 검사


    console.log(userloginInput)
    return (
        <LoginContainer>
            <div style={{ display: 'flex' }}>
                <Desc>
                    Don't have an account?
                </Desc>
                <button className="bg-white text-rose-400 rounded-xl px-4 py-1 shadow hover:shadow-lg">Create Profile</button>
            </div>
            <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>email</div>
                <input value={userloginInput.email} onChange={emailChangeHandler} className="shadow-md w-64 h-10 rounded-lg mb-4"/>
                <div>password</div>
                <input value={userloginInput.password} onChange={pwChangeHandler} className="shadow-md w-64 h-10 rounded-lg mb-4"/>
                <button className="bg-rose-400 text-white rounded-xl px-4 py-1 shadow hover:shadow-lg">Login</button>
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
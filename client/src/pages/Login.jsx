import React, { useState } from 'react'
import { postAPI } from '../axios';

function Login() {
    const [userloginInput, SetUserloginInput] = useState({
        email: '',
        password: ''
    });

    const emailChangeHandler = (e) => {
        SetUserloginInput({
            ...userloginInput, email:e.target.value
        })
    }
    const pwChangeHandler = (e) => {
        SetUserloginInput({
            ...userloginInput, password:e.target.value
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
        <form onSubmit={submitHandler}>
            <input value={userloginInput.email} onChange={emailChangeHandler} />
            <input value={userloginInput.password} onChange={pwChangeHandler} />
            <button>로그인하기</button>
        </form>


    )
}

export default Login
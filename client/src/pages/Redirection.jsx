


import React, { useEffect } from 'react'
import { setCookie } from '../utils/jwtUtils';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Redirection() {
    const navigate = useNavigate();
	// const goLogin = () => {
	// 	navigate('/login');
	// }
    const goMain = () => {
		navigate('/');
	}
    // const goSignup = () => {
	// 	navigate('/signup/social');
	// }
   


    useEffect(() => {
        const url = new URL(window.location.href);
        const getToken = url.searchParams.get('token');
        const confirmToken = url.searchParams.get('confirm');
        const error = url.searchParams.get('error');
       
        console.log('error')
        if (getToken) {
            setCookie('ACCESS_TOKEN', getToken);
            // goSignup();
            // window.location.href = `${process.env.REACT_DEV_URL}/signup/social`
            swal('환영합니다! 회원가입을 완료해주세요');
        } else if (confirmToken) {
            setCookie('ACCESS_TOKEN', confirmToken);
            goMain();
            // window.location.href =`${process.env.REACT_DEV_URL}/`
            swal('로그인 성공!')
        } else if (error) {
            // goLogin();
            // window.location.href = `${process.env.REACT_DEV_URL}/login`
            swal(error);
            // goLogin();
        }
        else {
            // goLogin();
            // window.location.href = `${process.env.REACT_DEV_URL}/login`
            swal('잘못된 접근입니다')
        }

    });




    return (
        <>

        </>
    )
}

export default Redirection
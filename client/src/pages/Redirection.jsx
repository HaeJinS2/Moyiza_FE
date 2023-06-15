


import React, { useEffect } from 'react'
import { setCookie } from '../utils/jwtUtils';
import swal from 'sweetalert';
// import { useNavigate } from 'react-router-dom';

function Redirection() {
    // const navigate = useNavigate();
    // const goLogin = () => {
    // 	navigate('/login');
    // }
    // const goMain = () => {
    // 	navigate('/');
    // }
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
            // swal('환영합니다! 회원가입을 완료해주세요');
            window.location.href = 'http://moyiza.s3-website.ap-northeast-2.amazonaws.com/signup/social'

        } else if (confirmToken) {
            setCookie('ACCESS_TOKEN', confirmToken);
            // goMain();
            swal('로그인 성공!')
            setTimeout(() => {
                swal.close();
                window.location.href = 'http://moyiza.s3-website.ap-northeast-2.amazonaws.com/';
              }, 1500);
              
        } else if (error) {
            // goLogin();
            swal(error);
            setTimeout(() => {
                swal.close();
                window.location.href = 'http://moyiza.s3-website.ap-northeast-2.amazonaws.com/login';
              }, 1500);
            // goLogin();
        }
        else {
            // goLogin();
            swal('잘못된 접근입니다')

            setTimeout(() => {
                swal.close();
                window.location.href = 'http://moyiza.s3-website.ap-northeast-2.amazonaws.com/login';
            }, 1500);
        }
    });




    return (
        <>

        </>
    )
}

export default Redirection
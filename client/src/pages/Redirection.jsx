

// import axios from 'axios';
// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';

// function Redirection() {
//     const code = window.location.search;
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 console.log(process.env.REACT_APP_URL);
//                 const response = await axios.post(`${process.env.REACT_APP_URL}/login/oauth2/code/kakao${code}`);
//                 console.log(response.data);

//                 // 토큰을 받아서 localStorage 같은 곳에 저장하는 코드를 여기에 쓴다.
//                 localStorage.setItem('name', response.data.user_name);

//                 navigate('/login');
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchData();
//     }, [code, navigate]);

//     return (
//         <>
//         <div>로그인 중입니다.</div>
//         </>
//     )
// }

// export default Redirection;

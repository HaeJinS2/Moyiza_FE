import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../component/Navbar';
import UserProfile from '../component/UserProfile';
import Container from '../component/Container';
import { motion } from 'framer-motion';
import ProfileCard from '../component/ProfileCard';
import { useNavigate } from 'react-router-dom';
import { getAPI } from '../axios';
// import BodyContainer from '../component/BodyContainer';

function MyInfoClub() {
    let pageTabs = ['일상속', '하루속'];
    // const [activeTab, setActiveTab] = useState("전체");
    const [activePageTab, setActivePageTab] = useState(pageTabs[0]);

    // const [activeTab, setActiveTab] = useState([pageTabs[0]]); // 배열로 초기화
    const navigate = useNavigate();
    const goClub = () => {
        navigate('/club');
    };
    const [nickname, setNickname] = useState(null);
    const [email, setEmail] = useState(null);
    // const [birth, setBirth] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [clubsInOperationInfo, setClubsInOperationInfo] = useState([]);
    const [clubsInParticipatingInfo, setClubsInParticipatingInfo] = useState([]);
    const divRef = useRef(null);


    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // GET 요청 수행
                // const response = await getAPI('/mypage');
                const response = await getAPI(`/mypage/142`);

                // 응답이 성공적인지 확인
                if (response.status === 200) {
                    const { nickname, email, profileImage, clubsInOperationInfo, clubsInParticipatingInfo } = response?.data;
                    setNickname(nickname);
                    setEmail(email);
                    // setBirth(birth);
                    setProfileImage(profileImage);
                    setClubsInOperationInfo(clubsInOperationInfo);
                    setClubsInParticipatingInfo(clubsInParticipatingInfo);
                }


            } catch (error) {
                console.error(error.response.message);
                // 에러 상태 처리 또는 에러 페이지로 리디렉션 처리
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <div className="flex flex-row" ref={divRef}>
                <Navbar />
                <Container>
                    {/* <section className="h-[calc(100vh-0px)] flex flex-col items-center "> */}
                    <div className='flex'>
                        <div className="mt-[128px]">
                            {/* <div className="flex w-full h-[500px] items-center justify-center "> */}
                            <UserProfile
                                nickname={nickname}
                                profileImage={profileImage}
                                email={email}
                            // birth={birth}
                            />
                        </div>
                        {/* </div> */}
                        {/* <div className="flex flex-col items-center w-full shadow-cm bg-[#FFFCF2] rounded-t-[100px]"> */}


                        
                    </div>
                    {/* </div> */}

                    {/* </section> */}
                </Container>
            </div>
        </>
    );
}

export default MyInfoClub;

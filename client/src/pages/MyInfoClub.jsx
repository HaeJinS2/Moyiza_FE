import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import UserProfile from '../component/UserProfile';
import Container from '../component/Container';
import { motion } from 'framer-motion';
import ProfileCard from '../component/ProfileCard';
import { useNavigate } from 'react-router-dom';
import { getAPI } from '../axios';

function MyInfoClub() {
    let tabs = ['일상속', '하루속'];

    const [activeTab, setActiveTab] = useState([tabs[0]]); // 배열로 초기화
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    // const [clubsInOperation, setClubsInOperation] = useState([]);
    // const [clubsInParticipating, setClubsInParticipating] = useState([]);


    // const navigate = useNavigate();
    // const [userData, setUserData] = useState(null);
    // const [clubsInOperation, setClubsInOperation] = useState([]);
    // const [clubsInParticipating, setClubsInParticipating] = useState([]);

    // useEffect(() => {
    //     getAPI(`/user/mypage`)
    //       .then((response) => {
    //         console.log(response.data);

    //       })
    //       .catch((error) => console.log(error));
    //   }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // GET 요청 수행
                const response = await getAPI('/user/mypage', {

                });

                // 응답이 성공적인지 확인
                if (response.data) {
                    const { userInfo} = response.data;
                    setUserInfo(userInfo);
                    // setClubsInOperation(clubsInOperationInfo);
                    // setClubsInParticipating(clubsInParticipatingInfo);
                    console.log(response)
                }

            
            } catch (error) {
                console.error(error);
                // 에러 상태 처리 또는 에러 페이지로 리디렉션 처리
            }
        };

        fetchData();
    }, []);


    return (
        <>  <div>
        </div>
            <Navbar />
            <Container>
                <section className="h-[calc(100vh-0px)] flex flex-col items-center ">
                    <div className="flex flex-col">
                        {/* <div className="flex w-full h-[500px] items-center justify-center "> */}
                        <UserProfile 
                        userInfo={userInfo}
                        />
                        {/* </div> */}
                        <div className="flex flex-col items-center w-full md:w-[1920px] shadow-cm bg-[#FFFCF2] rounded-t-[100px]">
                            <div className="flex w-[1230px] py-[103px] flex-col gap-y-24 z-10">
                                <div className="flex justify-start items-start w-full">
                                    <span className="text-[20px] text-left">
                                        <div className="flex gap-10 mb-12">
                                            {tabs.map((tab, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setActiveTab([tab])} // 배열로 설정
                                                    className={`${activeTab[0] === tab ? 'text-black' : 'hover:opacity-50'
                                                        } relative rounded-full px-3 py-1.5 text-sm font-medium text-black outline-2 transition focus-visible:outline`}
                                                >
                                                    {activeTab[0] === tab && (
                                                        <motion.div
                                                            layoutId="active-pill"
                                                            transition={{ type: 'spring', duration: 0.5 }}
                                                            className="border-b-[4px] border-black absolute inset-0"
                                                        />
                                                    )}
                                                    <span className="relative text-base z-10 mix-blend">{tab}</span>
                                                </button>
                                            ))}
                                        </div>
                                        <div className='flex justify-between align-center text-[28px]'>
                                            <div className="text-[36px]">세영님의 운영중인 일상속</div>
                                            <div> 총 2개</div>
                                        </div>
                                        {activeTab.map((item, i) => {
                                            return (
                                                <ProfileCard
                                                    className="mb-[30px]"
                                                    page="club"
                                                    key={i}
                                                    title={item.clubTitle}
                                                    content={item.clubContent}
                                                    tag={item.clubTag}
                                                    location={item.clubLocation}
                                                    thumbnail={item.thumbnailUrl}
                                                    id={item.club_id}
                                                    eventId={item.id}
                                                    maxGroupSize={item.maxGroupSize}
                                                    nowMemberCount={item.nowMemberCount}
                                                    navigate={navigate}
                                                />
                                            );
                                        })}
                                        <div className='flex justify-between align-center mt-[90px] text-[28px]'>
                                            <div className="text-[36px]">세영님의 지난 일상속</div>
                                            <div> 총 2개</div>
                                        </div>

                                        {activeTab.map((item, i) => {
                                            return (
                                                <ProfileCard
                                                    className="mb-[30px]"
                                                    page="club"
                                                    key={i}
                                                    title={item.clubTitle}
                                                    content={item.clubContent}
                                                    tag={item.clubTag}
                                                    location={item.clubLocation}
                                                    thumbnail={item.thumbnailUrl}
                                                    id={item.club_id}
                                                    eventId={item.id}
                                                    maxGroupSize={item.maxGroupSize}
                                                    nowMemberCount={item.nowMemberCount}
                                                />
                                            );
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        </>
    );
}

export default MyInfoClub;

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../component/Navbar';
import UserProfile from '../component/UserProfile';
import Container from '../component/Container';
import { motion } from 'framer-motion';
// import ProfileCardOne from '../component/ProfileCard';
import { useNavigate } from 'react-router-dom';
import { getAPI } from '../axios';
import ProfileCardOneday from '../component/ProfileCardOneday';
// import BodyContainer from '../component/BodyContainer';

function MyInfoOneday() {
    let pageTabs = ['일상속', '하루속'];
    // const [activeTab, setActiveTab] = useState("전체");
    const [activePageTab, setActivePageTab] = useState(pageTabs[0]);

    // const [activeTab, setActiveTab] = useState([pageTabs[0]]); // 배열로 초기화
    const navigate = useNavigate();
    const goOneday = () => {
        navigate('/oneday');
    };
    const [nickname, setNickname] = useState(null);
    const [email, setEmail] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [oneDaysInOperationInfo, setOneDaysInOperationInfo] = useState([]);
    const [oneDaysInParticipatingInfo, setOneDaysInParticipatingInfo] = useState([]);
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
                const response = await getAPI('/mypage/142');
                // const response = await getAPI(`/mypage/${user_id}`);

                // 응답이 성공적인지 확인
                if (response.status === 200) {
                    const { nickname, email, profileImage, oneDaysInOperationInfo, oneDaysInParticipatingInfo } = response?.data;
                    setNickname(nickname);
                    setEmail(email);
                    setProfileImage(profileImage);
                    setOneDaysInOperationInfo(oneDaysInOperationInfo);
                    setOneDaysInParticipatingInfo(oneDaysInParticipatingInfo);
                    // console.log(response.data.nickname);
                    // console.log(response.data.clubsInOperationInfo);
                    // console.log(response.data.clubsInParticipatingInfo);
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
                    <div className="flex ">
                        <div className="mt-[128px]">
                            {/* <div className="flex w-full h-[500px] items-center justify-center "> */}
                            <UserProfile
                                nickname={nickname}
                                profileImage={profileImage}
                                email={email}
                            />
                        </div>
                        {/* </div> */}
                        {/* <div className="flex flex-col items-center w-full shadow-cm bg-[#FFFCF2] rounded-t-[100px]"> */}
                            <div className="flex mt-[128px] ml-[48px] flex-col z-10">
                                <div className="flex justify-start items-start w-full">
                                    <span className="text-[20px] text-left">
                                        <div className="flex gap-10">
                                            {pageTabs.map((tab, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        setActivePageTab(tab)
                                                        i === 0 ? navigate("/mypage") : navigate("/mypage/oneday");
                                                    }} // 배열로 설정
                                                    className={`${activePageTab === tab ? 'text-black' : 'hover:opacity-50'
                                                        } relative rounded-full px-3 py-1.5 text-sm font-medium text-black outline-2 transition focus-visible:outline`}
                                                >
                                                    {activePageTab === tab && (
                                                        <motion.div
                                                            layoutId="active-pill-1"
                                                            transition={{ type: 'spring', duration: 0.5 }}
                                                            className="border-b-[4px] border-black absolute inset-0"
                                                        />
                                                    )}
                                                    <span className="relative text-base z-10 mix-blend">{tab}</span>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex flex-col items-start w-full">

                                            <div className="text-[36px] flex flex-col justify-between align-center w-full">

                                                {oneDaysInParticipatingInfo.length === 0 ? (
                                                    <motion.div
                                                        layoutId="active-pill-2"
                                                        transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                                                    // className="border-black inset-0"
                                                    >
                                                        <div className="text-[32px] mt-[53px] flex flex-col justify-between align-center w-full">
                                                            <div className='flex justify-between align-center'>
                                                                <div className="text-[24px]">{nickname ? `${nickname}님의 운영중인 하루속` : null}</div>
                                                                {/* <div className='text-[20px]'>총 0개</div> */}
                                                            </div>
                                                        </div>

                                                        <div className='flex flex-col items-center justify-center w-[1200px]'>
                                                            <p className='text-[20px] mt-[109px] mb-[109px]'>운영중인 하루가 없어요.</p>
                                                        </div>
                                                        <div className='flex justify-between align-center mt-[90px] text-[28px]'>
                                                            <div className="text-[24px]">{nickname ? `${nickname}님의 참여중인 하루속` : null}</div>
                                                            {/* <div className='text-[20px]'> 총 {oneDaysInParticipatingInfo.length}개</div> */}
                                                        </div>
                                                        <div className='flex flex-col items-center justify-center w-[1200px]'>
                                                            <p className='text-[20px] mt-[109px]'>참여중인 하루가 없어요.</p>
                                                            <p className='text-[20px] mt-[5px] mb-[18px]'>하루를 즐기러 가볼까요?</p>
                                                            <button onClick={goOneday} className="edit-icon w-[60px] h-[60px] mb-[109px] bg-[#fff] shadow hover:shadow-lg rounded-full flex items-center justify-center" >
                                                                +
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        layoutId="active-pill-1"
                                                        transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                                                    // className="border-black inset-0"
                                                    >
                                                        <div className="mt-[39px] flex flex-col justify-between align-center w-full">
                                                            <div className='flex justify-between align-center mb-[25px]'>
                                                                <div className="text-[24px]">{nickname ? `${nickname}님의 운영중인 하루속` : ''}</div>
                                                                {/* {oneDaysInOperationInfo.length > 0 && (
                                                                    <div className='text-[20px] '>총 {oneDaysInOperationInfo.length}개</div>
                                                                )} */}
                                                            </div>
                                                            <div className='w-[748px] flex flex-wrap justify-between'>
                                                                {oneDaysInOperationInfo.map((club, i) => {
                                                                    return (
                                                                        <ProfileCardOneday
                                                                            className="mr-[28px]"
                                                                            key={club.oneDayId}
                                                                            oneDayTitle={club.oneDayTitle}
                                                                            oneDayImage={club.oneDayImage}
                                                                            oneDayId={club.oneDayId}
                                                                            oneDayGroupSize={club.oneDayGroupSize}
                                                                            oneDayAttendantListSize={club.oneDayAttendantListSize}
                                                                            oneDayContent={club.oneDayContent}
                                                                            tagString={club.tagString}
                                                                        />
                                                                    );
                                                                })}
                                                            </div>
                                                            <div className='flex justify-between align-center mt-[48px] text-[25px]'>
                                                                <div className="text-[24px] ">{nickname ? `${nickname}님의 참여중인 하루속` : null}</div>
                                                                {/* <div className='text-[20px] '> 총 {oneDaysInParticipatingInfo.length}개</div> */}
                                                            </div>
                                                            <div className='w-[748px] flex flex-wrap justify-between'>
                                                                {oneDaysInParticipatingInfo.map((club, i) => {
                                                                    return (
                                                                        <ProfileCardOneday
                                                                            className="mr-[28px]"
                                                                            key={club.oneDayId}
                                                                            oneDayTitle={club.oneDayTitle}
                                                                            oneDayImage={club.oneDayImage}
                                                                            oneDayId={club.oneDayId}
                                                                            oneDayGroupSize={club.oneDayGroupSize}
                                                                            oneDayAttendantListSize={club.oneDayAttendantListSize}
                                                                            oneDayContent={club.oneDayContent}
                                                                            tagString={club.tagString}
                                                                        />
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    {/* </div> */}
                    {/* </section> */}
                </Container>
            </div>
        </>
    );
}

export default MyInfoOneday;

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Frame from '../component/img/Frame.png';


function UserProfile({
    nickname,
    email,
    profileImage
}) {


    // const { nickname, profileImage, email } = UserInfoOnMyPage || '';
    console.log(nickname);
    console.log(profileImage);
    console.log(email);
    // const [imageFile, setImageFile] = useState(null);
    const [interests, setInterests] = useState([
        { name: '스포츠', details: ['축구', '농구', '야구', '테니스', '수영', '등산', '요가', '스쿼시', '배드민턴', '자전거'] },
        { name: '문화', details: ['영화', '음악', '미술', '공연', '사진', '문학', '방송', '디자인', '연극', '오페라'] },
        { name: '연애', details: ['데이트', '커플', '심리', '결혼', '이별', '남친', '여친', '친구', '썸', '러브스타일'] },
        { name: '여행', details: ['해외여행', '국내여행', '자유여행', '배낭여행', '호텔', '풍경', '음식여행', '관광지', '문화체험', '독특한 장소'] }
    ]);
    console.log(setInterests);
    const [expanded, setExpanded] = useState(true);
    const [selectedDetails, setSelectedDetails] = useState([]);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const handleDetailClick = (detail) => {
        if (selectedDetails.includes(detail)) {
            setSelectedDetails(selectedDetails.filter((item) => item !== detail));
        } else {
            if (selectedDetails.length < 3) {
                setSelectedDetails([...selectedDetails, detail]);
            }
        }
    };

    const isDetailSelected = (detail) => {
        return selectedDetails.includes(detail);
    };

    // 모달 스타일 설정
    const modalStyles = {
        // content: `w-[600px] h-[500px] mx-auto border-2 border-gray-300 rounded-lg p-6'`
        content: {
            width: '500px',
            height: '600px',
            margin: 'auto',
            border: '1px solid #ccc',
            borderRadius: '50px',
            padding: '30px',
        },
    };

    // 프로필 페이지 컴포넌트

    const [isModalOpen, setIsModalOpen] = useState(false);

    // 모달 열기
    const openModal = () => {
        setIsModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        if (profileImage instanceof Blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageURL(reader.result);
            };
            reader.readAsDataURL(profileImage);
        } else {
            setImageURL(profileImage);
        }
    }, [profileImage]);
    return (
        <div>
            {/* 프로필 사진 */}
            <div style={{ alignItems: 'center' }} className="profile-picture mt-[240px] mb-[114px] flex flex-col justify-center">
                {imageURL && <img className="w-[200px] h-[200px] rounded-full shadow drop-shadow-md" src={imageURL} alt="Profile" />}
                {/* 작은 원 */}
                <div className='absolute right-[45%]'>
                    <div className="edit-icon w-[56px] h-[56px] bg-[#FFFCF2] shadow hover:shadow-lg rounded-full flex items-center justify-center" onClick={openModal}>
                        <img src={Frame} alt=''></img>
                    </div>
                </div>

                <div>
                    <div className='name mt-[16px] text-[34px] flex items-center justify-center'>{nickname || ''}</div>
                    <div className='email mt-[7px] text-[24px] text-[#A6A6A6]'>{email || ''}</div>
                </div>
                <div className="text-[16px]  mt-[17px] flex justify-between">
                    <div className="rounded-full bg-[#FFE14F] b-1 px-4 py-1 text-[white]">
                        {/* {tag} */}
                        필라테스
                    </div>
                </div>
            </div>

            {/* 프로필 수정 모달 */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Profile Modal"
            >
                <div className='flex flex-col items-center'>
                    <h2 className='mb-10 text-[20px] font-medium'>프로필 수정</h2>
                    <div className='flex items-center mb-5 w-full'>
                        <div className='w-[30%]'>
                            <p className='font-medium'>닉네임</p></div>
                        <input placeholder={nickname || ''} class="int w-[70%] h-10 rounded-lg px-3.5 py-2 shadow"></input>
                    </div>
                    <div className='flex items-center mb-5 w-full'>
                        <div className='w-[30%]'>
                            <p className='font-medium'>프로필 사진</p>
                        </div>
                        <input
                            placeholder={profileImage || ''}
                            class="int h-10 rounded-lg px-3.5 py-2 w-[70%] shadow"
                            type="file"
                            name="imageFile"
                        ></input>
                        {/* <div className=" text-white rounded-xl border-2 h-12 w-28 px-4 py-1 shadow hover:shadow-lg w-[18%] h-10 bg-[#FF7F1E] flex align-center justify-center">
                            파일 선택
                        </div> */}

                    </div>


                    <div className='flex items-center mb-[220px] w-full'>
                        <div className='w-[30%]'>
                            <div className='font-medium'>관심사</div>
                        </div>
                        <button type="button" onClick={toggleExpanded} className=" w-[38px] h-[38px] bg-[#FF7F1E] text-white text-[30px] shadow hover:shadow-lg rounded-full flex items-center justify-center" >
                        {expanded ? '+' : '-'}
                        </button>

                        {!expanded && (
                            <div>
                                {interests.map((interest) => (
                                    <div key={interest.name}>
                                        <h3>{interest.name}</h3>
                                        <ul>
                                            {interest.details.map((detail) => (
                                                <li key={detail} onClick={() => handleDetailClick(detail)}>
                                                    <span>{detail}</span>
                                                    {isDetailSelected(detail) && (
                                                        <button
                                                            onClick={() => setSelectedDetails(selectedDetails.filter((item) => item !== detail))}
                                                            className="ml-2 bg-red-500 text-white rounded p-1"
                                                        >
                                                            삭제
                                                        </button>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}


                    </div>

                    <div>
                        <button className='bg-[#FF7F1E] text-white rounded-[50px] w-20 h-10 mb-[10px] mr-[10px] shadow hover:shadow-lg'>저장</button>
                        <button onClick={closeModal} className='bg-[#626262] text-white rounded-[50px] w-20 h-10 mb-[10px] shadow hover:shadow-lg'>닫기</button>
                    </div>

                </div>

            </Modal>
        </div>
    );

}
export default UserProfile;

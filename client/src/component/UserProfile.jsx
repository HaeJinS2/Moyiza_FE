import React, { useState } from 'react';
import Modal from 'react-modal';
import Frame from '../component/img/Frame.png';


// 모달 스타일 설정
const modalStyles = {
    // content: `w-[600px] h-[500px] mx-auto border-2 border-gray-300 rounded-lg p-6'`
    content: {
        width: '500px',
        height: '500px',
        margin: 'auto',
        border: '1px solid #ccc',
        borderRadius: '50px',
        padding: '30px',
    },
};

// 프로필 페이지 컴포넌트
const UserProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 모달 열기
    const openModal = () => {
        setIsModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {/* 프로필 사진 */}
            <div style={{ alignItems: 'center' }} className="profile-picture mt-[240px] mb-[114px] flex flex-col justify-center">
                <div className="w-[200px] h-[200px] bg-gray-400 rounded-full drop-shadow-md"
                //  src={google} alt="Profile"
                />
                {/* 작은 원 */}
                <div className='absolute right-[45%]'>
                    <div className="edit-icon w-[56px] h-[56px] bg-[#FFFCF2] shadow hover:shadow-lg rounded-full flex items-center justify-center" onClick={openModal}>
                        <img src={Frame} alt=''></img>
                    </div>
                </div>

                <div>
                    <div className='name mt-[16px] text-[34px] flex items-center justify-center'>김세영</div>
                    <div className='email mt-[7px] text-[24px] text-[#A6A6A6]'>bobo@naver.com</div>
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
                            <p className='font-medium'>이름</p></div>
                        <input placeholder='김세영' class="int w-[70%] h-10 rounded-lg px-3.5 py-2 shadow"></input>
                    </div>
                    <div className='flex items-center mb-5 w-full'>
                        {/* 고정값 */}
                        <div className='w-[30%]'>
                            <p className='font-medium'>이메일</p></div>
                        <div class="int h-10 rounded-lg px-3.5 py-2 w-[70%] shadow">bobo@naver.com</div>
                    </div>
                    <div className='flex items-center mb-[180px] w-full'>
                        <div className='font-medium'>관심사</div>
                        <div>

                        </div>
                    </div>
                    <button onClick={closeModal} className='bg-[#FF7F1E] text-white rounded-[50px] w-20 h-10 mb-[10px] shadow hover:shadow-lg'>저장</button>
                </div>

            </Modal>
        </div>
    );
};

export default UserProfile;

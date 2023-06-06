import React, { useState } from 'react';
import Modal from 'react-modal';
// import google from '../component/img/google.png'

// 모달 스타일 설정
const modalStyles = {
    content: {
        width: '400px',
        height: '300px',
        margin: 'auto',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '20px',
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
                <div className="w-[200px] h-[200px] bg-gray-400 rounded-full"
                //  src={google} alt="Profile"
                />
                {/* 작은 원 */}
                <div className='absolute right-[45%]'>
                    <div className="edit-icon w-[56px] h-[56px] bg-gray-700 rounded-full flex items-center justify-center" onClick={openModal}>
                        수정
                    </div>
                </div>

                <div>
                    <div className='name mt-[16px] text-[34px] flex items-center justify-center'>김세영</div>
                    <div className='email mt-[7px] text-[24px] text-[#A6A6A6]'>bobo@naver.com</div>
                </div>
                <div className="text-[16px]  mt-[17px] flex justify-between">
                    <div className="rounded-full bg-[#FFE14F] b-1 px-4 py-1">
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
        <h2>프로필 수정</h2>
        {/* 프로필 수정 내용 */}
        {/* ... */}
        <button onClick={closeModal}>저장</button>
      </Modal>
    </div>
  );
};

export default UserProfile;

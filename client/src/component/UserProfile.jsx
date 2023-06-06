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
      <div className="profile-picture mt-[100px]">
        <div className="w-[200px] h-[200px] bg-gray-400 rounded-full"
        //  src={google} alt="Profile"
         />
        {/* 작은 원 */}
        <div className="edit-icon" onClick={openModal}></div>
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

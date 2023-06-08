import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import Frame from '../component/img/Frame.png';


function UserProfile({
    userInfo
}) {


    const { nickname, profileImage,email } = userInfo || '';
    console.log(nickname);
    console.log(profileImage);
    const [imageFile, setImageFile] = useState(null);
    // 프로필 사진 입력
    const imgRef = useRef();
    const onChangeImage = () => {
        let reader = new FileReader();
        let file = imgRef.current.files[0];
        reader.onloadend = () => {
            setImageFile(reader.result);
        }
        reader.readAsDataURL(file);
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
                        <div className='font-medium'>관심사</div>
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

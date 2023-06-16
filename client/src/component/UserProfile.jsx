import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Frame from '../component/img/Frame.png';
import axios from 'axios';
import { useMutation } from 'react-query';
import swal from 'sweetalert';
// import { getAPI } from '../axios';


function UserProfile({
    nickname,
    email,
    profileImage,
    // birth
}) {
    // 닉네임 중복 검사
    const nicknameValidationPost = async ({ nickname }) => {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/check/nickname`, { nickname });
        return response.data;
    };

    // validation api
    const validationMutation = useMutation(nicknameValidationPost, {
        onSuccess: (data) => {
            if (data.isDuplicatedNick === false) {
                swal('사용가능한 아이디입니다.');
            }
        },
        onError: (data) => {
            if (data.response.data.message === "중복된 닉네임 사용") {
                swal('이미 사용중인 아이디입니다.');
            }
        },
    });

    const nicknameValidationHandler = () => {
        validationMutation.mutate({
            nickname,
        });
    };

    // const { nickname, profileImage, email } = UserInfoOnMyPage || '';
    console.log(nickname);
    console.log(profileImage);
    console.log(email);
    // const [imageFile, setImageFile] = useState(null);
    const [expanded, setExpanded] = useState(true);
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    // const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryDetails, setCategoryDetails] = useState([]);


    const categories = [
        "예술", "자기계발", "액티비티", "여행", "연애",
        "취미", "문화", "스포츠", "운동"
    ];

    // 카테고리 클릭 시 세부 카테고리 가져오기
    const getCategoryDetails = async (category) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/profile/tags?category=${category}`, {
                headers: {
                    //   'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
            });

            if (response.data && response.data.tags) {
                setCategoryDetails(response.data.tags);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        getCategoryDetails(category);
    };

    // 모달 스타일 설정
    const modalStyles = {
        // content: `w-[600px] h-[500px] mx-auto border-2 border-gray-300 rounded-lg p-6'`
        content: {
            width: '550px',
            height: '650px',
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
        <div className='w-[334px] h-[530px] bg-[#FFFCF2] rounded-[20px] flex justify-center border border-[#E8E8E8] '>
            {/* 프로필 사진 */}
            <div style={{ alignItems: 'center' }} className="profile-picture absolute flex flex-col justify-center mt-[100px]">
                {imageURL && <img className="w-[135px] h-[135px] rounded-full shadow" src={imageURL} alt="Profile" />}
                {/* 작은 원 */}
                {/* <div className='absolute '> */}
                <div className="edit-icon w-[56px] h-[56px] bg-[#FFFCF2] shadow hover:shadow-lg rounded-full flex items-center justify-center absolute top-20 left-40" onClick={openModal}>
                    <img src={Frame} alt=''></img>
                </div>
                {/* </div> */}
                <div>
                    <div className='name mt-[10px] text-[28px] flex items-center justify-center'>{nickname || ''}</div>
                    {/* <div className='name mt-[10px] text-[20px] flex items-center justify-center text-[#A6A6A6]'>{birth|| ''}</div> */}
                    <div className='email mt-[5px] text-[20px] text-[#A6A6A6]'>{email || ''}</div>
                </div>
                <div className="text-[16px] mt-[19px] gap-2 flex justify-between ">
                    <div className="rounded-full bg-[#FFE14F] b-1 px-4 py-1 text-[white]">
                        {/* {tag} */}
                        여행
                    </div>
                    <div className="rounded-full bg-[#FFE14F] b-1 px-4 py-1 text-[white]">
                        {/* {tag} */}
                        음악
                    </div>
                </div>
                <div className='mt-[34px] text-[16px] text-[#A6A6A6] w-[269px] h-[19px] truncate hover:text-clip'>
                    안녕하세요! 저는 어쩌구 저쩌구 블라블라울라불라 랄랄
                </div>
            </div>%

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
                        <input placeholder={nickname || ''} class="int w-[47%] mr-[3%] h-10 rounded-lg px-3.5 py-2 shadow"></input>
                        <button type='button' style={{ width: '20%', color: '#FF7F1E', borderColor: '#FF7F1E' }} className="bg-white rounded-xl border-2 w-30 h-12 px-4 py-1 shadow hover:shadow-lg" onClick={nicknameValidationHandler}>중복확인</button>
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


                    <div className='mb-[220px] w-full'>
                        <div className='flex flex-row items-center'>
                            <div className='w-[30%]'>
                                <div className='font-medium'>관심사</div>
                            </div>
                            <button type="button" onClick={toggleExpanded} className=" w-[38px] h-[38px] bg-[#FF7F1E] text-white text-[30px] shadow hover:shadow-lg rounded-full flex items-center justify-center" >
                                {expanded ? '+' : '-'}
                            </button>
                        </div>
                        {!expanded && <div className=" mt-[20px] w-[500px] h-[320px] bg-[#FFFCF2] rounded-[20px] flex flex-col justify-start items-center">
                            <div className='mt-[20px] '>최대 3개까지 선택할 수 있습니다</div>
                            <div className='mt-[20px] text-[14px] flex-row flex px-4 py-1 '>
                                {categories.map((tag) => {
                                    return (
                                        <button
                                            key={tag}
                                            className="rounded-[50px] mr-1 b-1 border-1 px-2  bg-white text-orange-400 flex justify-start align-center"
                                            onClick={() => handleCategoryClick(tag)}>
                                            {tag}
                                        </button>
                                    );
                                })}
                            </div>
                            {/* 세부 카테고리 표시 */}
                            <div className="mt-[20px] text-[15px] flex-wrap justify-between flex px-4 py-1">
                                {categoryDetails.map((detail) => (
                                    <button
                                        key={detail}
                                        className="w-[30%] mb-2 rounded-[50px] mr-1 b-1 border-1 px-2 bg-white "
                                    >
                                        {detail}
                                    </button>
                                ))}
                            </div>
                        </div>
                        }

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

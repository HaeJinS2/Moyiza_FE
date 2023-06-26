import React, { useRef, useState } from "react";
import Modal from "react-modal";
import Frame from "../component/img/Frame.png";
import BlackList from "../component/img/BlackList.png";
import axios from "axios";
import { useMutation } from "react-query";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import { getCookie, parseJwt } from "../utils/jwtUtils";
// import { getAPI } from '../axios';

function UserProfile({
    nickname: initialNickname,
    email: initialEmail,
    profileImage: initialProfileImage,
    content: initialContent,
    tags: initialTags,
}) {
    // eslint-disable-next-line
    
    const [imageFile, setImageFile] = useState(null);
    const [userInput, setUserInput] = useState({
        nickname: initialNickname,
        content: initialContent,
        tags: initialTags,
    });

    const [tags, setTags] = useState([]);

    const handleRemoveTag = (tag) => {
        // 태그 삭제 로직 구현
        const updatedTags = tags.filter((t) => t !== tag);
        setTags(updatedTags);
    };
    // 프로필 사진 입력
    const imgRef = useRef();
    const [profileImage, setProfileImage] = useState(null);

    const onChangeImage = (e) => {
        if (e.target.files.length > 0) {
            setProfileImage(e.target.files[0]);
            let reader = new FileReader();
            let file = imgRef.current.files[0];
            reader.onloadend = () => {
                setImageFile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const { id } = useParams();
    let userId = ''
    // 쿠키에서 ACCESS_TOKEN 값을 가져옵니다.
    const accessToken = getCookie('ACCESS_TOKEN');

    if (accessToken) {
        // ACCESS_TOKEN 값을 파싱하여 JSON 페이로드를 추출합니다.
        const payload = parseJwt(accessToken)
        // user_id 값을 추출합니다.
        userId = payload.userId
    }

    // const submitHandler = async (e) => {
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                nickname: userInput.nickname || "",
                content: userInput.content || "",
                tags: selectedCategories.length > 0 ? selectedCategories : null,
            };

            // ImageFormData
            const imageFormData = new FormData();
            imageFormData.append("imageFile", profileImage);

            // 이미지를 먼저 업로드 한 뒤, 3S 저장 URL을 response 받는다.
            const IMAGE_UPLOAD_URL = `${process.env.REACT_APP_SERVER_URL}/uploadImg`;
            const uploadRes = await axios.post(IMAGE_UPLOAD_URL, imageFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            requestData.imageUrl = uploadRes.data;

            const originUrl = `${process.env.REACT_APP_SERVER_URL}/profile`;
            // eslint-disable-next-line
            const submitResponse = await axios.put(originUrl, requestData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            swal("회원정보 수정 성공");
            setTimeout(() => {
                swal.close();
              },3500);
            closeModal();
            window.location.reload();
        } catch (error) {
            console.error(error);
            // swal(error.request.response);
        }
    };

    // 닉네임 중복 검사
    const nicknameValidationPost = async ({ nickname }) => {
        const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/check/nickname`,
            { nickname }
        );
        return response.data;
    };

    // validation api
    const validationMutation = useMutation(nicknameValidationPost, {
        onSuccess: (data) => {
            if (data.isDuplicatedNick === false) {
                swal("사용가능한 닉네임입니다.");
            }
        },
        onError: (data) => {
            if (data.response.data.message === "중복된 닉네임 사용") {
                swal("이미 사용중인 닉네임입니다.");
            }
        },
    });

    const nicknameValidationHandler = () => {
        //     if (!nickname) {
        //     // 닉네임이 비어있는 경우, 중복 검사를 수행하지 않고 함수 종료
        //     return;
        // }
        validationMutation.mutate({
            nickname,
        });
    };

    // 카테고리 클릭 시 세부 카테고리 가져오기
    const getCategoryDetails = async (category) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/profile/tags?category=${category}`,
                {
                    headers: {
                        //   'Authorization': `Bearer ${ACCESS_TOKEN}`
                    },
                }
            );

            if (response.data && response.data.tags) {
                setCategoryDetails(response.data.tags);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const { nickname, } =
        // tags,
        userInput;
    const handleInput = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUserInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // const { nickname, profileImage, email } = UserInfoOnMyPage || '';
    // console.log(nickname);
    // console.log(profileImage);
    // console.log(email);
    // const [imageFile, setImageFile] = useState(null);
    const [expanded, setExpanded] = useState(true);
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const [categoryDetails, setCategoryDetails] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const categories = [
        "예술",
        "자기계발",
        "액티비티",
        "여행",
        "연애",
        "취미",
        "문화",
        "스포츠",
        "운동",
    ];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        getCategoryDetails(category);
    };

    const handleClick = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter((item) => item !== category)
            );
        } else {
            if (selectedCategories.length < 3) {
                setSelectedCategories([...selectedCategories, category]);
                getCategoryDetails(category);
            } else {
                swal("최대 3개까지 가능합니다");
            }
        }
        getCategoryDetails(category);
    };


    const handleRemoveCategory = (category) => {
        setSelectedCategories(
            selectedCategories.filter((item) => item !== category)
        );
    };

    // 모달 스타일 설정
    const modalStyles = {
        // content: `w-[600px] h-[500px] mx-auto border-2 border-gray-300 rounded-lg p-6'`
        content: {
            // marginTop: '550px',
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            width: "600px",
            height: "850px",
            margin: "auto",
            top: "50%",
            left: "50%",
            // position:'absolute',
            transform: "translate(20%, 20%)",
            border: "1px solid #ccc",
            borderRadius: "50px",
            padding: "40px",
            backgroundColor: "white",
            // overflow: "auto"
        },
    };
    const blackListModal = {
        content: {
            width: "200px",
            height: "120px",
            margin: "auto",
            transform: "translate(-60%, 107%)",
            border: "1px solid #ccc",
            borderRadius: "20px",
            backgroundColor: "white",
        }
    }
    // 프로필 페이지 컴포넌트

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [blackListOpen, setBlackListOpen] = useState(false);

    //   모달 열기
    const openModal = () => {
        setIsModalOpen(true);
    };
    const blackListOpenModal = () => {
        setBlackListOpen(true);
    }

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const blackListCloseModal = () => {
        setBlackListOpen(false);
    };

    const handleBlockClick = async() => {
        // 차단하기 동작 처리
        try {
          // POST 요청을 보냅니다.
          const response = await axios.post(`/blackList/`+ id);
          
          // 요청이 성공한 경우
          swal('블랙리스트에 추가되었습니다.');
          console.log(response.data); // 서버에서 반환한 데이터를 출력하거나 처리할 수 있습니다.
        } catch (error) {
          // 요청이 실패한 경우
          swal('차단 요청을 보내는 중 오류가 발생했습니다.');
          console.error(error); // 오류 내용을 출력하거나 처리할 수 있습니다.
        }
        blackListCloseModal();
    };


    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="w-[334px] h-[530px] bg-[#FFFCF2] rounded-[20px] flex justify-center border border-[#E8E8E8] ">
                    {id !== null && id !== undefined && String(id) !== String(userId) && (
                        <div className='absolute '>
                            <div
                                className="edit-icon w-[56px] h-[56px] absolute top-10 left-[100px]"
                                onClick={blackListOpenModal}

                            >
                                <img src={BlackList} alt=""></img>
                            </div>
                            <Modal
                                isOpen={blackListOpen}
                                onRequestClose={blackListCloseModal}
                                style={blackListModal}
                                contentLabel="BlackList Modal"
                                className="z-8888 "
                            >
                                {/* <p>차단하기를 통해</p> */}
                                <div className="flex flex-col">
                                    <button className="font-medium text-[20px] text-orange-400 mt-[15px] mb-[15px]" onClick={handleBlockClick}>차단하기</button>
                                    <hr />
                                    <button className="text-[20px] mt-[15px] mb-[15px]" onClick={blackListCloseModal}>취소</button>
                                </div>
                            </Modal>
                        </div>
                    )}


                    {/* 프로필 사진 */}
                    <div
                        style={{ alignItems: "center" }}
                        className="profile-picture absolute flex flex-col justify-center mt-[100px]"
                    >
                        {initialProfileImage && (
                            <img
                                className="w-[135px] h-[135px] rounded-full shadow aspect-square object-cover"
                                src={initialProfileImage}
                                alt="Profile"
                            />
                        )}
                        {/* 작은 원 */}
                        {id !== null && id !== undefined && String(id) === String(userId) && (
                            <div className='absolute '>
                                <div
                                    className="edit-icon w-[56px] h-[56px] bg-[#FFFCF2] shadow hover:shadow-lg rounded-full flex items-center justify-center absolute bottom-7 left-8"
                                    onClick={openModal}
                                >
                                    <img src={Frame} alt=""></img>
                                </div>
                            </div>
                        )}

                        <div>
                            <div className="name mt-[10px] text-[28px] flex items-center justify-center">
                                {initialNickname || ""}
                            </div>
                            {/* <div className='name mt-[10px] text-[20px] flex items-center justify-center text-[#A6A6A6]'>{birth|| ''}</div> */}
                            <div className="email mt-[5px] text-[20px] text-[#A6A6A6]">
                                {initialEmail || ""}
                            </div>
                        </div>
                        <div className="text-[16px] mt-[19px] gap-2 flex justify-between ">
                            {initialTags && initialTags.map((tags) => (
                                <div
                                    key={tags}
                                    className="rounded-full bg-[#FFE14F] flex flex-col items-center justify-center b-1 px-4 py-1 text-[white]"
                                >
                                    {tags}
                                    <button onClick={() => handleRemoveTag(tags)}></button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-[34px] text-[16px] text-[#A6A6A6] w-[269px] h-[19px] flex justify-center truncate hover:text-clip">
                            {initialContent || "간단한 소개글을 입력하세요"
                                // ? { initialContent }
                                // : "간단한 소개글을 입력하세요"
                            }
                        </div>
                    </div>

                    {/* 프로필 수정 모달 */}
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        style={modalStyles}
                        contentLabel="Profile Modal"
                        className="z-8888 "
                    >
                        <div className="flex flex-col items-center">
                            <h2 className="mb-10 text-[30px] font-medium">프로필 수정</h2>
                            <div className="flex items-center mb-5 w-full">
                                <div className="w-[30%]">
                                    <p className="font-medium text-[20px]">닉네임</p>
                                </div>
                                <input
                                    placeholder={initialNickname || ""}
                                    class="int w-[47%] mr-[3%] h-10 rounded-lg px-3.5 py-2 shadow"
                                    name="nickname"
                                    value={userInput.nickname}
                                    onChange={handleInput}
                                ></input>
                                <button
                                    type="button"
                                    style={{
                                        width: "20%",
                                        color: "#FF7F1E",
                                        borderColor: "#FF7F1E",
                                    }}
                                    className="bg-white text-[18px] rounded-xl border-2 w-30 h-[45px] px-4 py-1 shadow hover:shadow-lg"
                                    onClick={nicknameValidationHandler}
                                >
                                    중복확인
                                </button>
                            </div>
                            <div className="flex items-center mb-5 w-full">
                                <div className="w-[30%]">
                                    <p className="font-medium text-[20px]">프로필 사진</p>
                                </div>
                                <input
                                    ref={imgRef}
                                    onChange={onChangeImage}
                                    placeholder={profileImage || ""}
                                    class="int h-10 rounded-lg px-3.5 py-2 w-[70%] shadow"
                                    type="file"
                                    name="imageFile"
                                ></input>
                                {/* <div className=" text-white rounded-xl border-2 h-12 w-28 px-4 py-1 shadow hover:shadow-lg w-[18%] h-10 bg-[#FF7F1E] flex align-center justify-center">

                            파일 선택
                        </div> */}
                            </div>
                            <div className="flex items-center mb-5 w-full">
                                <div className="w-[30%]">
                                    <p className="font-medium text-[20px]">자기소개글</p>
                                </div>
                                <input
                                    class="int h-10 rounded-lg px-3.5 py-2 w-[70%] shadow"
                                    name="content"
                                    value={userInput.content}
                                    onChange={handleInput}
                                    placeholder={
                                        initialContent || "간단한 소개글을 입력하세요"
                                    }
                                ></input>
                            </div>

                            <div className="mb-[220px] w-full">
                                <div className="flex flex-row items-center">
                                    <div className="w-[30%]">
                                        <div className="font-medium text-[20px]">관심사</div>
                                    </div>
                                    <div className="flex w-[70%] items-center">
                                        <button
                                            type="button"
                                            onClick={toggleExpanded}
                                            className=" w-[38px] h-[38px] bg-[#FF7F1E] mr-5 text-white text-[30px] shadow hover:shadow-lg rounded-full flex items-center justify-center"
                                        >
                                            {expanded ? "+" : "-"}
                                        </button>
                                        <div className="text-[16px] w-[300px] gap-2 flex flex-wrap">
                                            {selectedCategories.map((category) => (
                                                <div
                                                    key={category}
                                                    className="rounded-full bg-[#FFE14F] flex flex-col items-center justify-center b-1 px-4 py-1 text-[white]"
                                                >
                                                    {category}
                                                    <button
                                                        onClick={() => handleRemoveCategory(category)}
                                                    >
                                                        {" "}
                                                        <div className="text-xs text-red-500">삭제</div>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {!expanded && (
                                    <div className=" mt-[30px] w-[520px] h-[360px] bg-[#FFFCF2] rounded-[20px] flex flex-col justify-start items-center">
                                        <div className="mt-[20px] ">
                                            최대 3개까지 선택할 수 있습니다
                                        </div>
                                        <div className="mt-[20px] text-[14px] flex-row flex px-4 py-1 ">
                                            {categories.map((category) => (
                                                <button
                                                    key={category}
                                                    className={`rounded-[50px] mr-1 b-1 border-1 px-2 ${selectedCategory === category ? "bg-orange-400 text-white" : ""
                                                        }`}
                                                    onClick={() => handleCategoryClick(category)}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                        {/* 세부 카테고리 표시 */}
                                        <div className="mt-[20px] text-[15px] flex-wrap justify-between flex px-4 py-1">
                                            {categoryDetails.map((detail) => (
                                                <button
                                                    key={detail}
                                                    className={`w-[30%] h-[30px] mb-2 rounded-[50px] mr-1 px-2 bg-white ${selectedCategories.includes(detail)
                                                        ? "text-orange-400 border border-orange-400"
                                                        : ""
                                                        }`}
                                                    onClick={() => handleClick(detail)}
                                                >
                                                    {detail}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-center ">
                                <div className="fixed bottom-5 gap-2 ">
                                    <button
                                        type="onclick"
                                        onClick={submitHandler}
                                        className="bg-[#FF7F1E] text-white rounded-[50px] w-20 h-10 mb-[10px] mr-[10px] shadow hover:shadow-lg"
                                    >
                                        저장
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="bg-[#626262] text-white rounded-[50px] w-20 h-10 mb-[10px] shadow hover:shadow-lg"
                                    >
                                        닫기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </form>
        </>
    );
}
export default UserProfile;

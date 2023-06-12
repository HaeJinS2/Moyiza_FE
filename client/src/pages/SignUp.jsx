import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import Navbar from '../component/Navbar';
import { postAPI } from '../axios';
// import { styled } from 'styled-components';


function SignUp() {
  //회원가입 성공 시, 로그인 페이지로 이동
  const navigate = useNavigate();
  const goLogin = () => {
    navigate('/login');
  }
  const handleFind = () => {
    alert('준비 중입니다');
  };

  const [imageFile, setImageFile] = useState(null);
  const [userInput, setUserInput] = useState({
    email: '',
    pw: '',
    pwCheck: '',
    name: '',
    nickname: '',
    gender: '',
    phoneNum: '',
    year: '',
    month: '',
    day: ''
  });

  //메일 인증
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleConfirmEmail = () => {
    const requestData = { email };

    postAPI("/user/signup/confirmEmail", requestData)
      .then((response) => {
        if (response.status === 200) {
          alert("인증번호가 이메일로 전송되었습니다.");
        } else {
          alert("이메일 인증번호 전송에 실패했습니다. 다시 시도해주세요.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("이메일 인증번호 전송에 실패했습니다. 다시 시도해주세요.");
      });
  };

  const handleConfirm = () => {
    const requestData = { email, verificationCode };

    postAPI("/user/signup/confirmEmail", requestData)
      .then((response) => {
        if (response.status === 200) {
          alert("이메일 인증이 성공하였습니다.");
          // 회원가입 등록 등 추가 동작 수행
        } else {
          alert("이메일 인증에 실패했습니다. 인증번호를 확인해주세요.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("이메일 인증에 실패했습니다. 인증번호를 확인해주세요.");
      });
  };


  const { email, pw, pwCheck, name, nickname, gender, phoneNum, year, month, day } =
    userInput;
  const handleInput = e => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput, [name]: value
    });
  };
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
  // 이메일 유효성 검사
  const isEmail = email => {
    const emailRegex = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    return emailRegex.test(email);
  };
  const isEmailValid = isEmail(email);
  // 패스워드 유효성 검사
  const isPw = pw => {
    const pwRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return pwRegex.test(pw);
  };
  const isPwValid = isPw(pw);
  // 패스워드 재확인
  const isPwSame = pw === pwCheck;
  const pwDoubleCheck = !isPwSame ? 'pwDoubleCheck' : undefined;
  // 휴대폰 번호 유효성 검사
  const isPhoneNum = phoneNum => {
    const phoneNumRegex = /01[016789][^0][0-9]{2,3}[0-9]{4,4}/;
    return phoneNumRegex.test(phoneNum);
  };
  const isPhoneNumValid = isPhoneNum(phoneNum);
  // 생년월일 입력
  const birth = `${year}-${month}-${day}`;
  // 닉네임 중복 검사
  const nicknameValidationPost = async ({ nickname }) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/check/nickname`, { nickname });
    return response.data;
  };

  const validationMutation = useMutation(nicknameValidationPost, {
    onSuccess: (data) => {
      if (data.isDuplicatedNick === false) {
        alert('사용가능한 아이디입니다.');
      }
    },
    onError: (data) => {
      if (data.response.data.message === "중복된 닉네임 사용") {
        alert('이미 사용중인 아이디입니다.');
      }
    },
  });
  const nicknameValidationHandler = () => {
    validationMutation.mutate({
      nickname,
    });
  };

  // 전체 유효성 검사 후 버튼 활성화
  const isAllValid =
    isEmailValid &&
    isPwValid &&
    isPwSame &&
    isPhoneNumValid &&
    name &&
    email &&
    pw &&
    nickname &&
    gender &&
    birth &&
    phoneNum &&
    imageFile;

  const btn1 = `bg-yellow-300 rounded-xl w-64 h-12 px-4 py-1 shadow hover:shadow-lg`
  const btn2 = `bg-gray-100 text-gray-400 rounded-xl w-64 h-12 px-4 py-1 `

  const activeBtn = isAllValid ? undefined : 'disabled';
  const colorBtn = isAllValid ? btn1 : btn2;
  //btn1은 아예 클릭이 안되게 수정해야 함

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const data = {
      name: name,
      email: email,
      password: pw,
      nickname: nickname,
      gender: gender,
      birth: birth,
      phone: phoneNum,

    }

    const base64ToBlob = (base64String, contentType = '') => {
      const byteCharacters = atob(base64String);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, { type: contentType });
    };

    // const json = JSON.stringify(data);
    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    // const imgblob = new Blob([imageFile], { type: "image/jpeg" })

    formData.append('data', blob);
    if (imageFile) {
      const blobImageFile = base64ToBlob(imageFile.replace(/^data:image\/[a-z]+;base64,/, ''), 'image/jpeg');
      formData.append('imageFile', blobImageFile);
    } else {

      setImageFile(null);
      formData.append('imageFile', imageFile);
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/signup`, formData);
      console.log(response.data);
      alert('회원가입 성공!');
      goLogin();

    } catch (error) {
      console.error(error);
      alert(error.request.response);
    }
  };

  return (
    <>
      <Navbar />
      <div
        name="signUpContainer"
        class="flex justify-center"
      >
        <div
          style={{ marginTop: '200px', width: '800px', height: '1100px', marginBottom: '40px' }}
          class="p-16 shadow-md w-full h-full rounded-[30px] bg-gray-50 flex justify-center"
        >
          <form onSubmit={submitHandler} name="signUpBox" class="flex flex-col justify-center space-between w-full" >
            <div style={{ display: 'flex' }}>

            </div>

            {/* 이름 입력 */}
            <div class="flex items-center flex-start mb-5" >
              <div style={{ width: '27%' }}>
                <p class="">이름</p>
              </div>
              <input
                style={{ width: '73%' }}
                value={userInput.name}
                onChange={handleInput}
                className="userInputName input w-80 h-12 rounded-lg px-3.5 py-2 shadow"
                name="name"
                type="text"
                placeholder="이름을(를) 입력하세요"
                autoComplete="username"
              />
            </div>

            {/* 닉네임 입력 */}
            <div class="flex items-center mb-5">
              <div style={{ width: '27%' }}>
                <p className="">닉네임</p>
              </div>
              <input
                value={userInput.nickname}
                onChange={handleInput}
                style={{ width: '45%', marginRight: '3%' }}
                className="userInputName input h-12 rounded-lg px-3.5 py-2 shadow"
                name="nickname"
                type="text"
                placeholder="닉네임을(를) 입력하세요"
                autoComplete="username"
              />
              {/* 닉네임 중복 검사 */}
              <button style={{ width: '25%', color: '#FF7F1E', borderColor: '#FF7F1E' }} className="bg-white rounded-xl border-2 w-30 h-12 px-4 py-1 shadow hover:shadow-lg" onClick={nicknameValidationHandler}>중복확인</button>
            </div>
            {/* 생년월일 */}
            <div style={{ width: '100%' }} class="flex items-center mb-5">
              <div style={{ width: '27%' }}>
                <p>생년월일</p>
              </div>
              <div style={{ width: '73%' }} id="bir_wrap" className='flex flex-row justify-center items-center '>
                <div style={{ width: '36%', marginRight: '3%' }} id="bir_yy">
                  {/* <span className="box"> */}
                  <input style={{ width: '100%' }} value={userInput.year} type="text" id="yy" class="int h-12 rounded-lg px-3.5 py-2 shadow" maxlength="4" placeholder="년(4자)" name="year" onChange={handleInput} />
                  {/* </span> */}
                </div>
                <div style={{ width: '22%', marginRight: '3%' }} id="bir_mm">
                  {/* <span class="box"> */}
                  <select style={{ width: '100%', color: '#9d9d9d' }} value={userInput.month} class=" h-12 rounded-lg px-3.5 py-2 shadow" id="mm" name="month" onChange={handleInput}>
                    <option>월</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                  {/* </span> */}
                </div>

                <div style={{ width: '36%' }} id="bir_dd">
                  {/* <span class="box"> */}
                  <select style={{ width: '100%' }} value={userInput.day} type="text" id="dd" class="int h-12 rounded-lg px-3.5 py-2 shadow" maxlength="2" placeholder="일" name='day' onChange={handleInput} />
                  <option>일</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  {/* </span> */}
                </div>

              </div>
              {/* <span class="error_next_box"></span> */}
            </div>
            {/* 성별 입력 */}
            <div className='flex items-center mb-5'>
              <div style={{ width: '27%' }}>
                <p className="userGender title mustInput">성별</p>
              </div>
              <label className="userMale label">
                <input
                  onChange={handleInput}
                  className="radio min-w-24 min-h-24 mr-2"
                  name="gender"
                  type="radio"
                  value="0"
                />
                <span className="text mr-5">남자</span>
              </label>
              <label className="userFemale label">
                <input
                  onChange={handleInput}
                  className="radio mr-2"
                  name="gender"
                  type="radio"
                  value="1"
                />
                <span className="text">여자</span>
              </label>
            </div>


            {/* 이메일 입력 */}
            <div className='flex items-center mb-5'>
              <div style={{ width: '27%' }}>
                <p className=''>이메일</p>
              </div>
              <input
                style={{ width: '45%', marginRight: '3%' }}
                value={userInput.email}
                onChange={handleInput}
                className="h-12 rounded-lg px-3.5 py-2 shadow"
                name="email"
                type="text"
                placeholder="이메일"
                autoComplete="username"
              />
              {/* 이메일 인증 */}
              <button onClick={handleConfirmEmail} style={{ width: '25%', color: '#FF7F1E', borderColor: '#FF7F1E' }} className="bg-white rounded-xl border-2 h-12 px-4 py-1 shadow hover:shadow-lg ">인증번호 전송</button>
            </div>
            <div className='flex items-center'>
              <div style={{ width: '27%' }}></div>
              {!isEmailValid && (
                <p
                  className="inputCheck text-xs mb-5"
                  style={{ display: email.length > 0 ? 'block' : 'none', color: '#FF7F1E' }}
                >
                  * 이메일 양식을 맞춰주세요!
                </p>
              )}
            </div>
            {/* 이메일 인증 입력 */}
            <div className='flex items-center mb-5'>
              <div style={{ width: '27%' }}>
                {/* <div>이메일 인증</div> */}
              </div>
              <input value={verificationCode}
                onChange={handleVerificationCodeChange} 
                style={{ width: '28%', marginRight: '3%' }} placeholder="인증번호" className="h-12 rounded-lg px-3.5 py-2 shadow" type="text" />
              <button onClick={handleConfirm} style={{ width: '14%', marginRight: '3%', backgroundColor: '#FF7F1E', color: '#fff' }} className=" text-white rounded-xl border-2 h-12 w-28 px-4 py-1 hover:shadow-lg">확인</button>
              <button onClick={handleFind} style={{ width: '25%', color: '#FF7F1E', borderColor: '#FF7F1E' }} className="bg-white rounded-xl border-2 h-12 w-28 px-4 py-1 shadow hover:shadow-lg">재전송</button>
            </div>

            {/* 휴대폰 입력 */}
            <div className='flex items-center mb-5'>
              <div style={{ width: '27%' }}>
                <p className="userPhoneNum title mustInput">휴대폰</p>
              </div>
              <input
                style={{ width: '73%' }}
                onChange={handleInput}
                className="userInputNumber input w-80 h-12 rounded-lg px-3.5 py-2 shadow"
                name="phoneNum"
                type="text"
                placeholder="숫자를 입력하세요"
                autoComplete="username"
              />
            </div>
            <div className='flex items-center'>
              <div style={{ width: '27%' }}></div>
              {!isPhoneNumValid && (
                <p
                  className="inputCheck text-xs mb-5"
                  style={{ display: phoneNum.length > 0 ? 'block' : 'none', color: '#FF7F1E' }}
                >
                  * 하이픈(-)없이 숫자만 입력해주세요.
                </p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div className='flex items-center mb-5'>
              <div style={{ width: '27%' }}>
                <p>비밀번호</p>
              </div>
              <input
                style={{ width: '73%' }}
                value={userInput.pw}
                onChange={handleInput}
                className="w-80 h-12 rounded-lg px-3.5 py-2 shadow"
                name="pw"
                type="password"
                placeholder="비밀번호를 입력하세요"
                autoComplete="current-password"
              />
            </div>
            <div className='flex items-center '>
              <div style={{ width: '27%' }}></div>
              {!isPwValid && (
                <p
                  className="inputCheck text-xs mb-5"
                  style={{ display: pw.length > 0 ? 'block' : 'none', color: '#FF7F1E' }}
                >
                  * 비밀번호는 대소문자, 숫자, 특수문자 포함 8자리 이상 적어주세요!
                </p>
              )}
            </div>
            {/* 비밀번호 확인 */}
            <div className='flex items-center mb-5'>
              <div style={{ width: '27%' }}>
                <p>비밀번호 확인</p>
              </div>
              <input
                style={{ width: '73%' }}
                value={userInput.pwCheck}
                onChange={handleInput}
                className={`userInputPwCheck input ${pwDoubleCheck} w-80 h-12 rounded-lg px-3.5 py-2 shadow`}
                name="pwCheck"
                type="password"
                placeholder="비밀번호 확인"
                autoComplete="current-password"
              />
            </div>
            <div className="profileBox mb-20 flex w-full">
              <div style={{ width: '27%', display: 'flex', alignItems: 'center' }}>프로필 사진</div>
              <label style={{ display: 'flex' }} className="imgBoxLabel " htmlFor="profileImg">
                <div style={{ width: '100%', marginRight: '5%', backgroundColor: '#FF7F1E', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className=" text-white rounded-xl border-2 h-12 w-28 px-4 py-1 shadow hover:shadow-lg">파일 선택</div>
                <input
                  id="profileImg"
                  className="profileImgInput"
                  type="file"
                  name="imageFile"
                  ref={imgRef}
                  onChange={onChangeImage}
                  style={{ display: 'none', flexDirection: 'row' }}
                />
                {/* 사진 */}
                <div class="w-12">
                  {imageFile &&
                    <img style={{ display: 'flex', width: '50px', height: '50px' }} className="labelImg" src={imageFile} alt="uploadImg" />
                  }
                </div>
              </label>
            </div>
            <hr />
            <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }} className={`signupBtn ${activeBtn} ${colorBtn} mt-20`} >
              가입하기
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default SignUp;

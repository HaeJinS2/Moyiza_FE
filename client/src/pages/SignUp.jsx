import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';


function SignUp() {
  //회원가입 성공 시, 로그인 페이지로 이동
  const navigate = useNavigate();
  const goLogin = () => {
    navigate('/logins');
  }

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
    const reader = new FileReader();
    const file = imgRef.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageFile(reader.result);
    };
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
    const phoneNumRegex = /01[016789]-[^0][0-9]{2,3}-[0-9]{4,4}/;
    return phoneNumRegex.test(phoneNum);
  };
  const isPhoneNumValid = isPhoneNum(phoneNum);
  // 생년월일 입력
  const birth = `${year}-${month}-${day}`;
  // 닉네임 중복 검사
  const nicknameValidationPost= async ({ nickname }) => {
    const response = await axios.post("http://43.200.169.48/user/check/nickname", { nickname });
    return response.data;
  };

  const validationMutation = useMutation(nicknameValidationPost, {
    onSuccess: (data) => {
      console.log('data',data);
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

  const activeBtn = isAllValid ? 'undefined' : 'disabled';



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
      phone: phoneNum
    }

    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const imgblob = new Blob([imageFile], { type: "image/jpeg" })
    formData.append("imageFile", imgblob);
    formData.append('data', blob);

    // console.log('formData',formData);

    try {
      const response = await axios.post("http://43.200.169.48/user/signup", formData);
      console.log(response.data);
      alert('회원가입 성공!');
      goLogin();

    } catch (error) {
      console.error(error);
      alert('회원가입 실패!')
    }
  };

  return (
    <div className="signUp">
      <form onSubmit={submitHandler} className="signUpBox flex flex-col justify-center items-center" >
        <div className="profileBox">
          <label className="imgBoxLabel" htmlFor="profileImg">
            {imageFile ? (
              <img className="labelImg" src={imageFile} alt="uploadImg" />
            ) : null}
            <div className="imgUploadBtn">
              <i className="fa-sharp fa-solid fa-camera" />
            </div>
            <input
              id="profileImg"
              className="profileImgInput"
              type="file"
              name="imageFile"
              ref={imgRef}
              onChange={onChangeImage}
            />
          </label>
        </div>
        {/* 이메일 비밀번호 입력 */}
        <input
          value={userInput.email}
          onChange={handleInput}
          className="shadow-md w-80 h-12 rounded-lg mb-4 border-2"
          name="email"
          type="text"
          placeholder="이메일"
          autoComplete="username"
        />
        <input
          value={userInput.pw}
          onChange={handleInput}
          className="shadow-md w-80 h-12 rounded-lg mb-4 border-2"
          name="pw"
          type="password"
          placeholder="비밀번호"
          autoComplete="current-password"
        />
        <input
          value={userInput.pwCheck}
          onChange={handleInput}
          className={`userInputPwCheck input ${pwDoubleCheck} shadow-md w-80 h-12 rounded-lg mb-4 border-2`}
          name="pwCheck"
          type="password"
          placeholder="비밀번호 확인"
          autoComplete="current-password"
        />
        {!isEmailValid && (
          <p
            className="inputCheck text-rose-400"
            style={{ display: email.length > 0 ? 'block' : 'none' }}
          >
            * 이메일 양식을 맞춰주세요!
          </p>
        )}
        {!isPwValid && (
          <p
            className="inputCheck text-rose-400"
            style={{ display: pw.length > 0 ? 'block' : 'none' }}
          >
            * 비밀번호는 대소문자, 숫자, 특수문자 포함 8자리 이상 적어주세요!
          </p>
        )}
        {/* 이름 입력 */}
        <p className="userName title mustInput">이름</p>
        <input
          value={userInput.name}
          onChange={handleInput}
          className="userInputName input shadow-md w-80 h-12 rounded-lg mb-4 border-2"
          name="name"
          type="text"
          placeholder="이름을(를) 입력하세요"
          autoComplete="username"
        />
        {/* 닉네임 입력 */}
        <p className="userName title mustInput">닉네임</p>
        <input
          value={userInput.nickname}
          onChange={handleInput}
          className="userInputName input shadow-md w-80 h-12 rounded-lg mb-4 border-2"
          name="nickname"
          type="text"
          placeholder="닉네임을(를) 입력하세요"
          autoComplete="username"
        />
        {/* 닉네임 중복 검사 */}
        <button className="bg-white text-rose-400 rounded-xl px-4 py-1 shadow hover:shadow-lg" onClick={nicknameValidationHandler}>중복확인</button>
        {/* 성별 입력 */}
        <p className="userGender title mustInput">성별</p>
        <label className="userMale label">
          <input
            onChange={handleInput}
            className="radio"
            name="gender"
            type="radio"
            value="0"
          />
          <span className="text">남자</span>
        </label>
        <label className="userFemale label">
          <input
            onChange={handleInput}
            className="radio"
            name="gender"
            type="radio"
            value="1"
          />
          <span className="text">여자</span>
        </label>
        {/* 생년월일 */}
        <div>
          <h3><label for="yy">생년월일</label></h3>
          <div id="bir_wrap" className='flex flex-row justify-center items-center'>
            <div id="bir_yy">
              <span className="box">
                <input value={userInput.year} type="text" id="yy" class="int" maxlength="4" placeholder="년(4자)" name="year" onChange={handleInput} />
              </span>
            </div>

            <div id="bir_mm">
              <span class="box">
                <select value={userInput.month} id="mm" name="month" onChange={handleInput}>
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
              </span>
            </div>

            <div id="bir_dd">
              <span class="box">
                <input value={userInput.day} type="text" id="dd" class="int" maxlength="2" placeholder="일" name='day' onChange={handleInput} />
              </span>
            </div>

          </div>
          <span class="error_next_box"></span>
        </div>

        {/* 휴대폰 입력 */}
        <p className="userPhoneNum title mustInput">휴대폰</p>
        <input
          onChange={handleInput}
          className="userInputNumber input shadow-md w-80 h-12 rounded-lg mb-4 border-2"
          name="phoneNum"
          type="text"
          placeholder="000-0000-0000 형식으로 입력하세요"
          autoComplete="username"
        />
        {!isPhoneNumValid && (
          <p
            className="inputCheck text-rose-400"
            style={{ display: phoneNum.length > 0 ? 'block' : 'none' }}
          >
            * 숫자 사이에 하이픈(-)을 넣어주세요.
          </p>
        )}
        <button className={`signupBtn ${activeBtn} bg-rose-400 text-white rounded-xl px-4 py-1 shadow hover:shadow-lg`} >
          가입하기
        </button>
      </form>
    </div>
  );
}
export default SignUp;
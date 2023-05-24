import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { YEAR } from './YEAR';
// import { MONTH } from './MONTH';
// import { DAY } from './DAY';
// import { LIMIT_TIME } from './LIMIT_TIME';
// import './SignUp.scss';

function SignUp() {
  // const navigate = useNavigate();
  //회원가입 완료 시, 로그인 페이지로 보내기 위한 네비게이트
  // const goLogin = () => {
  //   navigate('/logins');
  // }
  const [imageUrl, setImageUrl] = useState(null);
  const [userInput, setUserInput] = useState({
    email: '',
    pw: '',
    pwCheck: '',
    name: '',
    nickname: '',
    gender: '',
    phoneNum: '',
    birth: '',
    profileImage: '',
  });
  const { email, pw, pwCheck, name, nickname, gender, phoneNum, birth } =
    userInput;
  const handleInput = e => {
    const { name, value } = e.target;
    setUserInput({ 
      ...userInput, [name]: value 
    });
  }; //? prevState를 활용하여 이전 상태에 대한 의존성 처리를 해야하나?
  // 프로필 사진 입력
  const imgRef = useRef();
  const onChangeImage = () => {
    const reader = new FileReader();
    const file = imgRef.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
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
  // 생년월일 입력여부 확인
  // const birthYear = year.substring(0, 3) + 'x';
  // const birth = `${year}-${month}-${day}`;
  // const isBirth = Boolean(year && month && day);
  // 개인정보 유효기간
  // const isTimeValid = Boolean(time);
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
  imageUrl;
    // isTimeValid;
  const activeBtn = isAllValid ? 'undefined' : 'disabled';
  // 통신
  const checkSignUp = e => {
    e.preventDefault();
    fetch('https://8075-211-106-114-186.jp.ngrok.io/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: email,
        password: pw,
        name: name,
        nickname: nickname,
        birth,
        phone_number: phoneNum,
        gender: gender,
        profileImage: imageUrl
        // time: time,
      }),
    })
      .then(response => {
        if (response.ok === true) {
          return response.json();
        }
        throw new Error('에러 발생!');
      })
      .catch(error => alert(error))
      .then(data => {
        if (data.ok === '회원가입 성공') {
          alert('회원가입 성공');
          // <Link to="/login" />;
        } else {
          alert('회원가입 실패');
        }
      });
  };
  console.log('userInput',userInput);
  console.log('handleInput',handleInput);
  
  return (
    <div className="signUp">
      <form className="signUpBox flex flex-col justify-center items-center" >
        <div className="profileBox">
          <label className="imgBoxLabel" htmlFor="profileImg">
            {imageUrl ? (
              <img className="labelImg" src={imageUrl} alt="uploadImg" />
            ) : null}
            <div className="imgUploadBtn">
              <i className="fa-sharp fa-solid fa-camera" />
            </div>
            <input
              id="profileImg"
              className="profileImgInput"
              type="file"
              name="imageUrl"
              ref={imgRef}
              onChange={onChangeImage}
            />
          </label>
        </div>
        {/* 이메일 비밀번호 입력 */}
        <input
          onChange={handleInput}
          className="shadow-md w-80 h-12 rounded-lg mb-4 border-2"
          name="email"
          type="text"
          placeholder="이메일"
          autoComplete="username"
        />
        <input
          onChange={handleInput}
          className="shadow-md w-80 h-12 rounded-lg mb-4 border-2"
          name="pw"
          type="password"
          placeholder="비밀번호"
          autoComplete="current-password"
        />
        <input
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
          onChange={handleInput}
          className="userInputName input shadow-md w-80 h-12 rounded-lg mb-4 border-2"
          name="nickname"
          type="text"
          placeholder="닉네임을(를) 입력하세요"
          autoComplete="username"
        />
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
                <input type="text" id="yy" class="int" maxlength="4" placeholder="년(4자)" name="year" onChange={handleInput} />
              </span>
            </div>

            <div id="bir_mm">
              <span class="box">
                <select id="mm" name="month" onChange={handleInput}>
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
                <input type="text" id="dd" class="int" maxlength="2" placeholder="일" name='day' onChange={handleInput} />
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
        {/* 생년월일 입력 */}
        {/* <div className="userBirth">
          <p className="title mustInput">생년월일</p>
          <div className="selectBox">
            <select className="select" name="year" onChange={handleInput}>
              {YEAR.map(y => {
                return <option key={y}>{y}</option>;
              })}
            </select>
            <select className="select" name="month" onChange={handleInput}>
              {MONTH.map(m => {
                return <option key={m}>{m}</option>;
              })}
            </select>
            <select className="select" name="day" onChange={handleInput}>
              {DAY.map(d => {
                return <option key={d}>{d}</option>;
              })}
            </select>
          </div>
        </div> */}
        {/* 개인정보 유효기간 */}
        {/* <div className="userDataSave"> */}
        {/* <p className="name title">개인정보 유효기간</p> */}
        {/* {LIMIT_TIME.map(time => {
            return (
              <label key={time.id} className="one label">
                <input
                  className="radio"
                  name="time"
                  type="radio"
                  value={time.value}
                  onChange={handleInput}
                />
                <span className="text">{time.text}</span>
              </label>
            );
          })} */}
        {/* </div> */}
        <div className={`signupBtn ${activeBtn} bg-rose-400 text-white rounded-xl px-4 py-1 shadow hover:shadow-lg`} onClick={checkSignUp}>
          가입하기
        </div>
      </form>
    </div>
  );
}
export default SignUp;
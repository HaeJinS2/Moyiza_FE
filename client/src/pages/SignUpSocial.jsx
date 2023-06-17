import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import Navbar from '../component/Navbar';
import swal from 'sweetalert';
// import { setCookie } from '../utils/jwtUtils';

function SignUpSocial() {
    window.addEventListener('load', () => {
        swal('환영합니다! 회원가입을 완료해주세요.');
    });
    //회원가입 성공 시, 로그인 페이지로 이동
    const navigate = useNavigate();
    const goMain = () => {
        navigate('/');
    }
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


    const { name, nickname, gender, phoneNum, year, month, day } =
        userInput;
    const handleInput = e => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput, [name]: value
        });
    };

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
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/check/nickname`, { nickname });
        return response.data;
    };

    const validationMutation = useMutation(nicknameValidationPost, {
        onSuccess: (data) => {
            if (data.isDuplicatedNick === false) {
                swal('사용가능한 닉네임입니다.');
            }
        },
        onError: (data) => {
            if (data.response.data.message === "중복된 닉네임 사용") {
                swal('이미 사용중인 닉네임입니다.');
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
        isPhoneNumValid &&
        name &&
        nickname &&
        gender &&
        birth &&
        phoneNum;

    const btn1 = `bg-yellow-300 rounded-xl w-64 h-12 px-4 py-1 shadow hover:shadow-lg`
    const btn2 = `bg-gray-100 text-gray-400 rounded-xl w-64 h-12 px-4 py-1 `

    const activeBtn = isAllValid ? undefined : 'disabled';
    const colorBtn = isAllValid ? btn1 : btn2;

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = {
                name: name,
                nickname: nickname,
                gender: gender,
                birth: birth,
                phone: phoneNum,
            };
            const url = `${process.env.REACT_APP_SERVER_URL}/signup/social`;
            // eslint-disable-next-line
            const socialSignupResponse = await axios.put(url, data);


            goMain();
            swal('회원가입 성공');
        } catch (error) {
            swal('회원가입 실패!')
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
                    style={{ marginTop: '200px', width: '800px', height: '650px', marginBottom: '40px' }}
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
                            <button type='button' style={{ width: '25%', color: '#FF7F1E', borderColor: '#FF7F1E' }} className="bg-white rounded-xl border-2 w-30 h-12 px-4 py-1 shadow hover:shadow-lg" onClick={nicknameValidationHandler}>중복확인</button>
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
                                    <select style={{ width: '100%', color: '#9d9d9d' }} value={userInput.day} type="text" id="dd" class="int h-12 rounded-lg px-3.5 py-2 shadow" placeholder="일" name='day' onChange={handleInput}>
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
                                    </select>
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
                        <div className='flex items-center mb-12'>
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
                        <hr />
                        <button type='submit' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }} className={`signupBtn ${activeBtn} ${colorBtn} mt-12 h-[60px]`} >
                            가입하기
                        </button>
                    </form>
                </div >
            </div >
        </>
    );
}
export default SignUpSocial;

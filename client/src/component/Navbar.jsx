import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // 로그인 상태 여부를 관리할 상태값 추가
  const navigate = useNavigate();
  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
    // 로그인 여부를 확인하고 상태값 업데이트
    const cookie = Cookies.get('jwt');
    setIsLoggedIn(cookie ? true : false);
  }, [isLoggedIn]);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    Cookies.remove('jwt');
    alert('로그아웃 되었습니다.')
    // console.log(Cookies)
    Cookies.remove('REFRESH_TOKEN');
    Cookies.remove('ACCESS_TOKEN');
    navigate('/');
  };

  // const goHome = () => {
  //   navigate('/');
  // }

  const goMyInfo = () => {
    navigate('/user/profile')
  }

  
  const [isScrolled, setIsScrolled] = useState(false);

  const checkScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="fixed z-20">
          {/* <BodyContainer> */}
          {/* <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              className={`w-full flex flex-row justify-between gap-20 `}
            > */}
          <div
            className={`flex justify-center bg-white w-[100vw]  transition-all duration-200 ease-in-out 
      ${isScrolled ? " border-b-[1px] border-gray-300" : ""}`}
          >
            <div
              className={`flex w-[1000px] justify-between items-center transition-all duration-200 ease-in-out  ${
                isScrolled ? "h-[65px]" : "h-[80px]"
              }`}
            >
              <div className="w-full flex justify-between items-center ">
                <div className="flex justify-between items-center text-lg gap-x-2 ml-[-10px]">
                  <img
                    className="cursor-pointer ml-[10px]"
                    onClick={() => navigate("/")}
                    src={`${process.env.PUBLIC_URL}/images/logo.svg`}
                    width="100px"
                    alt="moyizaLogo"
                  />
                </div>
                {/* <motion.h1
                onClick={() => navigate("/")}
                variants={textVariant(0.5)}
                className={`text-5xl font-bold uppercase mt-20 cursor-pointer `}
              > */}
                {/* <div
                  onClick={() => navigate("/")}
                  className="text-5xl flex items-center font-bold uppercase  cursor-pointer">
                  Moyiza
                </div> */}
                {/* </motion.h1> */}
                <div className="flex items-center text-md font-semibold gap-x-8">
                  <div

                    onClick={() => navigate("/chat")}
                    className="cursor-pointer"
                  >채팅</div>
                  {isLoggedIn ? 
                  ( //로그인 상태인 경우
                    <>
                    <div onClick={goMyInfo} className="cursor-pointer">프로필</div>
                    <div onClick={logoutHandler} className="cursor-pointer">로그아웃</div>
                    </> 
                    )
                    : ( //로그인 상태 아닌 경우
                      <>
                    <div onClick={() => navigate("/signup")} className="cursor-pointer">회원가입</div>
                    <div onClick={() => navigate("/logins")} className="cursor-pointer">로그인</div>
                  </>
                  )}
                   {/* <div onClick={() => navigate("/signup")} className="cursor-pointer">회원가입</div>
                  <div
                    onClick={() => navigate("/logins")}
                    className="cursor-pointer"
                  >
                    로그인
                  </div> */}
                </div>
                {/* </motion.div> */}
              </div>
            </div>
          </div>
          {/* </BodyContainer> */}
        </div>
      </div>
    </>
  );
}

export default Navbar;

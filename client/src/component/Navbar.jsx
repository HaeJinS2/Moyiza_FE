import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SearchBar from "./SearchBar";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // 로그인 상태 여부를 관리할 상태값 추가
  const navigate = useNavigate();
  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
    // 로그인 여부를 확인하고 상태값 업데이트
    const cookie = Cookies.get("ACCESS_TOKEN");
    setIsLoggedIn(cookie ? true : false);
  }, [isLoggedIn]);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    // console.log(Cookies)
    Cookies.remove("REFRESH_TOKEN");
    Cookies.remove("ACCESS_TOKEN");
    navigate("/");
    alert("로그아웃 되었습니다.");
  };

  // const goHome = () => {
  //   navigate('/');
  // }

  const goMyInfo = () => {
    navigate("/user/profile");
  };

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
      <div className="fixed z-20">
        <div
          className={`flex justify-center bg-white w-[100vw]  transition-all duration-200 ease-in-out 
      ${isScrolled ? " border-b-[1px] border-gray-300" : ""}`}
        >
          <div
            className={`flex w-[1200px] justify-between items-center transition-all duration-200 ease-in-out  ${
              isScrolled ? "h-[100px]" : "h-[140px]"
            }`}
          >
            <div className="w-full flex justify-between items-center ">
              <div className="flex justify-between items-center text-lg gap-x-2 ml-[-10px]">
                <img
                  className="cursor-pointer ml-[10px]"
                  onClick={() => navigate("/")}
                  src={`${process.env.PUBLIC_URL}/images/logo.svg`}
                  width="140px"
                  alt="moyizaLogo"
                />
              </div>

              <SearchBar />
              <div className="w-[140px] flex items-center text-md font-semibold justify-center">
                {isLoggedIn ? (
                  //로그인 상태인 경우
                  <>
                    <div
                      onClick={() => navigate("/chat")}
                      className="cursor-pointer"
                    >
                      채팅
                    </div>
                    <div onClick={logoutHandler} className="cursor-pointer">
                      알림
                    </div>
                    <div onClick={goMyInfo} className="cursor-pointer">
                      프로필
                    </div>
                  </>
                ) : (
                  //로그인 상태 아닌 경우
                  <>
                    <div></div>
                    <div></div>
                    <div
                      onClick={() => navigate("/logins")}
                      className="flex cursor-pointer w-[70px] h-[60px] items-center"
                    >
                      로그인
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

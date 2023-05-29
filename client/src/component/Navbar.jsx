import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
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
      <div className='fixed z-20'>
        {/* <BodyContainer> */}
        {/* <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              className={`w-full flex flex-row justify-between gap-20 `}
            > */}
           <div className={`flex justify-center bg-white w-full px-80  transition-all duration-300 ease-in-out 
      ${isScrolled ? ' border-b-[1px] border-gray-300' : ''}`}>
        <div className={`flex w-[1200px] justify-between items-center transition-all duration-300 ease-in-out  ${isScrolled ? 'h-[70px]' : 'h-[80px]'}`}>
          <div className="w-full flex justify-between items-center ">
            <div className="flex justify-between items-center text-lg gap-x-2 ml-[-5px]">
              <img
                className="cursor-pointer"
                src={`${process.env.PUBLIC_URL}/images/logo.svg`}
                width="50px"
                alt="moyizaLogo"
              />
              <div
                onClick={() => alert("아직 준비중인 기능입니다!")}
                className="cursor-pointer"
              >채팅</div>
            </div>
            {/* <motion.h1
                onClick={() => navigate("/")}
                variants={textVariant(0.5)}
                className={`text-5xl font-bold uppercase mt-20 cursor-pointer `}
              > */}
            <div 
            onClick={() => navigate("/")}
            className="text-5xl flex items-center font-bold uppercase  cursor-pointer">
              Moyiza
            </div>
            {/* </motion.h1> */}
            <div className="flex items-center text-md font-semibold gap-x-2">
              <div className="cursor-pointer">회원가입</div>
              <div
                onClick={() => navigate("/logins")}
                className="cursor-pointer"
              >
                로그인
              </div>
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

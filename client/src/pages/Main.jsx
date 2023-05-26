import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { slideIn, staggerContainer } from "../utils/motion";
import Navbar from "../component/Navbar";
import Container from "../component/Container";
import BodyContainer from "../component/BodyContainer";
import MainCard from "../component/MainCard";
import axios from "axios";
import Cookies from "js-cookie";
import DetailEvent from "./DetailEvent";

let tabs = ["클럽", "원데이"];

function Main() {
  const divRef = useRef(null);

  const [activeTab, setActiveTab] = useState(tabs[0]);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);



  const user = {
    name: "종훈",
    email: "whdgnszz123@naver.com",
    password: "a123456!",
    nickname: "whdgns",
    gender: "1",
    birth: "1994-08-01",
    phone: "010-8347-1633",
    imageUrl:
      "https://moyiza-image.s3.ap-northeast-2.amazonaws.com/e865b146-e884-4846-9e26-fe80fabea7f2_Velkoz_0.png",
  };

  const loginUser = {
    email: "whdgnszz123@naver.com",
    password: "a123456!",
  };

  const btn1 = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/test/signup`,
        user
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const btn2 = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/login`,
        loginUser
      );
      const accessToken = response.headers.get("access_token").split(" ")[1];
      const refreshToken = response.headers.get("refresh_token").split(" ")[1];
      Cookies.set("ACCESS_TOKEN", accessToken);
      Cookies.set("REFRESH_TOKEN", refreshToken);

    } catch (err) {
      console.log(err);
    }
  };



  return (
    <>
      <Container>
        <Navbar />
        <BodyContainer>
          <section ref={divRef}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              className={`mx-auto flex flex-col`}
            >
              <div className="flex items-center justify-center gap-16">
                <motion.div
                  variants={slideIn("left", "tween", 0.2, 1)}
                  className="relative w-auto"
                >
                  <div className="flex flex-col w-[590px] h-[341px] bg-rose-400 rounded-lg text-white text-xl justify-end items-end">
                    <div>몸과 마음이</div>
                    <div>건강해지는 습관 만들기</div>
                    <div>대한민국 1등 모임 앱, Moyiza</div>
                    <div className="flex justify-between gap-20">
                      <div onClick={btn1}>버튼</div>
                      <div onClick={btn2}>버튼</div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  variants={slideIn("right", "tween", 0.2, 1)}
                  className="relative md:mt-[60px] -mt-[12px] items-center"
                >
                  <div className=" w-full h-[498px] justify-center items-center rounded-top-[140px] z-[0]  ">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/cat.jpeg`}
                      alt="tmp-alt"
                      width="590.5px"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <DetailEvent />
          </section>
          <section>
            <div>
              <div className="flex  gap-10 mt-20">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(tab)}
                    className={`${activeTab === tab ? "text-white" : "hover:opacity-50"
                      } relative rounded-full px-3 py-1.5 text-sm font-medium text-black outline-2 transition focus-visible:outline`}
                  >
                    {activeTab === tab && (
                      <motion.div
                        layoutId="active-pill"
                        transition={{ type: "spring", duration: 0.5 }}
                        className="bg-gatherBlue absolute inset-0"
                        style={{
                          borderRadius: 9999,
                        }}
                      />
                    )}
                    <span className="relative text-base z-10 mix-blend">
                      {tab}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 mt-8">
                <MainCard description="서비스 소개" />
                <MainCard image="https://moyiza-image.s3.ap-northeast-2.amazonaws.com/e865b146-e884-4846-9e26-fe80fabea7f2_Velkoz_0.png" />
                <MainCard image="https://res.cloudinary.com/dsav9fenu/image/upload/v1684890347/KakaoTalk_Photo_2023-05-24-10-04-52_ubgcug.png" />
                <MainCard description="서비스 소개" />
                <MainCard description="서비스 소개" />
                <MainCard image="https://moyiza-image.s3.ap-northeast-2.amazonaws.com/4a2abf1a-dfdd-4cc7-9e3e-0283745ae30a_services.png" />
              </div>
            </div>
          </section>
        </BodyContainer>
      </Container>
    </>
  );
}

export default Main;
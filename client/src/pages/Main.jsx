import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { slideIn, staggerContainer } from "../utils/motion";
import Fade from "react-reveal/Fade";

import DetailEvent from "./DetailEvent";
import { useNavigate } from "react-router-dom";

import Navbar from "../component/Navbar";
import Container from "../component/Container";
import BodyContainer from "../component/BodyContainer";
import MainCard from "../component/MainCard";

let tabs = ["클럽", "원데이"];

function Main() {
  const divRef = useRef(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  //페이지 렌더링 시 화면 최상단으로 이동하는 코드
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const loginUser = {
    email: "whdgnszz123@naver.com",
    password: "a123456!",
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
              className={`mx-auto flex flex-col justify-between `}
            >
              <div className="mt-24 grid grid-cols-2 gap-2">
                <motion.div
                  variants={slideIn("left", "tween", 0.2, 1)}
                  className="relative w-auto"
                >
                  <div className="p-4 flex flex-col h-[341px] bg-rose-400 rounded-lg text-white text-xl justify-end items-end">
                    <div>대한민국 1등 모임 앱, Moyiza</div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => {
                          navigate("/club");
                          btn2();
                        }}
                      >
                        클럽으로
                      </button>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  variants={slideIn("right", "tween", 0.2, 1)}
                  className="relative w-auto"
                >
                  <div className="p-4 flex flex-col  h-[341px] bg-gatherBlue rounded-lg text-white text-xl justify-end items-end">
                    <div>대한민국 1등 모임 앱, Moyiza</div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => navigate('/event')}
                      >
                        이벤트로
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <DetailEvent />
          </section>
          <section>
            <div>
              <div className="flex gap-10 mt-20">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab ? "text-white" : "hover:opacity-50"
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
              <div className="grid grid-cols-2 mt-8">
                <Fade bottom>
                  <MainCard description="서비스 소개" />
                  <MainCard image="https://moyiza-image.s3.ap-northeast-2.amazonaws.com/e865b146-e884-4846-9e26-fe80fabea7f2_Velkoz_0.png" />
                  <MainCard image="https://res.cloudinary.com/dsav9fenu/image/upload/v1684890347/KakaoTalk_Photo_2023-05-24-10-04-52_ubgcug.png" />
                  <MainCard description="서비스 소개" />
                  <MainCard description="서비스 소개" />
                  <MainCard image="https://moyiza-image.s3.ap-northeast-2.amazonaws.com/4a2abf1a-dfdd-4cc7-9e3e-0283745ae30a_services.png" />
                </Fade>
              </div>
            </div>
          </section>
        </BodyContainer>
      </Container>
    </>
  );
}

export default Main;

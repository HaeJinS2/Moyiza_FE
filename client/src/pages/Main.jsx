import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { slideIn, staggerContainer } from "../utils/motion";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import BodyContainer from "../component/BodyContainer";
import MainCard from "../component/MainCard";
import Footer from "../component/Footer";
import MyLocation from "../component/MyLocation";
import { logEvent } from "../utils/amplitude";

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
    logEvent("Button Clicked", { name: "btn2", page: "Main" });
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
      <Navbar />
      <BodyContainer>
        <section ref={divRef}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={`mx-auto flex flex-col justify-between`}
          >
            <div className="mt-24 grid grid-cols-2 gap-x-2">
              <motion.div
                variants={slideIn("left", "tween", 0.2, 1)}
                className="relative w-auto "
              >
                <div className="p-4 flex flex-1 flex-col h-[380px] font-bold text-5xl bg-rose-400 rounded-lg text-white justify-center items-center">
                  {/* <div>대한민국 1등 모임 앱, Moyiza</div> */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        navigate("/club");
                      }}
                    >
                      ❤️클럽으로❤️
                    </button>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={slideIn("right", "tween", 0.2, 1)}
                className="relative w-auto flex justify-end items-end"
              >
                <div className="p-4 flex flex-1 flex-col h-[380px] font-bold text-5xl bg-gatherBlue rounded-lg text-white justify-center items-center">
                  {/* <div>대한민국 1등 모임 앱, Moyiza</div> */}
                  <div className="flex justify-between">
                    <button onClick={() => navigate("/oneday")}>
                      ❤️원데이로❤️
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          <MyLocation />
          <button
            onClick={() => {
              btn2();
            }}
          >
            누르지마세요(해킹당함)
          </button>
        </section>
        <section>
          <div>
            <div className="flex gap-10 mt-20 mb-12">
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

          <div className="flex flex-col justify-between ">
            <div className="grid grid-cols-1 mt-8 gap-x-2 gap-y-[350px]">
              <Fade bottom>
                <MainCard
                  description="서비스 소개"
                  image="https://moyiza-image.s3.ap-northeast-2.amazonaws.com/b839185f-ea5e-4a44-94c2-d8088a804c61_1f5a309a0cd847fd98cd6e8927617a94.jpeg"
                />
                <MainCard
                  reverse={true}
                  description="서비스 소개"
                  image="https://moyiza-image.s3.ap-northeast-2.amazonaws.com/b839185f-ea5e-4a44-94c2-d8088a804c61_1f5a309a0cd847fd98cd6e8927617a94.jpeg"
                />
                <MainCard
                  description="서비스 소개"
                  image="https://moyiza-image.s3.ap-northeast-2.amazonaws.com/b839185f-ea5e-4a44-94c2-d8088a804c61_1f5a309a0cd847fd98cd6e8927617a94.jpeg"
                />
              </Fade>
            </div>
          </div>
        </section>
      </BodyContainer>
      <Footer />
    </>
  );
}

export default Main;

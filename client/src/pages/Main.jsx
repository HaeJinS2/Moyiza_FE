import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { staggerContainer } from "../utils/motion";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";
import BodyContainer from "../component/BodyContainer";
import MainCard from "../component/MainCard";
import Footer from "../component/Footer";
import MyLocation from "../component/MyLocation";
import { logEvent } from "../utils/amplitude";
import NearbyEvents from "../component/NearbyEvents";

let tabs = ["일상속", "하루속"];

function Main() {
  const divRef = useRef(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  //페이지 렌더링 시 화면 최상단으로 이동하는 코드
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <BodyContainer>
        <section ref={divRef}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={`mx-auto flex flex-col justify-between`}
          >
            <div className="mt-40 grid grid-cols-2 gap-x-2">
              {/* <motion.div
                variants={slideIn("left", "tween", 0.2, 1)}
                className="relative w-auto "
              > */}
              <div className="relative w-auto ">
                <div className="p-4 flex flex-1 flex-col h-[422px] font-bold text-5xl rounded-lg text-black justify-center ">
                  <div className="flex flex-col font-sans">
                    <Fade bottom delay={0}>
                      <p>취미 공유할 사람</p>
                      <p>모두 여기, 모이자!</p>
                    </Fade>
                    <br />
                    <Fade bottom delay={500}>
                      <p className="text-2xl font-semibold">
                        일일 모임부터 정기 모임까지
                      </p>
                    </Fade>
                  </div>
                </div>
              </div>
              {/* </motion.div> */}
              {/* <motion.div
                variants={slideIn("right", "tween", 0.2, 1)}
                className="relative w-auto flex justify-end items-end"
              > */}
              <div className="relative w-auto flex justify-end items-end">
                <div className="p-4 flex flex-1 flex-col h-[422px] font-bold text-5xl bg-transparent rounded-lg text-white justify-center items-center">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/main.png`}
                    alt="main_image"
                  />
                </div>
              </div>
              {/* </motion.div> */}
            </div>
          </motion.div>
          <div className="flex gap-4">
            <img
              className="cursor-pointer"
              onClick={() => {
                navigate("/club");
              }}
              src={`${process.env.PUBLIC_URL}/images/to_club.png`}
              alt="to_club_button"
            />
            <img
              className="cursor-pointer"
              onClick={() => {
                navigate("/oneday");
              }}
              src={`${process.env.PUBLIC_URL}/images/to_oneday.png`}
              alt="to_oneday_button"
            />
            <img
              className="cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/to_recommend.png`}
              alt="to_recommend_button"
            />
          </div>
          <MyLocation />
          <br />
          <NearbyEvents />
          <br />
          <button
            onClick={() => {
              navigate("/create-feed");
            }}
          >
            게시글 생성 페이지
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
                    activeTab === tab ? "text-black" : "hover:opacity-50"
                  } relative rounded-full px-3 py-1.5 text-sm font-medium text-black outline-2 transition focus-visible:outline`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="active-pill"
                      transition={{ type: "spring", duration: 0.5 }}
                      className="border-b-[4px] border-black absolute inset-0"
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

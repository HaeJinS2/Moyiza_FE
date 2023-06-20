import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "../utils/motion";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";
import BodyContainer from "../component/BodyContainer";
import MainCard from "../component/MainCard";
import Footer from "../component/Footer";
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
            <div className="mt-40 flex justify-center items-center ">
              <div className="flex flex-col h-[422px] rounded-lg text-black justify-center w-[541px]">
                <div className="flex flex-col">
                  <Fade bottom delay={0}>
                    <p className="font-bold text-5xl mb-2">취미 공유할 사람</p>
                    <p className="font-bold text-5xl">모두 여기, 모이자!</p>
                  </Fade>
                  <br />
                  <Fade bottom delay={500}>
                    <p className="text-[1.75rem] font-semibold">
                      일일 모임부터 정기 모임까지
                    </p>
                  </Fade>
                </div>
              </div>
              <img
                src={`${process.env.PUBLIC_URL}/images/main/main.svg`}
                alt="main_image"
              />
              {/* </motion.div> */}
            </div>
          </motion.div>
          <div className="flex gap-x-4 h-[60px] px-16">
            <img
              className="cursor-pointer"
              onClick={() => {
                navigate("/club");
              }}
              src={`${process.env.PUBLIC_URL}/images/main/to_club.svg`}
              alt="to_club_button"
            />
            <img
              className="cursor-pointer"
              onClick={() => {
                navigate("/oneday");
              }}
              src={`${process.env.PUBLIC_URL}/images/main/to_oneday.svg`}
              alt="to_oneday_button"
            />
            <NearbyEvents />
          </div>
          {/* <MyLocation />
          <br />
          <button onClick={() => swal("Hello world!")}>커스텀알럿버튼</button>
          <br />
          <button
            onClick={() => {
              navigate("/create-feed");
            }}
          >
            게시글 생성 페이지
          </button> */}
        </section>
        <div className="flex gap-10 mt-20 mb-12 justify-start px-20">
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
              <span className="relative text-2xl z-10 mix-blend">{tab}</span>
            </button>
          ))}
        </div>
        <section className="flex flex-col items-center">
          <div className="flex flex-col w-[1140px] justify-between">
            <div className="flex flex-col mt-8 gap-x-2 ">
              {activeTab === "일상속" ? (
                <>
                  <Fade bottom>
                    <MainCard
                      cardNum="club_1"
                      image={`${process.env.PUBLIC_URL}/images/main/club_1.svg`}
                    />
                    <MainCard
                      cardNum="club_2"
                      image={`${process.env.PUBLIC_URL}/images/main/club_2.png`}
                    />
                    <MainCard
                      cardNum="club_3"
                      image={`${process.env.PUBLIC_URL}/images/main/club_3.svg`}
                    />
                  </Fade>
                </>
              ) : (
                <Fade bottom>
                  <MainCard
                    cardNum="oneday_1"
                    image={`${process.env.PUBLIC_URL}/images/main/oneday_1.svg`}
                  />
                  <MainCard
                    cardNum="oneday_2"
                    image={`${process.env.PUBLIC_URL}/images/main/oneday_2.svg`}
                  />
                  <MainCard
                    cardNum="oneday_3"
                    image={`${process.env.PUBLIC_URL}/images/main/oneday_3.svg`}
                  />
                </Fade>
              )}
            </div>
          </div>
        </section>

        {activeTab === "일상속" ? (
          <img
            onClick={() => navigate("/club")}
            className="w-[1280px] cursor-pointer"
            src={`${process.env.PUBLIC_URL}/images/main/club_bottom.svg`}
            alt="service-description"
          />
        ) : (
          <img
            onClick={() => navigate("/oneday")}
            className="w-[1280px] cursor-pointer"
            src={`${process.env.PUBLIC_URL}/images/main/oneday_bottom.svg`}
            alt="service-description"
          />
        )}

        <Footer />
      </BodyContainer>
    </>
  );
}

export default Main;

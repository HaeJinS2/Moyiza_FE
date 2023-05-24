import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles";
import { slideIn, staggerContainer } from "../utils/motion";
import Navbar from "../component/Navbar";
import Container from "../component/Container";
import CreateClub from "./CreateClub";

let tabs = ["클럽", "원데이"];

function Main() {
  const divRef = useRef(null);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <Container>
        <Navbar />

        <section ref={divRef} className={`${styles.paddings}`}>
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
                    <div>버튼</div>
                    <div>버튼</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={slideIn("right", "tween", 0.2, 1)}
                className="relative md:mt-[60px] -mt-[12px]"
              >
                <div className=" w-full h-[498px] justify-start items-start rounded-top-[140px] z-[0]  ">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/cat.jpeg`}
                    alt="tmp-alt"
                    width="590.5px"
                    height="498px"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
          <CreateClub />
        </section>
        <section className={`${styles.yPaddings} sm:pl-16 pl-6 h-screen`}>
          <div className="flex gap-10 mt-20">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab ? "" : "hover:opacity-50"
                } relative rounded-full px-3 py-1.5 text-sm font-medium text-black outline-2 outline-rose-400 focus-visible:outline`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-pill"
                    transition={{ type: 'spring', duration:0.5}}
                    className="bg-gatherBlue absolute inset-0"
                    style={{
                      borderRadius: 9999
                    }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex justify-start">
            <motion.div
              layoutId="red-dot"
              className="h-5 w-5 rounded-full bg-red-500"
            />
          </div>
        </section>
      </Container>
    </>
  );
}

export default Main;

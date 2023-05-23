import React from "react";
import { motion } from "framer-motion";
import styles from "../styles";
import { slideIn, staggerContainer } from "../utils/motion";
import Navbar from "../component/Navbar";
import Container from "../component/Container";

function Main() {
  return (
    <>
      <Container>
        <Navbar />
        <div className=" h-screen"></div>
        <section className={`${styles.paddings}`}>
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
        </section>
        <section className={`${styles.yPaddings} sm:pl-16 pl-6 h-screen`}>
          <div className="flex gap-10 mt-20">
            <div className="bg-rose-400 text-white rounded-xl px-4 py-1">
              클럽
            </div>
            <div className="bg-rose-400 text-white rounded-xl px-4 py-1">
              원데이
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}

export default Main;

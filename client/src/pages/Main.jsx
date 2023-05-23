import React, { useEffect } from "react";
import CreateClub from "./CreateClub";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import styles from "../styles";
import { slideIn, staggerContainer, textVariant } from "../utils/motion";

function Main() {
  useEffect(() => {
    AOS.init();
  });

  return (
    <>
      <div className=" h-screen"></div>
      <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
        {/* 예시 1번 section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={`${styles.innerWidth} mx-auto flex flex-col h-screen`}
        >
          <div className="flex justify-center items-center flex-row relative z-10 ">
            <motion.h1
              variants={textVariant(1.1)}
              className={`${styles.heroHeading}`}
            >
              Moyiza
            </motion.h1>
          </div>
          <div className="flex items-center justify-center gap-32">
            <motion.div
              variants={slideIn("left", "tween", 0.2, 1)}
              className="relative w-auto"
            >
              <div className="w-full">
                <div>몸과 마음이</div>
                <div>건강해지는 습관 만들기</div>
                <div>대한민국 1등 모임 앱, Moyiza</div>
              </div>
            </motion.div>
            <motion.div
              variants={slideIn("right", "tween", 0.2, 1)}
              className="relative md:mt-[60px] -mt-[12px]"
            >
              <div className=" w-full h-[300px] justify-start items-start rounded-top-[140px] z-[0]  ">
                <img src={`${process.env.PUBLIC_URL}/images/cat.jpeg`} alt="tmp-alt" />
              </div>
            </motion.div>
          </div>
          <div>
            <CreateClub />
          </div>
        </motion.div>
      </section>
      <div className=" h-screen"></div>
    </>
  );
}

export default Main;

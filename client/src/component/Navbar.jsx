import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, textVariant } from "../utils/motion";

function Navbar() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="fixed justify-around z-20 ">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={`w-full flex flex-row justify-center gap-32`}
          >
            <div className="flex gap-2 items-end ">
              <div>로고</div>
              <div>클럽</div>
              <div>원데이</div>
            </div>
            <motion.h1
              variants={textVariant(0.5)}
              className={`text-7xl font-bold uppercase mt-20`}
            >
              Moyiza
            </motion.h1>
            <div className="flex gap-2 items-end">
              <div>검색</div>
              <div>로그인</div>
              <div>프로필</div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

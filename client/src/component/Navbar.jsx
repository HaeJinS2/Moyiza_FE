import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, textVariant } from "../utils/motion";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

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
              <div className="cursor-pointer">로고</div>
              <div onClick={() => navigate("/club")} className="cursor-pointer">
                클럽
              </div>
              <div className="cursor-pointer">원데이</div>
            </div>
            <motion.h1
            
              onClick={() => navigate("/")}
              variants={textVariant(0.5)}
              className={`text-7xl font-bold uppercase mt-20 cursor-pointer`}
            >
              Moyiza
            </motion.h1>
            <div className="flex gap-2 items-end">
              <div className="cursor-pointer">검색</div>
              <div onClick={() => navigate("/logins")} className="cursor-pointer">로그인</div>
              <div className="cursor-pointer">프로필</div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

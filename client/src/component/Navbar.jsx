import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, textVariant } from "../utils/motion";
import { useNavigate } from "react-router-dom";
import BodyContainer from "./BodyContainer";

function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center items-center py-4">
        <div className="fixed z-20 bg-white w-full ">
          <BodyContainer>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              className={`w-full flex flex-row justify-between gap-20 px-10`}
            >
              <div className="flex gap-10 items-end text-lg ">
                <img
                  className="cursor-pointer"
                  src={`${process.env.PUBLIC_URL}/images/logo.svg`}
                  width="70px"
                  alt="moyizaLogo"
                />
                <div
                  onClick={() => navigate("/club")}
                  className="cursor-pointer"
                ></div>
                <div
                  onClick={() => alert("아직 준비중인 기능입니다!")}
                  className="cursor-pointer"
                ></div>
              </div>
              <motion.h1
                onClick={() => navigate("/")}
                variants={textVariant(0.5)}
                className={`text-7xl font-bold uppercase mt-20 cursor-pointer`}
              >
                Moyiza
              </motion.h1>
              <div className="flex gap-10 items-end text-lg">
                <div className="cursor-pointer">채팅</div>
                <div className="cursor-pointer">회원가입</div>
                <div
                  onClick={() => navigate("/logins")}
                  className="cursor-pointer"
                >
                  로그인
                </div>
              </div>
            </motion.div>
          </BodyContainer>
        </div>
      </div>
    </>
  );
}

export default Navbar;

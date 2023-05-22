import React, { useEffect } from "react";
import Navbar from "../component/Navbar";
import CreateClub from "./CreateClub";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

function Main() {
  useEffect(() => {
    AOS.init();
  });

  return (
    <>
      <Navbar />
      <div className=" h-screen flex items-center justify-center">
        <div>
          <div>몸과 마음이</div>
          <div>건강해지는 습관 만들기</div>
          <div>대한민국 1등 건강습관 앱, 챌린저스</div>
        </div>
        <div>
          <motion.div>
            <img src={`${process.env.PUBLIC_URL}/images/cat.jpeg`} />
          </motion.div>
        </div>
      </div>
      <div className=" h-screen flex items-center justify-around">
        <div data-aos="fade-right" className="text-7xl">
          123
        </div>
        <div data-aos="fade-left" className="text-7xl">
          456
        </div>
      </div>
      <div className=" h-screen flex items-center justify-center">dd</div>
      <div>
        <CreateClub />
      </div>
    </>
  );
}

export default Main;

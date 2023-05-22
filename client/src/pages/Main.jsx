import React from "react";
import Navbar from "../component/Navbar";
import CreateClub from "./CreateClub";

function Main() {
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
          <img src={`${process.env.PUBLIC_URL}/images/cat.jpeg`} />
        </div>
      </div>
      <div className=" h-screen flex items-center justify-center">dd</div>
      <div className=" h-screen flex items-center justify-center">dd</div>
      <div>
        <CreateClub />
      </div>
    </>
  );
}

export default Main;

import React from "react";
import Container from "../component/Container";
import Navbar from "../component/Navbar";
import CreateClub from "./CreateClub";

function CreateFeed() {
  return (
    <>
      <Navbar />
      <Container>
      <div className="pt-60 pb-40 text-4xl font-sans font-semibold w-full h-[230px] flex justify-center items-center">
        어떤 모임을 만들까요?
      </div>
      <div className="max-w-[1920px] self-center h-[screen] flex justify-center items-start py-40 bg-[#FFFCF2] shadow-cm rounded-t-3xl">
        <div className="flex flex-col gap-[60px]">
          {/* <CreateClub> */}
            <img src={`${process.env.PUBLIC_URL}/images/create_club.svg`} alt="create-club"/>
          {/* </CreateClub> */}
          <img src={`${process.env.PUBLIC_URL}/images/create_oneday.svg`} alt="create-oneday"/>
          </div>
      </div>
      </Container>
    </>
  );
}

export default CreateFeed;

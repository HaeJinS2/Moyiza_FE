import React, { useState } from "react";
import BodyContainer from "../component/BodyContainer";
import Container from "../component/Container";

function CreateOnedayForm() {
  const [onedayStep, setOnedayStep] = useState(1);
  const handleOnedayStep = (e) => {
    e.target.name === "prev"
      ? setOnedayStep(onedayStep - 1)
      : setOnedayStep(onedayStep + 1);
  };
  return (
    <>
      <Container>
        <div className="flex justify-center pt-60 pb-40 text-3xl">
          모두와 함께할&nbsp; <span className="text-green-400">하루</span>를
          만들어보세요
        </div>
        <div className="h-screen max-w-[1920px] shadow-cm bg-[#FFFCF2] rounded-t-3xl">
          <BodyContainer>
            {onedayStep === 1 && (
              <OnedayStep1 handleOnedayStep={handleOnedayStep} />
            )}
            {onedayStep === 2 && (
              <OnedayStep2 handleOnedayStep={handleOnedayStep} />
            )}
          </BodyContainer>
          <div>
            <div>프로그래스바</div>
          </div>
        </div>
      </Container>
    </>
  );
}

function OnedayStep1({ handleOnedayStep }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="py-20 pl-52 text-3xl font-sans font-semibold self-start">
          1. 관심사를 선택하세요.
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-3 gap-x-[122px] gap-y-[60px] justify-between w-full">
            <button className="bg-white w-[180px] h-[60px] rounded-full shadow-cms">
              문화 예술
            </button>
            <button className="bg-white w-[180px] h-[60px] rounded-full shadow-cms">
              문화 예술
            </button>
            <button className="bg-white w-[180px] h-[60px] rounded-full shadow-cms">
              문화 예술
            </button>
            <button className="bg-white w-[180px] h-[60px] rounded-full shadow-cms">
              문화 예술
            </button>
            <button className="bg-white w-[180px] h-[60px] rounded-full shadow-cms">
              문화 예술
            </button>
            <button className="bg-white w-[180px] h-[60px] rounded-full shadow-cms">
              문화 예술
            </button>
            <button className="bg-white w-[180px] h-[60px] rounded-full shadow-cms">
              문화 예술
            </button>
            <button className="bg-white w-[180px] h-[60px] rounded-full shadow-cms">
              문화 예술
            </button>
          </div>
        </div>
        <div className="py-20">
          <button
            onClick={handleOnedayStep}
            className="w-[224px] h-[60px] bg-green-600 text-white rounded-full"
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}

function OnedayStep2({ handleOnedayStep }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="py-20 pl-52 text-3xl font-sans font-semibold self-start">
          2. 원하는 카테고리를 선택하세요.
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-3 gap-x-[122px] gap-y-[60px] justify-between w-full">
            <button className="bg-white w-[180px] h-[60px] rounded-full shadow-cms">
              회화
            </button>
            <button className="bg-white w-[180px] h-[60px] rounded-full shadow-cms">
              회화
            </button>
            <button className="bg-white w-[180px] h-[60px] rounded-full shadow-cms">
              회화
            </button>
            <button className="bg-white w-[180px] h-[60px] rounded-full shadow-cms">
              회화
            </button>
            <button className="bg-white w-[180px] h-[60px] rounded-full shadow-cms">
              회화
            </button>
            <button className="bg-white w-[180px] h-[60px] rounded-full shadow-cms">
              회화
            </button>
            <button className="bg-white w-[180px] h-[60px] rounded-full shadow-cms">
              회화
            </button>
            <button className="bg-white w-[180px] h-[60px] rounded-full shadow-cms">
              회화
            </button>
          </div>
        </div>
        <div className="py-20 flex gap-4">
          <button
            onClick={handleOnedayStep}
            className="w-[224px] h-[60px] bg-[#747474] text-white rounded-full"
            name="prev"
          >
            이전
          </button>
          <button
            onClick={handleOnedayStep}
            className="w-[224px] h-[60px] bg-green-600 text-white rounded-full"
            name="next"
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateOnedayForm;

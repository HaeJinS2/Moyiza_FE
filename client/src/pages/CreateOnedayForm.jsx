import { LinearProgress } from "@mui/material";
import { styled } from "@mui/system";
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
        <div className="flex justify-center pt-48 pb-32 text-3xl">
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
            {onedayStep === 3 && (
              <OnedayStep3 handleOnedayStep={handleOnedayStep} />
            )}
            {onedayStep === 4 && (
              <OnedayStep4 handleOnedayStep={handleOnedayStep} />
            )}
            {onedayStep === 5 && (
              <OnedayStep5 handleOnedayStep={handleOnedayStep} />
            )}
            {onedayStep === 6 && (
              <OnedayStep6 handleOnedayStep={handleOnedayStep} />
            )}
            {onedayStep === 7 && (
              <OnedayStep7 handleOnedayStep={handleOnedayStep} />
            )}
            {onedayStep === 8 && (
              <OnedayStep8 handleOnedayStep={handleOnedayStep} />
            )}
          </BodyContainer>
          <div className="flex justify-center">
            <GradientLinearProgress
              sx={{ width: "1200px" }}
              variant="determinate"
              value={(onedayStep / 9) * 100}
            />
          </div>
        </div>
      </Container>
    </>
  );
}

const GradientLinearProgress = styled(LinearProgress)({
  height: 10,
  borderRadius: 20,
  backgroundColor: "lightgray",
  "& .MuiLinearProgress-bar": {
    borderRadius: 20,
    backgroundImage: "linear-gradient(45deg, #FFE14F 35%, #07B159 80%)",
  },
});

function OnedayStep1({ handleOnedayStep }) {
  return (
    <>
      <CreateOnedayFormLayout
        header="1. 관심사를 선택하세요."
        handleOnedayStep={handleOnedayStep}
      >
        <div className="grid grid-cols-3 gap-x-[122px] gap-y-[60px] justify-items-center w-full h-full">
          <button className="bg-white w-[180px] h-[60px]  rounded-full shadow-cms">
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
      </CreateOnedayFormLayout>
    </>
  );
}

function OnedayStep2({ handleOnedayStep }) {
  return (
    <>
      <CreateOnedayFormLayout
        header="2. 원하는 카테고리를 선택하세요."
        handleOnedayStep={handleOnedayStep}
      >
        <div className="grid grid-cols-3 gap-x-[122px] gap-y-[60px] justify-items-center w-full h-full">
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
      </CreateOnedayFormLayout>
    </>
  );
}

function OnedayStep3({ handleOnedayStep }) {
  return (
    <>
      <CreateOnedayFormLayout
        header="3. 원하는 하루속 이벤트 이름을 작성해주세요."
        handleOnedayStep={handleOnedayStep}
      >
        <div className=" w-full flex flex-col justify-between items-center">
          <input
            className="flex shadow-cms rounded-full w-3/5 px-4 py-3"
            type="text"
            placeholder="하루속 이벤트 이름을 입력해주세요."
          />
        </div>
        <div></div>
      </CreateOnedayFormLayout>
    </>
  );
}

function OnedayStep4({ handleOnedayStep }) {
  return (
    <>
      <CreateOnedayFormLayout
        header="4. 하루속 이벤트 정보를 입력해주세요."
        handleOnedayStep={handleOnedayStep}
      >
        <div className="h-full w-full flex flex-col gap-10 px-60">
          <div className="flex flex-col gap-2">
            <div className="w-full">
              1) 하루속을 대표할 이미지를 등록해주세요.
            </div>
            <input type="file" />
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <div>2) 하루속 이벤트를 소개할 내용을 적어주세요.</div>
              <input
                className="shadow-cms rounded-3xl w-full h-[200px] px-2 py-2"
                placeholder="우리 일상을 소개해주세요."
                type="text"
              />
            </div>
          </div>
        </div>
      </CreateOnedayFormLayout>
    </>
  );
}

function OnedayStep5({ handleOnedayStep }) {
  return (
    <>
      <CreateOnedayFormLayout
        header="5. 언제 모일까요?"
        handleOnedayStep={handleOnedayStep}
      >
        <div className="h-full w-full flex flex-col gap-10 px-60">
          <div>
            <div className="flex flex-col gap-2">
              <div>1) 하루속 이벤트를 소개할 내용을 적어주세요.</div>
              <input
                className="shadow-cms rounded-3xl w-full px-2 py-2"
                placeholder="우리 일상을 소개해주세요."
                type="text"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <div>2) 하루속 이벤트를 소개할 내용을 적어주세요.</div>
              <input
                className="shadow-cms rounded-3xl w-full px-2 py-2"
                placeholder="우리 일상을 소개해주세요."
                type="text"
              />
            </div>
          </div>
        </div>
      </CreateOnedayFormLayout>
    </>
  );
}

function OnedayStep6({ handleOnedayStep }) {
  return (
    <>
      <CreateOnedayFormLayout
        header="6. 어디서 모일까요?"
        handleOnedayStep={handleOnedayStep}
      >
        <div className="h-full w-full flex flex-col gap-10 px-60">
          <div>
            <div className="flex flex-col gap-2">
              <div>장소</div>
              <input
                className="shadow-cms rounded-3xl w-full px-2 py-2"
                placeholder="만날 장소를 입력해주세요."
                type="text"
              />
            </div>
          </div>
        </div>
      </CreateOnedayFormLayout>
    </>
  );
}

function OnedayStep7({ handleOnedayStep }) {
  return (
    <>
      <CreateOnedayFormLayout
        header="7. 함께할 멤버의 조건을 설정해주세요."
        handleOnedayStep={handleOnedayStep}
      >
        <div className="h-full w-full flex flex-col gap-10 px-60">
          <div>
            <div className="flex flex-col gap-2">
              <div>1) 성별</div>
              <div className="flex justify-around pt-2">
                <button className="bg-white w-[180px] h-[60px] px-4 py-1 rounded-full shadow-cms">
                  여성
                </button>
                <button className="bg-white w-[180px] h-[60px] px-4 py-1 rounded-full shadow-cms">
                  남성
                </button>
                <button className="bg-white w-[180px] h-[60px] px-4 py-1 rounded-full shadow-cms">
                  누구나
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <div>2) 연령</div>
              <input
                className="shadow-cms rounded-3xl w-full px-2 py-2"
                placeholder="우리 일상을 소개해주세요."
                type="text"
              />
            </div>
          </div>
        </div>
      </CreateOnedayFormLayout>
    </>
  );
}

function OnedayStep8({ handleOnedayStep }) {
  return (
    <>
      <CreateOnedayFormLayout
        header="8. 몇명과 함께할까요?"
        handleOnedayStep={handleOnedayStep}
      >
        <div className="h-full"></div>
      </CreateOnedayFormLayout>
    </>
  );
}

function CreateOnedayFormLayout({ header, handleOnedayStep, children }) {
  return (
    <>
      <div className="flex flex-col justify-between items-center h-[700px] max-w-[1200px]">
        <div className="self-start px-60 pt-20 pb-10 text-3xl font-sans font-semibold">
          {header}
        </div>
        <div className="flex flex-col items-center justify-between w-full h-[500px]">
          {children}
        </div>
        <div className="py-16 flex gap-20">
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

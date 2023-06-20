import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getAPI, postAPI } from "../axios";
import Container from "../component/Container";
import Navbar from "../component/Navbar";
import {
  onedayOptionState,
  onedayTmpIdState,
  savedOnedayDataState,
} from "../states/onedayState";
import { styled } from "@mui/system";

import CreateClub from "./CreateClub";
import Modal from "react-modal";
import { LinearProgress } from "@mui/material";

function CreateFeed() {
  // eslint-disable-next-line
  const [onedayOptions, setOnedayOptions] = useRecoilState(onedayOptionState);
  // eslint-disable-next-line
  const [tmpOnedayId, setTmpOnedayId] = useRecoilState(onedayTmpIdState);
  // eslint-disable-next-line
  const [savedOnedayData, setSavedOnedayData] =
    useRecoilState(savedOnedayDataState);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    if (savedOnedayData?.oneDayGroupSize) {
      setProgress(87.2);
    } else if (savedOnedayData?.age && savedOnedayData?.gender) {
      setProgress(73);
    } else if (savedOnedayData?.oneDayLocation) {
      setProgress(73);
    } else if (savedOnedayData?.oneDayStartTime) {
      setProgress(73);
    } else if (savedOnedayData?.oneDayContent) {
      setProgress(56.8);
    } else if (savedOnedayData?.oneDayTitle) {
      setProgress(42.6);
    } else if (savedOnedayData?.tag) {
      setProgress(28.4);
    } else if (savedOnedayData?.category) {
      setProgress(14.2);
    } else {
      setProgress(0);
    }
  }, [savedOnedayData]);

  const modalContent = () => {
    if (savedOnedayData?.category === null) {
      return "아무것도 입력되지 않았습니다.";
    } else if (savedOnedayData?.tag === null) {
      return "관심사";
    } else if (savedOnedayData?.oneDayTitle === null) {
      return "태그";
    } else if (savedOnedayData?.oneDayContent === null) {
      return "이벤트 제목";
    } else if (
      savedOnedayData?.oneDayStartTime === null &&
      savedOnedayData?.image === null
    ) {
      return "이벤트 내용";
    } else if (savedOnedayData?.oneDayLocation === null) {
      return "이벤트 시작시간";
    } else if (
      savedOnedayData?.age === null &&
      savedOnedayData?.gender === null
    ) {
      return "이벤트 장소";
    } else if (savedOnedayData?.oneDayGroupSize === null) {
      return "성별, 나이 제한";
    }
  };

  const handleCreateOneday = () => {
    postAPI("/oneday/create", {}).then((res) => {
      if (res.status === 201) {
        setTmpOnedayId(res.data.createOneDayId);
        setOnedayOptions(res.data.optionList);
        navigate("/create-oneday-form");
      } else if (res.status === 202) {
        setTmpOnedayId(res.data.createOneDayId);
        getAPI(`/oneday/create/${res.data.createOneDayId}`).then((res) => {
          setOnedayOptions(res.data.optionList);
          setSavedOnedayData({
            ...res.data.oneDayCreatingResponseDto,
          });
          openModal();
        });
      }
    });
  };

  const handleGetSavedData = (getSavedData) => {
    if (getSavedData) {
      navigate("/create-oneday-form");
    } else {
      setSavedOnedayData({
        age: null,
        category: null,
        gender: null,
        image: null,
        oneDayContent: null,
        oneDayGroupSize: null,
        oneDayLatitude: null,
        oneDayLocation: null,
        oneDayStartTime: null,
        oneDayTitle: null,
        tag: null,
      });
      navigate("/create-oneday-form");
    }
  };

  const GradientLinearProgress = styled(LinearProgress)({
    height: 10,
    borderRadius: 20,
    backgroundColor: "lightgray",
    "& .MuiLinearProgress-bar": {
      borderRadius: 20,
      backgroundImage: "linear-gradient(45deg, #FFE14F 35%, #08B159 80%)",
    },
  });



  return (
    <>
      <Navbar />
      <Container>
        <div className="pt-60 pb-40 text-4xl font-sans font-semibold w-full h-[230px] flex justify-center items-center">
          어떤 모임을 만들까요?
        </div>
        <div className="max-w-[1920px] self-center h-[screen] flex justify-center items-start py-40 bg-[#FFFCF2] shadow-cms rounded-t-3xl">
          <div className="flex flex-col gap-[60px]">
            <CreateClub />
            {/* <img
              src={`${process.env.PUBLIC_URL}/images/create_club.svg`}
              alt="create-club"
            /> */}
            <img
              className=" cursor-pointer"
              onClick={() => {
                handleCreateOneday();
              }}
              src={`${process.env.PUBLIC_URL}/images/create_oneday.svg`}
              alt="create-oneday"
            />
          </div>
        </div>
        {/* <ReactModal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="flex flex-col">
            <div>{modalContent()} </div>
            <div>불러오시겠습니까?</div>
            <div className="flex justify-center gap-10">
              <button
                onClick={() => {
                  handleGetSavedData(true);
                  closeModal();
                }}
              >
                예
              </button>
              <button
                onClick={() => {
                  handleGetSavedData(false);
                  closeModal();
                }}
              >
                아니오
              </button>
            </div>
          </div>
        </ReactModal> */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Create Club Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              zIndex: 1000,
            },
            content: {
              color: "black",
              width: "597px",
              height: "502px",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              borderRadius: "10px",
            },
          }}
        >
          <div className="flex flex-col items-center  gap-y-[60px]">
            <div className="flex flex-col items-center">
              <h2 className="font-semibold text-[24px]">
                만들던 모임이 있습니다. 정보를 불러올까요?
              </h2>
              {/* <h3>~임시 저장 목록~</h3> */}
              {/* <span>{club?.clubCategory ? `카테고리: ${club?.clubCategory}` : `카테고리: 저장된 데이터 없음`}</span>
                        <span>{club?.clubTag ? `태그: ${club?.clubTag}` : `태그: 저장된 데이터 없음`}</span>
                        <span>{club?.clubTitle ? `클럽명: ${club?.clubTitle}` : `클럽명: 저장된 데이터 없음`}</span>
                        <span>{club?.clubContent ? `클럽내용: ${club?.clubContent}` : `클럽내용: 저장된 데이터 없음`}</span>
                        <span>{club?.genderPolicy ? `성별제한: ${club?.genderPolicy}` : `성별제한: 저장된 데이터 없음`}</span>
                        <span>{club?.agePolicy ? `나이제한: ${club?.agePolicy}` : `나이제한: 저장된 데이터 없음`}</span>
                        <span>{club?.maxGroupSize ? `최대인원: ${club?.maxGroupSize}` : `최대인원: 저장된 데이터 없음`}</span> */}
            </div>
            <div className="flex flex-col items-center font-semibold text-[24px]">
              {/* <span><span className="text-[#FF7F1E]">{progressMessage}</span>까지 저장되어있어요!</span> */}
              {modalContent() ? (
                <span>
                  <span className="text-[#08B159]">{modalContent()}</span>까지
                  저장되어있어요!
                </span>
              ) : (
                "아직 아무것도 저장되지 않았습니다."
              )}
              {savedOnedayData?.oneDayTitle ? (
                <span className="text-[16px]">모임명: {savedOnedayData?.oneDayTitle}</span>
              ) : null}
            </div>
            <div className="flex flex-col gap-y-5 items-center">
              <div className="flex flex-col w-[480px] justify-between">
                <div className="flex justify-between items-center">
                  <div className="relative w-[110px] h-[34px]">
                    <img
                      className={`w-full h-full opacity-0`}
                      src={`${process.env.PUBLIC_URL}/images/malpungsun.png`}
                      alt="malpungsun"
                    />
                    <span
                      className={`absolute left-[13px] top-0 ${
                        progress === 10 ? "opacity-100" : "opacity-0"
                      }`}
                    ></span>
                  </div>
                  <div className="relative w-[110px] h-[34px]">
                    <img
                      className={`w-full h-full ${
                        progress === 14.2 ? "opacity-100" : "opacity-0"
                      }`}
                      src={`${process.env.PUBLIC_URL}/images/malpungsun.png`}
                      alt="malpungsun"
                    />
                    <span
                      className={`absolute left-[13px] top-0 ${
                        progress === 14.2 ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      6 단계
                    </span>
                  </div>
                  <div className="relative w-[110px] h-[34px]">
                    <img
                      className={`w-full h-full ${
                        progress === 28.4 ? "opacity-100" : "opacity-0"
                      }`}
                      src={`${process.env.PUBLIC_URL}/images/malpungsun.png`}
                      alt="malpungsun"
                    />
                    <span
                      className={`absolute left-[13px] top-0 ${
                        progress === 28.4 ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      5 단계
                    </span>
                  </div>

                  <div className="relative w-[110px] h-[34px]">
                    <img
                      className={`w-full h-full ${
                        progress === 42.6 ? "opacity-100" : "opacity-0"
                      }`}
                      src={`${process.env.PUBLIC_URL}/images/malpungsun.png`}
                      alt="malpungsun"
                    />
                    <span
                      className={`absolute left-[13px] top-0 ${
                        progress === 42.6 ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      4 단계
                    </span>
                  </div>

                  <div className="relative w-[110px] h-[34px]">
                    <img
                      className={`w-full h-full ${
                        progress === 56.8 ? "opacity-100" : "opacity-0"
                      }`}
                      src={`${process.env.PUBLIC_URL}/images/malpungsun.png`}
                      alt="malpungsun"
                    />
                    <span
                      className={`absolute left-[13px] top-0 ${
                        progress === 56.8 ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      3 단계
                    </span>
                  </div>

                  <div className="relative w-[110px] h-[34px]">
                    <img
                      className={`w-full h-full ${
                        progress === 73 ? "opacity-100" : "opacity-0"
                      }`}
                      src={`${process.env.PUBLIC_URL}/images/malpungsun.png`}
                      alt="malpungsun"
                    />
                    <span
                      className={`absolute left-[13px] top-0 ${
                        progress === 73 ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      2 단계
                    </span>
                  </div>

                  <div className="relative w-[110px] h-[34px]">
                    <img
                      className={`w-full h-full ${
                        progress === 87.2 ? "opacity-100" : "opacity-0"
                      }`}
                      src={`${process.env.PUBLIC_URL}/images/malpungsun.png`}
                      alt="malpungsun"
                    />
                    <span
                      className={`absolute left-[13px]  top-0 ${
                        progress === 87.2 ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      1 단계
                    </span>
                  </div>
                </div>
                <div className="w-[480px] h-[10px]">
                  <GradientLinearProgress variant="determinate" value={progress} />
                </div>
              </div>
              <div className="flex gap-x-10">
                <button
                  className="w-[224px] h-[60px] bg-[#08B159] text-white rounded-3xl font-semibold text-[28px]"
                  onClick={() => {
                    handleGetSavedData(false);
                    closeModal();
                  }}
                >
                  새로만들기
                </button>
                <button
                  className="w-[224px] h-[60px] bg-[#747474] text-white rounded-3xl font-semibold text-[28px]"
                  onClick={() => {
                    handleGetSavedData(true);
                    closeModal();
                  }}
                >
                  불러오기
                </button>
              </div>
              <div>
                <span className="text-[#747474]">
                  새로운 모임을 만들면 기존정보는 삭제됩니다.
                </span>
              </div>
            </div>
          </div>
        </Modal>
      </Container>
    </>
  );
}

export default CreateFeed;

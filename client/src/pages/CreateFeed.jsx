import React, { useState } from "react";
import ReactModal from "react-modal";
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
import CreateClub from "./CreateClub";

function CreateFeed() {
  // eslint-disable-next-line
  const [onedayOptions, setOnedayOptions] = useRecoilState(onedayOptionState);
  // eslint-disable-next-line
  const [tmpOnedayId, setTmpOnedayId] = useRecoilState(onedayTmpIdState);
  // eslint-disable-next-line
  const [savedOnedayData, setSavedOnedayData] =
    useRecoilState(savedOnedayDataState);
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const modalContent = () => {
    if (savedOnedayData?.category === null) {
      return "아무것도 입력되지 않았습니다.";
    } else if (savedOnedayData?.tag === null) {
      return "관심사까지 입력하셨습니다.";
    } else if (savedOnedayData?.oneDayTitle === null) {
      return "태그까지 입력하셨습니다.";
    } else if (savedOnedayData?.oneDayContent === null) {
      return "이벤트 제목까지 입력하셨습니다.";
    } else if (
      savedOnedayData?.oneDayStartTime === null &&
      savedOnedayData?.image === null
    ) {
      return "이벤트 내용까지 입력하셨습니다.";
    } else if (savedOnedayData?.oneDayLocation === null) {
      return "이벤트 시작시간까지 입력하셨습니다.";
    } else if (
      savedOnedayData?.age === null &&
      savedOnedayData?.gender === null
    ) {
      return "이벤트 장소까지 입력하셨습니다.";
    } else if (savedOnedayData?.oneDayGroupSize === null) {
      return "성별, 나이 제한까지 입력하셨습니다.";
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
          console.log(res.data.oneDayCreatingResponseDto);
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

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      <Navbar />
      <Container>
        <div className="pt-60 pb-40 text-4xl font-sans font-semibold w-full h-[230px] flex justify-center items-center">
          어떤 모임을 만들까요?
        </div>
        <div className="max-w-[1920px] self-center h-[screen] flex justify-center items-start py-40 bg-[#FFFCF2] shadow-cm rounded-t-3xl">
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
        <ReactModal
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
        </ReactModal>
      </Container>
    </>
  );
}

export default CreateFeed;

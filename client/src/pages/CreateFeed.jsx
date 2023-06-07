import React from "react";
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
// import CreateClub from "./CreateClub";

function CreateFeed() {
  const [onedayOptions, setOnedayOptions] = useRecoilState(onedayOptionState);
  const [tmpOnedayId, setTmpOnedayId] = useRecoilState(onedayTmpIdState);
  // eslint-disable-next-line
  const [savedOnedayData, setSavedOnedayData] =
    useRecoilState(savedOnedayDataState);
  const navigate = useNavigate();
  const handleCreateOneday = () => {
    postAPI("/oneday/create", {}).then((res) => {
      if (res.status === 201) {
        setTmpOnedayId(res.data.createOneDayId);
        setOnedayOptions(res.data.optionList);
        console.log(onedayOptions, tmpOnedayId);
      } else if (res.status === 202) {
        setTmpOnedayId(res.data.createOneDayId);
        getAPI(`/oneday/create/${res.data.createOneDayId}`).then((res) => {
          setOnedayOptions(res.data.optionList);
          setSavedOnedayData({
            oneDayCategory: null,
            oneDayTag: [],
            ...res.data.oneDayCreatingResponseDto,
          });
          navigate("/create-oneday-form");
        });
      }
    });
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
            {/* <CreateClub> */}
            <img
              src={`${process.env.PUBLIC_URL}/images/create_club.svg`}
              alt="create-club"
            />
            {/* </CreateClub> */}
            <img
              className=" cursor-pointer"
              onClick={handleCreateOneday}
              src={`${process.env.PUBLIC_URL}/images/create_oneday.svg`}
              alt="create-oneday"
            />
          </div>
        </div>
      </Container>
    </>
  );
}

export default CreateFeed;

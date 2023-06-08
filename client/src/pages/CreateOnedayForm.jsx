import { LinearProgress } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import BodyContainer from "../component/BodyContainer";
import Container from "../component/Container";
import imageCompression from "browser-image-compression";

import {
  onedayOptionState,
  onedayTmpIdState,
  savedOnedayDataState,
} from "../states/onedayState";
import Slider from "react-input-slider";
import ReactDatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import { postAPI, putAPI } from "../axios";

function CreateOnedayForm() {
  const [onedayStep, setOnedayStep] = useState(1);
  const onedayOptions = useRecoilValue(onedayOptionState);
  const tmpOnedayId = useRecoilValue(onedayTmpIdState);
  const [savedOnedayData, setSavedOnedayData] =
    useRecoilState(savedOnedayDataState);

  const handleOnedayStep = (e) => {
    if (e.target.name === "next") {
      setOnedayStep(onedayStep + 1);
      switch (onedayStep) {
        case 1:
          putAPI(`/oneday/create/${tmpOnedayId}/category`, {
            category: savedOnedayData.oneDayCategory,
          })
            .then((res) => console.log(res.data.message))
            .catch((error) => console.log(error));
          break;
        case 2:
          putAPI(`/oneday/create/${tmpOnedayId}/tag`, {
            tag: savedOnedayData.oneDayTag,
          })
            .then((res) => console.log(res.data.message))
            .catch((error) => console.log(error));
          break;
        case 3:
          putAPI(`/oneday/create/${tmpOnedayId}/title`, {
            oneDayTitle: savedOnedayData.oneDayTitle,
          })
            .then((res) => console.log(res.data.message))
            .catch((error) => console.log(error));
          break;
        case 4:
          putAPI(`/oneday/create/${tmpOnedayId}/content`, {
            oneDayContent: savedOnedayData.oneDayContent,
          })
            .then((res) => console.log(res.data.message))
            .catch((error) => console.log(error));
          break;
        case 5:
          putAPI(`/oneday/create/${tmpOnedayId}/time`, {
            oneDayStartTime: savedOnedayData.oneDayStartTime,
          })
            .then((res) => console.log(res.data.message))
            .catch((error) => console.log(error));
          break;
        case 6:
          putAPI(`/oneday/create/${tmpOnedayId}/location`, {
            oneDayLocation: savedOnedayData.oneDayLocation,
            oneDayLatitude: savedOnedayData.oneDayLatitude,
            oneDayLongitude: savedOnedayData.oneDayLongitude,
          })
            .then((res) => console.log(res.data.message))
            .catch((error) => console.log(error));
          break;
        case 7:
          putAPI(`/oneday/create/${tmpOnedayId}/policy`, {
            genderPolicy: savedOnedayData.genderPolicy,
            agePolicy: savedOnedayData.agePolicy,
          })
            .then((res) => console.log(res.data.message))
            .catch((error) => console.log(error));
          break;
        case 8:
          putAPI(`/oneday/create/${tmpOnedayId}/maxgroupsize`, {
            oneDayGroupSize: savedOnedayData.oneDayGroupSize,
          })
            .then((res) => console.log(res.data.message))
            .catch((error) => console.log(error));
          break;
        default:
          break;
      }
    } else {
      setOnedayStep(onedayStep - 1);
    }
  };

  console.log(onedayOptions, tmpOnedayId, savedOnedayData);
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
              <OnedayStep1
                savedOnedayData={savedOnedayData}
                setSavedOnedayData={setSavedOnedayData}
                categoryList={onedayOptions.categoryList}
                handleOnedayStep={handleOnedayStep}
                onedayStep={onedayStep}
              />
            )}
            {onedayStep === 2 && (
              <OnedayStep2
                savedOnedayData={savedOnedayData}
                setSavedOnedayData={setSavedOnedayData}
                tag={
                  onedayOptions.categoryAndTagList[
                    savedOnedayData.oneDayCategory
                  ]
                }
                handleOnedayStep={handleOnedayStep}
                onedayStep={onedayStep}
              />
            )}
            {onedayStep === 3 && (
              <OnedayStep3
                savedOnedayData={savedOnedayData}
                setSavedOnedayData={setSavedOnedayData}
                handleOnedayStep={handleOnedayStep}
                onedayStep={onedayStep}
              />
            )}
            {onedayStep === 4 && (
              <OnedayStep4
                tmpOnedayId={tmpOnedayId}
                savedOnedayData={savedOnedayData}
                setSavedOnedayData={setSavedOnedayData}
                handleOnedayStep={handleOnedayStep}
                onedayStep={onedayStep}
              />
            )}
            {onedayStep === 5 && (
              <OnedayStep5
                savedOnedayData={savedOnedayData}
                setSavedOnedayData={setSavedOnedayData}
                handleOnedayStep={handleOnedayStep}
                onedayStep={onedayStep}
              />
            )}
            {onedayStep === 6 && (
              <OnedayStep6
                savedOnedayData={savedOnedayData}
                setSavedOnedayData={setSavedOnedayData}
                handleOnedayStep={handleOnedayStep}
                onedayStep={onedayStep}
              />
            )}
            {onedayStep === 7 && (
              <OnedayStep7
                genderPolicyList={onedayOptions.genderPolicyList}
                savedOnedayData={savedOnedayData}
                setSavedOnedayData={setSavedOnedayData}
                handleOnedayStep={handleOnedayStep}
                onedayStep={onedayStep}
              />
            )}
            {onedayStep === 8 && (
              <OnedayStep8
                savedOnedayData={savedOnedayData}
                setSavedOnedayData={setSavedOnedayData}
                handleOnedayStep={handleOnedayStep}
                onedayStep={onedayStep}
              />
            )}
            {onedayStep === 9 && (
              <OnedayStep9
                tmpOnedayId={tmpOnedayId}
                handleOnedayStep={handleOnedayStep}
                onedayStep={onedayStep}
              />
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

function OnedayStep1({
  onedayStep,
  handleOnedayStep,
  categoryList,
  setSavedOnedayData,
  savedOnedayData,
}) {
  return (
    <>
      <CreateOnedayFormLayout
        header="1. 관심사를 선택하세요."
        handleOnedayStep={handleOnedayStep}
        onedayStep={onedayStep}
      >
        <div className="grid grid-cols-3 gap-x-[122px] gap-y-[60px] justify-items-center w-full h-full">
          {categoryList.map((category, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setSavedOnedayData({
                    ...savedOnedayData,
                    oneDayCategory: category,
                  });
                }}
                className={`${
                  category === savedOnedayData.oneDayCategory
                    ? "bg-neutral-400"
                    : "bg-white"
                }  w-[180px] h-[60px]  rounded-full shadow-cms`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </CreateOnedayFormLayout>
    </>
  );
}

function OnedayStep2({
  onedayStep,
  handleOnedayStep,
  tag,
  setSavedOnedayData,
  savedOnedayData,
}) {
  return (
    <>
      <CreateOnedayFormLayout
        header="2. 원하는 카테고리를 선택하세요."
        handleOnedayStep={handleOnedayStep}
        onedayStep={onedayStep}
      >
        <div className="grid grid-cols-3 gap-x-[122px] gap-y-[60px] justify-items-center w-full h-full">
          {tag.map((tag, i) => {
            return (
              <>
                <button
                  key={i}
                  onClick={() => {
                    setSavedOnedayData(() => {
                      if (savedOnedayData.oneDayTag.includes(tag)) {
                        let deletedTagArr = [...savedOnedayData.oneDayTag];
                        deletedTagArr.splice(deletedTagArr.indexOf(tag), 1);
                        return { ...savedOnedayData, oneDayTag: deletedTagArr };
                      } else {
                        if (savedOnedayData.oneDayTag.length === 3) {
                          let newTagArr = [...savedOnedayData.oneDayTag];
                          newTagArr.shift();
                          newTagArr.push(tag);
                          return { ...savedOnedayData, oneDayTag: newTagArr };
                        } else {
                          let addTagArr = [...savedOnedayData.oneDayTag];
                          addTagArr.push(tag);
                          return { ...savedOnedayData, oneDayTag: addTagArr };
                        }
                      }
                    });
                  }}
                  className={`${
                    savedOnedayData?.oneDayTag.includes(tag)
                      ? "bg-neutral-400"
                      : "bg-white"
                  }  w-[180px] h-[60px]  rounded-full shadow-cms`}
                >
                  {tag}
                </button>
              </>
            );
          })}
        </div>
      </CreateOnedayFormLayout>
    </>
  );
}

function OnedayStep3({
  onedayStep,
  handleOnedayStep,
  setSavedOnedayData,
  savedOnedayData,
}) {
  return (
    <>
      <CreateOnedayFormLayout
        header="3. 원하는 하루속 이벤트 이름을 작성해주세요."
        handleOnedayStep={handleOnedayStep}
        onedayStep={onedayStep}
      >
        <div className=" w-full flex flex-col justify-between items-center">
          <input
            className="flex shadow-cms rounded-full w-3/5 px-4 py-3"
            type="text"
            placeholder="하루속 이벤트 이름을 입력해주세요."
            value={savedOnedayData.oneDayTitle}
            onChange={(e) => {
              setSavedOnedayData({
                ...savedOnedayData,
                oneDayTitle: e.target.value,
              });
            }}
          />
        </div>
        <div></div>
      </CreateOnedayFormLayout>
    </>
  );
}

function OnedayStep4({
  onedayStep,
  handleOnedayStep,
  savedOnedayData,
  setSavedOnedayData,
  tmpOnedayId,
}) {
  // eslint-disable-next-line
  const [file, setFile] = useState(null);
  // eslint-disable-next-line
  const [fileUrl, setFileUrl] = useState("");

  const handleFileOnChange = async (e) => {
    let file = e.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 300,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      setFile(compressedFile);

      const blob = new Blob([compressedFile], { type: "image" });
      console.log(compressedFile)

      const formData = new FormData();
      formData.append("image", blob);

      const promise = imageCompression.getDataUrlFromFile(compressedFile);
      promise.then((result) => {
        setFileUrl(result);
        setSavedOnedayData({ ...savedOnedayData, oneDayImage: result });
      });

      putAPI(`/oneday/create/${tmpOnedayId}/images`, formData)
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CreateOnedayFormLayout
        header="4. 하루속 이벤트 정보를 입력해주세요."
        handleOnedayStep={handleOnedayStep}
        onedayStep={onedayStep}
      >
        <div className="h-full w-full flex flex-col gap-10 px-60">
          <div className="flex flex-col gap-2">
            <div className="w-full">
              1) 하루속을 대표할 이미지를 등록해주세요.
            </div>
            <input onChange={handleFileOnChange} type="file" />
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <div>2) 하루속 이벤트를 소개할 내용을 적어주세요.</div>
              <input
                className="shadow-cms rounded-3xl w-full h-[200px] px-2 py-2"
                placeholder="우리 일상을 소개해주세요."
                type="text"
                value={savedOnedayData.oneDayContent}
                onChange={(e) => {
                  setSavedOnedayData({
                    ...savedOnedayData,
                    oneDayContent: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </CreateOnedayFormLayout>
    </>
  );
}

function OnedayStep5({
  onedayStep,
  handleOnedayStep,
  savedOnedayData,
  setSavedOnedayData,
}) {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 9)
  );
  const allTime = new Date(startDate).toISOString().split(".")[0];
  console.log(allTime);

  return (
    <>
      <CreateOnedayFormLayout
        header="5. 언제 모일까요?"
        handleOnedayStep={handleOnedayStep}
        onedayStep={onedayStep}
      >
        <div className="h-full w-full flex flex-col gap-10 px-60 items-center">
          <div>
            <div className="flex flex-col gap-2 text-2xl ">
              <div>날짜와 시간을 선택해주세요.</div>
              <ReactDatePicker
                className="flex text-base cursor-pointer font-semibold justify-center shadow-cms w-[200px] rounded-full pl-5"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setSavedOnedayData({
                    ...savedOnedayData,
                    oneDayStartTime: allTime,
                  });
                }}
                showTimeSelect
                dateFormat="yyyy MMMM d, h:mm aa"
                inline
                fixedHeight
              />
            </div>
          </div>
        </div>
      </CreateOnedayFormLayout>
    </>
  );
}

function OnedayStep6({
  onedayStep,
  handleOnedayStep,
  savedOnedayData,
  setSavedOnedayData,
}) {
  const [locationInput, setLocationInput] = useState("");
  const [map, setMap] = useState(null);
  const markerRef = useRef(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      };
      const createdMap = new window.kakao.maps.Map(container, options);
      setMap(createdMap);

      window.kakao.maps.event.addListener(
        createdMap,
        "click",
        function (mouseEvent) {
          const latlng = mouseEvent.latLng;

          if (markerRef.current) {
            markerRef.current.setMap(null);
          }

          const newMarker = new window.kakao.maps.Marker({
            position: latlng,
          });
          newMarker.setMap(createdMap);
          markerRef.current = newMarker;
          console.log("위도,경도", latlng.getLat(), latlng.getLng());

          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(
            latlng.getLng(),
            latlng.getLat(),
            function (result, status) {
              if (status === window.kakao.maps.services.Status.OK) {
                let detailAddr = !!result[0].road_address
                  ? result[0].road_address.address_name
                  : "";

                if (!detailAddr) {
                  detailAddr = locationInput;
                }

                setSavedOnedayData((prev) => ({
                  ...prev,
                  oneDayLatitude: latlng.getLat(),
                  oneDayLongitude: latlng.getLng(),
                  oneDayLocation: detailAddr,
                }));
              }
            }
          );
        }
      );
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (map && locationInput) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(locationInput, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          map.setCenter(coords);
        }
      });
    }
  }, [locationInput, map]);

  return (
    <>
      <CreateOnedayFormLayout
        header="6. 어디서 모일까요?"
        handleOnedayStep={handleOnedayStep}
        onedayStep={onedayStep}
      >
        <div className="h-full w-full flex flex-col gap-1 0 px-60">
          <div>
            <div className="flex flex-col gap-2">
              <div>장소</div>
              <input
                className="shadow-cms rounded-3xl w-full px-2 py-2"
                placeholder="만날 장소를 입력해주세요."
                type="text"
                value={locationInput}
                onChange={(e) => {
                  setLocationInput(e.target.value);
                }}
              />
              <div id="map" className="w-full h-[375px]"></div>
            </div>
          </div>
        </div>
      </CreateOnedayFormLayout>
    </>
  );
}

function OnedayStep7({
  onedayStep,
  handleOnedayStep,
  setSavedOnedayData,
  savedOnedayData,
  genderPolicyList,
}) {
  const [agePolicy, setAgePolicy] = useState(20);

  return (
    <>
      <CreateOnedayFormLayout
        header="7. 함께할 멤버의 조건을 설정해주세요."
        handleOnedayStep={handleOnedayStep}
        onedayStep={onedayStep}
      >
        <div className="h-full w-full flex flex-col gap-10 px-60">
          <div>
            <div className="flex flex-col gap-2">
              <div>1) 성별</div>
              <div className="flex justify-around pt-2">
                {genderPolicyList.map((item) => {
                  return (
                    <button
                      onClick={() => {
                        setSavedOnedayData({
                          ...savedOnedayData,
                          genderPolicy: item,
                        });
                      }}
                      className={` ${
                        savedOnedayData.genderPolicy === item
                          ? "bg-neutral-400"
                          : "bg-white"
                      }  w-[180px] h-[60px] px-4 py-1 rounded-full shadow-cms`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <div>2) 연령 {agePolicy}살 </div>
              <Slider
                style={{ width: "97%" }}
                axis="x"
                x={agePolicy}
                xmin={20}
                xmax={50}
                xstep={5}
                onChange={({ x }) => {
                  setAgePolicy(x);
                  setSavedOnedayData({ ...savedOnedayData, agePolicy: x });
                }}
                styles={{
                  track: {
                    backgroundColor: "white",
                  },
                  active: {
                    backgroundColor: "yellow",
                  },
                  disabled: {
                    opacity: 0.5,
                  },
                }}
              />
            </div>
          </div>
        </div>
      </CreateOnedayFormLayout>
    </>
  );
}

function OnedayStep8({
  onedayStep,
  handleOnedayStep,
  setSavedOnedayData,
  savedOnedayData,
}) {
  const [groupSize, setGroupSize] = useState(5);

  return (
    <>
      <CreateOnedayFormLayout
        header="8. 몇명과 함께할까요?"
        handleOnedayStep={handleOnedayStep}
        onedayStep={onedayStep}
      >
        <div className="h-full w-full flex flex-col gap-10 px-60">
          <div>{groupSize}</div>
          <Slider
            style={{ width: "97%" }}
            axis="x"
            x={groupSize}
            xmin={5}
            xmax={35}
            xstep={5}
            onChange={({ x }) => {
              setGroupSize(x);
              setSavedOnedayData({ ...savedOnedayData, oneDayGroupSize: x });
            }} // Update the state
            styles={{
              track: {
                backgroundColor: "white",
              },
              active: {
                backgroundColor: "yellow",
              },
              disabled: {
                opacity: 0.5,
              },
            }}
          />
        </div>
      </CreateOnedayFormLayout>
    </>
  );
}

function OnedayStep9({ onedayStep, handleOnedayStep, tmpOnedayId }) {
  postAPI(`/oneday/create/${tmpOnedayId}/confirm`, {})
    .then((res) => alert("하루속 이벤트 개설 완료!"))
    .catch((error) => error);
  return (
    <>
      <CreateOnedayFormLayout
        handleOnedayStep={handleOnedayStep}
        onedayStep={onedayStep}
      ></CreateOnedayFormLayout>
    </>
  );
}

function CreateOnedayFormLayout({
  onedayStep,
  header,
  handleOnedayStep,
  children,
}) {
  return (
    <>
      <div
        className={`flex flex-col ${
          onedayStep < 9 ? "justify-between" : "justify-center"
        }  items-center h-[800px] max-w-[1200px]`}
      >
        {onedayStep < 9 ? (
          <>
            <div className="self-start px-60 pt-20 pb-10 text-3xl font-sans font-semibold">
              {header}
            </div>
            <div className="flex flex-col items-center justify-between w-full h-[500px]">
              {children}
            </div>
            <div className="py-16 flex gap-20">
              {onedayStep > 1 && (
                <button
                  onClick={handleOnedayStep}
                  className="w-[224px] h-[60px] bg-[#747474] text-white rounded-full"
                  name="prev"
                >
                  이전
                </button>
              )}
              <button
                onClick={handleOnedayStep}
                className="w-[224px] h-[60px] bg-green-600 text-white rounded-full"
                name="next"
              >
                다음
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center text-4xl gap-2">
              <div>모임이름 개설완료</div>
              <div>당신의 하루를 함께하세요!</div>
              <div className="py-16 flex gap-20">
                <button
                  onClick={handleOnedayStep}
                  className="w-[224px] h-[60px] bg-[#747474] text-white rounded-full"
                  name="prev"
                >
                  이전
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CreateOnedayForm;

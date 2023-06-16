import { LinearProgress } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
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
import { filePutAPI, postAPI, putAPI } from "../axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

let imageArr = [
  `${process.env.PUBLIC_URL}/images/createFeed/create_exercise.svg`,
  `${process.env.PUBLIC_URL}/images/createFeed/create_sports.svg`,
  `${process.env.PUBLIC_URL}/images/createFeed/create_travel.svg`,
  `${process.env.PUBLIC_URL}/images/createFeed/create_culture.svg`,
  `${process.env.PUBLIC_URL}/images/createFeed/create_art.svg`,
  `${process.env.PUBLIC_URL}/images/createFeed/create_activity.svg`,
  `${process.env.PUBLIC_URL}/images/createFeed/create_love.svg`,
  `${process.env.PUBLIC_URL}/images/createFeed/create_book.svg`,
  `${process.env.PUBLIC_URL}/images/createFeed/create_favorite.svg`,
];

function CreateOnedayForm() {
  const navigate = useNavigate();
  const [onedayStep, setOnedayStep] = useState(1);
  const onedayOptions = useRecoilValue(onedayOptionState);
  const tmpOnedayId = useRecoilValue(onedayTmpIdState);
  const [savedOnedayData, setSavedOnedayData] =
    useRecoilState(savedOnedayDataState);

  // useEffect(() => {
  //   if (
  //     savedOnedayData?.category === null &&
  //     savedOnedayData?.category === undefined
  //   ) {
  //     setOnedayStep(1);
  //     return;
  //   } else if (
  //     savedOnedayData?.oneDayTag === null &&
  //     savedOnedayData?.oneDayTag === undefined
  //   ) {
  //     setOnedayStep(2);
  //     return;
  //   } else if (
  //     savedOnedayData?.oneDayTitle === null &&
  //     savedOnedayData?.oneDayTitle === undefined
  //   ) {
  //     setOnedayStep(3);
  //     return;
  //   } else if (
  //     savedOnedayData?.oneDayContent === null &&
  //     savedOnedayData?.oneDayContent === undefined
  //   ) {
  //     setOnedayStep(4);
  //     return;
  //   } else if (
  //     savedOnedayData?.oneDayStartTime === null &&
  //     savedOnedayData?.oneDayStartTime === undefined
  //   ) {
  //     setOnedayStep(5);
  //     return;
  //   } else if (
  //     savedOnedayData?.oneDayLocation === null &&
  //     savedOnedayData?.oneDayLatitude === null &&
  //     savedOnedayData?.oneDayLongitude === null &&
  //     savedOnedayData?.oneDayLocation === 0 &&
  //     savedOnedayData?.oneDayLatitude === undefined &&
  //     savedOnedayData?.oneDayLongitude === 0
  //   ) {
  //     setOnedayStep(6);
  //     return;
  //   } else if (
  //     savedOnedayData?.age === null &&
  //     savedOnedayData?.gender === null
  //   ) {
  //     setOnedayStep(7);
  //     return;
  //   } else if (savedOnedayData?.oneDayGroupSize === null) {
  //     setOnedayStep(8);
  //     return;
  //   } else {
  //     return;
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (savedOnedayData?.category) {
      setOnedayStep(2);
    } else {
      setOnedayStep(1);
      return;
    }
    if (savedOnedayData?.tag) {
      setOnedayStep(3);
    } else {
      setOnedayStep(2);
      return;
    }
    if (savedOnedayData?.oneDayTitle) {
      setOnedayStep(4);
    } else {
      setOnedayStep(3);
      return;
    }
    if (savedOnedayData?.oneDayContent) {
      setOnedayStep(5);
    } else {
      setOnedayStep(4);
      return;
    }

    if (savedOnedayData?.oneDayStartTime) {
      setOnedayStep(6);
    } else {
      setOnedayStep(5);
      return;
    }
    if (savedOnedayData?.oneDayLocation) {
      setOnedayStep(7);
    } else {
      setOnedayStep(6);
      return;
    }

    if (savedOnedayData?.age && savedOnedayData?.gender) {
      setOnedayStep(8);
    } else {
      setOnedayStep(7);
      return;
    }

    // if (savedOnedayData?.oneDayGroupSize) {
    //   setOnedayStep(9);
    // } else {
    //   setOnedayStep(8);
    //   return;
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnedayStep = (e) => {
    if (e.target.name === "next") {
      switch (onedayStep) {
        case 1:
          if (
            savedOnedayData.category === null ||
            savedOnedayData.category === undefined
          ) {
            return swal("관심사를 선택해주세요!");
          } else {
            putAPI(`/oneday/create/${tmpOnedayId}/category`, {
              oneDayCategory: savedOnedayData.category,
            })
              .then((res) => {
                console.log(res.data.message);
                setOnedayStep(2);
              })
              .catch((error) => console.log(error));
          }
          break;
        case 2:
          if (
            savedOnedayData.tag === null ||
            savedOnedayData.tag.length === 0
          ) {
            return swal("태그를 한 가지 이상 선택해주세요!");
          } else {
            putAPI(`/oneday/create/${tmpOnedayId}/tag`, {
              tag: savedOnedayData.tag,
            })
              .then((res) => {
                console.log(res.data.message);
                setOnedayStep(3);
              })
              .catch((error) => console.log(error));
            break;
          }

        case 3:
          if (
            savedOnedayData.oneDayTitle === null ||
            savedOnedayData.oneDayTitle === undefined ||
            savedOnedayData.oneDayTitle.length === 0
          ) {
            console.log("제목", savedOnedayData.oneDayTitle);
            return swal("이벤트 이름을 입력해주세요!");
          } else {
            putAPI(`/oneday/create/${tmpOnedayId}/title`, {
              oneDayTitle: savedOnedayData.oneDayTitle,
            })
              .then((res) => {
                console.log(res.data.message);
                setOnedayStep(4);
              })
              .catch((error) => console.log(error));
          }

          break;
        case 4:
          if (
            savedOnedayData.oneDayContent === null ||
            savedOnedayData.oneDayContent === undefined ||
            savedOnedayData.oneDayContent.length === 0
          ) {
            swal("이벤트 내용을 입력해주세요!");
          } else if (
            savedOnedayData.oneDayImage === null ||
            savedOnedayData.oneDayImage === undefined
          ) {
            swal("이벤트 이미지를 등록해주세요!");
          } else {
            putAPI(`/oneday/create/${tmpOnedayId}/content`, {
              oneDayContent: savedOnedayData.oneDayContent,
            })
              .then((res) => {
                console.log(res.data.message);
                setOnedayStep(5);
              })
              .catch((error) => console.log(error));
          }
          break;
        case 5:
          let date = new Date();
          let localISOString = new Date(
            date.getTime() - date.getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, 19);
          console.log(localISOString);
          if (
            savedOnedayData.oneDayStartTime === null ||
            savedOnedayData.oneDayStartTime === undefined
          ) {
            setSavedOnedayData({
              ...savedOnedayData,
              oneDayStartTime: localISOString,
            });
            swal("이벤트 시작 시간이 없어서 현재 시간으로 설정되었습니다.");
          }
          putAPI(`/oneday/create/${tmpOnedayId}/time`, {
            oneDayStartTime: savedOnedayData.oneDayStartTime,
          })
            .then((res) => {
              console.log(res.data.message);
              setOnedayStep(6);
            })
            .catch((error) => console.log(error));

          break;
        case 6:
          if (
            savedOnedayData.oneDayLocation === null ||
            savedOnedayData.oneDayLocation === undefined ||
            savedOnedayData.oneDayLocation.length === 0 ||
            savedOnedayData.oneDayLatitude === null ||
            savedOnedayData.oneDayLatitude === undefined ||
            savedOnedayData.oneDayLongitude === null ||
            savedOnedayData.oneDayLongitude === undefined
          ) {
            swal("장소를 입력해주세요!");
          } else {
            putAPI(`/oneday/create/${tmpOnedayId}/location`, {
              oneDayLocation: savedOnedayData.oneDayLocation,
              oneDayLatitude: savedOnedayData.oneDayLatitude,
              oneDayLongitude: savedOnedayData.oneDayLongitude,
            })
              .then((res) => {
                console.log(res.data.message);
                setOnedayStep(7);
              })
              .catch((error) => console.log(error));
          }

          break;
        case 7:
          if (
            savedOnedayData.gender === null ||
            savedOnedayData.gender === undefined
          ) {
            swal("성별 제한을 입력해주세요!");
          } else if (
            savedOnedayData.age === null ||
            savedOnedayData.age === undefined
          ) {
            swal("나이 제한을 입력해주세요!");
          } else {
            putAPI(`/oneday/create/${tmpOnedayId}/policy`, {
              genderPolicy: savedOnedayData.gender,
              agePolicy: savedOnedayData.age,
            })
              .then((res) => {
                console.log(res.data.message);
                setOnedayStep(8);
              })
              .catch((error) => console.log(error));
          }
          break;
        case 8:
          if (
            savedOnedayData.oneDayGroupSize === null ||
            savedOnedayData.oneDayGroupSize === undefined
          ) {
            swal("최대 인원 수를 입력해주세요!");
          } else {
            putAPI(`/oneday/create/${tmpOnedayId}/maxgroupsize`, {
              size: savedOnedayData.oneDayGroupSize,
            })
              .then((res) => {
                console.log(res.data.message);
                postAPI(`/oneday/create/${tmpOnedayId}/confirm`, {})
                  .then((res) => {
                    setOnedayStep(9);
                    swal("하루속 이벤트 개설 완료!");
                    navigate("/oneday");
                    setSavedOnedayData({});
                  })
                  .catch((error) => error);
              })
              .catch((error) => console.log(error));
          }
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
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center pt-48 pb-32 text-3xl">
            모두와 함께할&nbsp; <span className="text-green-400">하루</span>를
            만들어보세요
          </div>
          <div className="h-auto min-w-[1280px] flex flex-col items-center shadow-cm bg-[#FFFCF2] rounded-t-3xl pb-10">
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
                tag={onedayOptions.categoryAndTagList[savedOnedayData.category]}
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
                savedOnedayData={savedOnedayData}
                setSavedOnedayData={setSavedOnedayData}
                tmpOnedayId={tmpOnedayId}
                handleOnedayStep={handleOnedayStep}
                onedayStep={onedayStep}
              />
            )}
            <div className="flex justify-center">
              <GradientLinearProgress
                sx={{ width: "1140px" }}
                variant="determinate"
                value={(onedayStep / 9) * 100}
              />
            </div>
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
    backgroundImage: "linear-gradient(45deg, #FFE14F 35%, #08B159 80%)",
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
        <div className="grid grid-cols-3 gap-x-[36px] gap-y-[36px] w-[526px] h-[228px]">
          {categoryList?.map((category, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setSavedOnedayData({
                    ...savedOnedayData,
                    category: category,
                  });
                }}
                className={`${
                  category === savedOnedayData?.category
                    ? "bg-[#dddddd]"
                    : "bg-white"
                }  w-[142px] h-[52px]  rounded-full border-2 flex gap-1 justify-center items-center font-semibold text-[1.25rem]`}
              >
                <img
                  src={imageArr[i]}
                  className="w-[24px] h-[24px]"
                  alt="create_oneday_category"
                />
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
        <div className="grid grid-cols-3 gap-x-[36px] gap-y-[36px] w-[526px] h-auto">
          {tag?.map((tag, i) => {
            return (
              <>
                <button
                  key={i}
                  onClick={() => {
                    setSavedOnedayData(() => {
                      if (savedOnedayData?.tag?.includes(tag)) {
                        let deletedTagArr = [...savedOnedayData.tag];
                        deletedTagArr.splice(deletedTagArr.indexOf(tag), 1);
                        return { ...savedOnedayData, tag: deletedTagArr };
                      } else {
                        if (savedOnedayData?.tag?.length === 3) {
                          let newTagArr = [...savedOnedayData.tag];
                          newTagArr.shift();
                          newTagArr.push(tag);
                          return { ...savedOnedayData, tag: newTagArr };
                        } else {
                          if (savedOnedayData?.tag) {
                            let addTagArr = [...savedOnedayData?.tag];
                            addTagArr.push(tag);
                            return { ...savedOnedayData, tag: addTagArr };
                          } else {
                            let addTagArr = [];
                            addTagArr.push(tag);
                            return { ...savedOnedayData, tag: addTagArr };
                          }
                        }
                      }
                    });
                  }}
                  className={`${
                    savedOnedayData?.tag?.includes(tag)
                      ? "bg-[#dddddd]"
                      : "bg-white"
                  }  w-[142px] h-[52px] rounded-full text-[1.25rem] font-semibold border-2`}
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
        <div className=" w-[526px] h-[228px] flex flex-col  justify-between items-center">
          <input
            className="flex shadow-cms rounded-full w-[600px] px-5 py-3"
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
      console.log(compressedFile);

      const formData = new FormData();
      formData.append("image", blob);

      const promise = imageCompression.getDataUrlFromFile(compressedFile);
      promise.then((result) => {
        setFileUrl(result);
        setSavedOnedayData({ ...savedOnedayData, oneDayImage: compressedFile });
      });

      filePutAPI(`/oneday/create/${tmpOnedayId}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: [
          function () {
            return formData;
          },
        ],
      })
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
        <div className="w-[868px] h-[228px] flex flex-col px-10 gap-5 mb-[20px]">
          <div className="flex flex-col gap-1">
            <div className="w-full text-[1.25rem]">
              1) 하루속을 대표할 이미지를 등록해주세요.
            </div>
            <input onChange={handleFileOnChange} type="file" />
          </div>
          <div>
            <div className="flex flex-col gap-1">
              <div className="text-[1.25rem]">
                2) 하루속 이벤트를 소개할 내용을 적어주세요.
              </div>
              <textarea
                className="shadow-cms rounded-3xl w-full h-[130px] p-4"
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
  let date = new Date();
  let localISOString = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 19);

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
                    oneDayStartTime: localISOString,
                  });
                }}
                minDate={new Date()} // 이 부분을 추가하세요
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
              console.log(locationInput);
              if (status === window.kakao.maps.services.Status.OK) {
                let detailAddr = !!result[0].address
                  ? result[0].address.address_name
                  : locationInput;

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
        <div className="h-full w-full flex flex-col gap-1 0 px-20">
          <div>
            <div className="flex flex-col gap-2 text-[1.25rem]">
              <div>장소를 선택해주세요.</div>
              <input
                className="shadow-cms rounded-3xl w-full px-4 pt-[10px] pb-2"
                placeholder="만날 장소를 동 or 도로명 주소로 입력해주세요."
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
  const [age, setAge] = useState(20);
  useEffect(() => {
    setSavedOnedayData({ ...savedOnedayData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <CreateOnedayFormLayout
        header="7. 함께할 멤버의 조건을 설정해주세요."
        handleOnedayStep={handleOnedayStep}
        onedayStep={onedayStep}
      >
        <div className="h-full w-full flex flex-col px-20">
          <div className="pb-4">
            <div className="flex flex-col">
              <div className="text-[1.5rem] pb-4">1) 성별</div>
              <div className="flex justify-around">
                {genderPolicyList.map((item) => {
                  return (
                    <button
                      onClick={() => {
                        setSavedOnedayData({
                          ...savedOnedayData,
                          gender: item,
                        });
                      }}
                      className={` ${
                        savedOnedayData.gender === item
                          ? "bg-[#dddddd]"
                          : "bg-white"
                      }  w-[142px] h-[62px] text-[1rem] font-semibold rounded-full border-2`}
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
              <div className="text-[1.5rem]">2) 연령</div>
              <Slider
                style={{ width: "97%" }}
                axis="x"
                x={age}
                xmin={15}
                xmax={50}
                xstep={5}
                onChange={({ x }) => {
                  setAge(x);
                  setSavedOnedayData({ ...savedOnedayData, age: x });
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
              <div className="flex justify-between pr-4 ">
                <div>15</div>
                <div>20</div>
                <div>25</div>
                <div>30</div>
                <div>35</div>
                <div>40</div>
                <div>45</div>
                <div>50</div>
              </div>
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
  useEffect(() => {
    setSavedOnedayData({ ...savedOnedayData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <CreateOnedayFormLayout
        header="8. 몇명과 함께할까요?"
        handleOnedayStep={handleOnedayStep}
        onedayStep={onedayStep}
      >
        <div className="h-full w-full flex flex-col gap-10 px-20">
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
          <div className="flex justify-between pr-3 relative">
            <div className="absolute">5</div>
            <div className="absolute left-[93px]">10</div>
            <div className="absolute left-[200px]">15</div>
            <div className="absolute left-[302px]">20</div>
            <div className="absolute left-[407px]">25</div>
            <div className="absolute left-[510px]">30</div>
            <div className="absolute left-[615px]">35</div>
          </div>
        </div>
      </CreateOnedayFormLayout>
    </>
  );
}

function OnedayStep9({
  onedayStep,
  handleOnedayStep,
  tmpOnedayId,
  setSavedOnedayData,
  savedOnedayData,
}) {
  return (
    <>
      <CreateOnedayFormLayout
        handleOnedayStep={handleOnedayStep}
        onedayStep={onedayStep}
      >
        <>
          <div className="flex flex-col justify-center items-center text-4xl gap-2">
            <div>{savedOnedayData.oneDayTitle} 개설완료</div>
            <div>당신의 하루를 함께하세요!</div>
            <div className="py-16 flex gap-20"></div>
          </div>
        </>
      </CreateOnedayFormLayout>
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
          onedayStep < 9 ? "" : "justify-center"
        }  items-center h-auto max-w-[1140px]`}
      >
        <>
          <div className="self-start min-w-[800px] text-[1.5rem] py-5 font-semibold">
            {header}
          </div>
          <div className="flex flex-col items-center w-full h-auto">
            {children}
          </div>
          <div className="flex gap-[30px] py-9">
            {onedayStep > 1 && onedayStep < 9 && (
              <button
                onClick={handleOnedayStep}
                className="w-[200px] h-[60px] bg-[#747474] text-[1.5rem] font-semibold text-white rounded-full"
                name="prev"
              >
                이전
              </button>
            )}
            {onedayStep >= 1 && onedayStep < 9 && (
              <button
                onClick={handleOnedayStep}
                className="w-[200px] h-[60px] bg-[#08B159] text-[1.5rem] font-semibold text-white rounded-full"
                name="next"
              >
                다음
              </button>
            )}
          </div>
        </>
      </div>
    </>
  );
}

export default CreateOnedayForm;

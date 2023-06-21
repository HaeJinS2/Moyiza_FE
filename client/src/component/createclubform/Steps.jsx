import React from "react";
import Container from "../Container";
import Slider from "react-input-slider";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export const Step1 = ({
  nextStep,
  progress,
  handleCategoryChange,
  categoryInput,
  option,
  setSelectedCategory,
  selectedCategory,
}) => {
  const imgArr = [
    `${process.env.PUBLIC_URL}/images/category/art.png`, // 예술
    `${process.env.PUBLIC_URL}/images/category/book.png`, // 자기계발
    `${process.env.PUBLIC_URL}/images/category/activity.png`, // 액티비티
    `${process.env.PUBLIC_URL}/images/category/travel.png`, // 여행
    `${process.env.PUBLIC_URL}/images/category/love.png`, // 연애
    `${process.env.PUBLIC_URL}/images/category/hobby.png`, // 취미
    `${process.env.PUBLIC_URL}/images/category/food.png`, // 음식
    `${process.env.PUBLIC_URL}/images/category/culture.png`, // 문화
    `${process.env.PUBLIC_URL}/images/category/exercise.png`, // 운동
    `${process.env.PUBLIC_URL}/images/category/exercise.png`, // 스포츠
  ];

  return (
    <Container>
      <section className=" h-[calc(100vh-0px)] flex flex-col items-center ">
        <div className="flex flex-col">
          <div className="flex w-full pt-[116px] pb-[47px] font-semibold items-center justify-center ">
            <span className="text-[20px]">
              모두와 함께할 <span className="text-[#FF7F1E]">일상</span>을
              만들어보세요!
            </span>
          </div>
          <div className="flex flex-col items-center min-w-[1280px] h-[534px] border-[1px] bg-[#FFFCF2] rounded-t-[100px] overflow-hidden">
            <div className="flex justify-start items-start w-full">
              <span className="text-[24px] px-[205px] mt-[30px] mb-[56px] font-semibold">
                1. 관심사를 선택하세요.
              </span>
            </div>
            <div className="flex min-w-[800px] flex-col z-10">
              <div className="flex flex-1 items-center justify-center mb-[36px]">
                <div className="grid grid-cols-3 w-auto h-auto gap-[36px]">
                  {Object.keys(option?.categoryLists || {}).map(
                    (category, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCategory(category)}
                        className={`${
                          selectedCategory === category
                            ? "border-[1px] bg-[#dddddd] w-[9rem] h-[3.25rem]  rounded-3xl"
                            : "border-[1px] bg-white w-[9rem] h-[3.25rem]  rounded-3xl"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-x-2">
                          <img
                            className="w-[23px] h-[23px]"
                            src={imgArr[index]}
                            alt="categoryIcon"
                          ></img>
                          <div className="text-[20px] font-semibold">
                            {category}
                          </div>
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>
              <div className="flex  items-center justify-center">
                <button
                  className=" w-[12.5rem] h-[3.75rem] text-[1.5rem]  font-semibold bg-[#FF7F1E] text-white rounded-full"
                  onClick={nextStep}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export const Step2 = ({
  nextStep,
  prevStep,
  handleTagClick,
  progress,
  handleTagChange,
  selectedTags,
  setSelectedTags,
  selectedTag,
  option,
  setSelectedTag,
  handleTagChange1,
  handleTagChange2,
  handleTagChange3,
  tagInput1,
  tagInput2,
  tagInput3,
}) => {
  return (
    <Container>
      <section className=" h-[calc(100vh-0px)] flex flex-col items-center ">
        <div className="flex flex-col">
          <div className="flex  w-full pt-[116px] pb-[47px] font-semibold items-center justify-center ">
            <span className="text-[30px]">
              모두와 함께할 <span className="text-[#FF7F1E]">일상</span>을
              만들어보세요!
            </span>
          </div>
          <div>
            <div className="flex flex-col items-center min-w-[1280px] h-[534px] border-[1px] bg-[#FFFCF2] rounded-t-[100px] overflow-hidden">
              <div className="flex justify-start items-start w-full">
                <span className="text-[24px] px-[205px] mt-[30px] mb-[73px] font-semibold">
                  2. 원하는 카테고리를 선택하세요.
                </span>
              </div>
              <div className="flex w-[800px] justify-center items-center flex-col z-10">
                <div className="grid grid-cols-5 w-auto h-auto gap-x-[43px] gap-y-[30px] mb-[97px]">
                  {selectedTags?.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleTagClick(tag)}
                      className={`${
                        selectedTag.includes(tag)
                          ? "text-[20px] font-semibold border-[1px] bg-[#dddddd] w-[9rem] h-[3.25rem]  rounded-3xl"
                          : "text-[20px] font-semibold border-[1px] bg-white w-[9rem] h-[3.25rem]  rounded-3xl"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-x-4">
                  <button
                    className=" w-[12.5rem] h-[3.75rem] text-[1.5rem] font-semibold bg-[#747474] text-white rounded-full"
                    onClick={prevStep}
                  >
                    이전
                  </button>
                  <button
                    className=" w-[12.5rem] h-[3.75rem] text-[1.5rem] font-semibold bg-[#FF7F1E] text-white rounded-full"
                    onClick={nextStep}
                  >
                    다음
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

// 클럽 이름
export const Step3 = ({
  nextStep,
  prevStep,
  progress,
  handleTitleChange,
  titleInput,
}) => {
  return (
    <>
      <Container>
        <section className=" h-[calc(100vh-0px)] flex flex-col items-center ">
          <div className="flex flex-col">
            <div className="flex  w-full pt-[116px] pb-[47px] font-semibold items-center justify-center ">
              <span className="text-[30px]">
                모두와 함께할 <span className="text-[#FF7F1E]">일상</span>을
                만들어보세요!
              </span>
            </div>
            <div className="flex flex-col items-center min-w-[1280px] h-[534px] border-[1px] bg-[#FFFCF2] rounded-t-[100px] overflow-hidden">
              <div className="flex justify-start items-start w-full">
                <span className="text-[24px] px-[205px] mt-[30px] mb-[68px] font-semibold">
                  3. 원하는 일상속 이름을 작성해주세요.
                </span>
              </div>
              <div className="flex w-[800px] flex-col z-10">
                <input
                  className="border-[1px] w-[600px] h-[40px] rounded-3xl px-6 mb-[196px]"
                  placeholder="이름을 입력하세요."
                  type="text"
                  value={titleInput}
                  onChange={handleTitleChange}
                />
                <div className="flex items-center justify-center gap-x-4">
                  <button
                    className=" w-[12.5rem] h-[3.75rem] text-[1.5rem] font-semibold bg-[#747474] text-white rounded-full"
                    onClick={prevStep}
                  >
                    이전
                  </button>
                  <button
                    className=" w-[12.5rem] h-[3.75rem] text-[1.5rem] font-semibold bg-[#FF7F1E] text-white rounded-full"
                    onClick={nextStep}
                  >
                    다음
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

// 클럽사진 + 클럽내용
export const Step4 = ({
  nextStep,
  prevStep,
  progress,
  preview,
  handleFileChange,
  handleContentChange,
  contentInput,
}) => {
  return (
    <Container>
      <section className=" h-[calc(100vh-0px)] flex flex-col items-center ">
        <div className="flex flex-col">
          <div className="flex  w-full pt-[116px] pb-[47px] font-semibold items-center justify-center ">
            <span className="text-[30px]">
              모두와 함께할 <span className="text-[#FF7F1E]">일상</span>을
              만들어보세요!
            </span>
          </div>
          <div className="flex flex-col items-center min-w-[1280px] h-[100vh] border-[1px] bg-[#FFFCF2] rounded-t-[100px] overflow-hidden">
            <div className="flex justify-start items-start w-full">
              <span className="text-[24px] px-[205px] mt-[30px] mb-[22px] font-semibold">
                4. 일상속 정보를 입력하세요.
              </span>
            </div>
            <div className="flex w-[800px] flex-col z-10">
              <div className="flex flex-col justify-start w-[1200px] items-center">
                <div className="flex  justify-start items-start w-full">
                  <span className="text-[20px] text-left mb-3">
                    1) 일상속 이미지를 등록하세요.
                  </span>
                </div>
                <div className="flex justify-start items-center gap-x-2 w-full mb-[22px]">
                  {preview && (
                    <img
                      className="w-[50px] h-[50px]"
                      src={preview}
                      alt="preview"
                    />
                  )}
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-[16px]">
                <div className="flex justify-start items-start w-full">
                  <span className="text-[20px] text-left mb-3">
                    2) 일상속 소개 내용을 입력하세요.
                  </span>
                </div>
                <textarea
                  className="w-[868px] h-[110px] rounded-3xl border-[1px] p-4"
                  placeholder="우리 일상을 소개해주세요."
                  value={contentInput}
                  onChange={handleContentChange}
                />
              </div>

              <div className="flex items-center justify-center gap-x-4">
                <button
                  className=" w-[12.5rem] h-[3.75rem] text-[1.5rem] font-semibold bg-[#747474] text-white rounded-full"
                  onClick={prevStep}
                >
                  이전
                </button>
                <button
                  className=" w-[12.5rem] h-[3.75rem] text-[1.5rem] font-semibold bg-[#FF7F1E] text-white rounded-full"
                  onClick={nextStep}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

// 성별제한 + 연령제한
export const Step5 = ({
  nextStep,
  prevStep,
  progress,
  selectedGenderPolicy,
  setSelectedGenderPolicy,
  option,
  handleAgePolicyChange,
  agePolicy,
  handleRestrictionChange,
  handleRestrictionChange2,
  restrictionInput,
  restrictionInput2,
}) => {
  return (
    <Container>
      <section className=" h-[calc(100vh-0px)] flex flex-col items-center ">
        <div className="flex flex-col">
          <div className="flex  w-full pt-[116px] pb-[47px] font-semibold items-center justify-center ">
            <span className="text-[30px]">
              모두와 함께할 <span className="text-[#FF7F1E]">일상</span>을
              만들어보세요!
            </span>
          </div>
          <div className="flex flex-col items-center min-w-[1280px] h-[534px] border-[1px] bg-[#FFFCF2] rounded-t-[100px] overflow-hidden">
            <div className="flex justify-start items-start w-full">
              <span className="text-[24px] px-[205px] mt-[30px] mb-[22px] font-semibold">
                5. 함께할 일상속 멤버 조건을 설정하세요.
              </span>
            </div>
            <div className="flex w-[800px] flex-col z-10">
              <div className="flex flex-col">
                <div className="flex justify-start items-start w-full mb-3">
                  <span className="text-[20px] text-left">1) 성별</span>
                </div>
                <div className="grid grid-cols-3 justify-items-center gap-x-[120px] gap-y-[59px] w-auto h-auto mb-[22px]">
                  {option.genderPolicyLists.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedGenderPolicy(category)}
                      className={`${
                        selectedGenderPolicy === category
                          ? "text-[20px] font-semibold border-[1px] bg-[#dddddd] w-[9rem] h-[3.25rem]  rounded-3xl"
                          : "text-[20px] font-semibold border-[1px] bg-white w-[9rem] h-[3.25rem]  rounded-3xl"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col mb-[76px]">
                <div className="flex  justify-start items-start w-full mb-3">
                  <span className="text-[20px] text-left">2) 연령</span>
                </div>
                <div>
                  <div className="w-[837px]">
                    {agePolicy && (
                      <Slider
                        styles={{
                          track: {
                            width: 837,
                          },
                          active: {
                            backgroundColor: "#FFE14F",
                          },
                        }}
                        axis="x"
                        xstep={5}
                        xmin={15}
                        xmax={50}
                        x={agePolicy.x}
                        onChange={({ x }) =>
                          handleAgePolicyChange({ x: parseFloat(x.toFixed(2)) })
                        }
                      />
                    )}
                    <div className="flex justify-between">
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
              <div className="flex items-center justify-center gap-4">
                <button
                  className=" w-[12.5rem] h-[3.75rem] text-[1.5rem] font-semibold bg-[#747474] text-white rounded-full"
                  onClick={prevStep}
                >
                  이전
                </button>
                <button
                  className=" w-[12.5rem] h-[3.75rem] text-[1.5rem] font-semibold bg-[#FF7F1E] text-white rounded-full"
                  onClick={nextStep}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

// 인원제한
export const Step6 = ({
  nextStep,
  prevStep,
  progress,
  handleMaxGroupSizeChange,
  maxGroupSize,
}) => {
  return (
    <Container>
      <section className=" h-[calc(100vh-0px)] flex flex-col items-center ">
        <div className="flex flex-col">
          <div className="flex  w-full pt-[116px] pb-[47px] font-semibold items-center justify-center ">
            <span className="text-[30px]">
              모두와 함께할 <span className="text-[#FF7F1E]">일상</span>을
              만들어보세요!
            </span>
          </div>
          <div>
            <div className="flex flex-col justify-center items-center min-w-[1280px] h-[calc(100vh-210px)] border-[1px] bg-[#FFFCF2] rounded-t-[100px] overflow-hidden">
              <div className="flex justify-start items-start w-full">
                <span className="text-[24px] px-[205px] mt-[30px] mb-[52px] font-semibold">
                  6. 몇명과 함께할까요?
                </span>
              </div>
              <div className="flex w-[800px] flex-col z-10">
                <div className="mb-[204px]">
                  {maxGroupSize && (
                    <Slider
                      styles={{
                        track: {
                          width: 837,
                        },
                        active: {
                          backgroundColor: "#FFE14F",
                        },
                      }}
                      axis="x"
                      xstep={5}
                      xmin={5}
                      xmax={35}
                      x={maxGroupSize.x}
                      onChange={({ x }) =>
                        handleMaxGroupSizeChange({
                          x: parseFloat(x.toFixed(2)),
                        })
                      }
                    />
                  )}
                  <div className="flex justify-between w-[845px]">
                    <div>5</div>
                    <div>10</div>
                    <div>15</div>
                    <div>20</div>
                    <div>25</div>
                    <div>30</div>
                    <div>35</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <button
                    className=" w-[12.5rem] h-[3.75rem] text-[1.5rem] font-semibold bg-[#747474] text-white rounded-full"
                    onClick={prevStep}
                  >
                    이전
                  </button>
                  <button
                    className=" w-[12.5rem] h-[3.75rem] text-[1.5rem] font-semibold bg-[#FF7F1E] text-white rounded-full"
                    onClick={nextStep}
                  >
                    다음
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

// 완료
export const Step7 = ({ prevStep, progress, titleInput, handleSubmit }) => {
  return (
    <Container>
      <section className=" h-[calc(100vh-0px)] flex flex-col items-center ">
        <div className="flex flex-col">
          <div className="flex mt-[208px] flex-col items-center min-w-[1280px] h-[534px] border-[1px] bg-[#FFFCF2] rounded-t-[100px] overflow-hidden">
            <div className="flex w-[800px] h-[100vh] justify-center flex-col z-10 items-center">
              <span className="text-[24px] font-semibold mt-[98px] mb-[98px]">
                "{titleInput}"의 정보를 다 입력했어요.
                <br />
                개설하여 일상을 진행할까요?
              </span>
              <div className="flex items-center justify-center gap-4">
                <button
                  className=" w-[12.5rem] h-[3.75rem] text-[1.5rem] font-semibold bg-[#747474] text-white rounded-full"
                  onClick={prevStep}
                >
                  이전
                </button>
                <button
                  className=" w-[12.5rem] h-[3.75rem] text-[1.5rem] font-semibold bg-[#FF7F1E] text-white rounded-full"
                  onClick={handleSubmit}
                >
                  제출
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export const Step8 = ({
  prevStep,
  progress,
  handleSubmit,
  titleInput,
  navigate,
}) => {
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    var duration = 0.5 * 1000;
    var animationEnd = Date.now() + duration;
    var skew = 1;

    function getRandomColor() {
      const colors = ["#ff0000", "#0000ff", "#ffff00", "#00ff00"]; // 여기에 원하는 색상을 추가
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    (function frame() {
      var timeLeft = animationEnd - Date.now();
      var ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);

      confetti({
        particleCount: 1,
        startVelocity: 0, // increase this for faster initial velocity
        ticks: ticks,
        origin: {
          x: Math.random(),
          y: Math.random() * skew - 0.2,
        },
        colors: [getRandomColor()],
        shapes: ["circle"],
        gravity: 3, // increase this for faster fall speed
        scalar: randomInRange(0.8, 1.4),
        drift: randomInRange(-0.4, 0.4),
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    })();

    const interval = setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate(`/club`);
    }, 3000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <Container>
      <section className=" h-[calc(100vh-0px)] flex flex-col items-center ">
        <div className="flex flex-col">
          <div className="flex flex-col items-center w-full md:w-[1200px] h-[100vh] shadow-cms  bg-[#FFFCF2] rounded-t-[100px]">
            <div className="flex w-[800px] h-[100vh] justify-center flex-col gap-y-24 z-10">
              <div className="flex flex-col justify-center items-center w-full">
                <span className="text-[30px] text-center">
                  "{titleInput}"개설완료 <br /> 당신의 일상을 함께하세요!
                </span>
                <br />
                <span className="text-[20px] text-center">
                  {counter}초뒤 이전 화면으로 넘어갑니다.
                </span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  className=" w-[12.5rem] h-[3.75rem] text-[1.5rem] font-semibold bg-[#FF7F1E] text-white rounded-full"
                  onClick={() => {
                    navigate(`/club`);
                  }}
                >
                  이전으로
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

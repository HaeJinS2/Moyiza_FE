import React from "react";

function MainCard({ image, cardNum }) {
  return (
    <>
      {cardNum === "club_1" ? (
        <div className="cursor-default flex w-full h-[500px] justify-between items-center ">
          <div className="flex gap-x-4">
            {/* <div className="font-semibold text-3xl text-neutral-400">01</div> */}

            <div className="flex flex-col w-[500px] gap-y-2">
              <div className="font-sans text-2xl text-orange-400">
                함께하는 즐거움
              </div>
              <div className="flex flex-col gap-2 py-4">
                <div className="font-bold text-4xl">똑같은 일상에</div>
                <div className="font-bold text-4xl">변화를 주고 싶다면</div>
              </div>
              <div className="">
                자신의 취미를 다른사람들과 함께 공유하며 즐겨보세요.
              </div>
              <div className="">함께하는 즐거움이 더욱 커질거예요! </div>
            </div>
          </div>
          <img className="h-auto" src={image} alt="service-description" />
        </div>
      ) : cardNum === "club_2" ? (
        <div className="cursor-default flex w-full h-[410px] justify-between items-center mb-16 ">
          <img className="h-auto" src={image} alt="service-description" />
          <div className="flex gap-x-4">
            {/* <div className="font-semibold text-3xl text-neutral-400">02</div> */}

            <div className="flex flex-col w-[500px] gap-y-4">
              <div className="flex gap-x-4">
                {/* <div className="font-semibold text-3xl text-neutral-400">01</div> */}

                <div className="flex flex-col w-[500px] gap-y-2">
                  <div className="font-sans text-2xl text-orange-400">
                    쉬운 모임관리
                  </div>
                  <div className="flex flex-col gap-2 py-4">
                    <div className="font-bold text-4xl">
                      원하는 모임을 만들고
                    </div>
                    <div className="font-bold text-4xl">쉽게 관리하기</div>
                  </div>
                  <div className="">
                    쉽게 모임을 열고 주인이돼서 관리해보세요.
                  </div>
                  <div className="">
                    당신이 원하는 모임을 간편하게 관리할 수 있을거예요.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : cardNum === "club_3" ? (
        <div className="cursor-default flex w-full h-[500px] justify-between items-center mb-10 ">
          <div className="flex gap-x-4">
            {/* <div className="font-semibold text-3xl text-neutral-400">03</div> */}

            <div className="flex flex-col w-[500px] gap-y-4">
              <div className="font-sans text-2xl text-orange-400">
                원하는 위치에서 가볍게
              </div>
              <div className="flex flex-col gap-2 py-4">
                <div className="font-bold text-4xl">근처에서 부담없이</div>
                <div className="font-bold text-4xl">취미생활 공유</div>
              </div>
              <img
                src={`${process.env.PUBLIC_URL}/images/main/club_3_sub.png`}
                alt="service-description"
              />
            </div>
          </div>
          <img className="h-auto" src={image} alt="service-description" />
        </div>
      ) : cardNum === "oneday_1" ? (
        <div className="cursor-default flex flex-col w-full h-auto justify-center items-center ">
          <div className="flex justify-center gap-x-4">
            {/* <div className="font-semibold text-3xl text-neutral-400">03</div> */}

            <div className="flex flex-col justify-center items-center w-full gap-y-4">
              <div className="font-sans text-2xl text-green-500">
                나의 일상의 작은 변화
              </div>
              <div className="flex flex-col gap-2 py-4">
                <div className="font-bold text-4xl">무료한 일상속 색다른 하루</div>
              </div>
              <div className="">매주는 어렵고 새로운 하루를 원한다면, 모이자의 일일모임 하루속에서 함께해요.</div>
              <div className="">
                당신의 취향과 비슷한 사람들끼리 하루를 함께 보내봐요!
              </div>
              <img className="h-auto" src={image} alt="service-description" />
            </div>
          </div>
        </div>
      ) : cardNum === "oneday_2" ? (
        <div className="cursor-default flex flex-col w-full h-auto justify-center items-center my-28 ">
          <div className="flex justify-center gap-x-4">
            {/* <div className="font-semibold text-3xl text-neutral-400">03</div> */}

            <div className="flex flex-col justify-center items-center w-full gap-y-4">
              <div className="font-sans text-2xl text-green-500">
                간단한 모임개설
              </div>
              <div className="flex flex-col gap-2 py-4">
                <div className="font-bold text-4xl">내가 원하는 하루를 간편히 만나는 방법!</div>
              </div>
              <div className="">손쉽게 모임을 개설하여 내가 원하는 하루를 만나보세요.</div>
              <div className="">
                함께라면 더욱 다양하고 좋은 추억이 가득할거예요.
              </div>
              <img className="h-auto" src={image} alt="service-description" />
            </div>
          </div>
        </div>
      ) : cardNum === "oneday_3" ? (
        <div className="cursor-default flex flex-col w-full h-auto justify-center items-center mb-20 ">
        <div className="flex justify-center gap-x-4">
          {/* <div className="font-semibold text-3xl text-neutral-400">03</div> */}

          <div className="flex flex-col justify-center items-center w-full gap-y-4">
            <div className="font-sans text-2xl text-green-500">
              원하는 장소에서 쉽게
            </div>
            <div className="flex flex-col gap-2 py-4">
              <div className="font-bold text-4xl">부담없는 장소 선정</div>
            </div>
            <div className="">먼 곳은 나가기 힘들죠? 주변지역을 설정하고 손쉽게 만나보세요.</div>
            <div className="">
              집근처 모임으로 부담은 줄이고 재미는 올라갈거예요!
            </div>
            <img className="h-auto" src={image} alt="service-description" />
          </div>
        </div>
      </div>
      ) : (
        ""
      )}
    </>
  );
}

export default MainCard;

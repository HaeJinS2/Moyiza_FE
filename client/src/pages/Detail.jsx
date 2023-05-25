import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getClubDetail } from "../api/club";
import BodyContainer from "../component/BodyContainer";
import ClubEventCard from "../component/ClubEventCard";
import ClubReviewCard from "../component/ClubReviewCard";
import Navbar from "../component/Navbar";

function Detail() {
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: clubDetail,
  } = useQuery("getDetailClub", () => getClubDetail(id), {
    refetchOnWindowFocus: false, // refetchOnWindowFocus 옵션을 false로 설정
  });

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);


  if (isLoading) {
    <div>로딩중 입니다</div>;
  } else if (isError) {
    <div>정보를 가져오는도중 오류가 발생했습니다.</div>;
  }

  console.log(clubDetail);

  return (
    <>
    <div ref={divRef}/>
      <Navbar  />
      <BodyContainer>
        <header  className="flex flex-col mt-32 justify-center items-center relative gap-10 mb-10">
          <div className="self-end">
            <button className=" text-white bg-rose-400 px-2 py-1 rounded-full fixed top-32 sm:right-20 md:right-32 lg:right-60 xl:right-80">
              클럽수정
            </button>
          </div>
          <img
            src={clubDetail?.thumbnailUrl}
            className="w-[240px] h-[240px] rounded-full"
            alt="club-thumbnail"
          />
          <p className="font-bold text-2xl">{clubDetail?.clubTitle}</p>
          <p>{clubDetail?.clubContent}</p>
        </header>
        <body className="flex flex-col gap-4">
          <p className="text-xl">진행중인 클럽 이벤트</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            <ClubEventCard />
            <ClubEventCard />
          </div>
          <p className="text-xl">종료된 클럽 이벤트</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            <ClubEventCard />
            <ClubEventCard />
          </div>
          <p className="text-xl">클럽 후기</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            <ClubReviewCard />
            <ClubReviewCard />
            <ClubReviewCard />
            <ClubReviewCard />
          </div>
        </body>

      </BodyContainer>
    </>
  );
}

export default Detail;

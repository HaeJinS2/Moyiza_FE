import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAPI, postAPI } from "../axios";
import BodyContainer from "../component/BodyContainer";
import ClubEventCard from "../component/ClubEventCard";
// import ClubReviewCard from "../component/ClubReviewCard";
import Navbar from "../component/Navbar";

function Detail() {
  const { id } = useParams();
  const [clubMemberNicknameArr, setClubMemberNicknameArr] = useState([]);
  const navigate = useNavigate();
  // 클럽 상세조회
  const {
    isLoading,
    isError,
    data: clubDetail,
  } = useQuery("getDetailClub", () => getAPI(`/club/${id}`), {
    refetchOnWindowFocus: false, // refetchOnWindowFocus 옵션을 false로 설정
  });

  //클럽 멤버 가져오는 코드
  useEffect(() => {
    getClubMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClubMembers = () => {
    getAPI(`/club/${id}/members`).then((res) => {
      const clubMember = res.data;
      setClubMemberNicknameArr(clubMember.map((member) => member.userNickname));
    });
  };

  // 클럽 가입하기 버튼
  const handleJoinClub = () => {
    postAPI(`/club/${id}/join`, {}).then((res) =>
      console.log(res.data.message)
    );
  };

  // const getClubEventLists = () => {
  //   getAPI(`/club/${id}/eventlist`).then((res) => {
  //    console.log(res)
  //   });
  // };

  // 화면이 렌더링 될 때 화면의 최상단으로 보내주는 코드
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  if (isLoading) {
    <div>로딩중 입니다</div>;
  } else if (isError) {
    <div>정보를 가져오는도중 오류가 발생했습니다.</div>;
  }

  // getClubEventLists()
  console.log(clubDetail);
  console.log(clubMemberNicknameArr);
  return (
    <>
      <div ref={divRef} />
      <Navbar />
      <BodyContainer>
        <header className="flex flex-col mt-32 justify-center items-center relative gap-10 mb-10">
          <div className="self-end">
            <button className=" text-white bg-rose-400 px-2 py-1 rounded-full fixed top-32 sm:right-20 md:right-32 lg:right-60 xl:right-80">
              클럽수정
            </button>
          </div>
          <img
            src={clubDetail?.data.thumbnailUrl}
            className="w-[240px] h-[240px] rounded-full"
            alt="club-thumbnail"
          />
          <p className="font-bold text-2xl">{clubDetail?.data.clubTitle}</p>
          <p>{clubDetail?.clubContent}</p>
        </header>
        <body className="flex flex-col gap-4">
          <p className="text-xl">진행중인 클럽 이벤트</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            <ClubEventCard />
            <ClubEventCard />
            <ClubEventCard />
            <ClubEventCard />
          </div>
          <p className="text-xl">종료된 클럽 이벤트</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            <ClubEventCard />
            <ClubEventCard />
            <ClubEventCard />
            <ClubEventCard />
          </div>
          {/* <p className="text-xl">클럽 후기</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            <ClubReviewCard />
            <ClubReviewCard />
            <ClubReviewCard />
            <ClubReviewCard />
          </div> */}
          <div className="flex justify-end">
            <div className="fixed z-100 bottom-16 flex justify-center items-center mt-10 bg-rose-400 text-white w-[100px] py-2 rounded-lg">
              <button onClick={handleJoinClub}>클럽 가입하기</button>
            </div>
            <div className="fixed z-100 bottom-16 flex justify-center items-center mt-10 bg-rose-400 text-white w-[100px] py-2 rounded-lg right-2/4">
              <button onClick={() => navigate(`/create-event-form/${id}`)}>
                이벤트 생성
              </button>
            </div>
          </div>
        </body>
      </BodyContainer>
    </>
  );
}

export default Detail;

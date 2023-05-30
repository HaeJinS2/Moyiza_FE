import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { deleteAPI, getAPI, postAPI } from "../axios";
import BodyContainer from "../component/BodyContainer";
import ClubEventCard from "../component/ClubEventCard";
// import ClubReviewCard from "../component/ClubReviewCard";
import Navbar from "../component/Navbar";
import { latestClubState } from "../states/clubState";
import { AnimatePresence, motion } from "framer-motion";

function Detail() {
  const { id } = useParams();
  const [clubMemberNicknameArr, setClubMemberNicknameArr] = useState([]);
  const [eventlists, setEventLists] = useState([]);
  const [latestClub, setLatestClub] = useRecoilState(latestClubState);
  const navigate = useNavigate();
  const [progressEventPage, setProgressEventPage] = useState(1);

  const [progressTuple, setProgressTuple] = useState([null, progressEventPage]);

  if (progressTuple[1] !== progressEventPage) {
    setProgressTuple([progressTuple[1], progressEventPage]);
  }

  let progressPrev = progressTuple[0];
  let progressDirection = progressEventPage > progressPrev ? 1 : -1;

  const [endedEventPage, setEndedEventPage] = useState(1);

  const [endedTuple, setEndedTuple] = useState([null, endedEventPage]);

  if (endedTuple[1] !== endedEventPage) {
    setEndedTuple([endedTuple[1], endedEventPage]);
  }

  let endedPrev = endedTuple[0];
  let endedDirection = endedEventPage > endedPrev ? 1 : -1;

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

  //이벤트 리스트 가져오는 코드
  useEffect(() => {
    getClubEventLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 최근 본 게시글 id 저장하는 코드
  useEffect(() => {
    if (localStorage.getItem("latestClub") === null) {
      localStorage.setItem("latestClub", JSON.stringify([id]));
      setLatestClub([id]);
    } else {
      let arr = JSON.parse(localStorage.getItem("latestClub"));
      arr.push(id);
      let newLatestClub = new Set(arr);
      localStorage.setItem("latestClub", JSON.stringify([...newLatestClub]));
      setLatestClub([...newLatestClub]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(latestClub);

  const getClubMembers = () => {
    getAPI(`/club/${id}/members`).then((res) => {
      const clubMember = res.data;
      setClubMemberNicknameArr(clubMember.map((member) => member.userNickname));
    });
  };

  // 클럽 가입하기 버튼
  const handleJoinClub = () => {
    postAPI(`/club/${id}/join`, {})
      .then((res) => {
        console.log(res.data.message);
        alert("가입이 승인됐습니다!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoodbyeClub = () => {
    postAPI(`/club/${id}/goodbye`, {})
      .then((res) => {
        console.log(res.data.message);
        alert("클럽 탈퇴 완료");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteClub = () => {
    deleteAPI(`/club/${id}/delete`)
      .then((res) => {
        console.log(res.data.message);
        alert("클럽 삭제 완료");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getClubEventLists = () => {
    getAPI(`/club/${id}/eventlist`).then((res) => {
      console.log(res);
      setEventLists(res.data);
    });
  };

console.log(eventlists)

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

  const progressEvents = eventlists.filter((item) => {
    const eventStartTime = new Date(item.eventStartTime);
    const today = new Date();
    return eventStartTime <= today;
  });
  const endedEvents = eventlists.filter((item) => {
    const eventStartTime = new Date(item.eventStartTime);
    const today = new Date();
    return eventStartTime > today;
  });
  console.log(eventlists);
  console.log(clubMemberNicknameArr);

  const handleJoinEvent = () => {
    postAPI("/club/19/event/join/13", {}).then((res) => console.log(res));
  };
  const handleLeaveEvent = () => {
    deleteAPI("/club/19/event/join/13").then((res) => console.log(res));
  };

  const handleDeleteEvent = () => {
    deleteAPI("/club/19/event/13").then((res) => console.log(res));
  };

  return (
    <>
      <div ref={divRef} />
      <Navbar />
      <BodyContainer>
        <header className="flex flex-col mt-32 justify-center items-center relative gap-10 mb-10">
          <div className="self-end">
            <button
              onClick={handleDeleteClub}
              className=" text-white bg-rose-400 px-2 py-1 rounded-full fixed top-32 sm:right-20 md:right-32 lg:right-60 xl:right-80"
            >
              클럽삭제
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

          <div className="text-black">
            <div className="flex justify-center items-center">
              <div className="flex justify-center w-full h-96 text-black items-center overflow-hidden relative">
                <AnimatePresence custom={progressDirection}>
                  <motion.div
                    key={progressEventPage}
                    variants={varients}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={progressDirection}
                    transition={{ duration: 0.5 }}
                    className={`h-[200px] absolute flex justify-center items-center w-full `}
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 w-full">
                      {progressEvents.length !== 0 &&
                        [
                          progressEvents[progressEventPage],
                          progressEvents[progressEventPage * 2 - 1],
                        ].map((item) => {
                          console.log(item);
                          return (
                            <ClubEventCard
                              key={item?.id}
                              clubId={item?.clubId}
                              eventId={item?.id}
                              title={item?.eventTitle}
                              content={item?.eventContent}
                              size={item?.eventGroupSize}
                              attendantsNum={item?.attendantsNum}
                              startTime={item?.eventStartTime}
                              location={item?.eventLocation}
                            />
                          );
                        })}
                      <div className="flex justify-center gap-10"></div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="flex justify-center gap-10">
              <button
                onClick={() => setProgressEventPage(progressEventPage - 1)}
              >
                이전으로
              </button>
              <button
                onClick={() => setProgressEventPage(progressEventPage + 1)}
              >
                다음으로
              </button>
            </div>
          </div>

          <p className="text-xl">종료된 클럽 이벤트</p>

          <div className="text-black">
            <div className="flex justify-center items-center">
              <div className="flex justify-center w-full h-96 text-black items-center overflow-hidden relative">
                <AnimatePresence custom={endedDirection}>
                  <motion.div
                    key={endedEventPage}
                    variants={varients}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={endedDirection}
                    transition={{ duration: 0.5 }}
                    className={`h-[200px] absolute flex justify-center items-center w-full `}
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 w-full">
                      {endedEvents.length !== 0 &&
                        [
                          endedEvents[endedEventPage],
                          endedEvents[endedEventPage * 2 - 1],
                        ].map((item) => {
                          console.log(item);
                          return (
                            <ClubEventCard
                              key={item?.id}
                              clubId={item?.clubId}
                              eventId={item?.id}
                              title={item?.eventTitle}
                              content={item?.eventContent}
                              size={item?.eventGroupSize}
                              attendantsNum={item?.attendantsNum}
                              startTime={item?.eventStartTime}
                              location={item?.eventLocation}
                            />
                          );
                        })}
                      <div className="flex justify-center gap-10"></div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="flex justify-center gap-10">
              <button
                onClick={() => setEndedEventPage(endedEventPage - 1)}
              >
                이전으로
              </button>
              <button
                onClick={() => setEndedEventPage(endedEventPage + 1)}
              >
                다음으로
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="fixed z-100 bottom-16 flex justify-center items-center mt-10 bg-rose-400 text-white w-[100px] py-2 rounded-lg">
              <button onClick={handleJoinClub}>클럽 가입하기</button>
            </div>
            <div className="fixed z-100 bottom-16 flex justify-center items-center mt-10 bg-rose-400 text-white w-[100px] py-2 rounded-lg right-3/4">
              <button onClick={handleGoodbyeClub}>클럽 탈퇴하기</button>
            </div>
            <div className="fixed z-100 bottom-16 flex justify-center items-center mt-10 bg-rose-400 text-white w-[100px] py-2 rounded-lg right-2/4">
              <button onClick={() => navigate(`/create-event-form/${id}`)}>
                이벤트 생성
              </button>
            </div>
            <div className="fixed z-100 bottom-40 flex justify-center items-center mt-10 bg-rose-400 text-white w-[100px] py-2 rounded-lg right-3/4">
              <button onClick={handleJoinEvent}>이벤트 참여</button>
            </div>
            <div className="fixed z-100 bottom-40 flex justify-center items-center mt-10 bg-rose-400 text-white w-[100px] py-2 rounded-lg right-2/4">
              <button onClick={handleLeaveEvent}>이벤트 탈퇴</button>
            </div>
            <div className="fixed z-100 bottom-40 flex justify-center items-center mt-10 bg-rose-400 text-white w-[100px] py-2 rounded-lg">
              <button onClick={handleDeleteEvent}>이벤트 삭제</button>
            </div>
          </div>
        </body>
      </BodyContainer>
    </>
  );
}

let varients = {
  enter: (direction) => ({ x: direction * 600 }),
  center: { x: 0 },
  exit: (direction) => ({ x: direction * -600 }),
};



export default Detail;

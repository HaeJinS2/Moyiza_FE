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
import EmptyState from "../component/EmptyState";

function Detail() {
  const { id } = useParams();
  const [clubMemberNicknameArr, setClubMemberNicknameArr] = useState([]);
  const [eventlists, setEventLists] = useState([]);
  const [latestClub, setLatestClub] = useRecoilState(latestClubState);
  const navigate = useNavigate();
  const [progressEventPage, setProgressEventPage] = useState(0);
  const [progressTuple, setProgressTuple] = useState([null, progressEventPage]);

  if (progressTuple[1] !== progressEventPage) {
    setProgressTuple([progressTuple[1], progressEventPage]);
  }

  let progressPrev = progressTuple[0];
  let progressDirection = progressEventPage > progressPrev ? 1 : -1;

  const [endedEventPage, setEndedEventPage] = useState(0);

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

  console.log(eventlists);

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

  const newEventLists = eventlists.map((item) => {
    const eventStartTime = new Date(item.eventStartTime);
    const eventEndTime = new Date(eventStartTime.setHours(23, 59, 59));
    return {
      ...item,
      eventEndTime,
    };
  });

  const progressEvents = newEventLists.filter((item) => {
    const eventEndTime = new Date(item.eventEndTime);
    const today = new Date();
    return today <= eventEndTime;
  });

  const endedEvents = newEventLists.filter((item) => {
    const eventEndTime = new Date(item.eventEndTime);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return eventEndTime <= today;
  });
  console.log(eventlists);
  console.log(clubMemberNicknameArr);

  const handleJoinEvent = (clubId, eventId) => {
    postAPI(`/club/${clubId}/event/join/${eventId}`, {}).then((res) => {
      console.log(res);
      alert("참가완료!");
    });
  };
  const handleLeaveEvent = (clubId, eventId) => {
    deleteAPI(`/club/${clubId}/event/join/${eventId}`).then((res) =>
      console.log(res)
    );
  };

  const handleDeleteEvent = (clubId, eventId) => {
    deleteAPI(`/club/${clubId}/event/${eventId}`).then((res) =>
      console.log(res)
    );
  };
  console.log(progressEvents);
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
          <div className="flex justify-between gap-10">
            <div>
              <p className="text-xl">진행중인 클럽 이벤트</p>
            </div>
            <div>
              {progressEventPage > 0 && (
                <button
                  onClick={() => setProgressEventPage(progressEventPage - 1)}
                >
                  이전으로
                </button>
              )}
              {progressEventPage < Math.ceil(progressEvents.length / 4) - 1 && (
                <button
                  onClick={() => setProgressEventPage(progressEventPage + 1)}
                >
                  다음으로
                </button>
              )}
            </div>
          </div>
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
                    <div
                      className={`${
                        progressEvents.length === 0 ? "" : "grid grid-cols-4"
                      } gap-x-4 gap-y-8 w-full`}
                    >
                      {progressEvents.length === 0 ? (
                        <EmptyState page="detail" />
                      ) : (
                        progressEvents
                          .slice(
                            progressEventPage * 4,
                            progressEventPage * 4 + 4
                          ) // progressEvents 배열에서 현재 페이지에 해당하는 4개의 요소만 선택
                          .map((item) => {
                            return (
                              <ClubEventCard
                                handleJoinEvent={handleJoinEvent}
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
                          })
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
          </div>

          <p className="text-xl">종료된 클럽 이벤트</p>

            <div className="flex h-full justify-center items-center">
              <div className="flex justify-center w-full h-[100vh] text-black items-center overflow-hidden relative">
                <AnimatePresence custom={endedDirection}>
                  <motion.div
                    key={endedEventPage}
                    variants={varients}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={endedDirection}
                    transition={{ duration: 0.5 }}
                    className={`h-full absolute flex justify-center items-center w-full `}
                  >
                    <div
                      className={`${
                        endedEvents.length === 0
                          ? ""
                          : "grid grid-cols-3 grid-rows-4"
                      } gap-x-4 gap-y-8 w-full `}
                    >
                      {endedEvents.length === 0 ? (
                        <EmptyState page="detail" />
                      ) : (
                        endedEvents
                          .slice(endedEventPage * 12, endedEventPage * 12 + 12)
                          .map((item) => {
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
                          })
                      )}
                      <div className="flex justify-center gap-10"></div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="flex justify-center gap-10">
              {endedEventPage > 0 && (
                <button onClick={() => setEndedEventPage(endedEventPage - 1)}>
                  이전으로
                </button>
              )}
              {endedEventPage < Math.ceil(endedEvents.length / 3) - 1 && (
                <button onClick={() => setEndedEventPage(endedEventPage + 1)}>
                  다음으로
                </button>
              )}
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
  enter: (direction) => ({ x: direction * 700 }),
  center: { x: 0 },
  exit: (direction) => ({ x: direction * -700 }),
};

export default Detail;

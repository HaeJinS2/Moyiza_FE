import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { deleteAPI, getAPI, postAPI } from "../axios";
import BodyContainer from "../component/BodyContainer";
import ClubEventCard from "../component/ClubEventCard";
// import ClubReviewCard from "../component/ClubReviewCard";
import { latestClubState } from "../states/clubState";
import { AnimatePresence, motion } from "framer-motion";
import EmptyState from "../component/EmptyState";
import EndedClubEventCard from "../component/EndedClubEventCard";
import { userNicknameState } from "../states/userStateTmp";
import CreateEventModal from "../component/CreateEventModal";

import swal from "sweetalert";

function Detail() {
  const { id } = useParams();
  const [clubMemberNicknameArr, setClubMemberNicknameArr] = useState([]);
  const [eventlists, setEventLists] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [latestClub, setLatestClub] = useRecoilState(latestClubState);
  const navigate = useNavigate();
  const userNickname = useRecoilValue(userNicknameState);
  const [isMember, setIsMember] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  // 진행중인 이벤트 상태관리
  const [progressEventPage, setProgressEventPage] = useState(0);
  const [progressTuple, setProgressTuple] = useState([null, progressEventPage]);
  if (progressTuple[1] !== progressEventPage) {
    setProgressTuple([progressTuple[1], progressEventPage]);
  }
  let progressPrev = progressTuple[0];
  let progressDirection = progressEventPage > progressPrev ? 1 : -1;

  // 지난 이벤트 상태관리
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

  // isOwner의 상태 관리
  useEffect(() => {
    if (clubDetail && clubDetail.data) {
      if (userNickname.userNickname === clubDetail.data.ownerNickname) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    }
  }, [clubDetail, userNickname]);

  //클럽 멤버 가져오는 코드
  useEffect(() => {
    getClubMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNickname]);

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
      if (
        clubMember
          .map((member) => member.userNickname)
          .includes(userNickname.userNickname)
      ) {
        setIsMember(true);
      }
    });
  };

  // 클럽 가입하기 버튼
  const handleJoinClub = () => {
    postAPI(`/club/${id}/join`, {})
      .then((res) => {
        setIsMember(true);
        console.log(res.data.message);
        getAPI(`/club/${id}`).then((res) => swal("가입이 승인됐습니다!"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoodbyeClub = () => {
    postAPI(`/club/${id}/goodbye`, {})
      .then((res) => {
        setIsMember(false);
        console.log(res.data.message);
        getAPI(`/club/${id}`).then((res) => swal("클럽 탈퇴 완료"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteClub = () => {
    deleteAPI(`/club/${id}/delete`)
      .then((res) => {
        console.log(res.data.message);
        navigate("/club");
        swal("클럽 삭제 완료");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getClubEventLists = () => {
    getAPI(`/club/${id}/eventlist`)
      .then((res) => {
        console.log(res);
        setEventLists(res.data);
      })
      .catch((err) => {
        console.log(err);
        swal("목록을 가져오는 도중 문제가 발생했습니다.");
      });
  };
  console.log(isMember);
  console.log(eventlists);
  console.log(clubDetail?.data);
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

  // EventList에 eventEndTime key 추가
  const newEventLists = eventlists.map((item) => {
    const eventStartTime = new Date(item.eventStartTime);
    const eventEndTime = new Date(eventStartTime.setHours(23, 59, 59));
    return {
      ...item,
      eventEndTime,
    };
  });

  // 진행중인 이벤트 리스트
  const progressEvents = newEventLists.filter((item) => {
    const eventEndTime = new Date(item.eventEndTime);
    const today = new Date();
    return today <= eventEndTime;
  });

  // 지난 이벤트 리스트
  const endedEvents = newEventLists.filter((item) => {
    const eventEndTime = new Date(item.eventEndTime);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventEndTime <= today;
  });
  console.log(eventlists);

  const handleJoinEvent = (clubId, eventId, onJoinSuccess) => {
    postAPI(`/club/${clubId}/event/join/${eventId}`, {}).then((res) => {
      console.log(res);
      onJoinSuccess && onJoinSuccess();
      getAPI(`/club/${id}/eventlist`)
      .then((res) => {
        console.log(res);
        setEventLists(res.data);
        swal("이벤트 참가 신청이 완료되었습니다!");
      })
    });
  };

  const handleLeaveEvent = (clubId, eventId, onLeaveSuccess) => {
    deleteAPI(`/club/${clubId}/event/join/${eventId}`).then((res) => {
      console.log(res);
      onLeaveSuccess && onLeaveSuccess();
      getAPI(`/club/${id}/eventlist`)
      .then((res) => {
        console.log(res);
        setEventLists(res.data);
        swal("이벤트 참가 신청이 취소됐습니다!");
      })
    });
  };

  const handleDeleteEvent = (clubId, eventId) => {
    deleteAPI(`/club/${clubId}/event/${eventId}`)
      .then((res) => {
        swal("이벤트 삭제 완료!");
        getClubEventLists();
      })
      .catch((error) => swal("이벤트 삭제 요청이 거절됐습니다."));
  };
  console.log(clubMemberNicknameArr);
  console.log(progressEvents);
  console.log(clubDetail);
  return (
    <>
      <div ref={divRef} />
      <BodyContainer>
        <header className="flex pt-40 flex-col justify-center items-center relative gap-10 mb-10">
          <div className="flex justify-between w-full items-center">
            <button onClick={() => navigate(-1)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/prev_button.svg`}
                alt="previous_button"
              />
            </button>
            <div className="font-bold text-[2rem]">
              {clubDetail?.data.clubTitle}
            </div>
            {isOwner ? (
              onEdit ? (
                <button onClick={() => setOnEdit(false)}>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/setting.svg`}
                    alt="cancel_button"
                  />
                </button>
              ) : (
                <button onClick={() => setOnEdit(true)}>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/setting.svg`}
                    alt="setting_button"
                  />
                </button>
              )
            ) : (
              <div className="h-[60px] w-[60px]" />
            )}
          </div>

          <div>
            <div className="aspect-square flex w-full h-full justify-center items-center relative overflow-hidden rounded-xl my-4">
              <img
                className="rounded-md w-[219px] h-[219px] object-fill"
                src={clubDetail?.data.thumbnailUrl}
                alt="clubThumbnail"
              />
            </div>
            <div className="flex justify-center gap-20">
              {clubDetail?.data.clubTag.map((item) => {
                return (
                  <>
                    <div className="flex font-semibold  cursor-default items-center justify-center text-orange-400 text-xl border-orange-400 border-2 px-2 pt-[4px] rounded-full h-[35px]">
                      {item}
                    </div>
                  </>
                );
              })}
            </div>
            <div className="flex justify-center">
              {isMember ? (
                <div className="flex  text-2xl  justify-center items-center mt-10 bg-orange-400 text-white w-[224px] h-[60px]  py-2 rounded-full ">
                  <button onClick={handleGoodbyeClub}>모임 탈퇴하기</button>
                </div>
              ) : (
                <div className="flex text-2xl justify-center items-center mt-10 bg-orange-400 text-white w-[224px] h-[60px] py-2 rounded-full">
                  <button onClick={handleJoinClub}>모임 가입하기</button>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center w-full h-[237px] bg-neutral-200 rounded-2xl pr-10">
            <p className="text-black text-2xl px-4">
              {clubDetail?.data.clubContent}
            </p>
            {isOwner ? (
              onEdit ? (
                <button className="w-[126px] h-[30px] rounded-full bg-orange-400 text-white text-lg">
                  수정하기
                </button>
              ) : (
                <>
                  {/* <button
                className="bg-orange-400 text-white flex justify-center items-center w-[60px] h-[60px] rounded-full text-5xl pt-[6px]"
                onClick={() => navigate(`/create-event-form/${id}`)}
              >
                +
              </button> */}

                  <CreateEventModal
                    getClubEventLists={getClubEventLists}
                    id={id}
                  />
                </>
              )
            ) : (
              ""
            )}
          </div>
        </header>
        <body className="flex flex-col gap-4">
          <div className="flex justify-between gap-10">
            <div>
              <p className="text-xl">진행중인 일상속 이벤트</p>
            </div>
            <div>
              {progressEventPage > 0 && (
                <button
                  onClick={() => setProgressEventPage(progressEventPage - 1)}
                >
                  <img
                    alt="prev_button"
                    src={`${process.env.PUBLIC_URL}/images/prev_button.svg`}
                  />
                </button>
              )}
              {progressEventPage < Math.ceil(progressEvents.length / 4) - 1 && (
                <button
                  onClick={() => setProgressEventPage(progressEventPage + 1)}
                >
                  <img
                    alt="next_button"
                    src={`${process.env.PUBLIC_URL}/images/next_button.svg`}
                  />
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
                    } gap-x-4 gap-y-8 justify-items-center w-full`}
                  >
                    {progressEvents.length === 0 ? (
                      <EmptyState page="detail" />
                    ) : (
                      progressEvents
                        .slice(progressEventPage * 4, progressEventPage * 4 + 4) // progressEvents 배열에서 현재 페이지에 해당하는 4개의 요소만 선택
                        .map((item) => {
                          return (
                            <>
                              <div className="flex flex-col gap-2 ">
                                <ClubEventCard
                                  image={item?.image}
                                  handleLeaveEvent={handleLeaveEvent}
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
                                {onEdit ? (
                                  <div className="w-full justify-between flex gap-2">
                                    <button className="w-[126px] h-[30px] rounded-full bg-orange-400 text-white text-lg">
                                      수정하기
                                    </button>
                                    <button
                                      className="w-[126px] h-[30px] rounded-full border-2 border-orange-400 bg-white text-orange-400 text-lg"
                                      onClick={() =>
                                        handleDeleteEvent(id, item.id)
                                      }
                                    >
                                      삭제하기
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </>
                          );
                        })
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <p className="text-xl">종료된 일상속 이벤트</p>

          <div className="flex h-full justify-center items-center">
            <div className="flex justify-center w-full h-[50vh] text-black items-start overflow-hidden relative">
              <AnimatePresence custom={endedDirection}>
                <motion.div
                  key={endedEventPage}
                  variants={varients}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={endedDirection}
                  transition={{ duration: 0.5 }}
                  className={`h-full absolute flex  w-full `}
                >
                  <div
                    className={`${
                      endedEvents.length === 0
                        ? ""
                        : "grid grid-cols-3 grid-rows-3"
                    } gap-x-4 gap-y-8 w-full `}
                  >
                    {endedEvents.length === 0 ? (
                      <EmptyState page="detail" />
                    ) : (
                      endedEvents
                        .slice(endedEventPage * 9, endedEventPage * 9 + 9)
                        .map((item) => {
                          return (
                            <EndedClubEventCard
                              image={item?.image}
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
                <img
                  alt="prev_button"
                  src={`${process.env.PUBLIC_URL}/images/prev_button.svg`}
                />
              </button>
            )}
            {endedEventPage < Math.ceil(endedEvents.length / 3) - 1 && (
              <button onClick={() => setEndedEventPage(endedEventPage + 1)}>
                <img
                  alt="next_button"
                  src={`${process.env.PUBLIC_URL}/images/next_button.svg`}
                />
              </button>
            )}
          </div>

          <div className="flex justify-center pb-20">
            {onEdit && (
              <button
                onClick={handleDeleteClub}
                className=" text-white text-2xl bg-[#646464] w-[224px] h-[60px] px-2 py-1 rounded-full"
              >
                모임 삭제
              </button>
            )}
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

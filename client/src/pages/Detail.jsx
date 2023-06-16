import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { deleteAPI, getAPI, postAPI } from "../axios";
import ClubEventCard from "../component/ClubEventCard";
import ClubReviewCard from "../component/ClubReviewCard";
import { latestClubState } from "../states/clubState";
import { AnimatePresence, motion } from "framer-motion";
import EmptyState from "../component/EmptyState";
import EndedClubEventCard from "../component/EndedClubEventCard";
import { isLoggedInState, userNicknameState } from "../states/userStateTmp";
import CreateEventModal from "../component/CreateEventModal";

import swal from "sweetalert";

function Detail() {
  const { id } = useParams();
  const [clubMemberNicknameArr, setClubMemberNicknameArr] = useState([]);
  const [eventlists, setEventLists] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [latestClub, setLatestClub] = useRecoilState(latestClubState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const navigate = useNavigate();
  const userNickname = useRecoilValue(userNicknameState);
  const [isMember, setIsMember] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [eventArr, setEventArr] = useState([]);
  const [eventReview, setEventReview] = useState([]);

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

  // 멤버 상태관리
  const [memberPage, setMemberPage] = useState(0);
  const [memberTuple, setMemberTuple] = useState([null, memberPage]);
  if (memberTuple[1] !== memberPage) {
    setMemberTuple([memberTuple[1], memberPage]);
  }
  let memberPrev = memberTuple[0];
  let memberDirection = memberPage > memberPrev ? 1 : -1;

  // 후기 상태관리
  const [reviewPage, setReviewPage] = useState(0);
  const [reviewTuple, setReviewTuple] = useState([null, reviewPage]);
  if (reviewTuple[1] !== reviewPage) {
    setReviewTuple([reviewTuple[1], reviewPage]);
  }
  let reviewPrev = reviewTuple[0];
  let reviewDirection = reviewPage > reviewPrev ? 1 : -1;

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

  useEffect(() => {
    eventArr.map((item) => 
      getAPI(`/review?reviewType=EVENT&identifier=${item}`).then((res) => {
        setEventReview((pre) => [...pre, ...res.data.content])
      })
    )

//  console.log("eventReview",eventReview)
  },[eventArr])

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
  // eslint-disable-next-line
  const handleJoinClub = () => {
    if (isLoggedIn) {
      postAPI(`/club/${id}/join`, {})
        .then((res) => {
          setIsMember(true);
          console.log(res.data.message);
          getAPI(`/club/${id}`).then((res) => swal("가입이 승인됐습니다!"));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      swal("로그인이 필요한 기능입니다!");
      navigate("/login");
    }
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
        console.log("res", res);
        setEventLists(res.data);

        let arr = [...res.data]
        console.log("res.data", arr)
        let tmp = arr?.map(item => item.id)
        setEventArr(tmp)
      })
      .catch((err) => {
        console.log(err);
        swal("목록을 가져오는 도중 문제가 발생했습니다.");
      });
  };
  console.log(isMember);
  console.log(eventlists);
  console.log(clubDetail?.data);

  console.log("res.data!",eventReview)

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

  // 멤버 리스트
  const memberList = clubDetail?.data.memberList;
  const reviewList = eventReview
  const handleJoinEvent = (clubId, eventId, onJoinSuccess) => {
    postAPI(`/club/${clubId}/event/join/${eventId}`, {}).then((res) => {
      console.log(res);
      onJoinSuccess && onJoinSuccess();
      getAPI(`/club/${id}/eventlist`).then((res) => {
        console.log(res);
        setEventLists(res.data);
        swal("이벤트 참가 신청이 완료되었습니다!");
      });
    });
  };

  const handleLeaveEvent = (clubId, eventId, onLeaveSuccess) => {
    deleteAPI(`/club/${clubId}/event/join/${eventId}`).then((res) => {
      console.log(res);
      onLeaveSuccess && onLeaveSuccess();
      getAPI(`/club/${id}/eventlist`).then((res) => {
        console.log(res);
        setEventLists(res.data);
        swal("이벤트 참가 신청이 취소됐습니다!");
      });
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
  console.log(clubDetail);
  console.log("멤버리스트", memberList);
  return (
    <>
      <div ref={divRef} />
      <div className="w-[1280px] flex flex-col justify-center items-center mx-auto">
        <header className="flex pt-40 flex-col h-auto items-center w-[1140px] justify-center">
          <div className="w-full flex flex-col">
            <div className="flex justify-between w-full items-center mb-[20px]">
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
                      src={`${process.env.PUBLIC_URL}/images/onEdit.svg`}
                      alt="cancel_edit_button"
                    />
                  </button>
                ) : (
                  <button onClick={() => setOnEdit(true)}>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/setting.svg`}
                      alt="edit_button"
                    />
                  </button>
                )
              ) : (
                <div className="h-[60px] w-[60px]" />
              )}
            </div>
            <div className="flex gap-x-[70px] w-auto items-center">
              <div className="flex justify-center">
                <img
                  className="rounded-xl w-[458px] h-[305px] object-contain aspect-square"
                  src={clubDetail?.data.clubImageUrlList[0]}
                  alt="club_main"
                />
              </div>
              <div>
                <div className="w-[543px] h-[294px] mt-[16px]">
                  <div className="flex justify-center mb-[20px]">
                    <div className="flex flex-col justify-center items-center w-[181px]">
                      <div>
                        <img
                          alt="club_detail_gender"
                          src={`${process.env.PUBLIC_URL}/images/detail/club_detail_gender.svg`}
                        />
                      </div>
                      <div className="flex justify-center text-[1rem]">
                        {clubDetail?.data.genderPolicy}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center px-[46px] border-x-2 w-[181px]">
                      <div className="flex justify-center text-[1.25rem]">
                        Age
                      </div>
                      <div className="flex justify-center text-[1rem]">
                        {clubDetail?.data.agePolicy}세 이상
                      </div>
                    </div>
                    <div className="flex flex-col  justify-center items-center w-[181px]">
                      <div>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/detail/club_detail_people.svg`}
                          alt="club_detail_people"
                        />
                      </div>
                      <div className="flex justify-center text-[1rem]">
                        {clubDetail?.data.nowMemberCount} /
                        {clubDetail?.data.maxGroupSize}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mb-[20px] gap-4">
                    {clubDetail?.data.clubTag.map((tag) => {
                      return (
                        <div className="w-[97.8px] h-[32.6px] rounded-full border-2 border-[#FF7F1D] text-[#FF7F1D] text-[1.125rem] justify-center flex items-center pt-[3px]">
                          {tag}
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-[543px] h-[162px] text-[1rem] bg-[#F5F5F5] rounded-lg px-8 pt-6 relative">
                    {clubDetail?.data.clubContent}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[91px]  mt-4">
              {isOwner && onEdit ? (
                <>
                  <div className="flex">
                    <div className="w-[458px] h-[91px] mr-[70px] flex justify-center ">
                      <button className="w-[150px] h-[40px] bg-[#ff7f1d] text-white text-[1.25rem] font-semibold rounded-full ">
                        사진 추가하기
                      </button>
                    </div>
                    <div className="w-[543px] h-[91px] flex justify-center ">
                      <button className="w-[150px] h-[40px] bg-[#ff7f1d] text-white text-[1.25rem] font-semibold rounded-full">
                        수정하기
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex">
                    <div className="w-[458px] h-[91px] mr-[70px]"></div>
                    <div className="w-[543px] h-[91px] flex justify-center ">
                      {!isMember && (
                        <button
                          onClick={handleJoinClub}
                          className="w-[200px] h-[60px] bg-[#ff7f1d] text-white text-[1.25rem] font-semibold rounded-full"
                        >
                          가입하기
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* 모임규칙, 참여멤버 */}
        <section className="flex w-[1140px] h-auto justify-between mb-[91px]">
          <div className="w-[562px] h-auto ">
            <div className="text-[2rem] font-semibold">모임규칙</div>
            <div className="text-[1.25rem] h-[215px] bg-[#F5F5F5] rounded-xl mt-10 p-4">
              수정하기를 눌러 내용을 작성해주세요!
            </div>
          </div>
          <div className="w-[525px] h-[261px] ">
            <div className="flex justify-between">
              <div className="text-[2rem] font-semibold">참여멤버</div>
              <div>
                {memberPage > 0 && (
                  <button onClick={() => setMemberPage(memberPage - 1)}>
                    <img
                      alt="prev_button"
                      src={`${process.env.PUBLIC_URL}/images/prev_button.svg`}
                    />
                  </button>
                )}
                {memberPage < Math.ceil(memberList?.length / 8) - 1 && (
                  <button onClick={() => setMemberPage(memberPage + 1)}>
                    <img
                      alt="next_button"
                      src={`${process.env.PUBLIC_URL}/images/next_button.svg`}
                    />
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="flex justify-center w-full h-auto items-center overflow-hidden relative">
                <AnimatePresence custom={memberDirection}>
                  <motion.div
                    key={memberPage}
                    variants={varients}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={memberDirection}
                    transition={{ duration: 0.5 }}
                    className={`h-[200px] flex justify-center items-center w-full `}
                  >
                    <div
                      className={`${memberList?.length === 0
                          ? ""
                          : "grid grid-cols-4 grid-rows-2"
                        } justify-items-center gap-2 mt-10`}
                    >
                      {memberList?.length === 0 ? (
                        <EmptyState page="member" />
                      ) : (
                        memberList
                          ?.slice(memberPage * 8, memberPage * 8 + 8)
                          .map((member) => {
                            return (
                              <div className="w-[114px] h-[60px] flex gap-2 font-semibold items-center">
                                <div>
                                  <img
                                    className="w-[60px] h-[60px] rounded-full"
                                    src={member?.profilePictureUrl}
                                    alt="member_profile"
                                  />
                                </div>
                                <div>{member?.userNickname}</div>
                              </div>
                            );
                          })
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* 진행중인 이벤트 */}
        <section className="w-[1140px]">
          <body className="flex flex-col gap-4">
            <div className="flex justify-between gap-10">
              <div>
                <p className="text-[2rem] font-semibold">
                  진행중인 일상속 이벤트
                </p>
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
                {progressEventPage <
                  Math.ceil(progressEvents.length / 4) - 1 && (
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
                      className={`${progressEvents.length === 0 ? "" : "grid grid-cols-4"
                        } gap-x-4 gap-y-8 justify-items-center w-full`}
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
                                    isLikedByUser={item?.isLikedByUser}
                                  />
                                  {onEdit ? (
                                    <div className="w-full justify-between flex gap-2">
                                      <button className="w-[126px] h-[30px] rounded-full bg-[#ff7f1d] text-white text-[1.25rem] pt-[1px]">
                                        수정하기
                                      </button>
                                      <button
                                        className="w-[126px] h-[30px] rounded-full border-2 border-[#ff7f1d] bg-white text-[#ff7f1d] text-[1.25rem] pt-[1px]"
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
            <div className="w-full h-[91px]">
              {isOwner ? (
                <>
                  <div className="flex w-full h-full justify-end">
                    <CreateEventModal
                      id={id}
                      getClubEventLists={getClubEventLists}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </body>
        </section>

        {/* 이벤트 참여 후기 */}
        <section className="flex flex-col w-[1140px] h-auto ">
          <div className="flex justify-between items-center">
            <div className="text-[2rem] font-semibold">이벤트 참여후기</div>
            <div>
              {reviewPage > 0 && (
                <button onClick={() => setReviewPage(reviewPage - 1)}>
                  <img
                    alt="prev_button"
                    src={`${process.env.PUBLIC_URL}/images/prev_button.svg`}
                  />
                </button>
              )}
              {reviewPage < Math.ceil(reviewList?.length / 8) - 1 && (
                <button onClick={() => setReviewPage(reviewPage + 1)}>
                  <img
                    alt="next_button"
                    src={`${process.env.PUBLIC_URL}/images/next_button.svg`}
                  />
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-center w-full h-[300px] text-black items-start overflow-hidden relative mt-10">
            <AnimatePresence custom={reviewDirection}>
              <motion.div
                key={reviewPage}
                variants={varients}
                initial="enter"
                animate="center"
                exit="exit"
                custom={reviewDirection}
                transition={{ duration: 0.5 }}
                className={`h-full absolute flex  w-full `}
              >
                <div
                  className={`${reviewList?.length === 0
                      ? ""
                      : "grid grid-cols-3 grid-rows-2"
                    } w-full `}
                >
                  {reviewList?.length === 0 ? (
                    <EmptyState page="review" />
                  ) : (
                    reviewList
                      ?.slice(reviewPage * 6, reviewPage * 6 + 6)
                      .map((item) => {
                        return (
                          <ClubReviewCard eventReview={item} isOwner={isOwner} onEdit={onEdit} />
                        );
                      })
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <body className="flex flex-col gap-4 w-[1140px]">
          <p className="text-[2rem] font-semibold flex items-center">
            지난 일상속 이벤트
          </p>

          <div className="flex h-full justify-center items-center">
            <div className="flex justify-center w-full h-[308px] text-black items-start overflow-hidden relative">
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
                    className={`${endedEvents.length === 0
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
                              page="endedEvent"
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
          <div className="flex items-center justify-center">
            {isMember && !isOwner && (
              <div className="flex text-2xl justify-center items-center mt-10 bg-[#646464] text-white w-[224px] h-[60px]  py-2 rounded-full ">
                <button onClick={handleGoodbyeClub}>모임 탈퇴하기</button>
              </div>
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
      </div>
    </>
  );
}

let varients = {
  enter: (direction) => ({ x: direction * 700 }),
  center: { x: 0 },
  exit: (direction) => ({ x: direction * -700 }),
};

export default Detail;

import React, { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { deleteAPI, filePutAPI, getAPI, postAPI, putAPI } from "../axios";
import ClubEventCard from "../component/ClubEventCard";
import ClubReviewCard from "../component/ClubReviewCard";
import { latestClubState } from "../states/clubState";
import { AnimatePresence, motion } from "framer-motion";
import EmptyState from "../component/EmptyState";
import EndedClubEventCard from "../component/EndedClubEventCard";
import { isLoggedInState, userNicknameState } from "../states/userStateTmp";
import CreateEventModal from "../component/CreateEventModal";
import { reloadChatStates } from "../states/chatState";
import Modal from "react-modal";

import swal from "sweetalert";

function Detail() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  // eslint-disable-next-line
  const [clubMemberNicknameArr, setClubMemberNicknameArr] = useState([]);
  const [eventlists, setEventLists] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  // eslint-disable-next-line
  const [latestClub, setLatestClub] = useRecoilState(latestClubState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const navigate = useNavigate();
  const userNickname = useRecoilValue(userNicknameState);
  const [isMember, setIsMember] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [eventArr, setEventArr] = useState([]);
  const [eventReview, setEventReview] = useState([]);
  // eslint-disable-next-line
  const [reloadChatState, setReloadChatState] =
    useRecoilState(reloadChatStates);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [prevClubImages, setPrevClubImages] = useState([]);
  const [imageArr, setImageArr] = useState([]);
  const [onEditClubRule, setOnEditClubRule] = useState("");
  const [clubRule, setClubRule] = useState("");

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

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
    onSuccess: (res) => {
      setClubRule(res.data.clubRule);
    },
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

  useEffect(() => {
    if (clubDetail?.data?.clubImageUrlList) {
      setPrevClubImages(clubDetail.data.clubImageUrlList);
    }
  }, [clubDetail]);

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

  useEffect(() => {
    eventArr.map((item) =>
      getAPI(`/review?reviewType=EVENT&identifier=${item}`).then((res) => {
        setEventReview((pre) => [...pre, ...res.data.content]);
      })
    );
    //  console.log("eventReview",eventReview)
  }, [eventArr]);

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
          setReloadChatState(true);
          queryClient.invalidateQueries("getDetailClub");
          swal("가입이 승인됐습니다. 상단의 채팅방을 통해 소통해주세요!");
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
        setReloadChatState(true);
        queryClient.invalidateQueries("getDetailClub");
        swal("클럽 탈퇴 완료");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteClub = () => {
    deleteAPI(`/club/${id}/delete`)
      .then((res) => {
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
        setEventLists(res.data);

        let arr = [...res.data];
        let tmp = arr?.map((item) => item.id);
        setEventArr(tmp);
      })
      .catch((err) => {
        console.log(err);
        swal("목록을 가져오는 도중 문제가 발생했습니다.");
      });
  };

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

  // 멤버 리스트
  const memberList = clubDetail?.data.memberList;
  const reviewList = eventReview;
  const handleJoinEvent = (clubId, eventId, onJoinSuccess) => {
    postAPI(`/club/${clubId}/event/join/${eventId}`, {}).then((res) => {
      onJoinSuccess && onJoinSuccess();
      getAPI(`/club/${id}/eventlist`).then((res) => {
        setEventLists(res.data);
        swal("이벤트 참가 신청이 완료되었습니다!");
      });
    });
  };

  const handleLeaveEvent = (clubId, eventId, onLeaveSuccess) => {
    deleteAPI(`/club/${clubId}/event/join/${eventId}`).then((res) => {
      onLeaveSuccess && onLeaveSuccess();
      getAPI(`/club/${id}/eventlist`).then((res) => {
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

  // 사진 추가시
  const handleImageChange = async (e) => {
    // const formData = new FormData();
    const files = e.target.files;
    setImageArr((prev) => [...prev, ...files]);
    // // setImageArr([...imageArr, files])
    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i];
    //   formData.append("image", file);
    // }
    // console.log("추가할 이미지", files, formData);
    // setImageFormData(formData);
    // 로컬이미지 가져오기
    const addImageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    let newImageUrls = [...imageUrls, ...addImageUrls];
    setImageUrls(newImageUrls);
  };

  // 이미지 삭제
  const deleteImage = (index, image) => {
    setDeletedImages([...deletedImages, image]);

    const newClubImageList = [...prevClubImages];
    newClubImageList.splice(index, 1);
    setPrevClubImages(newClubImageList);
  };

  // 이미지 변경사항 서버에 보내기
  const handleSubmitChangeImage = () => {
    const formData = new FormData();
    const deleteImg = { deleteImage: deletedImages };
    imageArr.forEach((file) => {
      if (file) {
        formData.append("image", file);
      }
    });
    const blob = new Blob([JSON.stringify(deleteImg)], {
      type: "application/json",
    });
    formData.append("removeImageRequest", blob);
    filePutAPI(`/club/${id}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: [
        function () {
          return formData;
        },
      ],
    })
      .then((res) => {
        queryClient.invalidateQueries("getDetailClub");
      })
      .catch((error) => console.log(error));
    setDeletedImages([]);
    setImageUrls([]);
  };

  const handleClubRuleInput = (e) => {
    setClubRule(e.target.value);
  };

  const handleSubmitClubRule = () => {
    putAPI(`/club/${id}/rule`, { clubRule: clubRule }).then((res) => {
      queryClient.invalidateQueries("getDetailClub");
    });
  };

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
                <div className="w-[543px] min-h-[294px] h-auto mt-[16px]">
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
                        {clubDetail?.data.nowMemberCount}/
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
                  <div className="w-[543px] min-h-[162px] h-auto text-[1rem] bg-[#F5F5F5] rounded-lg px-8 pt-6 pb-2 relative">
                    <div>
                      {clubDetail?.data.clubContent
                        .split("\n")
                        .map((line, index) => {
                          return (
                            <span key={index}>
                              {line}
                              <br />
                            </span>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[91px]  mt-4">
              {isOwner && onEdit ? (
                <>
                  <div className="flex">
                    <div className="w-[458px] h-[91px] mr-[70px] flex justify-center items-start ">
                      <button
                        onClick={() => openModal()}
                        className="w-[150px] h-[40px] bg-[#ff7f1d] text-white text-[1.25rem] font-semibold rounded-full "
                      >
                        사진 추가하기
                      </button>
                      <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Create Club Modal"
                        style={{
                          overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.75)",
                            zIndex: 1000,
                          },
                          content: {
                            color: "black",
                            width: "600px",
                            height: "502px",
                            margin: "auto",
                            display: "flex",
                            flexDirection: "column",
                            // justifyContent: "between",
                            // alignItems: "center",
                            padding: "20px",
                            borderRadius: "10px",
                          },
                        }}
                      >
                        <div className="flex flex-col">
                          <div>기존 등록한 이미지</div>
                          <div className="grid grid-cols-4">
                            {prevClubImages.map((image, i) => {
                              return (
                                <div className="relative">
                                  <img
                                    className="w-[120px] h-[120px]"
                                    src={image}
                                    alt="club_image"
                                  />
                                  <div
                                    onClick={() => deleteImage(i, image)}
                                    className="absolute top-1 right-7 text-[#ff7f1d] font-semibold"
                                  >
                                    X
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div>새로 등록할 이미지</div>
                          <div className="flex flex-row justify-start items-start gap-3">
                            <>
                              <div
                                className="cursor-pointer flex flex-col justify-center items-center w-[120px] h-[120px] border-2 rounded-md p-2"
                                onClick={() =>
                                  document.getElementById("fileInput").click()
                                }
                              >
                                <div>
                                  {/* <img src="" /> */}
                                  <input
                                    id="fileInput"
                                    onChange={handleImageChange}
                                    type="file"
                                    className="hidden"
                                    multiple
                                  />
                                </div>
                                <div>{imageUrls.length}/4</div>
                              </div>
                            </>
                            {imageUrls.map((imageUrl, i) => (
                              <div key={i} className="relative">
                                <img
                                  className="w-[120px] h-[120px]"
                                  src={imageUrl}
                                  alt="이미지 미리보기"
                                />
                                <div
                                  onClick={() => {
                                    const updatedImageUrls = [...imageUrls];
                                    updatedImageUrls.splice(i, 1);
                                    setImageUrls(updatedImageUrls);
                                  }}
                                  className="cursor-pointer absolute top-0 right-2 text-xl text-black font-semibold"
                                >
                                  X
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-center gap-10">
                            <button
                              onClick={() => {
                                closeModal();
                              }}
                            >
                              이미지 변경 취소하기
                            </button>
                            <button
                              onClick={() => {
                                handleSubmitChangeImage();
                                closeModal();
                              }}
                            >
                              이미지 변경 완료
                            </button>
                          </div>
                        </div>
                      </Modal>
                    </div>
                    <div className="w-[543px] h-[91px] flex justify-center ">
                      <button
                        onClick={() => swal("아직 준비중인 기능입니다.")}
                        className="w-[150px] h-[40px] bg-[#ff7f1d] text-white text-[1.25rem] font-semibold rounded-full"
                      >
                        수정하기
                      </button>
                    </div>
                  </div>
                </>
              ) :
               (
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
            <div className="text-[2rem] font-semibold flex justify-between ">
              <div>모임 규칙</div>
              {onEdit ? (
                onEditClubRule ? (
                  <button
                    onClick={() => {
                      handleSubmitClubRule();
                      setOnEditClubRule(false);
                    }}
                    className="w-[150px] h-[40px] bg-[#ff7f1d] text-white text-[1.25rem] font-semibold rounded-full"
                  >
                    수정완료
                  </button>
                ) : (
                  <button
                    onClick={() => setOnEditClubRule(true)}
                    className="w-[150px] h-[40px] bg-[#ff7f1d] text-white text-[1.25rem] font-semibold rounded-full"
                  >
                    수정하기
                  </button>
                )
              ) : (
                <div></div>
              )}
            </div>
            {onEditClubRule ? (
              <textarea
                className="text-[1.25rem] h-[215px] w-full bg-[#F5F5F5] rounded-xl mt-10 p-4"
                value={clubRule}
                onChange={handleClubRuleInput}
              />
            ) : (
              <div className="text-[1.25rem] h-[215px] bg-[#F5F5F5] rounded-xl mt-10 p-4">
                {clubDetail?.data.clubRule.length === 0
                  ? "수정 버튼을 눌러 규칙을 작성해주세요!"
                  : clubDetail?.data.clubRule}
              </div>
            )}
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
                      className={`${
                        memberList?.length === 0
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
                              <div
                                onClick={() =>
                                  navigate(`/user/mypage/${member.userId}`)
                                }
                                className="cursor-pointer w-[114px] h-[60px] flex gap-2 font-semibold items-center"
                              >
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
                      className={`${
                        progressEvents.length === 0 ? "" : "grid grid-cols-4"
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
                                  <div className="flex justify-end relative">
                                    <img src={`${process.env.PUBLIC_URL}/images/toggle_edit_button.svg`}
                                    alt='toggle_event_edit_button'
                                    />
                                    <div className="absolute top-[36px] right-0 flex-col flex gap-2 z-20 bg-white justify-end border-[1px] rounded-[10px] items-center">
                                      <button className="w-[100px] h-[30px] text-black text-[1rem] pt-[1px] border-b-[1px]">
                                        수정하기
                                      </button>
                                      <button
                                        className="w-[100px] h-[30px] text-black text-[1rem] pt-[1px]"
                                        onClick={() =>
                                          handleDeleteEvent(id, item.id)
                                        }
                                      >
                                        삭제하기
                                      </button>

                                    </div>
                                  </div>
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
                  className={`${
                    reviewList?.length === 0
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
                          <ClubReviewCard
                            eventReview={item}
                            isOwner={isOwner}
                            onEdit={onEdit}
                          />
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

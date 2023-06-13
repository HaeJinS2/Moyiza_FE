import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getAPI, postAPI, deleteAPI } from "../axios";
import BodyContainer from "../component/BodyContainer";
import OnedayCard from "../component/OnedayCard";
import { userNicknameState } from "../states/userStateTmp";
import { AnimatePresence, motion } from "framer-motion";
import EmptyState from "../component/EmptyState";
import swal from "sweetalert";
function OnedayDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [onedayMemberNicknameArr, setOnedayMemberNicknameArr] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const userNickname = useRecoilValue(userNicknameState);
  const [onedayMember, setOnedayMember] = useState([]);
  const [isMember, setIsMember] = useState(false);
  // eslint-disable-next-line
  const [isOwner, setIsOwner] = useState(false);
  const [filteredOnedayList, setFilteredOnedayList] = useState([]);
  // 멤버 페이지 관리
  const [memberPage, setMemberPage] = useState(0);
  const [memberTuple, setMemberTuple] = useState([null, memberPage]);
  if (memberTuple[1] !== memberPage) {
    setMemberTuple([memberTuple[1], memberPage]);
  }
  let memberPrev = memberTuple[0];
  let memberDirection = memberPage > memberPrev ? 1 : -1;

  // 비슷한 원데이 관리
  const [similarOnedayPage, setSimilarOnedayPage] = useState(0);
  const [similarOnedayTuple, setSimilarOnedayTuple] = useState([
    null,
    similarOnedayPage,
  ]);
  if (similarOnedayTuple[1] !== similarOnedayPage) {
    setSimilarOnedayTuple([similarOnedayTuple[1], similarOnedayPage]);
  }
  let similarOnedayPrev = similarOnedayTuple[0];
  let similarOnedayDirection = similarOnedayPage > similarOnedayPrev ? 1 : -1;

  // 원데이 상세조회
  const {
    isLoading,
    isError,
    data: onedayDetail,
  } = useQuery("getOnedayDetail", () => getAPI(`/oneday/${id}`), {
    refetchOnWindowFocus: false, // refetchOnWindowFocus 옵션을 false로 설정
  });

  // isOwner의 상태 관리
  // useEffect(() => {
  //   if (onedayDetail && onedayDetail.data) {
  //     if (userNickname.userNickname === onedayDetail.data.ownerNickname) {
  //       setIsOwner(true);
  //     } else {
  //       setIsOwner(false);
  //     }
  //   }
  // }, [onedayDetail, userNickname]);

  // 원데이 멤버 가져오는 코드
  useEffect(() => {
    getOnedayMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNickname]);

  const getOnedayMembers = () => {
    getAPI(`/oneday/${id}`).then((res) => {
      const onedayMember = res.data.oneDayMemberResponseList;
      setOnedayMember(onedayMember);
      setOnedayMemberNicknameArr(
        onedayMember?.map((member) => member.userNickName)
      );
      if (
        onedayMember
          ?.map((member) => member.userNickname)
          .includes(userNickname.userNickname)
      ) {
        setIsMember(true);
      }
    });
  };

  console.log(isMember);
  console.log(onedayDetail?.data);
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

  console.log(onedayMemberNicknameArr);
  console.log(onedayMember);

  const oneDayStartTime = new Date(onedayDetail?.data.oneDayStartTime);
  let month = oneDayStartTime.getMonth() + 1;
  let date = oneDayStartTime.getDate();
  let hours = oneDayStartTime.getHours();
  let minutes = oneDayStartTime.getMinutes();

  const handleDeleteOneday = () => {
    deleteAPI(`/oneday/${id}`)
      .then((res) => {
        console.log(res.data.message);
        swal("하루속 삭제 완료");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleJoinOneday = () => {
    postAPI(`/oneday/${id}/join`, {})
      .then((res) => {
        setIsMember(true);
        getAPI(`/oneday/${id}`).then((res) => {
          console.log(res.data.message);
          swal("하루속 가입이 승인됐습니다!");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleQuitOneday = () => {
    deleteAPI(`/oneday/${id}/join`, {})
      .then((res) => {
        getAPI(`/oneday/${id}`).then((res) => {
          console.log(res.data.message);
          swal("하루속 탈퇴가 승인됐습니다!");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchFilteredOnedayList = async () => {
      if (!onedayDetail) return; // onedayDetail이 없는 경우 아무 것도 하지 않습니다.

      try {
        getAPI(`/oneday/search?q=&category=${onedayDetail.data.category}`).then(
          (res) => {
            setFilteredOnedayList(res.data.content);
          }
        );
      } catch (err) {
        setFilteredOnedayList([]);
      }
    };

    fetchFilteredOnedayList();
  }, [onedayDetail]);

  console.log(filteredOnedayList);

  return (
    <>
      <div ref={divRef} />
      <BodyContainer>
        <div className="flex pt-40 flex-col justify-center items-center gap-10 mb-10">
          <div className="flex justify-between w-[1200px] items-center">
            <button onClick={() => navigate(-1)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/prev_button.svg`}
                alt="previous_button"
              />
            </button>
            <div className="font-bold text-[2rem]">
              {onedayDetail?.data.oneDayTitle}
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
          <div className="self-end">
            {onEdit && (
              <button
                onClick={handleDeleteOneday}
                className=" text-white bg-rose-400 px-2 py-1 rounded-full fixed top-32 sm:right-20 md:right-32 lg:right-60 xl:right-80"
              >
                모임 삭제
              </button>
            )}
          </div>
          <div>
            <div className="aspect-square flex w-full h-full justify-center items-center  overflow-hidden rounded-xl my-4">
              <img
                className="rounded-md w-[219px] h-[219px] object-fill"
                src={onedayDetail?.data.imageList[0]}
                alt="oneday_thumbnail"
              />
            </div>
            <div className="flex justify-center gap-20">
              {/* 원데이 태그가 아직 수정되지 않아서 출력하지 못함 */}
              {/* {onedayDetail?.data.oneDayTag.map((item) => {
                return (
                  <>
                    <div className="flex font-semibold  cursor-default items-center justify-center text-orange-400 text-xl border-orange-400 border-2 px-2 pt-[4px] rounded-full h-[35px]">
                      {item}
                    </div>
                  </>
                );
              })} */}
            </div>
            <div className="flex justify-center">
              {isMember ? (
                <div className="flex  text-2xl  justify-center items-center mt-10 bg-green-500 text-white w-[224px] h-[60px]  py-2 rounded-full ">
                  <button onClick={handleQuitOneday}>모임 탈퇴하기</button>
                </div>
              ) : (
                <div className="flex text-2xl justify-center items-center mt-10 bg-green-500 text-white w-[224px] h-[60px] py-2 rounded-full">
                  <button onClick={handleJoinOneday}>모임 가입하기</button>
                </div>
              )}
            </div>
          </div>
          <div className="flex w-[1080px] rounded-2xl h-[137px] bg-neutral-100 py-4 items-center justify-center">
            <div className="w-1/6 flex flex-col justify-center items-center gap-2 font-sans text-xl">
              <img
                src={`${process.env.PUBLIC_URL}/images/oneday/oneday_calender.svg`}
                alt="oneday_start_time"
              />
              {month}.{date}
            </div>
            <div className="w-1/6 flex flex-col justify-center items-center gap-2 font-sans text-xl border-x-4 h-4/5">
              <img
                src={`${process.env.PUBLIC_URL}/images/oneday/oneday_clock.svg`}
                alt="oneday_start_time"
              />
              {hours >= 12 ? "오후 " : "오전 "}
              {hours >= 12 ? hours - 12 : hours}시 {minutes}분
            </div>
            <div className="w-1/6 flex flex-col justify-center items-center gap-2 font-sans text-xl">
              <img
                src={`${process.env.PUBLIC_URL}/images/oneday/oneday_location.svg`}
                alt="oneday_location"
              />
              {onedayDetail?.data.oneDayLocation.split(" ")[0] === "서울특별시"
                ? onedayDetail?.data.oneDayLocation.split(" ")[1]
                : onedayDetail?.data.oneDayLocation.split(" ")[0]}
            </div>
            <div className="w-1/6 flex flex-col justify-center items-center gap-2 font-sans text-xl border-x-4 h-4/5">
              <img
                src={`${process.env.PUBLIC_URL}/images/oneday/oneday_gender.svg`}
                alt="oneday_location"
              />
              남, 녀
            </div>
            <div className="w-1/6 flex flex-col justify-center items-center gap-1 font-sans text-xl border-r-4 h-4/5">
              <div className="w-[36px] h-[36px] flex justify-center items-center">
                Age
              </div>
              <div> 30세 이상</div>
            </div>
            <div className="w-1/6 flex flex-col justify-center items-center gap-2 font-sans text-xl">
              <img
                src={`${process.env.PUBLIC_URL}/images/oneday/oneday_people.svg`}
                alt="oneday_attendant_state"
              />
              {onedayDetail?.data.oneDayAttendantListSize}/
              {onedayDetail?.data.oneDayGroupSize}
            </div>
          </div>
          <div className="flex w-[1080px] justify-center items-center h-[237px] bg-neutral-100 rounded-2xl pr-10">
            <p className="text-black">{onedayDetail?.data.oneDayContent}</p>
          </div>
          <div className="flex justify-between w-[1140px]">
            <div className="font-sans text-2xl font-semibold">참여멤버</div>
            <div className="flex gap-4 ">
              {memberPage > 0 && (
                <button onClick={() => setMemberPage(memberPage - 1)}>
                  <img
                    alt="prev_button"
                    src={`${process.env.PUBLIC_URL}/images/prev_button.svg`}
                  />
                </button>
              )}
              {memberPage < Math.ceil(onedayMember?.length / 5) - 1 && (
                <button onClick={() => setMemberPage(memberPage + 1)}>
                  <img
                    alt="next_button"
                    src={`${process.env.PUBLIC_URL}/images/next_button.svg`}
                  />
                </button>
              )}
            </div>
          </div>
          <div className="flex h-full w-[1140px] justify-center items-center">
            <div className="flex justify-center w-[1140px] h-[100px] text-black items-center overflow-hidden relative ">
              <AnimatePresence custom={memberDirection}>
                <motion.div
                  key={memberPage}
                  variants={varients}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={memberDirection}
                  transition={{ duration: 0.5 }}
                  className={`h-[90px] flex absolute justify-center items-center w-[1140px] `}
                >
                  <div
                    className={`${
                      onedayMember?.length === 0 ? "" : "grid grid-cols-5"
                    } w-full gap-16`}
                  >
                    {onedayMember?.length === 0 ? (
                      <EmptyState page="onedayDetail" />
                    ) : (
                      onedayMember
                        ?.slice(memberPage * 5, memberPage * 5 + 5)
                        .map((member, i) => {
                          return (
                            <>
                              <div
                                key={i}
                                className="flex justify-center items-center gap-5"
                              >
                                <img
                                  className="w-[80px] h-[80px] bg-rose-400 rounded-full "
                                  src={member.profilePictureUrl}
                                  alt="profile_image"
                                />
                                <div className="]">{member.userNickname}</div>
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

          <div className="flex justify-between items-center w-[1140px]">
            <div className="font-sans text-2xl font-semibold">
              비슷한 하루속 이벤트
            </div>
            <div className="flex justify-center gap-10">
              {similarOnedayPage > 0 && (
                <button
                  onClick={() => setSimilarOnedayPage(similarOnedayPage - 1)}
                >
                  <img
                    alt="prev_button"
                    src={`${process.env.PUBLIC_URL}/images/prev_button.svg`}
                  />
                </button>
              )}
              {similarOnedayPage <
                Math.ceil(filteredOnedayList?.length / 2) - 1 && (
                <button
                  onClick={() => setSimilarOnedayPage(similarOnedayPage + 1)}
                >
                  <img
                    alt="next_button"
                    src={`${process.env.PUBLIC_URL}/images/next_button.svg`}
                  />
                </button>
              )}
            </div>
          </div>
          <div className="flex w-full h-full justify-center items-center">
            <div className="flex justify-center w-[1140px] h-[300px] text-black items-center overflow-hidden relative ">
              <AnimatePresence custom={similarOnedayDirection}>
                <motion.div
                  key={similarOnedayPage}
                  variants={varients}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={similarOnedayDirection}
                  transition={{ duration: 0.5 }}
                  className={`h-[260px] absolute flex justify-center items-center w-full `}
                >
                  <div
                    className={`${
                      filteredOnedayList?.length === 0 ? "" : "grid grid-cols-2"
                    } w-full gap-4 `}
                  >
                    {filteredOnedayList.length === 0 ? (
                      <EmptyState page="onedayDetail" />
                    ) : (
                      filteredOnedayList
                        ?.slice(
                          similarOnedayPage * 2,
                          similarOnedayPage * 2 + 2
                        )
                        .map((item, i) => {
                          return (
                            <OnedayCard
                              key={i}
                              id={item.onedayId}
                              thumbnail={item.thumbnailUrl}
                              title={item.onedayTitle}
                              tag={item.onedayTag}
                              size={item.onedayGroupSize}
                              attendantsNum={item.onedayAttendantsNum}
                            />
                          );
                        })
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </BodyContainer>
    </>
  );
}

let varients = {
  enter: (direction) => ({ x: direction * 700 }),
  center: { x: 0 },
  exit: (direction) => ({ x: direction * -700 }),
};

export default OnedayDetail;

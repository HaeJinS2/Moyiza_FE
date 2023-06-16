import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getAPI, postAPI, deleteAPI } from "../axios";
import OnedayCard from "../component/OnedayCard";
import { isLoggedInState, userNicknameState } from "../states/userStateTmp";
import { AnimatePresence, motion } from "framer-motion";
import EmptyState from "../component/EmptyState";
import { useQueryClient } from "react-query";

import swal from "sweetalert";
function OnedayDetail() {
  const queryClient = useQueryClient();

  const { id } = useParams();
  const navigate = useNavigate();
  const [onedayMemberNicknameArr, setOnedayMemberNicknameArr] = useState([]);
  const isLoggedIn = useRecoilValue(isLoggedInState);

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

  useEffect(() => {
    queryClient.refetchQueries("getOnedayDetail");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMember]);

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
  }, [userNickname, isMember]);

  const getOnedayMembers = () => {
    getAPI(`/oneday/${id}`).then((res) => {
      const onedayMember = res.data.memberResponseList;
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
  console.log(onedayMember);
  console.log(isMember);
  console.log("원데이", onedayDetail?.data);
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

  const oneDayStartTime = new Date(onedayDetail?.data.oneDayStartTime);
  let month = oneDayStartTime.getMonth() + 1;
  let date = oneDayStartTime.getDate();
  let hours = oneDayStartTime.getHours();
  // let minutes = oneDayStartTime.getMinutes();

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
    if (isLoggedIn) {
      if (
        onedayDetail.data.oneDayGroupSize ===
        onedayDetail.data.oneDayAttendantListSize
      ) {
        swal("더이상 가입할 수 없습니다!");
      } else {
        postAPI(`/oneday/${id}/join`, {})
          .then((res) => {
            setIsMember(true);
            getAPI(`/oneday/${id}`).then((res) => {
              swal("하루속 가입이 승인됐습니다!");
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      swal("로그인이 필요한 기능입니다.");
      navigate("/login");
    }
  };

  const handleQuitOneday = () => {
    deleteAPI(`/oneday/${id}/join`, {})
      .then((res) => {
        setIsMember(false);
        getAPI(`/oneday/${id}`).then((res) => {
          console.log(res.data.message);
          swal("모임에서 탈퇴했습니다!");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchFilteredOnedayList = async () => {
      if (!onedayDetail) return;
      getAPI(`/oneday/search?q=&category=${onedayDetail.data.category}`)
        .then((res) => {
          const filteredContent = res.data.content.filter(
            (oneday) => oneday.onedayId !== parseInt(id)
          );
          setFilteredOnedayList(filteredContent);
        })
        .catch((err) => setFilteredOnedayList([]));
    };

    fetchFilteredOnedayList();
  }, [onedayDetail, id]);

  console.log(filteredOnedayList);

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
                {onedayDetail?.data.oneDayTitle}
              </div>
              {isOwner ? (
                onEdit ? (
                  <button onClick={() => setOnEdit(false)}>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/oneday_onEdit.svg`}
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
                  src={onedayDetail?.data.imageList[0]}
                  alt="club_main"
                />
              </div>
              <div>
                <div className="w-[548px] h-[294px] mt-[16px]">
                  <div className="flex justify-center mb-[20px]">
                    <div className="flex flex-col justify-center items-center w-[91px] h-[59px]">
                      <div>
                        <img
                          className="w-[30px] h-[30px]"
                          alt="detail_calender"
                          src={`${process.env.PUBLIC_URL}/images/detail/detail_calender.svg`}
                        />
                      </div>
                      <div className="flex justify-center text-[1rem]">
                        {month}.{date}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-[91px] h-[59px] border-x-2">
                      <div>
                        <img
                          className="w-[30px] h-[30px]"
                          alt="detail_clock"
                          src={`${process.env.PUBLIC_URL}/images/detail/detail_clock.svg`}
                        />
                      </div>
                      <div className="flex justify-center text-[1rem]">
                        {hours >= 12
                          ? hours === 12
                            ? "오후 12시"
                            : `오후 ${hours - 12}시`
                          : `오전 ${hours}시`}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-[91px] h-[59px] border-r-2">
                      <div>
                        <img
                          className="w-[30px] h-[30px]"
                          alt="detail_location"
                          src={`${process.env.PUBLIC_URL}/images/detail/detail_location.svg`}
                        />
                      </div>
                      <div className="flex justify-center text-[1rem]">
                        {onedayDetail?.data?.oneDayLocation.split(" ")[0] ===
                        "서울"
                          ? onedayDetail?.data?.oneDayLocation.split(" ")[1]
                          : onedayDetail?.data?.oneDayLocation.split(" ")[0]}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-[91px] h-[59px]">
                      <div>
                        <img
                          className="w-[30px] h-[30px]"
                          alt="club_detail_gender"
                          src={`${process.env.PUBLIC_URL}/images/detail/club_detail_gender.svg`}
                        />
                      </div>
                      <div className="flex justify-center text-[1rem]">
                        {onedayDetail?.data.genderPolicy}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center border-x-2 w-[91px] h-[59px]">
                      <div className="flex justify-center text-[1.25rem]">
                        Age
                      </div>
                      <div className="flex justify-center text-[1rem] w-full">
                        {onedayDetail?.data.agePolicy}세
                      </div>
                    </div>
                    <div className="flex flex-col  justify-center items-center w-[91px] h-[59px]">
                      <div>
                        <img
                          className="w-[30px] h-[30px]"
                          src={`${process.env.PUBLIC_URL}/images/detail/club_detail_people.svg`}
                          alt="club_detail_people"
                        />
                      </div>
                      <div className="flex justify-center text-[1rem]">
                        {onedayDetail?.data.oneDayAttendantListSize}/
                        {onedayDetail?.data.oneDayGroupSize}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mb-[20px] gap-4">
                    {onedayDetail?.data.tagString.map((tag) => {
                      return (
                        <div className="w-[97.8px] h-[32.6px] rounded-full border-2 border-[#0AB159] text-[#0AB159] text-[1.125rem] justify-center flex items-center pt-[3px]">
                          {tag}
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-[543px] h-[162px] text-[1rem] bg-[#F5F5F5] rounded-lg px-8 pt-6 relative">
                    {onedayDetail?.data.oneDayContent}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[91px] mt-4">
              {isOwner && onEdit ? (
                <>
                  <div className="flex">
                    <div className="w-[458px] h-[91px] mr-[70px] flex justify-center">
                      <button className="w-[120px] h-[40px] bg-[#0AB159] text-white text-[1.25rem] font-semibold rounded-full">
                        수정하기
                      </button>
                    </div>
                    <div className="w-[543px] h-[91px] flex justify-center ">
                      <button className="w-[120px] h-[40px] bg-[#0AB159] text-white text-[1.25rem] font-semibold rounded-full">
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
                          onClick={handleJoinOneday}
                          className="w-[200px] h-[60px] bg-[#0AB159] text-white text-[1.25rem] font-semibold rounded-full"
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

        {/* 참여멤버 */}
        <section className="flex flex-col w-[1140px] h-auto justify-between">
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
              {memberPage < Math.ceil(onedayMember?.length / 6) - 1 && (
                <button onClick={() => setMemberPage(memberPage + 1)}>
                  <img
                    alt="next_button"
                    src={`${process.env.PUBLIC_URL}/images/next_button.svg`}
                  />
                </button>
              )}
            </div>
          </div>
          <div className="flex w-full h-full justify-center items-center">
            <div className="flex justify-center w-[1140px] h-[186px] text-black items-center overflow-hidden relative ">
              <AnimatePresence custom={memberDirection}>
                <motion.div
                  key={memberPage}
                  variants={varients}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={memberDirection}
                  transition={{ duration: 0.5 }}
                  className={`h-[80px] absolute flex justify-center items-center w-full `}
                >
                  <div
                    className={`${
                      onedayMember?.length === 0 ? "" : "grid grid-cols-6"
                    } w-full gap-4 `}
                  >
                    {onedayMember.length === 0 ? (
                      <EmptyState page="onedayDetail" />
                    ) : (
                      onedayMember
                        ?.slice(memberPage * 6, memberPage * 6 + 6)
                        .map((member, i) => {
                          return (
                            <div className="flex gap-5 items-center">
                              <img
                                className="w-[80px] h-[80px] rounded-full"
                                src={member.profilePictureUrl}
                                alt="oneday_member"
                              />
                              <p>{member.userNickname}</p>
                            </div>
                          );
                        })
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 비슷한 하루속 이벤트 */}
        <section>
          <div className="flex justify-between items-center w-[1140px]">
            <div className="text-[2rem] font-semibold">
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
        </section>
        <div className="flex items-center justify-center">
          {isMember && !isOwner && (
            <div className="flex text-2xl justify-center items-center mt-10 bg-[#646464] text-white w-[224px] h-[60px]  py-2 rounded-full ">
              <button onClick={handleQuitOneday}>모임 탈퇴하기</button>
            </div>
          )}
        </div>

        <div className="flex justify-center pb-20">
          {onEdit && (
            <button
              onClick={handleDeleteOneday}
              className=" text-white text-2xl bg-[#646464] w-[224px] h-[60px] px-2 py-1 rounded-full"
            >
              모임 삭제
            </button>
          )}
        </div>
      </div>
    </>
  );
}

let varients = {
  enter: (direction) => ({ x: direction * 700 }),
  center: { x: 0 },
  exit: (direction) => ({ x: direction * -700 }),
};

export default OnedayDetail;

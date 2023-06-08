import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getAPI } from "../axios";
import BodyContainer from "../component/BodyContainer";
import OnedayCard from "../component/OnedayCard";
// import ClubReviewCard from "../component/ClubReviewCard";
import { userNicknameState } from "../states/userStateTmp";

function OnedayDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [onedayMemberNicknameArr, setOnedayMemberNicknameArr] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  // const [latestClub, setLatestClub] = useRecoilState(latestClubState);
  const userNickname = useRecoilValue(userNicknameState);
  const [isMember, setIsMember] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  // 원데이 상세조회
  const {
    isLoading,
    isError,
    data: onedayDetail,
  } = useQuery("getOnedayDetail", () => getAPI(`/oneday/${id}`), {
    refetchOnWindowFocus: false, // refetchOnWindowFocus 옵션을 false로 설정
  });

  // isOwner의 상태 관리
  useEffect(() => {
    if (onedayDetail && onedayDetail.data) {
      if (userNickname.userNickname === onedayDetail.data.ownerNickname) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    }
  }, [onedayDetail, userNickname]);

  // 원데이 멤버 가져오는 코드
  useEffect(() => {
    getOnedayMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNickname]);

  const getOnedayMembers = () => {
    getAPI(`/oneday/${id}`).then((res) => {
      const onedayMember = res.data.oneDayAttendantList;
      setOnedayMemberNicknameArr(
        onedayMember.map((member) => member.userNickname)
      );
      if (
        onedayMember
          .map((member) => member.userNickname)
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

  return (
    <>
      <div ref={divRef} />
      <BodyContainer>
        <div className="flex pt-40 flex-col justify-center items-center relative gap-10 mb-10">
          <div className="flex justify-between w-full items-center">
            <button onClick={() => navigate(-1)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/prev_button.svg`}
                alt="previous_button"
              />
            </button>
            <div className="font-bold text-2xl">
              {onedayDetail?.data.clubTitle}
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
              <button className=" text-white bg-rose-400 px-2 py-1 rounded-full fixed top-32 sm:right-20 md:right-32 lg:right-60 xl:right-80">
                모임 삭제
              </button>
            )}
          </div>
          <div>
            <div className="aspect-square flex w-full h-full justify-center items-center relative overflow-hidden rounded-xl my-4">
              <img
                className="rounded-md w-[219px] h-[219px] object-fill"
                src={onedayDetail?.data.thumbnailUrl}
                alt="clubThumbnail"
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
                <div className="flex  text-2xl  justify-center items-center mt-10 bg-green-400 text-white w-[224px] h-[60px]  py-2 rounded-full ">
                  <button>모임 탈퇴하기</button>
                </div>
              ) : (
                <div className="flex text-2xl justify-center items-center mt-10 bg-green-400 text-white w-[224px] h-[60px] py-2 rounded-full">
                  <button>모임 가입하기</button>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-around w-full">
            <div>날짜</div>
            <div>시간</div>
            <div>장소</div>
            <div>남여</div>
            <div>나이</div>
            <div>참여자</div>
          </div>
          <div className="flex justify-between items-center w-full h-[237px] bg-neutral-200 rounded-2xl pr-10">
            <p className="text-black text-7xl">{onedayDetail?.clubContent}</p>
          </div>
          <div className="flex justify-between w-full">
            <div>참여멤버</div>
            <div className="flex gap-4">
              <div>이전버튼</div>
              <div>다음버튼</div>
            </div>
          </div>
          <div className="grid grid-cols-5 w-full">
            <div className="flex gap-4">
              <div>참여자 아이디</div>
              <div>참여자 프로필</div>
            </div>
            <div className="flex gap-4">
              <div>참여자 아이디</div>
              <div>참여자 프로필</div>
            </div>
            <div className="flex gap-4">
              <div>참여자 아이디</div>
              <div>참여자 프로필</div>
            </div>
            <div className="flex gap-4">
              <div>참여자 아이디</div>
              <div>참여자 프로필</div>
            </div>
            <div className="flex gap-4">
              <div>참여자 아이디</div>
              <div>참여자 프로필</div>
            </div>
          </div>

          <div className="flex justify-between w-full">
            <div>비슷한 하루</div>
            <div className="flex gap-4">
              <div>이전버튼</div>
              <div>다음버튼</div>
            </div>
          </div>
          <div className="grid grid-cols-2 w-full">
            <OnedayCard />
            <OnedayCard />
          </div>
        </div>
      </BodyContainer>
    </>
  );
}

export default OnedayDetail;

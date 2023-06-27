import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { searchState } from "../states/searchState";
import Fade from "react-reveal/Fade";
import { motion } from "framer-motion";

import BodyContainer from "../component/BodyContainer";
import ClubCard from "../component/ClubCard";
import Container from "../component/Container";
import EmptyState from "../component/EmptyState";
let pageTabs = ["일상속", "하루속"];

function Search() {
  const searchList = useRecoilValue(searchState);
  const [activePageTab, setActivePageTab] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <BodyContainer>
          <div className="flex gap-10 pt-40">
            {pageTabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => {
                  setActivePageTab(tab);
                  i === 0 ? navigate("/club") : navigate("/oneday");
                }}
                className={`${
                  activePageTab === tab ? "text-black" : "hover:opacity-50"
                } relative rounded-full px-3 py-1.5 text-sm font-medium text-black outline-2 transition focus-visible:outline`}
              >
                {activePageTab === tab && (
                  <motion.div
                    layoutId="active-pㅇㅇㅇㅇㅇㅇㅇㅇㅇill-1"
                    transition={{ type: "spring", duration: 0.5 }}
                    className="border-b-[4px] border-black absolute inset-0"
                  />
                )}
                <span className="relative text-base z-10 mix-blend">{tab}</span>
              </button>
            ))}
          </div>
        </BodyContainer>
        <div className="flex flex-col justify-center items-center">
          <section className="h-auto min-w-[1280px] border-[1px] justify-center items-center bg-[#FFFBF8] pt-10 rounded-t-[100px] mt-10 z-10">
            <div className="flex justify-between items-center my-10 px-20">
              <p className="text-3xl font-semibold">일상속 검색결과</p>
              <button></button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <body className="flex flex-col">
                <div className="flex flex-col justify-between">
                  <div
                    className={`grid ${
                      searchList.searchedClubList.length === 0
                        ? ""
                        : "grid-cols-2"
                    }  gap-x-4 gap-y-4 pb-6 `}
                  >
                    {searchList.searchedClubList === 0 ? (
                      <EmptyState showReset page="club" />
                    ) : searchList.searchedClubList ? (
                      searchList.searchedClubList?.map((item, i) => {
                        return (
                          <Fade bottom>
                            <ClubCard
                              page="club"
                              key={i}
                              title={item.clubTitle}
                              content={item.clubContent}
                              tag={item.clubTag}
                              thumbnail={item.imageUrlList[0]}
                              id={item.club_id}
                              maxGroupSize={item.maxGroupSize}
                              nowMemberCount={item.nowMemberCount}
                              imageList={item.imageUrlList}
                            />
                          </Fade>
                        );
                      })
                    ) : (
                      searchList.searchedClubList?.map((item, i) => {
                        return (
                          <Fade bottom>
                            <ClubCard
                              page="club"
                              key={i}
                              title={item.clubTitle}
                              content={item.clubContent}
                              tag={item.clubTag}
                              thumbnail={item.imageUrlList[0]}
                              id={item.club_id}
                              eventId={item.id}
                              maxGroupSize={item.maxGroupSize}
                              nowMemberCount={item.nowMemberCount}
                              imageList={item.imageUrlList}
                            />
                          </Fade>
                        );
                      })
                    )}
                  </div>
                </div>
                <div className="flex justify-center mt-10  pb-10">
                  {/* <button
                    className="bg-orange-400 text-white px-3 py-2 rounded-full"
                  >
                    더 보기
                  </button> */}
                </div>
              </body>
            </div>

            <div className="flex justify-between items-center my-10 px-20">
              <p className="text-3xl font-semibold">하루속 검색결과</p>
              <button></button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <body className="flex flex-col">
                <div className="flex flex-col justify-between">
                  <div
                    className={`grid ${
                      searchList.searchedOnedayList.length === 0
                        ? ""
                        : "grid-cols-2"
                    }  gap-x-4 gap-y-4 pb-6 `}
                  >
                    {searchList.searchedOnedayList === 0 ? (
                      <EmptyState showReset page="club" />
                    ) : searchList.searchedOnedayList ? (
                      searchList.searchedOnedayList?.map((item, i) => {
                        return (
                          <Fade bottom>
                            <ClubCard
                              key={i}
                              title={item.onedayTitle}
                              content={item.onedayContent}
                              tag={item.onedayTag}
                              thumbnail={item.imageUrlList[0]}
                              id={item.onedayId}
                              maxGroupSize={item.onedayGroupSize}
                              nowMemberCount={item.onedayAttendantsNum}
                              imageList={item.imageUrlList}

                            />
                          </Fade>
                        );
                      })
                    ) : (
                      searchList.searchedOnedayList?.map((item, i) => {
                        return (
                          <Fade bottom>
                            <ClubCard
                              key={i}
                              title={item.onedayTitle}
                              content={item.onedayContent}
                              tag={item.onedayTag}
                              thumbnail={item.imageUrlList[0]}
                              id={item.onedayId}
                              maxGroupSize={item.onedayGroupSize}
                              nowMemberCount={item.onedayAttendantsNum}
                              imageList={item.imageUrlList}

                            />
                          </Fade>
                        );
                      })
                    )}
                  </div>
                </div>
                <div className="flex justify-center mt-10  pb-10">
                  {/* <button
                    className="bg-green-500 text-white px-3 py-2 rounded-full"
                  >
                    더 보기
                  </button> */}
                </div>
              </body>
            </div>
          </section>

          <section>
            <div className="min-w-[1280px] flex flex-col bg-[#FFF5BD] items-center gap-4 justify-center h-[228px]">
              {/* <div className="fixed z-100 bottom-16 flex justify-center items-center mt-10 bg-orange-400 text-white w-[130px] py-2 rounded-lg"> */}
              <p className="text-[28px] font-semibold">
                내가 찾는 모임이 없다면?
              </p>
              <div 
              onClick={() => navigate('/create-feed')}
              className="cursor-pointer text-[#FF7F1D] text-xl flex gap-1 items-center">
                <p> 모임 만들러가기 </p>
                <img
                  className="w-[20px] h-[20px]"
                  src={`${process.env.PUBLIC_URL}/images/club/arrow_orange.png`}
                  alt='to_create_feed'
                />
              </div>
              {/* </div> */}
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}

export default Search;

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Fade from "react-reveal/Fade";

import BodyContainer from "../component/BodyContainer";
import ClubCard from "../component/ClubCard";
import Navbar from "../component/Navbar";
// import ReviewCard from "../component/ReviewCard";
import CreateClub from "./CreateClub";
import { getAPI } from "../axios";
import { useRecoilState } from "recoil";
import Loading from "../component/Loading";
import { isLoadingState } from "../states/clubState";
import EmptyState from "../component/EmptyState";
import Footer from "../component/Footer";
import { logEvent } from "../utils/amplitude";
import { useNavigate } from "react-router-dom";
import RecommendCard from "../component/RecommendCard";
import { useQueries } from "react-query";

let pageTabs = ["일상속", "하루속"];

function Oneday() {
  const [activeTab, setActiveTab] = useState("전체");
  const [activePageTab, setActivePageTab] = useState(pageTabs[1]);

  const [page, setPage] = useState(0);
  // const [club, setClub] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  // const [categories, setCategories] = useState(null);
  const [onedayData, setOnedayData] = useState([]);

  const [queryResults1, queryResults2] = useQueries(
    [
      {
        queryKey: "categories",
        queryFn: () => getAPI("/enums"),
      },
      {
        queryKey: ["club", page],
        queryFn: () => getAPI(`/club?page=0&size=8&sort=createdAt,DESC`),
        onSuccess: (data) => {
          setFilteredClubList(data?.data?.content);
        },
      },
      {
        queryKey: ["oneday", onedayData],
        queryFn: () => getAPI(`/oneday`),
        onSuccess: (data) => {
          setOnedayData(data?.data?.content);
        },
      },
    ],
    {
      // waitFor 옵션을 사용하여 모든 쿼리가 로딩될 때까지 기다림
      waitFor: "all",
    }
  );

  console.log("onedayData", onedayData);
  const [filteredClubList, setFilteredClubList] = useState([]);
  //   const res1 = queryResults[0];
  //   const res2 = queryResults[1];
  // console.log("res1", res1)
  // console.log("res2", res2)
  const divRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    // 클럽 목록을 받아오는 코드
    // getAPI(`/club?page=${page}&size=8&sort=createdAt,DESC`).then((res) => {
    //   setClub([...club, ...res.data.content]);
    //   setFilteredClubList([...club, ...res.data.content]);
    // });

    // 클럽 전체 페이지를 가져오는 코드
    getAPI("/club").then((res) => setTotalPages(res.data.totalPages));
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    getAPI(`/oneday`).then((res) => {
      console.log("oneday data", res.data);
    });
  });

  // useEffect(() => {
  //   // 클럽 카테고리를 가져오는 코드
  //   getAPI(`/enums`).then((res) => {
  //     const newCategorylist = ["전체", ...res.data.categoryList];
  //     setCategories(newCategorylist);
  //   });
  // }, []);

  //카테고리에 따라 검색하는 코드
  const handleClubCategory = (e) => {
    logEvent("Button Clicked", { name: "handleClubCategory", page: "Club" });
    if (e.currentTarget.textContent === "전체") {
      setFilteredClubList(club);
    } else {
      getAPI(`/club/search?q=&category=${e.currentTarget.textContent}`)
        .then((res) => setFilteredClubList(res.data.content))
        .catch((err) => setFilteredClubList([]));
    }
  };

  if (queryResults1.isLoading || queryResults2.isLoading) return "Loading...";
  // if (queryResults1.error || queryResults2.error) return 'An error has occurred: ' + (queryResults1.error?.message || queryResults2.error?.message);

  const categories = [
    "전체",
    ...(queryResults1?.data?.data?.categoryList || []),
  ];
  const club = [...(queryResults2?.data?.data?.content || [])];

  //  const filteredClubList = [...res2?.data?.content];
  if (isLoading) {
    return <Loading />;
  }
  console.log("이건 클럽", club);
  console.log("이건 필터클럽", filteredClubList);
  return (
    <>
      <div ref={divRef}>
        <Navbar />
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
                    layoutId="active-pill-1"
                    transition={{ type: "spring", duration: 0.5 }}
                    className="border-b-[4px] border-black absolute inset-0"
                  />
                )}
                <span className="relative text-base z-10 mix-blend">{tab}</span>
              </button>
            ))}
          </div>
        </BodyContainer>
        <div className="flex justify-center items-center">
          <section className="absolute top-52 h-auto min-w-[1920px]">
            <div
              className="bg-neutral-200 text-5xl font-sans font-semibold gap-4 flex flex-col justify-center items-center h-[600px] pb-16 text-white"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/oneday/oneday_main.png)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <p>당신의 특별한 하루</p>
              <p>'하루속'에서 함께하세요!</p>
            </div>
          </section>
        </div>
        <div className="flex flex-col justify-center items-center">
          <section className="h-auto mb-10 min-w-[1920px] shadow-cm bg-[#F9FFF8] pt-10 rounded-t-[100px] mt-[524px] z-10 ">
            <BodyContainer>
              <div className="flex justify-between items-center my-10">
                <p className="text-3xl font-semibold">하루속 인기주제</p>
                <button>필터</button>
              </div>
              <body className="flex flex-col">
                <div className="flex justify-around  my-4">
                  {categories?.map((tab, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        setActiveTab(tab);
                        handleClubCategory(e);
                      }}
                      className={`${
                        activeTab === tab ? "text-black" : "hover:opacity-50"
                      } relative rounded-full px-3 py-1.5 text-sm font-medium text-black outline-2 transition focus-visible:outline`}
                    >
                      {activeTab === tab && (
                        <motion.div
                          layoutId="active-pill-2"
                          transition={{ type: "spring", duration: 0.5 }}
                          className="bg-transparent border-2 border-green-400 absolute inset-0"
                          style={{
                            borderRadius: 9999,
                          }}
                        />
                      )}
                      <span className="relative text-base z-10 mix-blend">
                        {tab}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex flex-col justify-between">
                  <div
                    className={`grid ${
                      onedayData.length === 0 ? "" : "grid-cols-2"
                    }  gap-x-4 gap-y-4`}
                  >
                    {
                      onedayData.length === 0 ? (
                        <EmptyState
                          showReset
                          page="oneday"
                          handleClubCategory={handleClubCategory}
                        />
                      ) : filteredClubList ? (
                        onedayData?.map((item, i) => {
                          return (
                            <Fade bottom>
                              <ClubCard
                                page="oneday"
                                key={i}
                                title={item.oneDayTitle}
                                content={item.oneDayContent}
                                tag={item.clubTag}
                                thumbnail={item.thumbnailUrl}
                                id={item.oneDayId}
                                maxGroupSize={item.oneDayGroupSize}
                                nowMemberCount={item.nowMemberCount}
                              />
                            </Fade>
                          );
                        })
                      ) : null
                      // : (
                      //   club?.map((item, i) => {
                      //     return (
                      //       <Fade bottom>
                      //         <ClubCard
                      //           page="oneday"
                      //           key={i}
                      //           title={item.clubTitle}
                      //           content={item.clubContent}
                      //           tag={item.clubTag}
                      //           thumbnail={item.thumbnailUrl}
                      //           id={item.club_id}
                      //           eventId={item.id}
                      //           maxGroupSize={item.maxGroupSize}
                      //           nowMemberCount={item.nowMemberCount}
                      //         />
                      //       </Fade>
                      //     );
                      //   })
                      // )
                    }
                  </div>
                </div>
                {filteredClubList.length >= 8 && totalPages > page + 1 && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={() => setPage(page + 1)}
                      className="bg-green-400 text-white px-3 py-2 rounded-full"
                    >
                      더보기
                    </button>
                  </div>
                )}
              </body>
            </BodyContainer>

            <section>
              <BodyContainer>
                <p className="text-3xl font-semibold py-4">일상속 추천주제</p>

                <div className="flex flex-col justify-between">
                  <div className={`grid grid-cols-4 gap-x-4 gap-y-4`}>
                    {club?.map((item, i) => {
                      return (
                        <Fade bottom>
                          <RecommendCard
                            page="oneday"
                            key={i}
                            title={item.clubTitle}
                            content={item.clubContent}
                            tag={item.clubTag}
                            thumbnail={item.thumbnailUrl}
                            id={item.club_id}
                            eventId={item.id}
                            maxGroupSize={item.maxGroupSize}
                            nowMemberCount={item.nowMemberCount}
                          />
                        </Fade>
                      );
                    })}
                  </div>
                </div>
              </BodyContainer>
            </section>
            <section className="h-auto">
              <div className="flex flex-col w-full bg-neutral-100 items-center gap-4 justify-center h-[228px]">
                {/* <div className="fixed z-100 bottom-16 flex justify-center items-center mt-10 bg-orange-400 text-white w-[130px] py-2 rounded-lg"> */}
                <p className=" text-5xl font-sans font-semibold">
                  내가 찾는 일상속 이벤트가 없다면?
                </p>
                <div className="text-green-400 text-xl font-sans">
                  <CreateClub />
                </div>
                {/* </div> */}
              </div>
            </section>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Oneday;

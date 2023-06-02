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

let pageTabs = ["일상속", "하루속"];

function Club() {
  const [activeTab, setActiveTab] = useState("전체");
  const [activePageTab, setActivePageTab] = useState(pageTabs[0]);

  const [page, setPage] = useState(0);
  const [club, setClub] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [categories, setCategories] = useState(null);
  const [filteredClubList, setFilteredClubList] = useState([]);
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    // 클럽 목록을 받아오는 코드
    getAPI(`/club?page=${page}&size=8&sort=createdAt,DESC`).then((res) => {
      setClub([...club, ...res.data.content]);
      setFilteredClubList([...club, ...res.data.content]);
    });

    // 클럽 전체 페이지를 가져오는 코드
    getAPI("/club").then((res) => setTotalPages(res.data.totalPages));
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    // 클럽 카테고리를 가져오는 코드
    getAPI(`/enums`).then((res) => {
      const newCategorylist = ["전체", ...res.data.categoryList];
      setCategories(newCategorylist);
    });
  }, []);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div ref={divRef}>
        <Navbar />
        <BodyContainer>
          <div className="flex gap-10 pt-40">
            {pageTabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActivePageTab(tab)}
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
        <BodyContainer>
          <div className="flex flex-col justify-center items-center h-[300px]">
            <p>당신의 일상을 함께할 취미를</p>
            <p>'일상속'에서 찾아보세요!</p>
          </div>
        </BodyContainer>
        <section className=" h-auto mb-10 pt-20">
          <BodyContainer>
            <body className="flex flex-col">
              <div className="flex justify-between mb-10">
                <p className="text-3xl font-semibold">일상속 인기주제</p>
                <button>필터</button>
              </div>
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
                        className="bg-transparent border-2 border-orange-400 absolute inset-0"
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
                    filteredClubList.length === 0 ? "" : "grid-cols-2"
                  }  gap-x-4 gap-y-4`}
                >
                  {filteredClubList.length === 0 ? (
                    <EmptyState
                      showReset
                      page="club"
                      handleClubCategory={handleClubCategory}
                    />
                  ) : filteredClubList ? (
                    filteredClubList?.map((item, i) => {
                      return (
                        <Fade bottom>
                          <ClubCard
                            key={i}
                            title={item.clubTitle}
                            content={item.clubContent}
                            tag={item.clubTag}
                            thumbnail={item.thumbnailUrl}
                            id={item.club_id}
                            maxGroupSize={item.maxGroupSize}
                            nowMemberCount={item.nowMemberCount}
                          />
                        </Fade>
                      );
                    })
                  ) : (
                    club?.map((item, i) => {
                      return (
                        <Fade bottom>
                          <ClubCard
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
                    })
                  )}
                </div>
              </div>
              {filteredClubList.length >= 8 && totalPages > page + 1 && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => setPage(page + 1)}
                    className="bg-rose-400 text-white px-3 py-2 rounded-full"
                  >
                    더보기
                  </button>
                </div>
              )}
            </body>
          </BodyContainer>
        </section>
        <section className="h-auto mb-10">
          <BodyContainer>
            <div className="flex justify-end">
              <div className="fixed z-100 bottom-16 flex justify-center items-center mt-10 bg-rose-400 text-white w-[130px] py-2 rounded-lg">
                <CreateClub />
              </div>
            </div>
          </BodyContainer>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Club;

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Fade from "react-reveal/Fade";

import BodyContainer from "../component/BodyContainer";
import ClubCard from "../component/ClubCard";
import Container from "../component/Container";
import Navbar from "../component/Navbar";
// import ReviewCard from "../component/ReviewCard";
import CreateClub from "./CreateClub";
import { getAPI } from "../axios";
import SearchBar from "../component/SearchBar";
import { useRecoilState } from "recoil";
import Loading from "../component/Loading";
import { isLoadingState } from "../states/clubState";
import EmptyState from "../component/EmptyState";
import Footer from "../component/Footer";
import { logEvent } from "../utils/amplitude";

function Club() {
  const [activeTab, setActiveTab] = useState("전체");
  const [page, setPage] = useState(0);
  const [club, setClub] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
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
      setFilteredClubList([...club, ...res.data.content])
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
    logEvent('Button Clicked', { name: 'handleClubCategory', page: 'Club' })
    if(e.currentTarget.textContent === "전체") {
      setFilteredClubList(club)
    } else {
      getAPI(`/club/search?q=&category=${e.currentTarget.textContent}`)
      .then((res) => setFilteredClubList(res.data.content))
      .catch((err) => setFilteredClubList([]));
    }
  };

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };


  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div ref={divRef}>
        <Container>
          <Navbar />
          <section className="h-auto mt-24 mb-10">
            <BodyContainer>
              <body className="flex flex-col">
                <SearchBar
                  page='club'
                  handleSearchInput={handleSearchInput}
                  search={search}
                />
                <div className="flex justify-around  my-4">
                  {categories?.map((tab, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        setActiveTab(tab);
                        handleClubCategory(e);
                      }}
                      className={`${
                        activeTab === tab ? "text-white" : "hover:opacity-50"
                      } relative rounded-full px-3 py-1.5 text-sm font-medium text-black outline-2 transition focus-visible:outline`}
                    >
                      {activeTab === tab && (
                        <motion.div
                          layoutId="active-pill"
                          transition={{ type: "spring", duration: 0.5 }}
                          className="bg-gatherBlue absolute inset-0"
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
                      <EmptyState showReset
                      page="club"
                      handleClubCategory={handleClubCategory} />
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
        </Container>
        <Footer />
      </div>
    </>
  );
}

export default Club;
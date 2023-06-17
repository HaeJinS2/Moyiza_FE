import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
// import { useQueries } from "react-query";

import BodyContainer from "../component/BodyContainer";
import ClubCard from "../component/ClubCard";
import { getAPI } from "../axios";
import { useRecoilState } from "recoil";
import Loading from "../component/Loading";
import { isLoadingState } from "../states/clubState";
import EmptyState from "../component/EmptyState";
import Footer from "../component/Footer";
import { logEvent } from "../utils/amplitude";
import { useNavigate } from "react-router-dom";
import RecommendCard from "../component/RecommendCard";

let pageTabs = ["일상속", "하루속"];
let imageArr = [
  `${process.env.PUBLIC_URL}/images/category/all.png`,
  `${process.env.PUBLIC_URL}/images/category/exercise.png`,
  `${process.env.PUBLIC_URL}/images/category/exercise.png`,
  `${process.env.PUBLIC_URL}/images/category/travel.png`,
  `${process.env.PUBLIC_URL}/images/category/culture.png`,
  `${process.env.PUBLIC_URL}/images/category/art.png`,
  `${process.env.PUBLIC_URL}/images/category/activity.png`,
  `${process.env.PUBLIC_URL}/images/category/food.png`,
  `${process.env.PUBLIC_URL}/images/category/book.png`,
  `${process.env.PUBLIC_URL}/images/category/hobby.png`,
  `${process.env.PUBLIC_URL}/images/category/love.png`,
];

function Club() {
  const [activeTab, setActiveTab] = useState("전체");
  const [activePageTab, setActivePageTab] = useState(pageTabs[0]);
  const [selectedTags, setSelectedTags] = useState([]);
  // const [filterToggle, setFilterToggle] = useState(false);

  const [searchPage, setSearchPage] = useState(0);
  const [page, setPage] = useState(0);
  // const [pageChanged, setPageChanged] = useState(false);
  const [club, setClub] = useState([]);
  const [filterList, setFilterList] = useState({});
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [activatedFilterCategory, setActivatedFilterCategory] = useState("");

  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [categories, setCategories] = useState(null);
  const [filteredClubList, setFilteredClubList] = useState([]);
  const [popularClubList, setPopularClubList] = useState([]);
  const divRef = useRef(null);
  const navigate = useNavigate();

  console.log(totalPages);

  //   const [club1, categories1] = useQueries(
  //     [
  //       {
  //         queryKey: "clubs",
  //         queryFn: () => getAPI(`/club?page=${page}&size=8&sort=createdAt,DESC`),
  //         onSuccess: (newClubData) => {
  //           if(page === 0) {
  //             setFilteredClubList([...filteredClubList,...newClubData.data.content])
  //           }
  //           setClub((prevClubData) => [...prevClubData, ...newClubData.data.content]);
  //           setPageChanged(false)
  //         },
  //         enabled: pageChanged,
  //       },
  //       {
  //         queryKey: "categories",
  //         queryFn: () => getAPI(`/enums`),
  //         onSuccess: (categories) => {
  //           setCategories(["전체", ...categories.data.categoryList]);
  //         },
  //       },
  //     ],
  //     {
  //       refetchOnWindowFocus: false,
  //     }
  //   );
  // console.log(club1.data,categories)

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // useEffect(() => {
  //   setPageChanged(true);
  // }, []);  // 컴포넌트가 마운트될 때만 실행

  useEffect(() => {
    setIsLoading(true);
    // 클럽 목록을 받아오는 코드
    getAPI(`/club?page=${page}&size=6&sort=createdAt,DESC`)
      .then((res) => {
        setClub([...club, ...res.data.content]);
        setFilteredClubList([...club, ...res.data.content]);
      })
      .catch((err) => {
        console.log(err);
      });

    // 클럽 전체 페이지를 가져오는 코드
    getAPI("/club")
      .then((res) => setTotalPages(res.data.totalPages))
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    // 클럽 카테고리를 가져오는 코드
    getAPI(`/enums`)
      .then((res) => {
        console.log("카테고리태그", res);
        const categoryAndTagList = res.data.categoryAndTagList;
        const newCategorylist = ["전체", ...res.data.categoryList];
        setCategories(newCategorylist);
        setFilterList(categoryAndTagList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //카테고리에 따라 검색하는 코드
  const handleClubCategory = async (e) => {
    logEvent("Button Clicked", { name: "handleClubCategory", page: "Club" });
    setActiveTab(e.currentTarget.textContent);
    setSearchPage(0);
    if (e.currentTarget.textContent === "전체") {
      setFilteredClubList(club);
    } else {
      try {
        getAPI(
          `/club/search?q=&category=${e.currentTarget.textContent}&page=0&size=6`
        ).then((res) => {
          setFilteredClubList([...res.data.content]);
        });
      } catch (err) {
        setFilteredClubList([]);
      }
    }
  };

  const handleMore = async () => {
    if (activeTab === "전체") {
      setPage(page + 1);
    } else {
      try {
        setSearchPage((prev) => prev + 1);
        const res = await getAPI(
          `/club/search?q=&category=${activeTab}&page=${searchPage + 1}&size=6`
        );
        setFilteredClubList((prev) => [...prev, ...res.data.content]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const toggleFilter = () => {
    filterIsOpen ? setFilterIsOpen(false) : setFilterIsOpen(true);
  };

  // 태그 선택 처리 함수
  const handleTagClick = (tag) => {
    let updatedTags;

    // 이미 선택된 태그를 다시 클릭했을 경우 배열에서 해당 태그 제거
    if (selectedTags.includes(tag)) {
      updatedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
    } else {
      updatedTags = [...selectedTags, tag];

      // 최대 3개의 태그만 선택 가능
      if (updatedTags.length > 3) {
        updatedTags.shift();
      }
    }

    setSelectedTags(updatedTags);

    let searchUrl = "/club/search?";
    if (updatedTags[0]) searchUrl += `tag1=${updatedTags[0]}&`;
    if (updatedTags[1]) searchUrl += `tag2=${updatedTags[1]}&`;
    if (updatedTags[2]) searchUrl += `tag3=${updatedTags[2]}`;

    getAPI(searchUrl)
      .then((res) => {
        setFilteredClubList(res.data.content);
      })
      .catch((err) => setFilteredClubList([]));
  };

  const getPupularClub = () => {
    getAPI("/club/popular").then((res) => {
      setPopularClubList(res.data);
      console.log("인기 클럽", res);
    });
  };

  useEffect(() => {
    getPupularClub();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  console.log(club);
  console.log("이거뭐야", filterList);
  return (
    <>
      <div ref={divRef}>
        <BodyContainer>
          <div className="flex gap-10 pt-28 px-12">
            {pageTabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => {
                  setActivePageTab(tab);
                  i === 0 ? navigate("/club") : navigate("/oneday");
                }}
                className={`${
                  activePageTab === tab ? "text-black" : "hover:opacity-50"
                } relative rounded-full px-3 py-1.5 text-black outline-2 transition focus-visible:outline`}
              >
                {activePageTab === tab && (
                  <motion.div
                    layoutId="active-pill-1"
                    transition={{ type: "spring", duration: 0.5 }}
                    className="border-b-[4px] border-black absolute inset-0"
                  />
                )}
                <span className="relative text-2xl font-bold z-10 mix-blend">
                  {tab}
                </span>
              </button>
            ))}
          </div>
        </BodyContainer>
        <div className="flex justify-center items-center">
          <section className="absolute top-[156px] h-auto min-w-[1280px]">
            <div
              className="text-[2.625rem] font-semibold gap-4 flex flex-col justify-center items-center pb-16 h-[600px] text-white"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/club/club_main.png)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <p>당신의 일상을 함께할 취미를</p>
              <p>'일상속'에서 찾아보세요!</p>
            </div>
          </section>
        </div>
        <div className="flex flex-col justify-center items-center">
          <section className="h-auto min-w-[1280px] shadow-cms bg-[#FFFBF8] rounded-t-[90px] mt-[475px] z-10">
            <div className="max-w-[1140px] mx-auto">
              <div className="flex justify-between items-center pt-16 pb-2 pr-1">
                <p className="text-[2rem] font-bold">일상속 인기주제</p>
                <button className="relative">
                  <img
                    onClick={() => toggleFilter()}
                    src={`${process.env.PUBLIC_URL}/images/filter.svg`}
                    alt="filter_button"
                  />
                  {filterIsOpen && (
                    <div className="px-2 py-4 absolute flex flex-col top-[43px] right-[2px] bg-white w-[800px] h-auto z-30 shadow-cms rounded-xl">
                      <div className="flex justify-between mb-2">
                        {Object.keys(filterList).map((category) => {
                          return (
                            <button
                              className={`${
                                activatedFilterCategory === category
                                  ? "bg-[#FF7F1D] rounded-full text-white px-2"
                                  : " px-2 py-1"
                              } text-[1rem] font-semibold flex items-center w-[75px] justify-center gap-1`}
                              onClick={() => {
                                setActivatedFilterCategory(category);
                              }}
                            >
                              {category}
                            </button>
                          );
                        })}
                      </div>
                      {activatedFilterCategory && (
                        <div className="grid grid-cols-8 gap-1">
                          {filterList[activatedFilterCategory]?.map((tag) => {
                            return (
                              <button
                                onClick={() => handleTagClick(tag)}
                                className={`${
                                  selectedTags.includes(tag)
                                    ? "text-[#FF7F1D] border-2 border-[#FF7F1D]"
                                    : "border-2 border-white"
                                } rounded-full px-1 py-[1px]`}
                              >
                                {tag}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              </div>
              <body className="flex flex-col">
                <div className="flex justify-around mt-4 mb-6">
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
                          className="bg-transparent border-2 border-[#FF7F1D] absolute inset-0"
                          style={{
                            borderRadius: 9999,
                          }}
                        />
                      )}
                      <span className="relative text-base z-10 mix-blend flex items-center gap-2 pt-[2.3px]">
                        <img
                          className="w-[20px] h-[20px] "
                          src={imageArr[i]}
                          alt="club_category"
                        />
                        {tab}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex flex-col justify-between">
                  <div
                    className={`grid justify-items-center ${
                      filteredClubList.length === 0 ? "" : "grid-cols-2"
                    }  gap-x-4 gap-y-5 pb-20 `}
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
                          <ClubCard
                            page="club"
                            key={i}
                            title={item.clubTitle}
                            content={item.clubContent}
                            tag={item.clubTag}
                            thumbnail={item.thumbnailUrl}
                            id={item.club_id}
                            maxGroupSize={item.maxGroupSize}
                            nowMemberCount={item.nowMemberCount}
                            isLikedByUser={item.isLikedByUser}
                            imageList={item.imageUrlList}
                          />
                        );
                      })
                    ) : (
                      club?.map((item, i) => {
                        return (
                          <ClubCard
                            page="club"
                            key={i}
                            title={item.clubTitle}
                            content={item.clubContent}
                            tag={item.clubTag}
                            thumbnail={item.thumbnailUrl}
                            id={item.club_id}
                            eventId={item.id}
                            maxGroupSize={item.maxGroupSize}
                            nowMemberCount={item.nowMemberCount}
                            isLikedByUser={item.isLikedByUser}
                            imageList={item.imageUrlList}
                          />
                        );
                      })
                    )}
                  </div>
                </div>
                {/* {filteredClubList.length > 6 && totalPages > page + 1 && ( */}
                <div className="flex justify-center  pb-12">
                  <button
                    onClick={handleMore}
                    className="bg-[#FF7F1D] text-white px-7 py-2 rounded-full"
                  >
                    더보기
                  </button>
                </div>
                {/* )} */}
              </body>
            </div>
            <div className="max-w-[1140px] mx-auto mb-80">
              <p className="text-[2rem] font-bold py-4">일상속 추천주제</p>

              <div className="flex flex-col justify-between">
                <div className={`grid grid-cols-4 gap-x-4 gap-y-4`}>
                  {popularClubList?.map((item, i) => {
                    return (
                      <RecommendCard
                        page="club"
                        key={i}
                        title={item?.clubTitle}
                        content={item?.clubContent}
                        tag={item?.clubTag}
                        thumbnail={item?.clubImageUrlList[0]}
                        id={item?.club_id}
                        maxGroupSize={item?.maxGroupSize}
                        nowMemberCount={item?.nowMemberCount}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="min-w-[1280px] flex flex-col bg-[#FFDFC7] items-center gap-4 justify-center h-[300px]">
              {/* <div className="fixed z-100 bottom-16 flex justify-center items-center mt-10 bg-orange-400 text-white w-[130px] py-2 rounded-lg"> */}
              <p className=" text-[1.75rem]  font-sans font-semibold">
                내가 찾는 일상속 이벤트가 없다면?
              </p>
              <div className="text-[#FF7F1D] text-xl font-sans">
                {/* <CreateClub /> */}
                <button
                  className="flex gap-x-2 justify-center items-center"
                  onClick={() => navigate(`/create-feed`)}
                >
                  <span className="text-[1.25rem] mt-[5px]">
                    일상속 만들러가기
                  </span>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/club/arrow_orange.png`}
                    alt="create-club"
                  />
                </button>
              </div>
              {/* </div> */}
            </div>
          </section>
          <section className="h-auto "></section>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Club;

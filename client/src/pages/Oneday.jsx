import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import BodyContainer from "../component/BodyContainer";
import ClubCard from "../component/ClubCard";
// import ReviewCard from "../component/ReviewCard";
// import CreateClub from "./CreateClub";
import { getAPI } from "../axios";
import { useRecoilState } from "recoil";
import Loading from "../component/Loading";
import { isLoadingState } from "../states/clubState";
import EmptyState from "../component/EmptyState";
import Footer from "../component/Footer";
import { logEvent } from "../utils/amplitude";
import { useNavigate } from "react-router-dom";
import RecommendCard from "../component/RecommendCard";
// import { useQueries } from "react-query";

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
function Oneday() {
  const [activeTab, setActiveTab] = useState("전체");
  const [activePageTab, setActivePageTab] = useState(pageTabs[1]);
  const [searchPage, setSearchPage] = useState(0);
  const [page, setPage] = useState(0);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [activatedFilterCategory, setActivatedFilterCategory] = useState("");

  // const [club, setClub] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  // const [categories, setCategories] = useState(null);
  const [onedayData, setOnedayData] = useState([]);
  const [categories, setCategories] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filterList, setFilterList] = useState({});

  // const [queryResults1, queryResults2] = useQueries(
  //   [
  //     {
  //       queryKey: "categories",
  //       queryFn: () => getAPI("/enums"),
  //       refetchOnWindowFocus: false,
  //     },
  //     // {
  //     //   queryKey: ['club', page],
  //     //   queryFn: () => getAPI(`/club?page=0&size=8&sort=createdAt,DESC`),
  //     //   refetchOnWindowFocus: false,
  //     //   onSuccess: ((data) => {
  //     //     setFilteredOnedayList(data?.data?.content)
  //     //   })
  //     // },
  //     {
  //       queryKey: ["oneday", onedayData],
  //       // queryFn: () => getAPI(`/oneday`),
  //       queryFn: () => getAPI(`/oneday?page=${page + 1}&size=6&sort=createdAt,DESC`),
  //       refetchOnWindowFocus: false,
  //       onSuccess: (data) => {
  //         setFilteredOnedayList(data?.data?.content);
  //         setOnedayData(data?.data?.content);
  //       },
  //     },
  //   ],
  //   {
  //     // waitFor 옵션을 사용하여 모든 쿼리가 로딩될 때까지 기다림
  //     waitFor: "all",
  //   }
  // );


  const [filteredOnedayList, setFilteredOnedayList] = useState([]);
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
    //   setFilteredOnedayList([...club, ...res.data.content]);
    // });

    // 클럽 전체 페이지를 가져오는 코드
    getAPI(`/oneday?page=${page}&size=6&sort=createdAt,DESC`)
    .then((res) => {
      const newContent = [...onedayData, ...res.data.content];
      setOnedayData(newContent);
      setFilteredOnedayList(newContent);
    });

    getAPI(`/oneday`)
    .then((res) => {
      setTotalPages(res.data.totalPages)
    });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // useEffect(() => {
  //   // 클럽 카테고리를 가져오는 코드
  //   getAPI(`/enums`).then((res) => {
  //     const newCategorylist = ["전체", ...res.data.categoryList];
  //     setCategories(newCategorylist);
  //   });
  // }, []);
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
  const handleClubCategory = (e) => {
    logEvent("Button Clicked", { name: "handleOnedayCategory", page: "Oneday" });
    setActiveTab(e.currentTarget.textContent);
    setSearchPage(0);
    if (e.currentTarget.textContent === "전체") {
      setFilteredOnedayList(onedayData);
    } else {
      try{
      getAPI(`/oneday/search?q=&category=${e.currentTarget.textContent}&size=6&page=0`)
        .then((res) => setFilteredOnedayList([...res.data.content]))
        .catch((err) => setFilteredOnedayList([]));
      } catch (err) {
          setFilteredOnedayList([])
        }
    }
  };


  // const handleMore = async () => {
  //   if (activeTab === "전체") {
  //     setPage(page + 1);
      
  //   } else {
  //     try {
  //       setSearchPage((prev) => prev + 1);
  //       const res = await getAPI(
  //         `/oneday/search?q=&category=${activeTab}&page=${searchPage + 1}&size=6`
  //       );
  //       setFilteredOnedayList((prev) => [...prev, ...res.data.content]);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  const handleMore = async () => {
    try {
      if (activeTab === "전체") {
        setPage(page + 1);
        const res = await getAPI(`/oneday?page=${page + 1}&size=6`);
        setFilteredOnedayList((prev) => [...prev, ...res.data.content]);
      } else {
        setSearchPage((prev) => prev + 1);
        const res = await getAPI(
          `/oneday/search?q=&category=${activeTab}&page=${searchPage + 1}&size=6`
        );
        setFilteredOnedayList((prev) => [...prev, ...res.data.content]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // if (queryResults1.isLoading) return "Loading...";
  // if (queryResults1.error || queryResults2.error) return 'An error has occurred: ' + (queryResults1.error?.message || queryResults2.error?.message);

  // const categories = [
  //   "전체",
  //   ...(queryResults1?.data?.data?.categoryList || []),
  // ];
  // const club = [...(queryResults2?.data?.data?.content || [])];

  //  const filteredOnedayList = [...res2?.data?.content];

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

    let searchUrl = "/oneday/search?";
    if (updatedTags[0]) searchUrl += `tag1=${updatedTags[0]}&`;
    if (updatedTags[1]) searchUrl += `tag2=${updatedTags[1]}&`;
    if (updatedTags[2]) searchUrl += `tag3=${updatedTags[2]}`;

    getAPI(searchUrl)
      .then((res) => {
        setFilteredOnedayList(res.data.content);
      })
      .catch((err) => setFilteredOnedayList([]));
  };








  if (isLoading) {
    return <Loading />;
  }
  console.log("이건 필터원데이", filteredOnedayList);
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
              className="bg-neutral-200 text-[2.625rem] font-sans font-semibold gap-4 flex flex-col justify-center items-center pb-16 h-[600px] text-white"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/oneday/oneday_main.svg)`,
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
          <section className="h-auto min-w-[1280px] shadow-cms bg-[#F9FFF8] rounded-t-[90px] mt-[475px] z-10">
            <div className="max-w-[1140px] mx-auto">
              <div className="flex justify-between items-center pt-16 pb-2 pr-1">
                <p className="text-[2rem] font-bold">하루속 인기주제</p>
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
                          className="bg-transparent border-2 border-[#0BB159] absolute inset-0"
                          style={{
                            borderRadius: 9999,
                          }}
                        />
                      )}
                      <span className="relative text-base z-10 mix-blend flex items-center gap-2 pt-[2.3px]">
                        <img 
                        className="w-[20px] h-[20px]"
                        src={imageArr[i]} alt="club_category" />
                        {tab}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex flex-col justify-between">
                  <div
                    className={`grid justify-items-center ${
                      filteredOnedayList.length === 0 ? "" : "grid-cols-2"
                    }  gap-x-4 gap-y-5`}
                  >
                    {filteredOnedayList.length === 0 ? (
                      <EmptyState
                        showReset
                        page="oneday"
                        handleClubCategory={handleClubCategory}
                      />
                    ) : filteredOnedayList ? (
                      filteredOnedayList?.map((item, i) => {
                        return (
                            <ClubCard
                              page="oneday"
                              key={i}
                              title={item.onedayTitle}
                              content={item.onedayContent}
                              tag={item.onedayTag}
                              thumbnail={item.thumbnailUrl}
                              id={item.onedayId}
                              maxGroupSize={item.onedayGroupSize}
                              nowMemberCount={item.onedayAttendantsNum}
                              isLikedByUser={item.isLikedByUser}
                              imageList={item?.imageUrlList}
                            />
                        );
                      })
                    ) : (
                      // : null
                      onedayData?.map((item, i) => {
                        return (
                            <ClubCard
                              page="oneday"
                              key={i}
                              title={item.onedayTitle}
                              content={item.onedayContent}
                              tag={item.onedayTag}
                              thumbnail={item.thumbnailUrl}
                              id={item.oneDayId}
                              maxGroupSize={item.onedayGroupSize}
                              nowMemberCount={item.onedayAttendantsNum}
                              isLikedByUser={item.isLikedByUser}
                              imageList={item?.imageUrlList}
                            />
                        );
                      })
                    )}
                  </div>
                </div>
                {filteredOnedayList.length >= 6 && totalPages > page + 1 && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={handleMore}
                      className="bg-[#0BB159] text-white px-7 py-2 rounded-full"
                    >
                      더보기
                    </button>
                  </div>
                )}
              </body>
            </div>

            <section>
              <div className="max-w-[1140px] mx-auto">
                <p className="text-3xl font-bold py-4">하루속 추천주제</p>

                <div className="flex flex-col justify-between mb-80">
                  <div className={`grid grid-cols-4 gap-x-4 gap-y-4`}>
                    {onedayData?.map((item, i) => {
                      return (
                          <RecommendCard
                            page="oneday"
                            key={i}
                            title={item.onedayTitle}
                            content={item.onedayContent}
                            tag={item.onedayTag}
                            thumbnail={item.thumbnailUrl}
                            id={item.oneDayId}
                            maxGroupSize={item.onedayGroupSize}
                            nowMemberCount={item.onedayAttendantsNum}
                          />
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
            <section className="h-auto">
              <div className="flex flex-col w-full bg-[#E4FFE0] items-center gap-4 justify-center h-[228px]">
                {/* <div className="fixed z-100 bottom-16 flex justify-center items-center mt-10 bg-orange-400 text-white w-[130px] py-2 rounded-lg"> */}
                <p className=" text-[1.75rem] font-sans font-semibold">
                  내가 찾는 하루속 이벤트가 없다면?
                </p>
                <div className="text-green-400">
                  {/* <CreateClub /> */}
                  <button
                    className="flex gap-x-2 justify-center items-center"
                    onClick={() => navigate(`/create-feed`)}
                  >
                    <span className="text-[1.25rem] mt-[4px]">
                      일상속 만들러가기
                    </span>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/oneday/arrow_green.png`}
                      alt="create-club"
                    />
                  </button>
                </div>
                {/* </div> */}
              </div>
            </section>
          </section>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Oneday;

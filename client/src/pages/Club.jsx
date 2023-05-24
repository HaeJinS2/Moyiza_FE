import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";

import BodyContainer from "../component/BodyContainer";
import ClubCard from "../component/ClubCard";
import Container from "../component/Container";
import Navbar from "../component/Navbar";
import ReviewCard from "../component/ReviewCard";
import CreateClub from "./CreateClub";
import { getClub } from "../api/club";
const tabs = [
  "전체",
  "문화・예술",
  "운동・액티비티",
  "푸드・드링크",
  "취미",
  "여행・동행",
  "성장・자기계발",
  "동네・또래",
  "연애・소개팅",
];

function Club() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  // const divRef = useRef(null);

  // useEffect(() => {
  //   divRef.current.scrollIntoView({ behavior: "smooth" });
  // }, []);

  //리액트 쿼리 관련 코드
  const {
    isLoading,
    isError,
    data: club,
  } = useQuery("getClub", getClub, {
    refetchOnWindowFocus: false, // refetchOnWindowFocus 옵션을 false로 설정
  });

  if (isLoading) {
    <div>로딩중 입니다</div>;
  } else if (isError) {
    <div>정보를 가져오는도중 오류가 났습니다.</div>;
  } else {
    console.log(club.data);
    return (
      <>
        <Container>
          <Navbar />
          {/* <section ref={divRef} className="h-screen"></section> */}
          <section className="h-auto mt-20">
            <BodyContainer>
              <header className="flex justify-center">
                <div> 타이틀 </div>
              </header>
              <body className="flex flex-col">
                <div className="flex justify-end">
                  <button className="bg-rose-400 text-white rounded-lg px-2 py-1">
                    필터
                  </button>
                </div>
                <div className="flex justify-around">
                  {tabs.map((tab, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(tab)}
                      className={`${
                        activeTab === tab ? "" : "hover:opacity-50"
                      } relative rounded-full px-3 py-1.5 text-sm font-medium text-black outline-2 outline-rose-400 focus-visible:outline`}
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
                      <span className="relative z-10">{tab}</span>
                    </button>
                  ))}
                </div>
                <div className="flex flex-1 justify-around">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                    {club.data.map((item, i) => {
                      return (
                        <ClubCard
                          key={i}
                          title={item.clubTitle}
                          content={item.clubContent}
                          category={item.clubCategory}
                          thumbnail={item.thumbnailUrl}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-center mt-10">
                  <button className="bg-rose-400 text-white px-2 py-1">
                    더보기
                  </button>
                </div>
              </body>
            </BodyContainer>
          </section>
          <section className="h-auto">
            <BodyContainer>
              <div>
                <p>후기</p>
              </div>
              <div className="flex flex-1 justify-around">
                <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                </div>
              </div>
              <div className="flex justify-center">
                <div
                  // onClick={() => navigate('/create-club-form')}
                  className="flex justify-center items-center mt-10 bg-rose-400 text-white w-[500px] py-2 rounded-lg"
                >
                  <CreateClub />
                </div>
              </div>
            </BodyContainer>
          </section>
        </Container>
      </>
    );
  }
}

export default Club;

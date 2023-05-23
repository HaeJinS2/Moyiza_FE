import React from "react";
import { useNavigate } from "react-router-dom";
import BodyContainer from "../component/BodyContainer";
import ClubCard from "../component/ClubCard";
import Container from "../component/Container";
import Navbar from "../component/Navbar";
import ReviewCard from "../component/ReviewCard";
import CreateClub from "./CreateClub";

function Club() {
  const navigate = useNavigate()
  return (
    <>
      <Container>
        <Navbar />
        <section className="h-screen"></section>
        <section className="h-screen">
          <BodyContainer>
            <header className="flex justify-center">
              <div> 타이틀 </div>
            </header>
            <body className="flex flex-col">
              <div className="flex justify-end">
                <button
                className="bg-rose-400 text-white rounded-lg px-2 py-1"
                >필터</button>
              </div>
              <div className="flex justify-around">
                <div>전체</div>
                <div>문화・예술</div>
                <div>운동・액티비티</div>
                <div>푸드・드링크</div>
                <div>취미</div>
                <div>여행・동행</div>
                <div>성장・자기계발</div>
                <div>동네・또래</div>
                <div>연애・소개팅</div>
              </div>
              <div className="flex flex-1 justify-around">
                <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                  <ClubCard />
                  <ClubCard />
                  <ClubCard />
                  <ClubCard />
                  <ClubCard />
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
        <section className="h-screen">
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
            onClick={() => navigate('/create-club-form')}
            className="flex justify-center items-center mt-10 bg-rose-400 text-white w-[500px] py-2 rounded-lg">
              <CreateClub />
            </div>
            </div>
          </BodyContainer>
        </section>
      </Container>
    </>
  );
}

export default Club;

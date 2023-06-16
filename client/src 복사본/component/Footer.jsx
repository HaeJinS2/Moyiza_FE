import React from "react";

function Footer() {
  return (
    <footer className="w-[1280px] h-[327px] text-sm bg-black flex justify-center items-center">
      <div className="flex w-[930px] h-[202px] items-center text-white">
        <div className="flex w-[550px] h-full flex-col justify-between">
          <p>모이자 정보</p>
          <p>공지사항</p>
          <p>이벤트</p>
          <p>자주 묻는 질문</p>
          <p>제휴 및 입점 문의</p>
          <p>채용</p>
        </div>
        <div className="flex flex-col h-full justify-between ">
          <div className="flex flex-col h-[91px] justify-between ">
            <p>소셜 미디어</p>
            <p>인스타그램</p>
            <p>네이버 글로그</p>
          </div>
          <div className="flex w-[355px]">
            <div>이용약관</div>
            <div className="px-[50px]">개인정보 처리방침</div>
            <div>사업자 정보 확인</div>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

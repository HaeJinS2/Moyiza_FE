import React from "react";

function ReviewCard() {
  return (
    <div className=" w-[588px] h-[411px] p-4 border-2 flex flex-col justify-between">
      <header className="flex">
        <div>
          <div className="w-[87px] h-[87px] bg-blue-400">프로필</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p>닉네임</p>
          <p>게시날짜</p>
        </div>
      </header>
      <body>
        <div>후기내용</div>
      </body>
      <footer className="flex">
        <div>
          <div className="w-[93px] h-[84px] bg-blue-400">클럽사진</div>
        </div>
        <div className="flex flex-col justify-around">
          <div>클럽명</div>
          <div>후기 / 인원 / 태그명</div>
        </div>
      </footer>
    </div>
  );
}

export default ReviewCard;

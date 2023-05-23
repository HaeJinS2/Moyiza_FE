import React from "react";

function Navbar() {
  return (
    <>
      <div className="flex justify-around">
        <div className="flex gap-2">
          <div>로고</div>
          <div>클럽</div>
          <div>원데이</div>
        </div>
        <div className="flex gap-2">
          <div>검색</div>
          <div>로그인</div>
          <div>프로필</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getClubDetail } from "../api/club";

function Detail() {
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: clubDetail,
  } = useQuery("getDetailClub", () => getClubDetail(id), {
    refetchOnWindowFocus: false, // refetchOnWindowFocus 옵션을 false로 설정
  });

  if (isLoading) {
    <div>로딩중 입니다</div>;
  } else if (isError) {
    <div>정보를 가져오는도중 오류가 났습니다.</div>;
  }

  console.log(clubDetail);

  return <div>Detail</div>;
}

export default Detail;

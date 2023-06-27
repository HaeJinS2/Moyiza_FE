import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
// import { useNavigate } from "react-router-dom";

function BlackListCard({
    blackList,
    nickName,
    profileImage,
    blackListId
}) {
    const { id } = useParams();
   
    const handleBlockClick = async() => {
        // 차단하기 동작 처리
        try {
          // POST 요청을 보냅니다.
          const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/blackList/`+ id);
          
          // 요청이 성공한 경우
          swal('차단 해제되었습니다.');
          console.log(response.data); // 서버에서 반환한 데이터를 출력하거나 처리할 수 있습니다.
        } catch (error) {
          // 요청이 실패한 경우
          swal('해제 요청을 보내는 중 오류가 발생했습니다.');
          console.error(error); // 오류 내용을 출력하거나 처리할 수 있습니다.
        }
    };
    // console.log('nickName', nickName);
    return (
        <>
            <div
                // onClick={() => navigate(`/club/${club_id}`)}
                className="cursor-pointer rounded-[18px] flex w-[230px] border border-[#E8E8E8] rounded-xl h-[88px] items-center mb-[16px] bg-white mr-[16px]"
            >
                <div className="flex items-center rounded-xl ">
                    <img
                        className="rounded-full w-[70px] h-[70px] border-[1px] ml-3 aspect-square object-cover"
                        src={profileImage}
                        alt="profileImage"
                    />
                </div>

                <div className="w-[117px] h-[14px] text-[14px] ml-[20px] flex justify-center flex-col">
                    <div className="flex justify-between ml-[5px]">
                        {nickName}
                    </div>
                    <div>
                        <button
                            type="button"
                            className=" w-[70px] h-[30px] bg-[#FF7F1E] text-white text-[15px] shadow hover:shadow-lg rounded-[9px] mt-[8px] flex items-center justify-center"
                            onClick={handleBlockClick}
                        >
                            차단 해제
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlackListCard;

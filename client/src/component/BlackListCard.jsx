import React from "react";
// import { useNavigate } from "react-router-dom";

function BlackListCard({
    blackList,
    nickName,
    profileImage,
    blackListId
}) {
    // const navigate = useNavigate();

    // console.log('nickName', nickName);
    return (
        <>
            <div
                // onClick={() => navigate(`/club/${club_id}`)}
                className="cursor-pointer rounded-[18px] flex w-[230px] border border-[#E8E8E8] rounded-xl h-[88px] items-center mb-[16px] bg-white "
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

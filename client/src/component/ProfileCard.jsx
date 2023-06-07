import React from "react";
import { useNavigate } from "react-router-dom";

function ProfileCard({
    tag,
    title,
    content,
    thumbnail,
    id,
    maxGroupSize,
    nowMemberCount,
    location

}) {
    const navigate = useNavigate();
    return (
        <>

            <div
                onClick={() => navigate(`/detail/${id}`)}
                className="cursor-pointer flex w-[1200px] shadow-cm rounded-xl h-[220px] items-center justify-center px-2 mt-10 bg-white"
            >
                <div className="flex items-center rounded-xl ">
                    <img
                        className="rounded-md w-[258px] h-[178px] border-[1.5px] ml-5"
                        src={thumbnail}
                        alt="clubThumbnail"
                    />
                </div>
                {/* <div className="flex flex-col gap-4 w-full h-full pl-4 pr-2 py-6"> */}
                {/* <div className="flex h-full justify-between flex-col"> */}
                <div className="w-[816px] h-[178px] ml-[35px] mt-[16px] flex flex-col">
                    <div className="flex justify-between">
                        <div className="text-[28px] font-bold">
                            {/* {title} */}
                            화곡역에서 러닝할 사람
                        </div>
                        <div className="text-[24px]">
                            {/* {nowMemberCount} / {maxGroupSize} */}
                            12 / 20
                        </div>
                    </div>

                    <div className="text-[16px] text-[#686868] mt-[16px] w-[450px] h-[77px]">
                        {/* {content} */}
                        매주 수요일 7시 화곡역에 만나서 러닝해요! 운동목적모임입니다!
                    </div>
                    <div className="text-[16px] text-orange-400 mt-[20px] mb-[10px] w-[813px] h-[31px] flex justify-between">
                        <div className="rounded-full b-1 border-2 px-2 py-1 border-orange-400 ">
                            {/* {tag} */}
                            스포츠
                        </div>
                        <div className="text-black text-[24px] ">
                            {/* {location} */}
                            화곡역
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
            {/* </div> */}

        </>
    );
}

export default ProfileCard;

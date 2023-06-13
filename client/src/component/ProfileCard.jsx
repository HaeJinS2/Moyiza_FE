import React from "react";
import { useNavigate } from "react-router-dom";

function ProfileCard({
    clubTitle,
    thumbnailUrl,
    club_id,
    maxGroupSize,
    nowMemberCount,
    clubContent,
    clubTag,
}) {
    const navigate = useNavigate();

    
    return (
        <>
            <div
                onClick={() => navigate(`/club/${club_id}`)}
                className="cursor-pointer flex w-[555px] shadow-cm rounded-xl h-[220px] items-center mt-10 bg-white "
            >
                <div className="flex items-center rounded-xl ">
                    <img
                        className="rounded-md w-[178px] h-[178px] border-[1px] ml-5"
                        src={thumbnailUrl}
                        alt="clubThumbnail"
                    />
                </div>
                
                <div className="w-[317px] ml-[20px] flex justify-start flex-col">
                    <div className="flex justify-between">
                    <div className="text-[16px] text-orange-400 mb-[12px] w-[240px] flex">
                        {clubTag.map((tag) => {
                            return (
                                <div
                                    key={tag}
                                    className="rounded-full mr-2 b-1 border-2 px-2 py-1 border-orange-400 flex justify-start">
                                    {tag}
                                </div>
                            );
                        })}
                    </div>
                        <div className="text-[14px]">
                            {nowMemberCount} / {maxGroupSize}
                        </div>
                    </div>
                    <div className="w-[240px] h-[27px] truncate hover:text-clip text-[20px] font-bold">
                            {clubTitle}
                        </div>
                    <div className="block text-ellipsis whitespace-normal hover:text-clip overflow-hidden text-[16px] text-[#686868] mt-[12px] mb-[20px] w-[240px] h-[70px]">
                        {clubContent}
                        {/* 매주 수요일 7시 화곡역에 만나서 러닝해요! 운동목적모임입니다! */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileCard;

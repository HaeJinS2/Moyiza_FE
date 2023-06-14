import React from "react";
import { useNavigate } from "react-router-dom";

function ClubCard({
  tag,
  title,
  content,
  thumbnail,
  id,
  maxGroupSize,
  nowMemberCount,
  page,
}) {
  const navigate = useNavigate();
  return (
    <>
      {page === "club" ? (
        <div
          onClick={() => navigate(`/club/${id}`)}
          className="cursor-pointer flex items-center border bg-white p-8 rounded-2xl  w-[544px] h-[263px]"
        >
          <img
            className="aspect-square rounded-2xl w-[197px] h-[197px] object-cover mr-6"
            src={thumbnail}
            alt="clubThumbnail"
          />
          <div className="flex flex-col gap-4 w-full h-full">
            <div className="flex justify-between text-xs text-orange-400">
              <div className="flex gap-2">
                {tag.map((tag) => {
                  return (
                    <div className="rounded-full border-[1px] px-2 py-1 border-orange-400">
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex h-full justify-between flex-col">
              <div>
                <div className="w-full text-2xl font-semibold">
                  {title}
                </div>
                <div className="text-sm">{content}</div>
              </div>
              <div className="flex justify-between">
                <div></div>
                <div className=" text-neutral-400 text-sm">
                  {nowMemberCount}/{maxGroupSize}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => navigate(`/oneday/${id}`)}
          className="cursor-pointer flex items-center border bg-white p-8 rounded-2xl w-[544px] h-[263px]"
        >
          <img
            className="aspect-square rounded-2xl w-[197px] h-[197px] object-cover mr-6"
            src={thumbnail}
            alt="clubThumbnail"
          />
          <div className="flex flex-col gap-4 w-full h-full">
            <div className="flex justify-between text-xs text-[#0BB159]">
              <div className="flex gap-2">
                {tag?.map((tag) => {
                  return (
                    <div className="rounded-full border-[1px] px-2 py-1 border-[#0BB159]">
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex h-full justify-between flex-col">
              <div>
                <div className="w-full text-2xl font-semibold">
                  {title}
                </div>
                <div className="text-sm">{content}</div>
              </div>
              <div className="flex justify-between">
                <div></div>
                <div className=" text-neutral-400 text-sm">
                  {nowMemberCount}/{maxGroupSize}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ClubCard;

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
          className="cursor-pointer flex w-full shadow-cms bg-white rounded-xl h-[260px] items-center justify-center px-2"
        >
          <div className="aspect-square flex w-full h-full items-center relative overflow-hidden rounded-xl">
            <img
              className="rounded-md w-[219px] h-[219px]"
              src={thumbnail}
              alt="clubThumbnail"
            />
          </div>
          <div className="flex flex-col gap-4 w-full h-full pl-4 pr-2 py-6">
            <div className="flex justify-between text-xs text-orange-400">
              <div className="flex gap-2">
                {tag.map((tag) => {
                  return (
                    <div className="rounded-full border-2 px-2 py-1 border-orange-400">
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex h-full justify-between flex-col">
              <div>
                <div className="border-b-[1.5px] border-black w-full text-2xl font-bold">
                  {title}
                </div>
                <div className="text-sm">{content}</div>
              </div>
              <div className=" text-neutral-400 text-sm">
                {nowMemberCount} / {maxGroupSize}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => navigate(`/oneday/${id}`)}
          className="cursor-pointer bg-white flex w-full shadow-cm rounded-xl h-[260px] items-center justify-center px-2"
        >
          <div className="aspect-square flex w-full h-full items-center relative overflow-hidden rounded-xl">
            <img
              className="rounded-md w-[219px] h-[219px]"
              src={thumbnail}
              alt="clubThumbnail"
            />
          </div>
          <div className="flex flex-col gap-4 w-full h-full pl-4 pr-2 py-6">
            <div className="flex justify-between text-xs text-green-400">
              <div className="flex gap-2">
                {tag?.map((tag) => {
                  return (
                    <div className="rounded-full border-2 px-2 py-1 border-green-400">
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex h-full justify-between flex-col">
              <div>
                <div className="border-b-[1.5px] border-black w-full text-2xl font-bold">
                  {title}
                </div>
                <div className="text-sm">{content}</div>
              </div>
              <div className=" text-neutral-400 text-sm">
                {nowMemberCount} / {maxGroupSize}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ClubCard;

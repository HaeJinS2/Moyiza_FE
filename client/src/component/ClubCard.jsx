import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartCheckbox } from "./HeartCheckBox";
import { deleteAPI, postAPI } from "../axios";
// import swal from 'sweetalert'

function ClubCard({
  tag,
  title,
  content,
  thumbnail,
  id,
  maxGroupSize,
  nowMemberCount,
  page,
  isLikedByUser,
}) {

  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const likeClubBtn = (e) => {
    if (!checked) {
      postAPI(`/club/${id}/like`, {}).then((res) => {
        // swal("포스트!")
        setChecked(e);
        console.log(res)
      }).catch((err) => console.log(err))
    } else {
      deleteAPI(`/club/${id}/like`, {}).then((res) => {
        // swal("딜리트!")
        setChecked(e);
        console.log(res)
      }).catch((err) => console.log(err))
    }
  }

  const likedOnedayBtn = (e) => {
    if (!checked) {
      postAPI(`/oneday/${id}/like`, {}).then((res) => {
        // swal("포스트!")
        setChecked(e);
        console.log(res)
      }).catch((err) => console.log(err))
    } else {
      deleteAPI(`/oneday/${id}/like`, {}).then((res) => {
        // swal("딜리트!")
        setChecked(e);
        console.log(res)
      }).catch((err) => console.log(err))
    }
  }


  useEffect(() => {
    setChecked(isLikedByUser)
  }, [isLikedByUser])

  return (
    <>
      {page === "club" ? (
        <div className=" w-[544px] h-[263px] relative ">
          <div className="absolute top-5 right-0">
            <HeartCheckbox
              likeBtn={likeClubBtn}
              checked={checked}
              setChecked={setChecked}
            />
          </div>
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
                <div className="flex gap-2 items-center">
                  {tag.map((tag) => {
                    return (
                      <div className="rounded-full border-[1px] px-2 py-1 max-h-[25px] border-orange-400">
                        {tag}
                      </div>
                    );
                  })}
                </div>
                <div>

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
        </div>
      ) : (
        <div className=" w-[544px] h-[263px] relative ">
          <div className="absolute top-5 right-0">
            <HeartCheckbox
              likeBtn={likedOnedayBtn}
              checked={checked}
              setChecked={setChecked}
            />
          </div>
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
        </div>
      )}
    </>
  );
}

export default ClubCard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartCheckbox } from "./HeartCheckBox";
import { deleteAPI, postAPI } from "../axios";
import { AnimatePresence, motion } from "framer-motion";
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
  imageList,
}) {
  const [checked, setChecked] = useState(false);
  // eslint-disable-next-line
  const [imageArr, setImageArr] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const [progressEventPage, setProgressEventPage] = useState(0);
  const [progressTuple, setProgressTuple] = useState([null, progressEventPage]);

  if (progressTuple[1] !== progressEventPage) {
    setProgressTuple([progressTuple[1], progressEventPage]);
  }
  let progressPrev = progressTuple[0];
  let progressDirection = progressEventPage > progressPrev ? 1 : -1;

  const navigate = useNavigate();

  useEffect(() => {
    setImageArr(
      imageList?.length > 0
        ? [...imageList]
        : [`${process.env.PUBLIC_URL}/images/favicon.png`]
    );
  }, [imageList]);

  const likeClubBtn = (e) => {
    if (!checked) {
      postAPI(`/club/${id}/like`, {})
        .then((res) => {
          // swal("포스트!")
          setChecked(e);
        })
        .catch((err) => console.log(err));
    } else {
      deleteAPI(`/club/${id}/like`, {})
        .then((res) => {
          // swal("딜리트!")
          setChecked(e);
        })
        .catch((err) => console.log(err));
    }
  };

  const likedOnedayBtn = (e) => {
    if (!checked) {
      postAPI(`/oneday/${id}/like`, {})
        .then((res) => {
          // swal("포스트!")
          setChecked(e);
        })
        .catch((err) => console.log(err));
    } else {
      deleteAPI(`/oneday/${id}/like`, {})
        .then((res) => {
          // swal("딜리트!")
          setChecked(e);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    setChecked(isLikedByUser);
  }, [isLikedByUser]);

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
            className="cursor-pointer flex items-center border bg-white rounded-2xl  w-[544px] h-[263px]"
          >
            <div className="flex justify-center w-[500px] h-[277px] text-black items-center overflow-hidden relative">
              <AnimatePresence custom={progressDirection}>
                <motion.div
                  key={progressEventPage}
                  variants={varients}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={progressDirection}
                  transition={{ duration: 0.5 }}
                  className={`h-[200px] absolute top-0 right-0 flex z-10 justify-center items-center w-full `}
                >
                  {imageArr
                    ?.slice(progressEventPage * 1, progressEventPage * 1 + 1)
                    .map((item) => {
                      return (
                        <img
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                          className="aspect-square  object-cover  w-[197px] h-[197px] bg-[#747474] rounded-2xl relative top-9"
                          src={item}
                          alt="reviewImg"
                        />
                      );
                    })}
                  {/* <img
                    className="aspect-square rounded-2xl w-[197px] h-[197px] object-cover mr-6"
                    src={thumbnail}
                    alt="clubThumbnail"
                  /> */}
                </motion.div>
              </AnimatePresence>

              <button
                style={{ opacity: isHovered ? 1 : 0 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-[30px] absolute left-8 top-[120px] z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setProgressEventPage(
                    progressEventPage === 0
                      ? imageArr.length - 1
                      : progressEventPage - 1
                  );
                }}
              >
                <img
                  className="opacity-80"
                  alt="prev_button"
                  src={`${process.env.PUBLIC_URL}/images/prev_button.svg`}
                />
              </button>

              <button
                style={{ opacity: isHovered ? 1 : 0 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-[30px] absolute right-8 top-[120px] z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setProgressEventPage(
                    progressEventPage === imageArr.length - 1
                      ? 0
                      : progressEventPage + 1
                  );
                }}
              >
                <img
                  className="opacity-80"
                  alt="next_button"
                  src={`${process.env.PUBLIC_URL}/images/next_button.svg`}
                />
              </button>
            </div>
            {/* <img
              className="aspect-square rounded-2xl w-[197px] h-[197px] object-cover mr-6"
              src={thumbnail}
              alt="clubThumbnail"
            /> */}
            <div className="flex flex-col gap-4 w-full h-[197px] overflow-hidden">
              <div className="flex justify-between text-xs text-[#FF7F1D]">
                <div className="flex gap-2 items-center">
                  {tag.map((tag) => {
                    return (
                      <div className="rounded-full border-[1px] px-2 py-1 max-h-[25px] border-[#FF7F1D]">
                        {tag}
                      </div>
                    );
                  })}
                </div>
                <div></div>
              </div>
              <div className="flex h-full justify-between flex-col pr-6">
                <div>
                  <div className="w-full text-2xl font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {title}
                  </div>
                  <div className="text-sm">
                    {content.length > 150 ? (
                      <>
                        {content
                          .slice(0, 150)
                          .split("\n")
                          .map((line, index) => {
                            return (
                              <span key={index}>
                                {line}
                                <br />
                              </span>
                            );
                          })}
                      </>
                    ) : (
                      content
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div></div>
                  <div className=" text-neutral-400 text-sm flex gap-1 items-center">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/club_card_people.svg`}
                      className="w-[14px] h-[14px]"
                      alt="club_card_people"
                    />
                    <p>
                      {nowMemberCount}/{maxGroupSize}
                    </p>
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
            className="cursor-pointer flex items-center border bg-white rounded-2xl  w-[544px] h-[263px]"
          >
            <div className="flex justify-center w-[500px] h-[277px] text-black items-center overflow-hidden relative">
              <AnimatePresence custom={progressDirection}>
                <motion.div
                  key={progressEventPage}
                  variants={varients}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={progressDirection}
                  transition={{ duration: 0.5 }}
                  className={`h-[200px] absolute top-0 right-0 flex z-10 justify-center items-center w-full `}
                >
                  {imageArr
                    ?.slice(progressEventPage * 1, progressEventPage * 1 + 1)
                    .map((item) => {
                      return (
                        <img
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                          className="aspect-square  object-cover  w-[197px] h-[197px] bg-[#747474] rounded-2xl relative top-9"
                          src={item}
                          alt="reviewImg"
                        />
                      );
                    })}
                  {/* <img
      className="aspect-square rounded-2xl w-[197px] h-[197px] object-cover mr-6"
      src={thumbnail}
      alt="clubThumbnail"
    /> */}
                </motion.div>
              </AnimatePresence>

              <button
                style={{ opacity: isHovered ? 1 : 0 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-[30px] absolute left-8 top-[120px] z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setProgressEventPage(
                    progressEventPage === 0
                      ? imageArr.length - 1
                      : progressEventPage - 1
                  );
                }}
              >
                <img
                  className="opacity-80"
                  alt="prev_button"
                  src={`${process.env.PUBLIC_URL}/images/prev_button.svg`}
                />
              </button>

              <button
                style={{ opacity: isHovered ? 1 : 0 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-[30px] absolute right-8 top-[120px] z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setProgressEventPage(
                    progressEventPage === imageArr.length - 1
                      ? 0
                      : progressEventPage + 1
                  );
                }}
              >
                <img
                  className="opacity-80"
                  alt="next_button"
                  src={`${process.env.PUBLIC_URL}/images/next_button.svg`}
                />
              </button>
            </div>
            {/* <img
              className="aspect-square rounded-2xl w-[197px] h-[197px] object-cover mr-6"
              src={thumbnail}
              alt="clubThumbnail"
            /> */}
            {/* <div className="flex flex-col gap-4 w-full h-full">
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
        </div> */}

            <div className="flex flex-col gap-4 w-full h-[197px] overflow-hidden">
              <div className="flex justify-between text-xs text-[#0BB159]">
                <div className="flex gap-2 items-center">
                  {tag.map((tag) => {
                    return (
                      <div className="rounded-full border-[1px] px-2 py-1 max-h-[25px] border-[#0BB159]">
                        {tag}
                      </div>
                    );
                  })}
                </div>
                <div></div>
              </div>
              <div className="flex h-full justify-between flex-col pr-6">
                <div>
                  <div className="w-full text-2xl font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {title}
                  </div>
                  <div className="text-sm">
                    {content.length > 150 ? (
                      <>
                        {content
                          .slice(0, 150)
                          .split("\n")
                          .map((line, index) => {
                            return (
                              <span key={index}>
                                {line}
                                <br />
                              </span>
                            );
                          })}
                      </>
                    ) : (
                      content
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div></div>
                  <div className=" text-neutral-400 text-sm flex gap-1 items-center">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/club_card_people.svg`}
                      className="w-[14px] h-[14px]"
                      alt="club_card_people"
                    />
                    <p>
                      {nowMemberCount}/{maxGroupSize}
                    </p>
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
let varients = {
  enter: (direction) => ({ x: direction * 700 }),
  center: { x: 0 },
  exit: (direction) => ({ x: direction * -700 }),
};

export default ClubCard;

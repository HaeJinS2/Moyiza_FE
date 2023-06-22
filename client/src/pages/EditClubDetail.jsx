import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAPI } from "../axios";

function EditClubDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [club, setClub] = useState("");
  const [categoryAndTagList, setCategoryAndTagList] = useState({});
  const [activatedFilterCategory, setActivatedFilterCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const {
    // eslint-disable-next-line
    isLoading,
    // eslint-disable-next-line
    isError,
    data: clubDetail,
  } = useQuery("getDetailClub", () => getAPI(`/club/${id}`), {
    onSuccess: (res) => {
      console.log(res.data);
      setClub(res.data);
      setActivatedFilterCategory(res.data.clubCategory);
      setSelectedTags(res.data.clubTag);
    },
    refetchOnWindowFocus: false, // refetchOnWindowFocus 옵션을 false로 설정
  });

  useEffect(() => {
    // 클럽 카테고리를 가져오는 코드
    getAPI(`/enums`)
      .then((res) => {
        setCategoryAndTagList(res.data.categoryAndTagList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClubChange = (property) => (e) => {
    setClub({ ...club, [property]: e.target.value });
  };

  const handleTagClick = (tag) => {
    let updatedTags;
    // 이미 선택된 태그를 다시 클릭했을 경우 배열에서 해당 태그 제거
    if (selectedTags.includes(tag)) {
      updatedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
    } else {
      updatedTags = [...selectedTags, tag];
      // 최대 3개의 태그만 선택 가능
      if (updatedTags.length > 3) {
        updatedTags.shift();
      }
    }

    setSelectedTags(updatedTags);
  };

  return (
    <>
      <div className="w-[1280px] flex flex-col justify-center items-center mx-auto">
        <header className="flex pt-40 flex-col h-auto items-center w-[1140px] justify-center">
          <div className="w-full flex flex-col">
            <div className="flex justify-between w-full items-center mb-[20px]">
              <button onClick={() => navigate(-1)}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/prev_button.svg`}
                  alt="previous_button"
                />
              </button>
              <div className="font-bold text-[2rem] ">
                {clubDetail?.data.clubTitle}
              </div>

              <div className="h-[60px] w-[60px]" />
            </div>
          </div>
        </header>

        <body className="flex flex-col h-auto items-center w-[1140px] justify-center">
          {/* 클럽명 수정 */}
          <div className="flex items-center w-full ">
            <div className="w-[75px]">클럽명</div>
            <input
              value={club.clubTitle}
              onChange={handleClubChange("clubTitle")}
              className="border-[2px] border-black "
            />
          </div>

          {/* 사진 수정 */}

          {/* 클럽 조건 수정 */}
          <div className="flex w-full ">
            <div className="w-[75px]">클럽조건</div>
            <div>
              <div className="flex gap-1">
                <div>성별</div>
                <div>{club.genderPolicy}</div>
              </div>
              <div className="flex gap-1">
                <div>나이</div>
                <div>{club.agePolicy}</div>
              </div>
              <div className="flex gap-1">
                <div>인원</div>
                <div>{club.maxGroupSize}</div>
              </div>
            </div>
          </div>

          {/* 클럽 태그 수정 */}
          <div className="flex w-full ">
            <div className="w-[75px]">태그</div>
            <div>
              <div className="flex flex-col">
                <div className="flex">{selectedTags.map((item) => item)}</div>
                <div>
                  <div className="flex justify-between mb-2">
                    {Object.keys(categoryAndTagList).map((category) => {
                      return (
                        <button
                          className={`${
                            activatedFilterCategory === category
                              ? "bg-[#FF7F1D] rounded-full text-white px-2"
                              : " px-2 py-1"
                          } text-[1rem] font-semibold flex items-center w-[75px] justify-center gap-1`}
                          onClick={() => {
                            setActivatedFilterCategory(category);
                          }}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                  {activatedFilterCategory && (
                    <div className="grid grid-cols-8 gap-1">
                      {categoryAndTagList[activatedFilterCategory]?.map(
                        (tag) => {
                          return (
                            <button
                              onClick={() => handleTagClick(tag)}
                              className={`${
                                selectedTags.includes(tag)
                                  ? "text-[#FF7F1D] border-2 border-[#FF7F1D]"
                                  : "border-2 border-white"
                              } rounded-full px-1 py-[1px]`}
                            >
                              {tag}
                            </button>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 클럽 소개 수정 */}
          <div className="flex w-full">
            <div className="w-[75px]">클럽소개</div>
            <textarea
              value={club.clubContent}
              onChange={handleClubChange("clubContent")}
              className="border-[2px] resize-none border-black"
            />
          </div>
          {/* 모임 규칙 수정 */}
          <div className="flex w-full">
            <div className="w-[75px]">모임규칙</div>
            <textarea
              value={club.clubRule}
              onChange={handleClubChange("clubRule")}
              className="border-[2px] resize-none border-black"
            />
          </div>

          {/* 멤버 */}
          <div className="flex w-full">
            <div className="w-[75px]">멤버</div>
            <div className="grid grid-cols-2">
              <div>멤버1</div>
              <div>멤버2</div>
            </div>
          </div>
        </body>
      </div>
    </>
  );
}

export default EditClubDetail;

import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { clubState, optionState } from "../states/clubState";
import { postAPI, putAPI, filePutAPI } from "../axios";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import imageCompression from "browser-image-compression";
import {
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  Step7,
  Step8,
} from "../component/createclubform/Steps.jsx";
import Navbar from "../component/Navbar";
import swal from "sweetalert";
import { reloadChatStates } from "../states/chatState";
function CreateClubForm() {
  const [club, setClub] = useRecoilState(clubState);
  // const [tempId, setTempId] = useRecoilState(tempIdState);
  const [option, setOption] = useRecoilState(optionState);

  const [progress] = useState(0);

  // const [categoryInput] = useState(club.clubCategory || '');
  const [selectedCategory, setSelectedCategory] = useState(
    club?.clubCategory || ""
  );
  // const [selectedTag, setSelectedTag] = useState(club?.clubTag || '');

  // 내가 선택한 태그
  const [selectedTag, setSelectedTag] = useState(club?.clubTag || []);

  // 카테고리 선택에 따른 태그
  const [selectedTags, setSelectedTags] = useState(club?.clubTag || []);

  const [selectedGenderPolicy, setSelectedGenderPolicy] = useState(
    club?.genderPolicy || ""
  );

  const [tagInput1, setTagInput1] = useState(
    club?.clubTag == null ? "" : club?.clubTag[0]
  );
  const [tagInput2, setTagInput2] = useState(
    club?.clubTag == null ? "" : club?.clubTag[1]
  );
  const [tagInput3, setTagInput3] = useState(
    club?.clubTag == null ? "" : club?.clubTag[2]
  );

  const [titleInput, setTitleInput] = useState(club?.clubTitle || "");
  const [contentInput, setContentInput] = useState(club?.clubContent || "");
  const [restrictionInput, setRestrictionInput] = useState(
    club?.genderPolicy == null ? "" : club.genderPolicy
  );
  const [restrictionInput2, setRestrictionInput2] = useState(
    club?.agePolicy == null ? "" : club.agePolicy
  );
  const [agePolicy, setAgePolicy] = useState(
    club?.agePolicy == null ? { x: 15 } : { x: club.agePolicy }
  );
  const [maxGroupSize, setMaxGroupSize] = useState(
    club?.maxGroupSize == null ? { x: 5 } : { x: club?.maxGroupSize }
  );

  const [selectedFile, setSelectedFile] = useState(club?.thumbnailUrl || "");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [preview, setPreview] = useState(null);
  // eslint-disable-next-line
  const [reloadChatState, setReloadChatState] =
    useRecoilState(reloadChatStates);

  // const [maxGroupSize, setMaxGroupSize] = useState(club.maxGroupSize || "")
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  useEffect(() => {
    if (selectedCategory) {
      setStep(2);
    } else {
      setStep(1);
      return;
    }
    if (tagInput1 || tagInput2 || tagInput3) {
      setStep(3);
    } else {
      setStep(2);
      return;
    }
    if (titleInput) {
      setStep(4);
    } else {
      setStep(3);
      return;
    }
    if (contentInput && selectedFile) {
      setStep(5);
    } else {
      setStep(4);
      return;
    }
    if (agePolicy && selectedGenderPolicy) {
      setStep(6);
    } else {
      setStep(5);
      return;
    }
    if (maxGroupSize) {
      setStep(7);
    } else {
      setStep(6);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (option.categoryLists && club.clubCategory in option.categoryLists) {
      setSelectedTags(option.categoryLists[club.clubCategory]);
    } else {
      setSelectedTags([]);
    }
  }, [club.clubCategory, option.categoryLists]);

  const nextStep = () => {
    if (step === 1) {
      handleCategory();
    } else if (step === 2) {
      handleTag();
    } else if (step === 3) {
      handleTitle();
    } else if (step === 4) {
      handleContent();
    } else if (step === 5) {
      handleRestriction();
    } else if (step === 6) {
      handleMaxGroupSize();
    }
    // setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const handleTagClick = (tag) => {
    if (!selectedTag.includes(tag)) {
      if (selectedTag.length >= 3) {
        setSelectedTag((prevTags) => [...prevTags.slice(1), tag]);
      } else {
        setSelectedTag((prevTags) => [...prevTags, tag]);
      }
    } else {
      setSelectedTag(selectedTag.filter((selectedTag) => selectedTag !== tag));
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };
  const handleTagChange1 = (event) => {
    setTagInput1(event.target.value);
  };

  const handleTagChange2 = (event) => {
    setTagInput2(event.target.value);
  };

  const handleTagChange3 = (event) => {
    setTagInput3(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitleInput(event.target.value);
  };
  const handleContentChange = (event) => {
    setContentInput(event.target.value);
  };
  const handleRestrictionChange = (event) => {
    setRestrictionInput(event.target.value);
  };
  const handleRestrictionChange2 = (event) => {
    setRestrictionInput2(event.target.value);
  };
  const handleAgePolicyChange = (value) => {
    setAgePolicy({ x: parseFloat(value.x.toFixed(2)) });
  };
  const handleMaxGroupSizeChange = (value) => {
    setMaxGroupSize({ x: parseFloat(value.x.toFixed(2)) });
  };

  const handleCategory = () => {
    const url = `/club/create/${club.createclub_id}/category`;
    const data = selectedCategory;

    if (!selectedCategory) {
      swal("관심사를 선택해주세요!");
      return;
    }

    putAPI(url, { category: data })
      .then((response) => {
        setClub({ ...club, clubCategory: data });
        setOption({
          ...option,
          tagLists: response.data.tagOptions,
        });
        setStep(step + 1);
      })
      .catch((error) => {
        console.error(error);
        swal(error.response.data.message);
      });
  };

  const handleTag = () => {
    const url = `/club/create/${club.createclub_id}/tag`;
    const tagsArray = selectedTag;

    if (selectedTag.length === 0) {
      swal("카테고리를 하나 이상 선택해주세요!(최대 3개)");
      return;
    }

    putAPI(url, {
      tag: tagsArray,
    })
      .then((response) => {
        setClub({ ...club, tagString: tagsArray });
        setStep(step + 1);
      })
      .catch((error) => {
        console.error(error);
        swal(error.response.data.message);
      });
  };
  const handleTitle = () => {
    const url = `/club/create/${club.createclub_id}/title`;
    const data = titleInput;

    if (!titleInput) {
      swal("제목을 입력해주세요!");
      return;
    }

    putAPI(url, {
      title: data,
    })
      .then((response) => {
        setClub({ ...club, clubTitle: data });
        setStep(step + 1);
      })
      .catch((error) => {
        console.error(error);
        swal(error.response.data.message);
      });
  };

  const handleContent = () => {
    const url = `/club/create/${club.createclub_id}/content`;
    const data = contentInput;

    if (!contentInput) {
      swal("내용을 입력해주세요!");
      return;
    }
    if (!selectedFile) {
      swal("사진을 등록해주세요!");
      return;
    }

    putAPI(url, {
      content: data,
    })
      .then((response) => {
        setClub({ ...club, content: data });
        setStep(step + 1);
      })
      .catch((error) => {
        console.error(error);
        swal(error.response.data.message);
      });
  };

  const handleRestriction = () => {
    const url = `/club/create/${club.createclub_id}/policy`;
    // const data = restrictionInput;
    const restrictionObj = {
      genderPolicy: selectedGenderPolicy,
      agePolicy: Number(agePolicy.x),
    };

    if (!selectedGenderPolicy) {
      swal("성별을 입력해주세요!");
      return;
    }
    if (!agePolicy.x) {
      swal("나이를 입력해주세요!");
      return;
    }

    putAPI(url, restrictionObj)
      .then((response) => {
        setClub({ ...club, policy: restrictionObj });
        setStep(step + 1);
      })
      .catch((error) => {
        console.error(error);
        // setStep(step + 1);
        swal(error.response.data.message);
      });
  };
  const handleMaxGroupSize = () => {
    const url = `/club/create/${club.createclub_id}/maxgroupsize`;
    // const data = restrictionInput;
    const data = { maxGroupSize: Number(maxGroupSize.x) };

    if (!maxGroupSize.x) {
      swal("최대인원을 입력해주세요!");
      return;
    }

    putAPI(url, data)
      .then((response) => {
        setClub({ ...club, maxGroupSize: data });
        setStep(step + 1);
      })
      .catch((error) => {
        console.error(error);
        // setStep(step + 1);
        swal(error.response.data.message);
      });
  };
  const handleSubmit = () => {
    postAPI(`/club/create/${club.createclub_id}/confirm`, {})
      .then((response) => {
        setReloadChatState(true);
        setClub({});
        setStep(step + 1);
      })
      .catch((error) => {
        swal(error.response.data.message);
      });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFileName(file.name);
    setSelectedFile(file);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 300,
      useWebWorker: true,
    };

    try {
      const resizingFile = await imageCompression(file, options);
      setSelectedFile(resizingFile);
      let reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
      };
      if (resizingFile) {
        reader.readAsDataURL(resizingFile);
      }

      event.preventDefault();
      const formData = new FormData();

      if (resizingFile) {
        formData.append("image", resizingFile);
      }

      filePutAPI(`/club/create/${club.createclub_id}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: [
          function () {
            return formData;
          },
        ],
      }).then((response) => {
        if (response.status === 200) {
          // navigate("../Community");
          // 글 등록 시 새로고침
          // window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
    // setSelectedFile(null);
  };

  return (
    <>
      <Navbar />
      {step === 1 && (
        <Step1
          nextStep={nextStep}
          progress={progress}
          option={option}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
      )}
      {step === 2 && (
        <Step2
          nextStep={nextStep}
          prevStep={prevStep}
          progress={progress}
          handleTagClick={handleTagClick}
          option={option}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          tagInput1={tagInput1}
          tagInput2={tagInput2}
          tagInput3={tagInput3}
          handleTagChange={handleTagChange}
          handleTagChange1={handleTagChange1}
          handleTagChange2={handleTagChange2}
          handleTagChange3={handleTagChange3}
        />
      )}
      {step === 3 && (
        <Step3
          nextStep={nextStep}
          prevStep={prevStep}
          progress={progress}
          titleInput={titleInput}
          handleTitleChange={handleTitleChange}
        />
      )}
      {step === 4 && (
        <Step4
          nextStep={nextStep}
          prevStep={prevStep}
          progress={progress}
          preview={preview}
          selectedFile={selectedFile}
          selectedFileName={selectedFileName}
          handleFileChange={handleFileChange}
          contentInput={contentInput}
          handleContentChange={handleContentChange}
        />
      )}
      {step === 5 && (
        <Step5
          nextStep={nextStep}
          prevStep={prevStep}
          progress={progress}
          selectedGenderPolicy={selectedGenderPolicy}
          setSelectedGenderPolicy={setSelectedGenderPolicy}
          option={option}
          agePolicy={agePolicy}
          handleAgePolicyChange={handleAgePolicyChange}
          restrictionInput={restrictionInput}
          restrictionInput2={restrictionInput2}
          handleRestrictionChange={handleRestrictionChange}
          handleRestrictionChange2={handleRestrictionChange2}
        />
      )}
      {step === 6 && (
        <Step6
          nextStep={nextStep}
          prevStep={prevStep}
          progress={progress}
          maxGroupSize={maxGroupSize}
          handleMaxGroupSizeChange={handleMaxGroupSizeChange}
          handleMaxGroupSize={handleMaxGroupSize}
        />
      )}
      {step === 7 && (
        <Step7
          prevStep={prevStep}
          progress={progress}
          titleInput={titleInput}
          handleSubmit={handleSubmit}
        />
      )}
      {step === 8 && (
        <Step8
          titleInput={titleInput}
          navigate={navigate}
          prevStep={prevStep}
          progress={progress}
          handleSubmit={handleSubmit}
        />
      )}

      <div className="fixed inset-x-0 bottom-[300px] z-10 flex justify-center items-center">
        <div className="w-[1140px] h-[20px]">
          <LinearProgress variant="determinate" value={(step / 8) * 100} />
        </div>
      </div>
    </>
  );
}

export default CreateClubForm;

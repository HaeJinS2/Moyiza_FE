import React, { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { clubState, optionState } from '../states/clubState';
import { postAPI, putAPI, filePutAPI } from "../axios";
import Container from "../component/Container";
import Slider from 'react-input-slider';
import { useNavigate } from "react-router-dom";
import { LinearProgress } from '@mui/material'


// 카테고리(대분류)
const Step1 = ({ nextStep, progress, handleCategoryChange, categoryInput, option, setSelectedCategory, selectedCategory }) => {

    return (
        <Container>
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                {/* <input type="text" value={categoryInput} onChange={handleCategoryChange} /> */}
                <div>
                    <div className="grid grid-cols-4 gap-4 w-[1200px] h-32 mb-4">
                        {option.categoryLists.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedCategory(category)}
                                className={`${selectedCategory === category ? 'bg-[#b54e5d] text-white w-full h-32' : 'bg-[#FB7185] text-white w-full h-32'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <button className=" w-[1200px] h-32 bg-[#FB7185]" onClick={nextStep}>다음</button>
                    </div>
                </div>
            </section>
        </Container>
    )
}

// 태그(소분류)
const Step2 = ({ nextStep, prevStep, handleTagClick, progress, handleTagChange, selectedTag, option, setSelectedTag, handleTagChange1, handleTagChange2, handleTagChange3, tagInput1, tagInput2, tagInput3 }) => {

    return (
        <Container>
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                <div>
                    <input type="text" value={tagInput1} onChange={handleTagChange1} placeholder="Tag 1" />
                    <input type="text" value={tagInput2} onChange={handleTagChange2} placeholder="Tag 2" />
                    <input type="text" value={tagInput3} onChange={handleTagChange3} placeholder="Tag 3" />

                    <div className="grid grid-cols-4 gap-4 w-[1200px] h-32 mb-4">
                        {option.tagLists.map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => handleTagClick(tag)}
                                className={`${selectedTag.includes(tag) ? 'bg-[#b54e5d] text-white w-full h-32' : 'bg-[#FB7185] text-white w-full h-32'}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-x-4">
                    <button className=" w-[600px] h-32 bg-[#FB7185]" onClick={prevStep}>이전</button>
                    <button className=" w-[600px] h-32 bg-[#FB7185]" onClick={nextStep}>다음</button>
                </div>
            </section>
        </Container>

    )
}

// 클럽 이름
const Step3 = ({ nextStep, prevStep, progress, handleTitleChange, titleInput }) => {

    return (
        <>
            <Container>
                <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                    클럽이름
                    <div>
                        <input type="text" value={titleInput} onChange={handleTitleChange} />
                    </div>
                    <div>
                        <button onClick={prevStep}>이전</button>
                        <button onClick={nextStep}>다음</button>
                    </div>
                </section>
            </Container>
        </>
    )
}

// 클럽사진 + 클럽내용
const Step4 = ({ nextStep, prevStep, progress, preview, handleFileChange, handleContentChange, contentInput }) => {

    return (
        <Container>
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                사진
                <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                />
                {preview && (
                    <img className="w-[70px] h-[70px]" src={preview} alt="preview" />
                )}
                <br />
                클럽내용
                <div>
                    <input type="text" value={contentInput} onChange={handleContentChange} />
                    <button onClick={prevStep}>이전</button>
                    <button onClick={nextStep}>다음</button>
                </div>
            </section>
        </Container>
    )
}

// 성별제한 + 연령제한
const Step5 = ({ nextStep, prevStep, progress, selectedGenderPolicy, setSelectedGenderPolicy, option, handleAgePolicyChange, agePolicy, handleRestrictionChange, handleRestrictionChange2, restrictionInput, restrictionInput2 }) => {
    return (
        <Container>
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                <div>
                    {/* <input type="text" value={restrictionInput} onChange={handleRestrictionChange} /> */}
                    {/* <input type="text" value={restrictionInput2} onChange={handleRestrictionChange2} /> */}
                    <div className="flex gap-10">
                        {option.genderPolicyLists.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedGenderPolicy(category)}
                                style={{ backgroundColor: selectedGenderPolicy === category ? '#7099F8' : 'white' }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div>{'몇살부터?: ' + agePolicy.x}</div>
                    {agePolicy && (
                        <Slider
                            axis="x"
                            xstep={5}
                            xmin={20}
                            xmax={50}
                            x={agePolicy.x}
                            onChange={({ x }) => handleAgePolicyChange({ x: parseFloat(x.toFixed(2)) })}
                        />
                    )}
                    <button onClick={prevStep}>이전</button>
                    <button onClick={nextStep}>다음</button>
                </div>
            </section>
        </Container>
    )
}

// 인원제한
const Step6 = ({ nextStep, prevStep, progress, handleMaxGroupSizeChange, maxGroupSize }) => {
    return (
        <Container>
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                인원제한
                <div>
                    {/* <input type="text" value={maxGroupSize} onChange={handleMaxGroupSizeChange} /> */}
                    <div>{'몇명까지?: ' + maxGroupSize.x}</div>
                    {maxGroupSize && (
                        <Slider
                            axis="x"
                            xstep={1}
                            xmin={20}
                            xmax={100}
                            x={maxGroupSize.x}
                            onChange={({ x }) => handleMaxGroupSizeChange({ x: parseFloat(x.toFixed(2)) })}
                        />
                    )}
                </div>
                <div>
                    <button onClick={prevStep}>이전</button>
                    <button onClick={nextStep}>다음</button>
                </div>
            </section>
        </Container>
    )
}

// 완료
const Step7 = ({ prevStep, progress, handleSubmit }) => {
    return (
        <Container>
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                <div>
                    <button onClick={prevStep}>이전</button>
                    <button onClick={handleSubmit}>제출</button>
                </div>
            </section>
        </Container>
    )
}

function CreateClubForm() {
    const [club, setClub] = useRecoilState(clubState);
    // const [tempId, setTempId] = useRecoilState(tempIdState);
    const [option, setOption] = useRecoilState(optionState);

    const [progress] = useState(0);

    // const [categoryInput] = useState(club.clubCategory || '');
    const [selectedCategory, setSelectedCategory] = useState(club?.clubCategory || '');
    const [selectedTag, setSelectedTag] = useState(club?.clubTag || '');
    const [selectedGenderPolicy, setSelectedGenderPolicy] = useState(club?.genderPolicy || '');

    const [tagInput1, setTagInput1] = useState(club?.clubTag == null ? "" : club?.clubTag[0]);
    const [tagInput2, setTagInput2] = useState(club?.clubTag == null ? "" : club?.clubTag[1]);
    const [tagInput3, setTagInput3] = useState(club?.clubTag == null ? "" : club?.clubTag[2]);

    const [titleInput, setTitleInput] = useState(club?.clubTitle || '');
    const [contentInput, setContentInput] = useState(club?.clubContent || '');
    const [restrictionInput, setRestrictionInput] = useState(club?.genderPolicy == null ? '' : club.genderPolicy);
    const [restrictionInput2, setRestrictionInput2] = useState(club?.agePolicy == null ? '' : club.agePolicy);
    const [agePolicy, setAgePolicy] = useState(club?.agePolicy == null ? { x: 20 } : { x: club.agePolicy });
    const [maxGroupSize, setMaxGroupSize] = useState(club?.maxGroupSize == null ? { x: 1 } : { x: club.maxGroupSize });

    const [selectedFile, setSelectedFile] = useState(club?.thumbnailUrl || '');
    const [selectedFileName, setSelectedFileName] = useState("");
    const [preview, setPreview] = useState(null);
    console.log(selectedGenderPolicy)
    // const [maxGroupSize, setMaxGroupSize] = useState(club.maxGroupSize || "")
    const navigate = useNavigate();
    console.log("option", option)
    console.log(club)
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (selectedCategory) {
            setStep(2)
        } else {
            setStep(1)
            return
        }
        if (tagInput1 && tagInput2 && tagInput3) {
            setStep(3)
        } else {
            setStep(2)
            return
        }
        if (titleInput) {
            setStep(4)
        } else {
            setStep(3)
            return
        }
        if (contentInput && selectedFile) {
            setStep(5)
        } else {
            setStep(4)
            return
        }
        if (agePolicy && selectedGenderPolicy) {
            setStep(6)
        } else {
            setStep(5)
            return
        }
        if (maxGroupSize) {
            setStep(7)
        } else {
            setStep(6)
            return
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(selectedFile)
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
        setStep(step - 1)
    }


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
        setMaxGroupSize({ x: parseFloat(value.x.toFixed(2)) })
    }

    const handleCategory = () => {
        const url = `/club/create/${club.createclub_id}/category`;
        const data = selectedCategory;

        putAPI(url, { category: data })
            .then(response => {
                console.log(response);
                setClub({ ...club, clubCategory: data });
                setOption({
                    ...option,
                    tagLists: response.data.tagOptions
                })
                setStep(step + 1);
            })
            .catch(error => {
                console.error(error);
                alert("틀림")
            });
    };


    const handleTag = () => {
        const url = `/club/create/${club.createclub_id}/tag`;
        const tagsArray = selectedTag;

        putAPI(url, {
            tag: tagsArray,
        })
            .then(response => {
                console.log(response);
                setClub({ ...club, tagString: tagsArray });
                setStep(step + 1);
            })
            .catch(error => {
                console.error(error);
                alert("틀림")
            });

    };
    const handleTitle = () => {
        const url = `/club/create/${club.createclub_id}/title`;
        const data = titleInput;

        putAPI(url, {
            title: data,
        })
            .then(response => {
                console.log(response);
                setClub({ ...club, clubTitle: data });
                setStep(step + 1);
            })
            .catch(error => {
                console.error(error);
                alert("틀림")
            });

    };

    const handleContent = () => {
        const url = `/club/create/${club.createclub_id}/content`;
        const data = contentInput;

        putAPI(url, {
            content: data,
        })
            .then(response => {
                console.log(response);
                setClub({ ...club, content: data });
                setStep(step + 1);
            })
            .catch(error => {
                console.error(error);
                alert("틀림")
            });

    };

    const handleRestriction = () => {
        const url = `/club/create/${club.createclub_id}/policy`;
        // const data = restrictionInput;
        const restrictionObj = { genderPolicy: selectedGenderPolicy, agePolicy: Number(agePolicy.x) };

        putAPI(url,
            restrictionObj
        )
            .then(response => {
                console.log(response);
                setClub({ ...club, policy: restrictionObj });
                setStep(step + 1);
            })
            .catch(error => {
                console.error(error);
                // setStep(step + 1);
                alert("틀림")
            });

    };
    const handleMaxGroupSize = () => {
        const url = `/club/create/${club.createclub_id}/maxgroupsize`;
        // const data = restrictionInput;
        const data = { maxGroupSize: Number(maxGroupSize.x) }

        putAPI(url,
            data
        )
            .then(response => {
                console.log(response);
                setClub({ ...club, maxGroupSize: data });
                setStep(step + 1);

            })
            .catch(error => {
                console.error(error);
                // setStep(step + 1);
                alert("틀림")
            });

    };
    const handleSubmit = () => {
        postAPI(`/club/create/${club.createclub_id}/confirm`, {}).then((response) => {
            console.log(response)
            setClub({});
            navigate(`/`)
        }).catch((error) => {
            console.log(error)
        })
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFileName(file.name);
        setSelectedFile(file);

        let reader = new FileReader();

        reader.onloadend = () => {
            setPreview(reader.result);
        }
        if (file) {
            reader.readAsDataURL(file);
        }

        event.preventDefault();
        const formData = new FormData();

        if (file) {
            formData.append("image", file);
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
            console.log("response :: ", response);
            if (response.status === 200) {
                console.log("200");
                // navigate("../Community");
                // 글 등록 시 새로고침
                // window.location.reload();
            }
        });


        // setSelectedFile(null);
    };

    // switch (step) {
    //     case 1:
    //         return <Step1 nextStep={nextStep} progress={progress} option={option} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categoryInput={categoryInput} handleCategoryChange={handleCategoryChange} />;
    //     case 2:
    //         return <Step2 nextStep={nextStep} prevStep={prevStep} progress={progress} tagInput1={tagInput1} tagInput2={tagInput2} tagInput3={tagInput3} handleTagChange1={handleTagChange1} handleTagChange2={handleTagChange2} handleTagChange3={handleTagChange3} />;
    //     case 3:
    //         return <Step3 nextStep={nextStep} prevStep={prevStep} progress={progress} titleInput={titleInput} handleTitleChange={handleTitleChange} />;
    //     case 4:
    //         return <Step4 nextStep={nextStep} prevStep={prevStep} progress={progress} preview={preview} selectedFile={selectedFile} selectedFileName={selectedFileName} handleFileChange={handleFileChange} contentInput={contentInput} handleContentChange={handleContentChange} />;
    //     case 5:
    //         return <Step5 nextStep={nextStep} prevStep={prevStep} progress={progress}
    //             selectedGenderPolicy={selectedGenderPolicy}
    //             setSelectedGenderPolicy={setSelectedGenderPolicy}
    //             option={option}
    //             agePolicy={agePolicy} handleAgePolicyChange={handleAgePolicyChange}
    //             restrictionInput={restrictionInput} restrictionInput2={restrictionInput2}
    //             handleRestrictionChange={handleRestrictionChange} handleRestrictionChange2={handleRestrictionChange2} />;
    //     case 6:
    //         return <Step6 nextStep={nextStep} prevStep={prevStep} progress={progress} maxGroupSize={maxGroupSize} handleMaxGroupSizeChange={handleMaxGroupSizeChange} handleMaxGroupSize={handleMaxGroupSize} />;
    //     case 7:
    //         return <Step7 prevStep={prevStep} progress={progress} handleSubmit={handleSubmit} />;
    //     default:
    //         return <div>Invalid step</div>;
    // }
    return (
        <>
            {
                step === 1 && <Step1 nextStep={nextStep} progress={progress} option={option} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} handleCategoryChange={handleCategoryChange} />
            }
            {
                step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} progress={progress} handleTagClick={handleTagClick} option={option} selectedTag={selectedTag} setSelectedTag={setSelectedTag} tagInput1={tagInput1} tagInput2={tagInput2} tagInput3={tagInput3} handleTagChange={handleTagChange} handleTagChange1={handleTagChange1} handleTagChange2={handleTagChange2} handleTagChange3={handleTagChange3} />
            }
            {
                step === 3 && <Step3 nextStep={nextStep} prevStep={prevStep} progress={progress} titleInput={titleInput} handleTitleChange={handleTitleChange} />
            }
            {
                step === 4 && <Step4 nextStep={nextStep} prevStep={prevStep} progress={progress} preview={preview} selectedFile={selectedFile} selectedFileName={selectedFileName} handleFileChange={handleFileChange} contentInput={contentInput} handleContentChange={handleContentChange} />
            }
            {
                step === 5 && <Step5 nextStep={nextStep} prevStep={prevStep} progress={progress}
                    selectedGenderPolicy={selectedGenderPolicy}
                    setSelectedGenderPolicy={setSelectedGenderPolicy}
                    option={option}
                    agePolicy={agePolicy} handleAgePolicyChange={handleAgePolicyChange}
                    restrictionInput={restrictionInput} restrictionInput2={restrictionInput2}
                    handleRestrictionChange={handleRestrictionChange} handleRestrictionChange2={handleRestrictionChange2} />
            }
            {
                step === 6 && <Step6 nextStep={nextStep} prevStep={prevStep} progress={progress} maxGroupSize={maxGroupSize} handleMaxGroupSizeChange={handleMaxGroupSizeChange} handleMaxGroupSize={handleMaxGroupSize} />
            }
            {
                step === 7 && <Step7 prevStep={prevStep} progress={progress} handleSubmit={handleSubmit} />
            }
            <div className="fixed inset-x-0 bottom-0">
                <div className="w-100vh h-[30px]">
                    <LinearProgress sx={{ height: '30px' }} color="inherit" variant="determinate"
                        value={step / 7 * 100} />
                </div>
            </div>
        </>
    )
}

export default CreateClubForm
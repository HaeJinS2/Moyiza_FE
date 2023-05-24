import React, { useState } from "react";
import { useRecoilState } from 'recoil';
import { clubState, optionState } from '../states/clubState';
import { postAPI, putAPI } from "../axios";
import Container from "../component/Container";
import Slider from 'react-input-slider';
import { useNavigate } from "react-router-dom";



// 카테고리(대분류)
const Step1 = ({ nextStep, handleCategoryChange, categoryInput, option, setSelectedCategory, selectedCategory }) => {
    return (
        <Container>
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                <input type="text" value={categoryInput} onChange={handleCategoryChange} />
                <div>
                    <div className="flex gap-10">
                        {option.categoryLists.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedCategory(category)}
                                style={{ backgroundColor: selectedCategory === category ? 'blue' : 'white' }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <button onClick={nextStep}>다음</button>
                    </div>
                </div>
            </section>
        </Container>
    )
}

// 태그(소분류)
const Step2 = ({ nextStep, handleTagChange1, handleTagChange2, handleTagChange3, tagInput1, tagInput2, tagInput3 }) => {
    return (
        <Container>
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                <div>
                    <input type="text" value={tagInput1} onChange={handleTagChange1} placeholder="Tag 1" />
                    <input type="text" value={tagInput2} onChange={handleTagChange2} placeholder="Tag 2" />
                    <input type="text" value={tagInput3} onChange={handleTagChange3} placeholder="Tag 3" />
                </div>
                <div>
                    <button onClick={nextStep}>다음</button>
                </div>
            </section>
        </Container>

    )
}

// 클럽 이름
const Step3 = ({ nextStep, handleTitleChange, titleInput }) => {
    return (
        <>
            <Container>
                <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                    클럽이름
                    <div>
                        <input type="text" value={titleInput} onChange={handleTitleChange} />
                        </div>
                <div>
                        <button onClick={nextStep}>다음</button>
                    </div>
                </section>
            </Container>
        </>
    )
}

// 클럽사진 + 클럽내용
const Step4 = ({ nextStep, handleContentChange, contentInput }) => {
    return (
        <Container>
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                클럽내용
                <div>
                    <input type="text" value={contentInput} onChange={handleContentChange} />
                    <button onClick={nextStep}>다음</button>
                </div>
            </section>
        </Container>
    )
}

// 성별제한 + 연령제한
const Step5 = ({ nextStep, selectedGenderPolicy, setSelectedGenderPolicy, option, handleAgePolicyChange, agePolicy, handleRestrictionChange, handleRestrictionChange2, restrictionInput, restrictionInput2 }) => {
    return (
        <Container>
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                <div>
                    <input type="text" value={restrictionInput} onChange={handleRestrictionChange} />
                    {/* <input type="text" value={restrictionInput2} onChange={handleRestrictionChange2} /> */}
                    <div className="flex gap-10">
                        {option.genderPolicyLists.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedGenderPolicy(category)}
                                style={{ backgroundColor: selectedGenderPolicy === category ? 'blue' : 'white' }}
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

                    <button onClick={nextStep}>다음</button>
                </div>
            </section>
        </Container>
    )
}

// 인원제한
const Step6 = ({ nextStep, handleMaxGroupSizeChange, maxGroupSize }) => {
    return (
        <Container>
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                인원제한
                <div>
                    <input type="text" value={maxGroupSize} onChange={handleMaxGroupSizeChange} />
                    </div>
                <div>
                    <button onClick={nextStep}>다음</button>
                </div>
            </section>
        </Container>
    )
}

// 완료
const Step7 = ({ handleSubmit }) => {
    return (
        <Container>
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                <div>
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

    const [categoryInput] = useState(club.clubCategory || '');
    const [selectedCategory, setSelectedCategory] = useState(club.clubCategory || '');
    const [selectedGenderPolicy, setSelectedGenderPolicy] = useState(club.genderPolicy || '');

    const [tagInput1, setTagInput1] = useState(club?.clubTag == null ? "" : club?.clubTag[0]);
    const [tagInput2, setTagInput2] = useState(club?.clubTag == null ? "" : club?.clubTag[1]);
    const [tagInput3, setTagInput3] = useState(club?.clubTag == null ? "" : club?.clubTag[2]);

    const [titleInput, setTitleInput] = useState(club.clubTitle || '');
    const [contentInput, setContentInput] = useState(club.clubContent || '');
    const [restrictionInput, setRestrictionInput] = useState(club.genderPolicy == null ? '' : club.genderPolicy);
    const [restrictionInput2, setRestrictionInput2] = useState(club.agePolicy == null ? '' : club.agePolicy);
    const [agePolicy, setAgePolicy] = useState(club.agePolicy == null ? { x: 20 } : { x: club.agePolicy });
    console.log(agePolicy)
    const [maxGroupSize, setMaxGroupSize] = useState(club.maxGroupSize || "")
    const navigate = useNavigate();
    console.log("option", option.optionLists)
    console.log(option.genderPolicyLists)
    const [step, setStep] = useState(1);




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
    const prevStep = () => setStep(step - 1);



    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
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


    const handleMaxGroupSizeChange = (event) => {
        setMaxGroupSize(event.target.value)
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
        const tagsArray = [tagInput1, tagInput2, tagInput3];

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
        const restrictionObj = { genderPolicy: restrictionInput, agePolicy: Number(agePolicy.x) };

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
        const data = { maxGroupSize: Number(maxGroupSize) }

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

    switch (step) {
        case 1:
            return <Step1 nextStep={nextStep} option={option} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categoryInput={categoryInput} handleCategoryChange={handleCategoryChange} />;
        case 2:
            return <Step2 nextStep={nextStep} tagInput1={tagInput1} tagInput2={tagInput2} tagInput3={tagInput3} handleTagChange1={handleTagChange1} handleTagChange2={handleTagChange2} handleTagChange3={handleTagChange3} />;
        case 3:
            return <Step3 nextStep={nextStep} prevStep={prevStep} titleInput={titleInput} handleTitleChange={handleTitleChange} />;
        case 4:
            return <Step4 nextStep={nextStep} contentInput={contentInput} handleContentChange={handleContentChange} />;
        case 5:
            return <Step5 nextStep={nextStep} selectedGenderPolicy={selectedGenderPolicy} 
            setSelectedGenderPolicy={setSelectedGenderPolicy} 
            option={option}
            agePolicy={agePolicy} handleAgePolicyChange={handleAgePolicyChange} restrictionInput={restrictionInput} restrictionInput2={restrictionInput2} handleRestrictionChange={handleRestrictionChange} handleRestrictionChange2={handleRestrictionChange2} />;
        case 6:
            return <Step6 nextStep={nextStep} maxGroupSize={maxGroupSize} handleMaxGroupSizeChange={handleMaxGroupSizeChange} handleMaxGroupSize={handleMaxGroupSize} />;
        case 7:
            return <Step7 handleSubmit={handleSubmit} />;
        default:
            return <div>Invalid step</div>;
    }

}

export default CreateClubForm
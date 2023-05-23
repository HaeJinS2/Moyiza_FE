import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import { clubState, optionState } from '../states/clubState';
import { postAPI, putAPI } from "../axios";


const Step1 = ({ nextStep, handleCategoryChange, categoryInput }) => {
    return (
        <>
            <input type="text" value={categoryInput} onChange={handleCategoryChange} />
            <button onClick={nextStep}>다음</button>
        </>
    )
}

const Step2 = ({ nextStep, handleTagChange1, handleTagChange2, handleTagChange3, tagInput1, tagInput2, tagInput3 }) => {
    return (
        <>
            <input type="text" value={tagInput1} onChange={handleTagChange1} placeholder="Tag 1" />
            <input type="text" value={tagInput2} onChange={handleTagChange2} placeholder="Tag 2" />
            <input type="text" value={tagInput3} onChange={handleTagChange3} placeholder="Tag 3" />
            <button onClick={nextStep}>다음</button>
        </>
    )
}

const Step3 = ({ nextStep, handleTitleChange, titleInput }) => {
    return (
        <>
            <input type="text" value={titleInput} onChange={handleTitleChange} />
            <button onClick={nextStep}>다음</button>
        </>
    )
}

const Step4 = ({ nextStep, handleContentChange, contentInput }) => {
    return (
        <>
            <input type="text" value={contentInput} onChange={handleContentChange} />
            <button onClick={nextStep}>다음</button>
        </>
    )
}

const Step5 = ({ nextStep, handleRestrictionChange, handleRestrictionChange2, restrictionInput, restrictionInput2 }) => {
    return (
        <>
            <input type="text" value={restrictionInput} onChange={handleRestrictionChange} />
            <input type="text" value={restrictionInput2} onChange={handleRestrictionChange2} />
            <button onClick={nextStep}>다음</button>
        </>
    )
}

const Step6 = ({ handleSubmit }) => {
    return (
        <>
            <button onClick={handleSubmit}>제출</button>
        </>
    )
}

function CreateClubForm() {
    const [club, setClub] = useRecoilState(clubState);
    // const [tempId, setTempId] = useRecoilState(tempIdState);
    const option = useRecoilValue(optionState);

    const [categoryInput, setCategoryInput] = useState(club.category || '');

    const [tagInput1, setTagInput1] = useState(club?.tag == null ? "" : club?.tag[0]);
    const [tagInput2, setTagInput2] = useState(club?.tag == null ? "" : club?.tag[1]);
    const [tagInput3, setTagInput3] = useState(club?.tag == null ? "" : club?.tag[2]);

    const [titleInput, setTitleInput] = useState(club.title || '');
    const [contentInput, setContentInput] = useState(club.content || '');
    const [restrictionInput, setRestrictionInput] = useState(club.restriction == null ? '' : club.restriction[0]);
    const [restrictionInput2, setRestrictionInput2] = useState(club.restriction == null ? '' : club.restriction[1]);

    console.log(club)

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
        }
        // setStep(step + 1);
    };
    const prevStep = () => setStep(step - 1);



    const handleCategoryChange = (event) => {
        setCategoryInput(event.target.value);
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

    const handleCategory = () => {
        const url = `/club/create/${club.createclub_id}/category`;
        const data = categoryInput;

        putAPI(url, { category: data })
            .then(response => {
                console.log(response);
                setClub({ ...club, category: data });
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
                setClub({ ...club, tag: tagsArray });
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
                setClub({ ...club, title: data });
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
        const restrictionArray = {genderPolicy:restrictionInput, agePolicy: Number(restrictionInput2)};

        putAPI(url, 
             restrictionArray
        )
            .then(response => {
                console.log(response);
                setClub({ ...club, restriction: restrictionArray });
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
        }).catch((error) => {
            console.log(error)
        })
    };

    switch (step) {
        case 1:
            return <Step1 nextStep={nextStep} categoryInput={categoryInput} handleCategoryChange={handleCategoryChange} />;
        case 2:
            return <Step2 nextStep={nextStep} tagInput1={tagInput1} tagInput2={tagInput2} tagInput3={tagInput3} handleTagChange1={handleTagChange1} handleTagChange2={handleTagChange2} handleTagChange3={handleTagChange3} />;
        case 3:
            return <Step3 nextStep={nextStep} prevStep={prevStep} titleInput={titleInput} handleTitleChange={handleTitleChange} />;
        case 4:
            return <Step4 nextStep={nextStep} contentInput={contentInput} handleContentChange={handleContentChange} />;
        case 5:
            return <Step5 nextStep={nextStep} restrictionInput={restrictionInput} restrictionInput2={restrictionInput2} handleRestrictionChange={handleRestrictionChange} handleRestrictionChange2={handleRestrictionChange2} />;
        case 6:
            return <Step6 handleSubmit={handleSubmit} />;
        default:
            return <div>Invalid step</div>;
    }

}

export default CreateClubForm
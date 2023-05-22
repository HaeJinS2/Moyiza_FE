import React, { useState } from "react";
import { useRecoilState } from 'recoil';
import { clubState, tempIdState } from '../states/clubState';
import { postAPI, putAPI } from "../axios";


const Step1 = ({ nextStep, handleCategoryChange, categoryInput }) => {
    return (
        <>
            <input type="text" value={categoryInput} onChange={handleCategoryChange} />
            <button onClick={nextStep}>다음</button>
        </>
    )
}

const Step2 = ({ nextStep, handleTagChange, tagInput }) => {
    return (
        <>
            <input type="text" value={tagInput} onChange={handleTagChange} />
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

const Step5 = ({ nextStep, handleRestrictionChange, restrictionInput }) => {
    return (
        <>
            <input type="text" value={restrictionInput} onChange={handleRestrictionChange} />
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
    const [tempId, setTempId] = useRecoilState(tempIdState);

    const [categoryInput, setCategoryInput] = useState(club.category || '');
    const [tagInput, setTagInput] = useState(club.tag || '');
    const [titleInput, setTitleInput] = useState(club.title || '');
    const [contentInput, setContentInput] = useState(club.content || '');
    const [restrictionInput, setRestrictionInput] = useState(club.restriction || '');

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
        setStep(step + 1);
    };
    const prevStep = () => setStep(step - 1);


    const handleCategoryChange = (event) => {
        setCategoryInput(event.target.value);
    };
    const handleTagChange = (event) => {
        setTagInput(event.target.value);
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

    const handleCategory = () => {
        const url = `/club/create/${tempId}/category`;
        const data = categoryInput;

        if (club.category) {
            putAPI(url, data)
                .then(response => {
                    console.log(response);
                    setClub({ ...club, category: data });
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            postAPI(url, data)
                .then(response => {
                    console.log(response);
                    setClub({ ...club, category: data });
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };


    const handleTag = () => {
        const url = `/club/create/${tempId}/tag`;
        const data = tagInput;

        if (club.tag) {
            putAPI(url, data)
                .then(response => {
                    console.log(response);
                    setClub({ ...club, tag: data });
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            postAPI(url, data)
                .then(response => {
                    console.log(response);
                    setClub({ ...club, tag: data });
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };
    const handleTitle = () => {
        const url = `/club/create/${tempId}/title`;
        const data = titleInput;

        if (club.title) {
            putAPI(url, data)
                .then(response => {
                    console.log(response);
                    setClub({ ...club, title: data });
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            postAPI(url, data)
                .then(response => {
                    console.log(response);
                    setClub({ ...club, title: data });
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleContent = () => {
        const url = `/club/create/${tempId}/content`;
        const data = contentInput;

        if (club.content) {
            putAPI(url, data)
                .then(response => {
                    console.log(response);
                    setClub({ ...club, content: data });
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            postAPI(url, data)
                .then(response => {
                    console.log(response);
                    setClub({ ...club, content: data });
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleRestriction = () => {
        const url = `/club/create/${tempId}/restriction`;
        const data = restrictionInput;

        if (club.restriction) {
            putAPI(url, data)
                .then(response => {
                    console.log(response);
                    setClub({ ...club, restriction: data });
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            postAPI(url, data)
                .then(response => {
                    console.log(response);
                    setClub({ ...club, restriction: data });
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleSubmit = () => {
        postAPI(`/club/create/${tempId}/confirm`, {}).then((response) => {
            console.log(response)
            setClub({});
            setTempId('');
        }).catch((error) => {
            console.log(error)
        })
    };

    switch (step) {
        case 1:
            return <Step1 nextStep={nextStep} categoryInput={categoryInput} handleCategoryChange={handleCategoryChange} />;
        case 2:
            return <Step2 nextStep={nextStep} prevStep={prevStep} tagInput={tagInput} handleTagChange={handleTagChange} />;
        case 3:
            return <Step3 nextStep={nextStep} prevStep={prevStep} titleInput={titleInput} handleTitleChange={handleTitleChange} />;
        case 4:
            return <Step4 nextStep={nextStep} contentInput={contentInput} handleContentChange={handleContentChange} />;
        case 5:
            return <Step5 nextStep={nextStep} restrictionInput={restrictionInput} handleRestrictionChange={handleRestrictionChange} />;
        case 6:
            return <Step6 handleSubmit={handleSubmit} />;
        default:
            return <div>Invalid step</div>;
    }

}

export default CreateClubForm
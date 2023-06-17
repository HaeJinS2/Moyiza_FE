import React, { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { clubState, optionState } from '../states/clubState';
import { getAPI, postAPI } from "../axios";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from '@mui/material'
import Modal from 'react-modal';


Modal.setAppElement('#root');

function CreateClub() {
    const navigate = useNavigate();
    const [club, setClub] = useRecoilState(clubState);
    // const [tempId, setTempId] = useRecoilState(tempIdState);
    const [option, setOption] = useRecoilState(optionState);
    const [navigateNow, setNavigateNow] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [progress, setProgress] = useState(0);

    let progressMessage = club?.maxGroupSize ? `최대인원` :
        club?.agePolicy ? `나이제한` :
            club?.genderPolicy ? `성별제한` :
                club?.clubContent ? `모임내용` :
                    club?.clubTitle ? `모임명` :
                        club?.clubTag ? `태그` :
                            club?.clubCategory ? `카테고리` :
                                "";

    useEffect(() => {
        if (club?.maxGroupSize) {
            setProgress(87.2);
        } else if (club?.genderPolicy && club?.agePolicy) {
            setProgress(73);
        } else if (club?.clubContent) {
            setProgress(56.8);
        } else if (club?.clubTitle) {
            setProgress(42.6);
        } else if (club?.clubTag) {
            setProgress(28.4);
        } else if (club?.clubCategory) {
            setProgress(14.2);
        } else {
            setProgress(0);
        }
    }, [club]);

    const handleCreateClubButton = () => {
        postAPI(`/club/create`, {}).then((response) => {
            setClub({
                ...club,
                createclub_id: response.data.createclub_id,
            })
            if (response.status === 202) { // 임시저장된 데이터가 있는 경우
                getAPI(`/club/create/${response.data.createclub_id}`).then((getResponse) => {
                    setClub(getResponse.data.createClub)
                    setOption({
                        ...option,
                        optionLists: getResponse.data.optionList,
                        categoryLists: getResponse.data.optionList.categoryAndTagList,
                        genderPolicyLists: getResponse.data.optionList.genderPolicyList,
                    })
                    setIsOpen(true);
                    // setNavigateNow(true);
                    // navigate(`/create-club-form`);
                }).catch((error) => {
                    console.error(error);
                });

            } else if (response.status === 201) { // 임시저장된 데이터가 없는 경우
                // setTempId(response.data.createclub_id); // tempId 발급 받음
                setClub({
                    ...club,
                    createclub_id: response.data.createclub_id,
                })
                setOption({
                    ...option,
                    optionLists: response.data.optionList,
                    categoryLists: response.data.optionList.categoryAndTagList,
                    genderPolicyLists: response.data.optionList.genderPolicyList,
                })
                navigate(`/create-club-form`);
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleConfirm = () => {

        setNavigateNow(true);
        navigate(`/create-club-form`);
        closeModal();
    }

    const handleCancel = () => {
        // getAPI(`/club/create/${club.createclub_id}`).then((getResponse) => {
        //     console.log(getResponse)
        //     setOption({
        //         ...option,
        //         optionLists: getResponse.data.optionList,
        //         categoryLists: getResponse.data.optionList.categoryAndTagList,
        //         genderPolicyLists: getResponse.data.optionList.genderPolicyList,
        //     })
        //     setNavigateNow(true);
        //     navigate(`/create-club-form`);
        // }).catch((error) => {
        //     console.error(error);
        // });
        let { createclub_id } = club;
        setClub({ createclub_id });

        setNavigateNow(true);
        navigate(`/create-club-form`);
        closeModal();
    }

    useEffect(() => {
        // navigate(`/create-club-form`);
        setNavigateNow(false);
    }, [navigateNow]);



    return (
        <div>
           <button
           onClick={handleCreateClubButton}
           >
            <img
                src={`${process.env.PUBLIC_URL}/images/create_club.svg`}
                alt="create-club"
            />
            </button>
            {/* <button onClick={handleCreateClubButton}>클럽 만들기 버튼</button> */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Create Club Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex: 1000,
                    },
                    content: {
                        color: 'black',
                        width: '597px',
                        height: '502px',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px',
                        borderRadius: '10px',
                    }
                }}
            >
                <div className="flex flex-col items-center  gap-y-[60px]">
                    <div className="flex flex-col items-center">
                        <h2 className="font-semibold text-[24px]">만들던 모임이 있습니다. 정보를 불러올까요?</h2>
                        {/* <h3>~임시 저장 목록~</h3> */}
                        {/* <span>{club?.clubCategory ? `카테고리: ${club?.clubCategory}` : `카테고리: 저장된 데이터 없음`}</span>
                        <span>{club?.clubTag ? `태그: ${club?.clubTag}` : `태그: 저장된 데이터 없음`}</span>
                        <span>{club?.clubTitle ? `클럽명: ${club?.clubTitle}` : `클럽명: 저장된 데이터 없음`}</span>
                        <span>{club?.clubContent ? `클럽내용: ${club?.clubContent}` : `클럽내용: 저장된 데이터 없음`}</span>
                        <span>{club?.genderPolicy ? `성별제한: ${club?.genderPolicy}` : `성별제한: 저장된 데이터 없음`}</span>
                        <span>{club?.agePolicy ? `나이제한: ${club?.agePolicy}` : `나이제한: 저장된 데이터 없음`}</span>
                        <span>{club?.maxGroupSize ? `최대인원: ${club?.maxGroupSize}` : `최대인원: 저장된 데이터 없음`}</span> */}
                    </div>
                    <div className="flex flex-col items-center font-semibold text-[24px]">
                        {/* <span><span className="text-[#FF7F1E]">{progressMessage}</span>까지 저장되어있어요!</span> */}
                        {progressMessage ? <span><span className="text-[#FF7F1E]">{progressMessage}</span>까지 저장되어있어요!</span> : "아직 아무것도 저장되지 않았습니다."}
                        {club?.clubTitle ?
                            <span className="text-[16px]">모임명: {club?.clubTitle}</span>
                            : null
                        }
                    </div>
                    <div className="flex flex-col gap-y-5 items-center">
                        <div className="flex flex-col w-[480px] justify-between">
                            <div className="flex justify-between items-center">
                                <div className="relative w-[110px] h-[34px]">
                                    <img
                                        className={`w-full h-full opacity-0`}
                                        src={`${process.env.PUBLIC_URL}/images/malpungsun.png`} alt="malpungsun" />
                                    <span className={`absolute left-[13px] top-0 ${progress === 10 ? 'opacity-100' : 'opacity-0'}`}></span>
                                </div>
                                <div className="relative w-[110px] h-[34px]">
                                    <img
                                        className={`w-full h-full ${progress === 14.2 ? 'opacity-100' : 'opacity-0'}`}
                                        src={`${process.env.PUBLIC_URL}/images/malpungsun.png`} alt="malpungsun" />
                                    <span className={`absolute left-[13px] top-0 ${progress === 14.2 ? 'opacity-100' : 'opacity-0'}`}>6 단계</span>
                                </div>
                                <div className="relative w-[110px] h-[34px]">
                                    <img
                                        className={`w-full h-full ${progress === 28.4 ? 'opacity-100' : 'opacity-0'}`}
                                        src={`${process.env.PUBLIC_URL}/images/malpungsun.png`} alt="malpungsun" />
                                    <span className={`absolute left-[13px] top-0 ${progress === 28.4 ? 'opacity-100' : 'opacity-0'}`}>5 단계</span>
                                </div>

                                <div className="relative w-[110px] h-[34px]">
                                    <img
                                        className={`w-full h-full ${progress === 42.6 ? 'opacity-100' : 'opacity-0'}`}
                                        src={`${process.env.PUBLIC_URL}/images/malpungsun.png`} alt="malpungsun" />
                                    <span className={`absolute left-[13px] top-0 ${progress === 42.6 ? 'opacity-100' : 'opacity-0'}`}>4 단계</span>
                                </div>

                                <div className="relative w-[110px] h-[34px]">
                                    <img
                                        className={`w-full h-full ${progress === 56.8 ? 'opacity-100' : 'opacity-0'}`}
                                        src={`${process.env.PUBLIC_URL}/images/malpungsun.png`} alt="malpungsun" />
                                    <span className={`absolute left-[13px] top-0 ${progress === 56.8 ? 'opacity-100' : 'opacity-0'}`}>3 단계</span>
                                </div>

                                <div className="relative w-[110px] h-[34px]">
                                    <img
                                        className={`w-full h-full ${progress === 73 ? 'opacity-100' : 'opacity-0'}`}
                                        src={`${process.env.PUBLIC_URL}/images/malpungsun.png`} alt="malpungsun" />
                                    <span className={`absolute left-[13px] top-0 ${progress === 73 ? 'opacity-100' : 'opacity-0'}`}>2 단계</span>
                                </div>

                                <div className="relative w-[110px] h-[34px]">
                                    <img
                                        className={`w-full h-full ${progress === 87.2 ? 'opacity-100' : 'opacity-0'}`}
                                        src={`${process.env.PUBLIC_URL}/images/malpungsun.png`} alt="malpungsun" />
                                    <span className={`absolute left-[13px]  top-0 ${progress === 87.2 ? 'opacity-100' : 'opacity-0'}`}>1 단계</span>
                                </div>
                            </div>
                            <div className="w-[480px] h-[10px]">
                                <LinearProgress variant="determinate" value={progress} />
                            </div>
                        </div>
                        <div className="flex gap-x-10">
                            <button className="w-[224px] h-[60px] bg-[#FF7F1E] text-white rounded-3xl font-semibold text-[28px]" onClick={handleCancel}>새로만들기</button>
                            <button className="w-[224px] h-[60px] bg-[#747474] text-white rounded-3xl font-semibold text-[28px]" onClick={handleConfirm}>불러오기</button>
                        </div>
                        <div>
                            <span className="text-[#747474]">새로운 모임을 만들면 기존정보는 삭제됩니다.</span>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CreateClub

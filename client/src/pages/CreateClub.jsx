import React, { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { clubState, optionState } from '../states/clubState';
import { getAPI, postAPI } from "../axios";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';

Modal.setAppElement('#root');

function CreateClub() {
    const navigate = useNavigate();
    const [club, setClub] = useRecoilState(clubState);
    // const [tempId, setTempId] = useRecoilState(tempIdState);
    const [option, setOption] = useRecoilState(optionState);
    const [navigateNow, setNavigateNow] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleCreateClubButton = () => {
        postAPI(`/club/create`, {}).then((response) => {
            console.log("test", response)
            setClub({
                ...club,
                createclub_id: response.data.createclub_id,
            })
            if (response.status === 202) { // 임시저장된 데이터가 있는 경우
                console.log(club.createclub_id)

                    setIsOpen(true);
  
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

        getAPI(`/club/create/${club.createclub_id}`).then((getResponse) => {
            console.log(getResponse)
            setClub(getResponse.data.createClub)
            setOption({
                ...option,
                optionLists: getResponse.data.optionList,
                categoryLists: getResponse.data.optionList.categoryAndTagList,
                genderPolicyLists: getResponse.data.optionList.genderPolicyList,
            })
            setNavigateNow(true);
            navigate(`/create-club-form`);
        }).catch((error) => {
            console.error(error);
        });
        closeModal();
    }

    const handleCancel = () => {
        getAPI(`/club/create/${club.createclub_id}`).then((getResponse) => {
            console.log(getResponse)
            setOption({
                ...option,
                optionLists: getResponse.data.optionList,
                categoryLists: getResponse.data.optionList.categoryAndTagList,
                genderPolicyLists: getResponse.data.optionList.genderPolicyList,
            })
            setNavigateNow(true);
            navigate(`/create-club-form`);
        }).catch((error) => {
            console.error(error);
        });
        closeModal();
    }

    useEffect(() => {
        // navigate(`/create-club-form`);
        setNavigateNow(false);
    }, [navigateNow]);

    return (
        <div>
            <button onClick={handleCreateClubButton}>클럽 만들기 버튼</button>
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
                        color: '#7099F8',
                        width: '50%',
                        height: '50%',
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
                <div className="flex flex-col items-center gap-y-5">
                    <div>
                        <h2>불러오시겠습니까?</h2>
                    </div>
                    <div className="flex gap-10">
                        <button onClick={handleConfirm}>Yes</button>
                        <button onClick={handleCancel}>No</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CreateClub

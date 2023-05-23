import React from "react";
import { useRecoilState } from 'recoil';
import { clubState, optionState } from '../states/clubState';
import { getAPI, postAPI } from "../axios";
import { useNavigate } from "react-router-dom";


function CreateClub() {
    const navigate = useNavigate();
    const [club, setClub] = useRecoilState(clubState);
    // const [tempId, setTempId] = useRecoilState(tempIdState);
    const [option, setOption] = useRecoilState(optionState);

    const handleCreateClubButton = () => {
        postAPI(`/club/create`, {}).then((response) => {
            if (response.status === 100) { // 임시저장된 데이터가 있는 경우
                setClub({
                    ...club,
                    createclub_id: response.data.createclub_id,
                })
                getAPI(`/club/create`).then((getResponse) => {
                    if (window.confirm('불러오시겠습니까?')) {
                        // setTempId(response.data.createclub_id)
                        setClub({
                            ...club,
                            createclub_id: getResponse.data.createclub.createclub_id,
                            category: getResponse.data.createclub.clubcategory,
                            tag: getResponse.data.createclub.clubTag,
                            title: getResponse.data.createclub.clubTitle,
                            content: getResponse.data.content,
                            restriction: getResponse.data.restriction, 
                        });
                        setOption({
                            ...option,
                            optionList: getResponse.data.optionList,
                        })

                    }
                    navigate(`/create-club-form`);
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
                    optionList: response.data.optionList,
                })
                navigate(`/create-club-form`);
            }
        }).catch((error) => {
            console.error(error);
        });
    };
    

    return (
        <div>
            <button onClick={handleCreateClubButton}>클럽 만들기 버튼</button>
        </div>
    )
}


export default CreateClub
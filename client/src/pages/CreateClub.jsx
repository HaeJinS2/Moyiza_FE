import React from "react";
import { useRecoilState } from 'recoil';
import { clubState, tempIdState } from '../states/clubState';
import { getAPI, postAPI } from "../axios";
import { useNavigate } from "react-router-dom";


function CreateClub() {
    const navigate = useNavigate();
    const [club, setClub] = useRecoilState(clubState);
    const [tempId, setTempId] = useRecoilState(tempIdState);
    console.log(tempId)

    const handleCreateClubButton = () => {
        postAPI("/club/create", {}).then((response) => {
            setTempId(response.data.tempId);
    
            getAPI(`/club/create/${response.data.tempId}`).then((getResponse) => {
                if (getResponse.status === 201) {
                    if (window.confirm('불러오시겠습니까?')) {
                        // Load the saved data
                        setClub({
                            ...club,
                            category: getResponse.data.category,
                            tag: getResponse.data.tag,
                            title: getResponse.data.title,
                            content: getResponse.data.content,
                            restriction: getResponse.data.restriction,
                        });
                    }
                }
                navigate(`/create-club-form`)
            }).catch((error) => {
                console.error(error);
            });
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
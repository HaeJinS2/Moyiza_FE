import React from "react";
import { useRecoilState } from 'recoil';
import { clubState, tempIdState } from '../states/clubState';
import { postAPI } from "../axios";
import { useNavigate } from "react-router-dom";


function CreateClub() {
    const navigate = useNavigate();
    const [club, setClub] = useRecoilState(clubState);
    const [tempId, setTempId] = useRecoilState(tempIdState);
    console.log(tempId)
    const handleCreateClubButton = () => {
        postAPI("/create", {}
        ).then((response) => {
            if (response.status === 201) {
                console.log(response);
                setTempId(response.data.tempId)
                setClub({
                    ...club,
                    category: response.data.category,
                    tag: response.data.tag,
                    title: response.data.title,
                    content: response.data.content,
                    restriction: response.data.restriction,
                });
            } else if (response.status === 200) {
                setTempId(response.data.tempId)
                console.log(response);
            }
            navigate(`/create-club-form`)
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <div>
            <button onClick={handleCreateClubButton}>클럽 만들기 버튼</button>
        </div>
    )
}


export default CreateClub
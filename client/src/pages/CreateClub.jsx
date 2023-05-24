import React, { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { clubState, optionState } from '../states/clubState';
import { getAPI, postAPI } from "../axios";
import { useNavigate } from "react-router-dom";


function CreateClub() {
    const navigate = useNavigate();
    const [club, setClub] = useRecoilState(clubState);
    // const [tempId, setTempId] = useRecoilState(tempIdState);
    const [option, setOption] = useRecoilState(optionState);
    const [navigateNow, setNavigateNow] = useState(false); 

    const handleCreateClubButton = () => {
        postAPI(`/club/create`, {}).then((response) => {
            console.log("test" , response)
            setClub({
                ...club,
                createclub_id: response.data.createclub_id,
            })
            if (response.status === 202) { // 임시저장된 데이터가 있는 경우
                console.log(club.createclub_id)
                getAPI(`/club/create/${response.data.createclub_id}`).then((getResponse) => {
                    if (window.confirm('불러오시겠습니까?')) {
                        // console.log(getResponse.data.createclub.createclub_id)
                        // setTempId(response.data.createclub_id)
                        // setClub({
                        //     ...club,
                        //     createclub_id: getResponse.data.createClubResponse.id,
                        //     category: getResponse.data.createClubResponse.category,
                        //     tag: getResponse.data.createClubResponse.tagString,
                        //     title: getResponse.data.createClubResponse.title,
                        //     content: getResponse.data.createClubResponse.content,
                        //     restriction: getResponse.data.createClubResponse.genderPolicy, 
                        // });
                        setClub(getResponse.data.createClub)
                        setOption({
                            ...option,
                            optionList: getResponse.data.optionList.categoryList,
                        })
                        setNavigateNow(true);
                        navigate(`/create-club-form`);
                    } else {
                        setNavigateNow(true);
                        navigate(`/create-club-form`);
                    }
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
    
    useEffect(() => {
        // navigate(`/create-club-form`);
        setNavigateNow(false); 
    }, [navigateNow]);


    return (
        <div>
            <button onClick={handleCreateClubButton}>클럽 만들기 버튼</button>
        </div>
    )
}


export default CreateClub
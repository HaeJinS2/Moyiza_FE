import React from 'react'
import BodyContainer from '../component/BodyContainer'
import { deleteAPI, postAPI } from '../axios'
import swal from 'sweetalert'

function testPage() {

    const likeClubBtn = () => {
        postAPI(`/club/182/like`,{}).then((res) => {
            swal("성공!")
            console.log(res)
        }).catch((err) => console.log(err))
    }
    const likeClubCancelBtn = () => {
        deleteAPI(`/club/182/like`,{}).then((res) => {
            swal("성공!")
            console.log(res)
        }).catch((err) => console.log(err))
    }
    const likeOnedayBtn = () => {
        postAPI(`/oneday/2753/like`,{}).then((res) => {
            swal("성공!")
            console.log(res)
        }).catch((err) => console.log(err))
    }
    const likeOnedayCancelBtn = () => {
        deleteAPI(`/oneday/2753/like`,{}).then((res) => {
            swal("성공!")
            console.log(res)
        }).catch((err) => console.log(err))
    }
    const likeEventBtn = () => {
        postAPI(`/club/182/event/129/like`,{}).then((res) => {
            swal("성공!")
            console.log(res)
        }).catch((err) => console.log(err))
    }
    const likeEvenCancelBtn = () => {
        deleteAPI(`/club/182/event/129/like`,{}).then((res) => {
            swal("성공!")
            console.log(res)
        }).catch((err) => console.log(err))
    }
    return (
        <div>
            <BodyContainer>
                <div className='flex flex-col h-[100vh] pt-28 gap-y-4'>
                    <button onClick={likeClubBtn}>일상속 좋아요</button>
                    <button onClick={likeClubCancelBtn}>일상속 좋아요 취소</button>
                    <button onClick={likeOnedayBtn}>하루속 좋아요</button>
                    <button onClick={likeOnedayCancelBtn}>하루속 좋아요 취소</button>
                    <button onClick={likeEventBtn}>이벤트 좋아요</button>
                    <button onClick={likeEvenCancelBtn}>이벤트 좋아요 취소</button>
                </div>
            </BodyContainer>
        </div>
    )
}

export default testPage
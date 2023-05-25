import React, { useState } from 'react'
import Modal from 'react-modal';
// import { getAPI, postAPI } from "../axios";
import '../index.css'
Modal.setAppElement('#root');

function DetailEvent() {
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleDetailClubButton = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={handleDetailClubButton}>이벤트 상세보기 버튼</button>
            
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
                        color: '#000000',
                        width: '500px',
                        height: '710px',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                        borderRadius: '10px',
                        gap: '10px',
                    }
                }}
            >

                <div className="flex justify-between w-full">
                    <div></div>
                    <button 
                    onClick={closeModal}
                    className='bg-gray-300 rounded-full w-[40px] h-[40px] text-white'>X</button>
                </div>
                <div>
                    <span>작성자</span>
                </div>
                <div className="border w-full mb-4"></div>
                <div className='flex justify-center flex-col gap-[30px]'>
                    <div className='flex flex-col gap-3  pl-3'>
                        <h3 className='text-2xl'>제목</h3>
                        <span>일시</span>
                        <span>장소</span>
                    </div>
                    <div className='flex flex-col gap-[30px] items-center '>
                        <div>
                            <div className='w-[450px] h-[300px] bg-gray-200 rounded-[10px] p-5'>내용</div>
                        </div>
                        <div>
                            <button className='w-[450px] h-[70px] bg-slate-200 rounded-[10px]'>참가하기!!!</button>
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default DetailEvent
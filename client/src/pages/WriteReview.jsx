import React, { useState } from 'react'
import imageCompression from 'browser-image-compression';
import { filePostAPI } from '../axios';
import { useLocation, useNavigate } from "react-router";
import swal from 'sweetalert';

function WriteReview() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedFile1, setSelectedFile1] = useState('');
    const [selectedFile2, setSelectedFile2] = useState('');
    const [selectedFile3, setSelectedFile3] = useState('');
    // eslint-disable-next-line
    const [selectedFileName1, setSelectedFileName1] = useState("");
    // eslint-disable-next-line
    const [selectedFileName2, setSelectedFileName2] = useState("");
    // eslint-disable-next-line
    const [selectedFileName3, setSelectedFileName3] = useState("");
    // eslint-disable-next-line
    const { state } = useLocation();
    const navigate = useNavigate();


    const handleFileChange1 = async (event) => {
        const file = event.target.files[0];
        setSelectedFileName1(file.name);
        setSelectedFile1(file);

        const options = {
            maxSizeMB: 500,
            // maxWidthOrHeight: 300,
            useWebWorker: true
        };

        try {
            const resizingFile = await imageCompression(file, options);
            setSelectedFile1(resizingFile);
            let reader = new FileReader();

            if (resizingFile) {
                reader.readAsDataURL(resizingFile);
                setSelectedFile1(resizingFile);
            }

            event.preventDefault();
        } catch (error) {
            console.error('Error:', error);
        }
        // setSelectedFile(null);
    };

    const handleFileChange2 = async (event) => {
        const file = event.target.files[0];
        setSelectedFileName2(file.name);
        setSelectedFile2(file);

        const options = {
            maxSizeMB: 500,
            // maxWidthOrHeight: 300,
            useWebWorker: true
        };

        try {
            const resizingFile = await imageCompression(file, options);
            setSelectedFile2(resizingFile);
            let reader = new FileReader();

            if (resizingFile) {
                reader.readAsDataURL(resizingFile);
                setSelectedFile2(resizingFile);
            }

            event.preventDefault();
        } catch (error) {
            console.error('Error:', error);
        }
        // setSelectedFile(null);
    };

    const handleFileChange3 = async (event) => {
        const file = event.target.files[0];
        setSelectedFileName3(file.name);
        setSelectedFile3(file);

        const options = {
            maxSizeMB: 500,
            // maxWidthOrHeight: 300,
            useWebWorker: true
        };

        try {
            const resizingFile = await imageCompression(file, options);
            setSelectedFile3(resizingFile);
            let reader = new FileReader();

            if (resizingFile) {
                reader.readAsDataURL(resizingFile);
                setSelectedFile3(resizingFile);
            }

            event.preventDefault();
        } catch (error) {
            console.error('Error:', error);
        }
        // setSelectedFile(null);
    };

    const handleSubmit = () => {
        // reviewType 및 identifier은 받은 값으로 넣어야함
        const data = { reviewType: state.reviewType, identifier: state.id, title, textContent: content }
        // const data = { reviewType: "EVENT", identifier: 3, title, textContent: content }
        const imgArr = [selectedFile1, selectedFile2, selectedFile3]
        const formData = new FormData();
        // console.log("여기여기", state.reviewType,"state.reviewType",state.id,"state.id")
        // console.log("여기여기", "title",title,"textContent",content)
        imgArr.forEach((file) => {
            if (file) {
                formData.append("image", file);
            }
        });

        const blob = new Blob([JSON.stringify(data)], {
            type: "application/json",
        });
        formData.append("reviewPostRequest", blob);

        filePostAPI(`/review`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            transformRequest: [
                function () {
                    return formData;
                },
            ],
        }).then((response) => {
            setTitle('')
            setContent('')
            setSelectedFile1('')
            setSelectedFile2('')
            setSelectedFile3('')
            setSelectedFileName1('')
            setSelectedFileName2('')
            setSelectedFileName3('')
            swal("작성이 완료되었습니다!")
            navigate(-1)
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <div>
            <div className='flex flex-col justify-center items-center  h-[100vh]'>
                <div className='flex flex-col gap-y-3'>
                    <div className='flex flex-col items-center justify-center  gap-y-3'>
                        <div
                            className='text-[29px] font-semibold text-[#FF7F1D]'
                        >제목</div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={30}
                            placeholder='제목(30자)'
                            className='border-[1px] rounded-[20px] w-[812px] h-[52px] p-4' />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder='내용'
                            className='border-[1px] rounded-[20px] resize-none w-[812px] h-[192px] p-4' />
                    </div>
                    <div className='flex gap-x-3'>

                        <label
                            className='relative w-[56px] h-[56px] bg-[#E8E8E8] rounded-2xl flex items-center justify-center'
                        >
                            <img
                                className='absolute w-[20px] h-[18.5px] '
                                src={`${process.env.PUBLIC_URL}/images/camera.png`}
                                alt='camera'
                            />
                            <input
                                className='opacity-0'
                                type="file"
                                id="fileInput"
                                onChange={handleFileChange1}
                            />
                        </label>
                        <label
                            className='relative w-[56px] h-[56px] bg-[#E8E8E8] rounded-2xl flex items-center justify-center'
                        >
                            <img
                                className='absolute w-[20px] h-[18.5px]'
                                src={`${process.env.PUBLIC_URL}/images/camera.png`}
                                alt='camera'
                            />
                            <input
                                className='opacity-0'
                                type="file"
                                id="fileInput"
                                onChange={handleFileChange2}
                            />
                        </label>
                        <label
                            className='relative w-[56px] h-[56px] bg-[#E8E8E8] rounded-2xl flex items-center justify-center'
                        >
                            <img
                                className='absolute w-[20px] h-[18.5px]'
                                src={`${process.env.PUBLIC_URL}/images/camera.png`}
                                alt='camera'
                            />
                            <input
                                className='opacity-0'
                                type="file"
                                id="fileInput"
                                onChange={handleFileChange3}
                            />
                        </label>



                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    className='bg-[#FF7700] w-[200px] h-[60px] rounded-[60px] text-white text-[24px]'>완료</button>
            </div>
        </div>
    )
}

export default WriteReview
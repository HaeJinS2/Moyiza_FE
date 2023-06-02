import React from "react";
import Container from "../Container";
import Slider from 'react-input-slider';

export const Step1 = ({ nextStep, progress, handleCategoryChange, categoryInput, option, setSelectedCategory, selectedCategory }) => {

    return (
        <Container>
            <section className=" h-[calc(100vh-0px)] flex flex-col items-center ">
                <div className="flex flex-col">
                    <div className="flex  w-full h-[500px] items-center justify-center ">
                        <span className="text-[30px]">모두와 함께할 <span className="text-[#08B159]">일상</span>을 만들어보세요!</span>
                    </div>
                    <div className="flex flex-col items-center w-full md:w-[1920px] shadow-cm bg-[#FFFCF2] rounded-t-[100px]">
                        <div className="flex w-[800px] py-[103px] flex-col gap-y-24 z-10">
                            <div className="flex justify-start items-start w-full">
                                <span className="text-[20px] text-left">1. 관심사를 선택하세요.</span>
                            </div>
                            <div className="flex flex-1 items-center justify-center">
                                <div className="grid grid-cols-3 gap-x-[120px] gap-y-[59px] w-auto h-auto mb-4">
                                    {Object.keys(option?.categoryLists || {}).map((category, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`${selectedCategory === category ? 'shadow-cms bg-[#dddddd] w-[11rem] h-[3.7rem]  rounded-3xl' : 'shadow-cms bg-white w-[11rem] h-[3.7rem]  rounded-3xl'}`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex  items-center justify-center">
                                <button className=" w-[14rem] h-[3.8rem] bg-[#FF7F1E] text-white rounded-3xl" onClick={nextStep}>다음</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export const Step2 = ({ nextStep, prevStep, handleTagClick, progress, handleTagChange, selectedTags, setSelectedTags, selectedTag, option, setSelectedTag, handleTagChange1, handleTagChange2, handleTagChange3, tagInput1, tagInput2, tagInput3 }) => {

    return (
        <Container>
            <section className=" h-[calc(100vh-0px)] flex flex-col items-center ">
                <div className="flex flex-col">
                    <div className="flex flex-col  w-full h-[500px] items-center justify-center ">
                        <span className="text-[30px]">모두와 함께할 <span className="text-[#08B159]">일상</span>을 만들어보세요!</span>
                    </div>
                    <div>
                        <div className="flex flex-col items-center w-full md:w-[1920px] shadow-cm  bg-[#FFFCF2] rounded-t-[100px]">
                            <div className="flex w-[800px] h-[800px] justify-center items-center flex-col gap-y-24 z-10">
                                <div className="flex justify-start items-start w-full">
                                    <span className="text-[20px] text-left">2. 원하는 카테고리를 선택하세요.</span>
                                </div>
                                <div className="grid grid-cols-3 gap-x-[120px] gap-y-[59px] w-auto h-auto mb-4">
                                    {selectedTags?.map((tag, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleTagClick(tag)}
                                            className={`${selectedTag.includes(tag) ? 'shadow-cms bg-[#dddddd] w-[11rem] h-[3.7rem]  rounded-3xl' : 'shadow-cms bg-white w-[11rem] h-[3.7rem]  rounded-3xl'}`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center justify-center gap-x-4">
                                    <button className="w-[14rem] h-[3.8rem] bg-[#747474] text-white rounded-3xl" onClick={prevStep}>이전</button>
                                    <button className="w-[14rem] h-[3.8rem] bg-[#FF7F1E] text-white rounded-3xl" onClick={nextStep}>다음</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>

    )
}

// 클럽 이름
export const Step3 = ({ nextStep, prevStep, progress, handleTitleChange, titleInput }) => {

    return (
        <>
            <Container>
                <section className=" h-[calc(100vh-0px)] flex flex-col items-center ">
                    <div className="flex flex-col">
                        <div className="flex  w-full h-[500px] items-center justify-center ">
                            <span className="text-[30px]">모두와 함께할 <span className="text-[#08B159]">일상</span>을 만들어보세요!</span>
                        </div>
                        <div className="flex flex-col items-center w-full md:w-[1920px] shadow-cm  bg-[#FFFCF2] rounded-t-[100px]">
                            <div className="flex w-[800px] py-[220.5px] flex-col gap-y-24 z-10">
                                <div className="flex justify-start items-start w-full">
                                    <span className="text-[20px] text-left">3. 원하는 일상속 이름을 작성해주세요.</span>
                                </div>
                                <input className='shadow-cms w-[788px] h-[60px] rounded-3xl mb-4 border-2 px-2'
                                    placeholder="이름을 입력하세요."
                                    type="text" value={titleInput} onChange={handleTitleChange} />
                                <div className="flex items-center justify-center gap-x-4">
                                    <button className="w-[14rem] h-[3.8rem] bg-[#747474] text-white rounded-3xl" onClick={prevStep}>이전</button>
                                    <button className="w-[14rem] h-[3.8rem] bg-[#FF7F1E] text-white rounded-3xl" onClick={nextStep}>다음</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        </>
    )
}

// 클럽사진 + 클럽내용
export const Step4 = ({ nextStep, prevStep, progress, preview, handleFileChange, handleContentChange, contentInput }) => {

    return (
        <Container>
            <section className=" h-[calc(100vh-0px)] flex flex-col items-center ">
                <div className="flex flex-col">
                    <div className="flex  w-full h-[500px] items-center justify-center ">
                        <span className="text-[30px]">모두와 함께할 <span className="text-[#08B159]">일상</span>을 만들어보세요!</span>
                    </div>
                    <div className="flex flex-col items-center w-full md:w-[1920px] shadow-cm  bg-[#FFFCF2] rounded-t-[100px]">
                        <div className="flex w-[800px] py-[62px] flex-col gap-y-24 z-10">
                            <div className="flex justify-start items-start w-full">
                                <span className="text-[20px] text-left">4. 일상속 정보를 입력하세요.</span>
                            </div>

                            <div className="flex flex-col justify-start w-[1200px] items-center gap-x-4 gap-y-2">
                                <div className="flex  justify-start items-start w-full">
                                    <span className="text-[20px] text-left">1) 일상속 이미지를 등록하세요.</span>
                                </div>
                                <div className="flex justify-start items-start w-full">
                                    {preview && (
                                        <img className="w-[70px] h-[70px]" src={preview} alt="preview" />
                                    )}
                                    <input
                                        type="file"
                                        id="fileInput"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col  gap-y-2">
                                <div className="flex  justify-start items-start w-full">
                                    <span className="text-[20px] text-left">2) 일상속 소개 내용을 입력하세요.</span>
                                </div>
                                <input
                                    className='shadow-cms w-[954px] h-[192px] rounded-3xl mb-4 border-2 px-2'
                                    placeholder="우리 일상을 소개해주세요."
                                    type="text" value={contentInput} onChange={handleContentChange} />
                            </div>

                            <div className="flex items-center justify-center gap-x-4">
                                <button className="w-[14rem] h-[3.8rem] bg-[#747474] text-white rounded-3xl" onClick={prevStep}>이전</button>
                                <button className="w-[14rem] h-[3.8rem] bg-[#FF7F1E] text-white rounded-3xl" onClick={nextStep}>다음</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}

// 성별제한 + 연령제한
export const Step5 = ({ nextStep, prevStep, progress, selectedGenderPolicy, setSelectedGenderPolicy, option, handleAgePolicyChange, agePolicy, handleRestrictionChange, handleRestrictionChange2, restrictionInput, restrictionInput2 }) => {
    return (
        <Container>
            <section className=" h-[calc(100vh-0px)] flex flex-col items-center ">
                <div className="flex flex-col">
                    <div className="flex  w-full h-[500px] items-center justify-center ">
                        <span className="text-[30px]">모두와 함께할 <span className="text-[#08B159]">일상</span>을 만들어보세요!</span>
                    </div>
                    <div className="flex flex-col items-center w-full md:w-[1920px] shadow-cm  bg-[#FFFCF2] rounded-t-[100px]">
                        <div className="flex w-[800px] py-[111px] flex-col gap-y-24 z-10">
                            <div className="flex justify-start items-start w-full">
                                <span className="text-[20px] text-left">5. 함께할 일상속 멤버 조건을 설정하세요.</span>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <div className="flex  justify-start items-start w-full">
                                    <span className="text-[20px] text-left">1) 성별</span>
                                </div>
                                <div className="grid grid-cols-3 gap-x-[120px] gap-y-[59px] w-auto h-auto mb-4">
                                    {option.genderPolicyLists.map((category, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedGenderPolicy(category)}
                                            className={`${selectedGenderPolicy === category ? 'shadow-cms bg-[#dddddd] w-[11rem] h-[3.7rem] rounded-3xl' : 'shadow-cms bg-white w-[11rem] h-[3.7rem] rounded-3xl'}`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <div className="flex  justify-start items-start w-full">
                                    <span className="text-[20px] text-left">2) 연령</span>
                                </div>
                                <div>
                                    <div className="w-[1000px]">
                                        {agePolicy && (
                                            <Slider
                                                styles={{
                                                    track: {
                                                        width: 1000,
                                                    },
                                                    active: {
                                                        backgroundColor: '#FFE14F'
                                                    },
                                                }}
                                                axis="x"
                                                xstep={5}
                                                xmin={20}
                                                xmax={50}
                                                x={agePolicy.x}
                                                onChange={({ x }) => handleAgePolicyChange({ x: parseFloat(x.toFixed(2)) })}
                                            />
                                        )}
                                        <div className="flex justify-between">
                                            <div>20</div>
                                            <div>25</div>
                                            <div>30</div>
                                            <div>35</div>
                                            <div>40</div>
                                            <div>45</div>
                                            <div>50+</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-4">
                                <button className="w-[14rem] h-[3.8rem] bg-[#747474] text-white rounded-3xl" onClick={prevStep}>이전</button>
                                <button className="w-[14rem] h-[3.8rem] bg-[#FF7F1E] text-white rounded-3xl" onClick={nextStep}>다음</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}

// 인원제한
export const Step6 = ({ nextStep, prevStep, progress, handleMaxGroupSizeChange, maxGroupSize }) => {
    return (
        <Container>
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                <div className="flex flex-col gap-y-10">
                    <div>                    {/* <input type="text" value={maxGroupSize} onChange={handleMaxGroupSizeChange} /> */}
                        <div>{'몇명까지?: ' + maxGroupSize.x}</div>
                        {maxGroupSize && (
                            <Slider
                                styles={{
                                    track: {
                                        width: 1200,
                                    },
                                    active: {
                                        backgroundColor: '#FB7185'
                                    },
                                }}
                                axis="x"
                                xstep={1}
                                xmin={20}
                                xmax={100}
                                x={maxGroupSize.x}
                                onChange={({ x }) => handleMaxGroupSizeChange({ x: parseFloat(x.toFixed(2)) })}
                            />
                        )}
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <button className=" w-[600px] h-32 bg-[#FB7185]" onClick={prevStep}>이전</button>
                        <button className=" w-[600px] h-32 bg-[#FB7185]" onClick={nextStep}>다음</button>
                    </div>
                </div>
            </section>
        </Container>
    )
}

// 완료
export const Step7 = ({ prevStep, progress, handleSubmit }) => {
    return (
        <Container>
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-4">
                    <button className=" w-[600px] h-32 bg-[#FB7185]" onClick={prevStep}>이전</button>
                    <button className=" w-[600px] h-32 bg-[#FB7185]" onClick={handleSubmit}>제출</button>
                </div>
            </section>
        </Container>
    )
}
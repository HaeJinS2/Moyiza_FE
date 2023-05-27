import React from "react";
import Container from "../Container";
import Slider from 'react-input-slider';

export const Step1 = ({ nextStep, progress, handleCategoryChange, categoryInput, option, setSelectedCategory, selectedCategory }) => {

    return (
        <Container>
            <section className="h-[100vh] flex flex-col items-center justify-center">
                {/* <input type="text" value={categoryInput} onChange={handleCategoryChange} /> */}
                <div className="flex flex-col items-center">
                    <div className="grid grid-cols-4 gap-4 w-[1200px] h-auto mb-4">
                        {Object.keys(option?.categoryLists || {}).map((category, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedCategory(category)}
                                className={`${selectedCategory === category ? 'bg-[#b54e5d] text-white w-full h-32' : 'bg-[#FB7185] text-white w-full h-32'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="flex  items-center justify-center">
                        <button className=" w-[1200px] h-32 bg-[#FB7185]" onClick={nextStep}>다음</button>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export const Step2 = ({ nextStep, prevStep, handleTagClick, progress, handleTagChange, selectedTags, setSelectedTags, selectedTag, option, setSelectedTag, handleTagChange1, handleTagChange2, handleTagChange3, tagInput1, tagInput2, tagInput3 }) => {

    return (
        <Container>
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                <div>
                    <input type="text" value={tagInput1} onChange={handleTagChange1} placeholder="Tag 1" />
                    <input type="text" value={tagInput2} onChange={handleTagChange2} placeholder="Tag 2" />
                    <input type="text" value={tagInput3} onChange={handleTagChange3} placeholder="Tag 3" />

                    <div className="grid grid-cols-4 gap-4 w-[1200px] h-32 mb-4">
                        {selectedTags?.map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => handleTagClick(tag)}
                                className={`${selectedTag.includes(tag) ? 'bg-[#b54e5d] text-white w-full h-32' : 'bg-[#FB7185] text-white w-full h-32'}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-x-4">
                    <button className=" w-[600px] h-32 bg-[#FB7185]" onClick={prevStep}>이전</button>
                    <button className=" w-[600px] h-32 bg-[#FB7185]" onClick={nextStep}>다음</button>
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
                <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                    <div>
                        <input className='shadow-md w-[1200px] h-32 rounded-lg mb-4 border-2 px-2'
                            placeholder="클럽이름을 입력하세요"
                            type="text" value={titleInput} onChange={handleTitleChange} />
                    </div>
                    <div className="flex items-center justify-center gap-x-4">
                        <button className=" w-[600px] h-32 bg-[#FB7185]" onClick={prevStep}>이전</button>
                        <button className=" w-[600px] h-32 bg-[#FB7185]" onClick={nextStep}>다음</button>
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
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                <div className="flex justify-start w-[1200px] pl-4 items-center gap-x-4">
                    {preview && (
                        <img className="w-[70px] h-[70px]" src={preview} alt="preview" />
                    )}
                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileChange}
                    />

                </div>
                <div className="border w-full mb-4 mt-4"></div>
                <input
                    className='shadow-md w-[1200px] h-32 rounded-lg mb-4 border-2 px-2'
                    placeholder="클럽내용을 입력하세요"
                    type="text" value={contentInput} onChange={handleContentChange} />
                <div className="flex items-center justify-center gap-x-4">
                    <button className=" w-[600px] h-32 bg-[#FB7185]" onClick={prevStep}>이전</button>
                    <button className=" w-[600px] h-32 bg-[#FB7185]" onClick={nextStep}>다음</button>
                </div>
            </section>
        </Container>
    )
}

// 성별제한 + 연령제한
export const Step5 = ({ nextStep, prevStep, progress, selectedGenderPolicy, setSelectedGenderPolicy, option, handleAgePolicyChange, agePolicy, handleRestrictionChange, handleRestrictionChange2, restrictionInput, restrictionInput2 }) => {
    return (
        <Container>
            <section className="h-[100vh] flex flex-1 flex-col items-center justify-center">
                <div className="flex flex-col gap-y-10">
                    {/* <input type="text" value={restrictionInput} onChange={handleRestrictionChange} /> */}
                    {/* <input type="text" value={restrictionInput2} onChange={handleRestrictionChange2} /> */}
                    <div className="grid grid-cols-4 gap-4 w-[1200px] h-32 mb-4">
                        {option.genderPolicyLists.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedGenderPolicy(category)}
                                className={`${selectedGenderPolicy === category ? 'bg-[#b54e5d] text-white w-full h-32' : 'bg-[#FB7185] text-white w-full h-32'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div>
                        <div>{'몇살부터?: ' + agePolicy.x}</div>
                        <div className="w-[1200px]">
                            {agePolicy && (
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
                                    xstep={5}
                                    xmin={20}
                                    xmax={50}
                                    x={agePolicy.x}
                                    onChange={({ x }) => handleAgePolicyChange({ x: parseFloat(x.toFixed(2)) })}
                                />
                            )}
                        </div>
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
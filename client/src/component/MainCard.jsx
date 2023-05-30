import React from "react";

function MainCard({ description, image, reverse }) {
  return (
    <>
      {
        reverse ?
          <div className="cursor-pointer flex w-full h-[333px] mt-20 justify-between items-center ">
            {image && <img className="w-[320px] h-auto" src={image} alt="service-description" />}
            <div className="flex gap-x-4">
              <div className="font-semibold text-3xl text-neutral-400">
                01
              </div>
              {description && (
                <div className="flex flex-col w-[500px] gap-y-4">
                  <div className="font-bold text-3xl">{description}</div>
                  <div className=""> Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus doloribus nemo odit soluta sint neque perferendis! Neque magnam sit provident placeat, impedit voluptatibus molestias, doloremque ullam animi totam iusto perspiciatis. </div>
                </div>
              )}
            </div>
          </div>
          :
          <div className="cursor-pointer flex w-full h-[333px] mt-20 justify-between items-center ">
            <div className="flex gap-x-4">
              <div className="font-semibold text-3xl text-neutral-400">
                01
              </div>
              {description && (
                <div className="flex flex-col w-[500px] gap-y-4">
                  <div className="font-bold text-3xl">{description}</div>
                  <div className=""> Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus doloribus nemo odit soluta sint neque perferendis! Neque magnam sit provident placeat, impedit voluptatibus molestias, doloremque ullam animi totam iusto perspiciatis. </div>
                </div>
              )}
            </div>
            {image && <img className="w-[320px] h-auto" src={image} alt="service-description" />}
          </div>
      }
    </>
  )
}

export default MainCard;
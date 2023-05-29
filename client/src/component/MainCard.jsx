import React from "react";

function MainCard({description, image}) {
  return (
    <div className="cursor-pointer flex w-full h-[400px] p-4 border-[1px] justify-center items-center ">
      {description&& (<div>{description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus doloribus nemo odit soluta sint neque perferendis! Neque magnam sit provident placeat, impedit voluptatibus molestias, doloremque ullam animi totam iusto perspiciatis.</div>) }
      {image && <img className="w-[350px]" src={image} alt="service-description"/> }
    </div>
  );
}

export default MainCard;
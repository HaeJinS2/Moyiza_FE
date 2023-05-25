import React from "react";

function MainCard({description, image}) {
  return (
    <div className="cursor-pointer flex w-full h-[400px] p-4 shadow-md justify-center">
      {description&& (<div>{description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus doloribus nemo odit soluta sint neque perferendis! Neque magnam sit provident placeat, impedit voluptatibus molestias, doloremque ullam animi totam iusto perspiciatis.</div>) }
      {image && <img src={image} alt="service-description"/> }
    </div>
  );
}

export default MainCard;
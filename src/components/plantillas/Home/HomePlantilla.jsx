import React, { useState } from "react";
import Carousel from "../../organismo/carousel/Carousel";

const HomePlantilla = () => {
  return (
    <>
      <div className="flex flex-row gap-3 h-full">
        <div className="flex-1 bg-gray-200 p-4">
          <Carousel />
        </div>
        <div className="flex-1 bg-gray-300 space-y-11 justify-center items-center p-4">
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gray-400 p-4"></div>
      </div>
    </>
  );
};

export default HomePlantilla;

{
  /* <>
  <div className="bg-green-300 flex flex-col h-screen">
    <div className="flex-1 p-4 overflow-auto">
      <Carousel />
    </div>
    <div className="flex-1 flex items-center justify-center">
      <h1>Contenedor 2</h1>
    </div>
    <div className="flex-1 flex items-center justify-center">
      <h1>Contenedor 3</h1>
    </div>
  </div>
</> */
}

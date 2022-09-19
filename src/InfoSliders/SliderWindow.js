import React, { useContext, useState } from "react";
import { GridContext } from "../Helpers/GridContexts";
import { AlgoInfo } from "./AlgoInfo";
import { SliderButton } from "./SliderButton";

export const SliderWindow = () => {
  const { setIsInfoRendered } = useContext(GridContext);

  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {};

  const prevSlide = () => {};

  return (
    <div className="popupBackground">
      <div className="popupBackdrop infoBackdrop">
        <div className="infoInner">
          <SliderButton changeSlide={nextSlide} direction={"next"} />
          <SliderButton changeSlide={prevSlide} direction={"prev"} />
          <button
            className="settingsButton infoButtonBack"
            onClick={() => setIsInfoRendered(false)}
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
};

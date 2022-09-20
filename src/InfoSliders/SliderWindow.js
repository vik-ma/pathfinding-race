import React, { useContext, useState } from "react";
import { GridContext } from "../Helpers/GridContexts";
import { AlgoInfo } from "./AlgoInfo";
import { SliderButton } from "./SliderButton";

export const SliderWindow = () => {
  const { setIsInfoRendered } = useContext(GridContext);

  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex(slideIndex + 1);
  };

  const prevSlide = () => {
    setSlideIndex(slideIndex - 1);
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className="popupBackground">
      <div className="popupBackdrop infoBackdrop">
        <div className="infoInner">
          {slideIndex !== AlgoInfo.length - 1 ? (
            <SliderButton changeSlide={nextSlide} direction={"next"} />
          ) : null}
          {slideIndex !== 0 ? (
            <SliderButton changeSlide={prevSlide} direction={"prev"} />
          ) : null}
          <button
            className="settingsButton infoButtonBack"
            onClick={() => setIsInfoRendered(false)}
          >
            BACK
          </button>

          {AlgoInfo.map((obj, index) => {
            return (
              <div
                key={obj.id}
                className={slideIndex === index ? "slide slideAnim" : "slide"}
              >
                {AlgoInfo[index].title}
                {AlgoInfo[index].text}
              </div>
            );
          })}
          <div className="sliderDots">
            {Array.from({ length: AlgoInfo.length }).map((item, index) => (
              <div
                key={`slider-dot-${index}`}
                onClick={() => moveDot(index)}
                className={slideIndex === index ? "dot active" : "dot"}
              ></div>
            ))}
          </div>

          {/* {AlgoInfo[slideIndex].title}
          {AlgoInfo[slideIndex].text} */}
        </div>
      </div>
    </div>
  );
};

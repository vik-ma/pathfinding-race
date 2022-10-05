import React, { useContext } from "react";
import { AppContext } from "../Helpers/AppContext";
import { AlgoInfo } from "./AlgoInfo";
import { SliderButton } from "./SliderButton";

export const InfoSlider = () => {
  const { setIsInfoRendered, slideIndex, setSlideIndex } =
    useContext(AppContext);

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
          <div className="infoButtonBack">
            <button
              className="settingsButton"
              onClick={() => setIsInfoRendered(false)}
            >
              Return
            </button>
          </div>

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
        </div>
      </div>
    </div>
  );
};

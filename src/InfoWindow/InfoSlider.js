import React, { useContext } from "react";
import { AppContext } from "../Helpers/AppContext";
import { SliderContent } from "./SliderContent";
import { SliderArrow } from "./SliderArrow";

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
          {slideIndex !== SliderContent.length - 1 ? (
            <SliderArrow changeSlide={nextSlide} direction={"next"} />
          ) : null}
          {slideIndex !== 0 ? (
            <SliderArrow changeSlide={prevSlide} direction={"prev"} />
          ) : null}
          <div className="infoButtonBack">
            <button
              className="popupButton"
              onClick={() => setIsInfoRendered(false)}
            >
              Return
            </button>
          </div>

          {SliderContent.map((obj, index) => {
            return (
              <div
                key={obj.id}
                className={slideIndex === index ? "slide slideAnim" : "slide"}
              >
                {SliderContent[index].title}
                {SliderContent[index].text}
              </div>
            );
          })}
          <div className="sliderDots">
            {Array.from({ length: SliderContent.length }).map((item, index) => (
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

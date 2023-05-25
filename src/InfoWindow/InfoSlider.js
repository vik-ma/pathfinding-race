import React, { useContext, useRef, useEffect } from "react";
import { AppContext } from "../Helpers/AppContext";
import { SliderContent } from "./SliderContent";
import { SliderArrow } from "./SliderArrow";

export const InfoSlider = () => {
  const { setIsInfoRendered, slideIndex, setSlideIndex } =
    useContext(AppContext);

  // Go to slide to the right
  const nextSlideButton = () => {
    setSlideIndex(slideIndex + 1);
  };

  // Go to slide to the left
  const prevSlideButton = () => {
    setSlideIndex(slideIndex - 1);
  };

  // Change which dot is marked at the bottom of InfoWindow
  const moveDot = (index) => {
    setSlideIndex(index);
  };

  // useRef for popup window
  const windowRef = useRef(null);

  useEffect(() => {
    // Close Information popup when clicking outside of Information window
    function handleClickOutside(event) {
      if (
        windowRef.current &&
        !windowRef.current.contains(event.target)
      ) {
        setIsInfoRendered(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="popupBackground">
      <div ref={windowRef} className="popupBackdrop infoBackdrop">
        <div className="infoInner">
          {/* Show arrow buttons if prev/next slide is available */}
          {slideIndex !== SliderContent.length - 1 ? (
            <SliderArrow changeSlide={nextSlideButton} direction={"next"} />
          ) : null}
          {slideIndex !== 0 ? (
            <SliderArrow changeSlide={prevSlideButton} direction={"prev"} />
          ) : null}
          <div className="infoButtonBack">
            <button
              className="popupButton"
              onClick={() => setIsInfoRendered(false)}
            >
              Close
            </button>
          </div>

          {/* Fill each slide with corresponding index in SliderContent */}
          {SliderContent.map((obj, index) => {
            return (
              <div
                key={obj.id}
                className={
                  slideIndex === index ? "slide slideCurrent" : "slide"
                }
              >
                {SliderContent[index].title}
                {SliderContent[index].text}
              </div>
            );
          })}
          {/* Create clickable dots at bottom of window based on SliderContent elements */}
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

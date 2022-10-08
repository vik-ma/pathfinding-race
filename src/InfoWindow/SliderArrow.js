import leftArrow from "../Icons/left-arrow.svg";
import rightArrow from "../Icons/right-arrow.svg";

export const SliderArrow = ({ changeSlide, direction }) => {
  return (
    <button
      onClick={changeSlide}
      className={
        //Go to new slide based on direction
        direction === "next"
          ? "sliderArrow nextSlideButton"
          : "sliderArrow prevSlideButton"
      }
    >
      <img
        //Display right arrow for next slide and left arrow for prev slide
        src={direction === "next" ? rightArrow : leftArrow}
        alt={direction === "next" ? "Right Arrow" : "Left Arrow"}
      />
    </button>
  );
};

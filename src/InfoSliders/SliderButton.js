import leftArrow from "../Icons/left-arrow.svg";
import rightArrow from "../Icons/right-arrow.svg";

export const SliderButton = ({ changeSlide, direction }) => {
  return (
    <button
      onClick={changeSlide}
      className={
        direction === "next" ? "sliderButton nextSlide" : "sliderButton prevSlide"
      }
    >
      <img
        src={direction === "next" ? rightArrow : leftArrow}
        alt="Right Arrow"
      />
    </button>
  );
};

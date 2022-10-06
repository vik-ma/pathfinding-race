import leftArrow from "../Icons/left-arrow.svg";
import rightArrow from "../Icons/right-arrow.svg";

export const SliderArrow = ({ changeSlide, direction }) => {
  return (
    <button
      onClick={changeSlide}
      className={
        direction === "next"
          ? "sliderArrow nextSlideButton"
          : "sliderArrow prevSlideButton"
      }
    >
      <img
        src={direction === "next" ? rightArrow : leftArrow}
        alt="Right Arrow"
      />
    </button>
  );
};

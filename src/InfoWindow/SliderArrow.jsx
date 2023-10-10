import RightArrow from "../Icons/RightArrow";
import LeftArrow from "../Icons/LeftArrow";

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
      {/* Display right arrow for next slide and left arrow for prev slide */}
      <div className="sliderArrowIcon">
        {direction === "next" ? <RightArrow /> : <LeftArrow />}
      </div>
    </button>
  );
};

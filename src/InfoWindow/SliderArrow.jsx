import RightArrow from "../Icons/RightArrow";
import LeftArrow from "../Icons/LeftArrow";

export const SliderArrow = ({ changeSlide, direction }) => {
  return (
    <button onClick={changeSlide} className="sliderArrowButton">
      <div
        className={
          //Go to new slide based on direction
          direction === "next"
            ? "sliderArrowIcon"
            : "sliderArrowIcon"
        }
      >
        {/* Display right arrow for next slide and left arrow for prev slide */}
        {direction === "next" ? <RightArrow /> : <LeftArrow />}
      </div>
    </button>
  );
};

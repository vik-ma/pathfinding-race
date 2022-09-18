import React, { useContext, useState } from "react";
import { GridContext } from "../Helpers/GridContexts";

export const SliderWindow = () => {
  const { setIsInfoRendered } = useContext(GridContext);
  return (
    <div className="popupBackground">
      <div className="popupBackdrop infoBackdrop">
        TEST<button onClick={() => setIsInfoRendered(false)}>BACK</button>
      </div>
    </div>
  );
};

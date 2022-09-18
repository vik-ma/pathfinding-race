import React, { useContext, useState } from "react";
import { GridContext } from "../Helpers/GridContexts";

export const SliderWindow = () => {
  const { setIsInfoRendered } = useContext(GridContext);
  return (
    <div className="popupBackground">
      <div className="popupBackdrop infoBackdrop">
        <div className="infoInner">
          <h1>Information</h1>
          <button className="settingsButton infoButtonBack" onClick={() => setIsInfoRendered(false)}>BACK</button>
        </div>
      </div>
    </div>
  );
};

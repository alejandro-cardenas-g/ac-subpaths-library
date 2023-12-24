import React from "react";
import Styles from "./ActiveButton.modules.css";

export interface IActiveButton {
  text: string;
}

export const ActiveButton: React.FC<IActiveButton> = ({ text }) => {
  console.log(Styles);
  return (
    <>
      <button className={Styles["active-button"]}>{text || "Button"}</button>
    </>
  );
};

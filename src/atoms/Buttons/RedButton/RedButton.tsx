import React from "react";
import Styles from "./RedButton.modules.css";

export interface IRedButton {
  text: string;
}

export const RedButton: React.FC<IRedButton> = ({ text }) => {
  return (
    <>
      <button className={Styles["red-button"]}>{text || "Red Button"}</button>
    </>
  );
};

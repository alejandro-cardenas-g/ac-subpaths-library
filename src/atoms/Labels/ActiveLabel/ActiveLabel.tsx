import React from "react";
import Styles from "./ActiveLabel.modules.css";

export interface IActiveLabel {
  text: string;
}

export const ActiveLabel: React.FC<IActiveLabel> = ({ text }) => {
  return (
    <>
      <label className={Styles["active-label"]}>{text || "Button"}</label>
    </>
  );
};

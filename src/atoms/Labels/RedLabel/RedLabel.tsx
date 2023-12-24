import React from "react";
import Styles from "./RedLabel.modules.css";

export interface IRedLabel {
  text: string;
}

export const RedLabel: React.FC<IRedLabel> = ({ text }) => {
  return (
    <>
      <label className={Styles["red-label"]}>{text || "Red Label"}</label>
    </>
  );
};

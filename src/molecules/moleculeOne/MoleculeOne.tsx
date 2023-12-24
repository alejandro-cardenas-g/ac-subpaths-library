import React from "react";
import { IRedButton, IRedLabel, RedButton, RedLabel } from "../../atoms";
import styles from "./MoleculeOne.modules.css";

export interface IMoleculeOne {
  showLabel?: boolean;
  labelProps: IRedLabel;
  buttonProps: IRedButton;
}

export const MoleculeOne: React.FC<IMoleculeOne> = ({
  showLabel = false,
  buttonProps,
  labelProps,
}) => {
  return (
    <div className={styles["moleculeOne"]}>
      <RedButton {...buttonProps} />
      {showLabel && <RedLabel {...labelProps} />}
    </div>
  );
};

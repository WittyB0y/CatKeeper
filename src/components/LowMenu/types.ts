import { ReactElement } from "react";

export interface IMenuButton {
  text?: string;
  icon?: ReactElement;
  onPress: () => void;
}
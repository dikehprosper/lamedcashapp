import { MouseEventHandler } from "react"

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface ModalProps {
  containerStyles?: string;
  containerStylesInner?: string;
  containerStylesInnerLink?: string;
  handleClick?: () => void;
  navLinks?: {
    title: string;
    pathname: string;
  }[];
}

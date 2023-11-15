import { MouseEventHandler } from "react"

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface SmallScreenNavModalProps {
  containerStyles?: string;
  containerStylesInner?: string;
  containerStylesInnerLink?: string;
  active?: string;
  handleClick?: () => void;
  navLinks?: {
    title: string;
    pathname: string;
  }[];
}

export interface BigScreenNavModalProps {
  containerStyles?: string;
  handleClick?: () => void;
  navLinks?: {
    title: string;
    pathname: string;
    icon: React.JSX.Element;
  }[];
}

export interface UserDashboardDisplayProps {
  count: number;
  title: string;
   amount: number;
  style?: {
    color?: string;
    background?: string;
    icon?: React.JSX.Element;
  };
}

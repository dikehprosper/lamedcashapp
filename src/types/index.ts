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
  logout?: () => void;
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
  data: {
    _id: number | string;
    status: string;
    amount: number | string;
    type: string;
    time: string | number;
  }[];
  count: number;
  title: string;
  term: number;
  amount: number;
  style?: {
    color?: string;
    background?: string;
    icon?: React.JSX.Element;
  };
}

export interface TransactionTemplateProps {
  data: {
    _id: number | string;
    date: string;
    time: string;
    amount: number;
    betId: string;
    status: string;
    type: string;
  }[];
  totalWithdrawals: number;
  totalDeposits: number;
  title: {
    name: string;
    icon: React.JSX.Element;
  };
  select: {
    firstSelect: {
      big: string;
      small: string;
    };
    secondSelect: {
      big: string;
      small: string;
    };
    thirdSelect: {
      big: string;
      small: string;
    };
  };
}

export interface TransactionTemplatePropsSubadmins {
  title: {
    name: string;
    icon: React.JSX.Element;
  };
  select: {
    fourthSelect: {
      big: string;
      small: string;
    };
    firstSelect: {
      big: string;
      small: string;
    };
    secondSelect: {
      big: string;
      small: string;
    };
    thirdSelect: {
      big: string;
      small: string;
    };
  };
}

export interface TransactionResultsProps {
  date: string | number;
  time: string | number;
  amount: number;
  receipt: string | number;
  betId: string | number;
  status: string;
  type: string;
}
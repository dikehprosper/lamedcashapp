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
  allData: any;
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
    fundingType: string;
    _id: number | string;
    date: string;
    time: string;
    amount: number;
    betId: string;
    status: string;
    type: string;
  }[];
  allData: any;
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
  totalSuccessful: number;
  totalFailed: number;
  name: string;
  showReceipt: () => void;
  data: {
    fundingType: string;
    _id: number | string;
    date: string;
    time: string;
    amount: number;
    betId: string;
    status: string;
    type: string;
  }[];
  allData: any;
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
  time: string | number;
  amount: number;
  receipt: string | number;
  betId: string | number;
  status: string;
  type: string;
}
export interface TransactionResultsSubadminProps {
  time: string | number;
  amount: number;
  transactionId: string | number;
  identifierId: string | number;
  betId: string | number;
  status: string;
  type: string;
  userId: string;
  cashdeskId: String;
  isSubmitted: boolean;
  showReceipt: () => void;
  username: string;
  userNumber: number;
}

export interface ReceiptModalProps {
  containerStyles?: string;
  containerStylesInner?: string;
  containerStylesInnerLink?: string;
  active?: string;
  handleClick?: () => void;
  logout?: () => void;
  receipt?: {
    time: string;
    amount: number;
    transactionId: string;
    identifierId: string;
    betId: string;
    status: string;
    title: string;
      username: string;
    userNumber: string;
  }[];
}
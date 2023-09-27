export interface ICardData {
  id: string;
  title: string;
  description: string;
  imgSource: string;
}

export interface ISelect {
  name: string;
  value: keyof ICardData;
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType: ButtonType;
  children?: React.ReactNode;
  // icon?: React.ReactNode;
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
};

export type ButtonType = 'delete' | 'submit' | 'cancel';

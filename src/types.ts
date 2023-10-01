export interface ICardData {
  name: string;
  climate: string;
  diameter: string;
  gravity: string;
  population: string;
  rotation_period: string;
  orbital_period: string;
  terrain: string;
}

export interface IGetPosts {
  posts: ICardData[];
  postsCount: number;
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType: ButtonType;
  children?: React.ReactNode;
  // icon?: React.ReactNode;
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  badMessage: string;
  isWrang: boolean;
};

export type ButtonType = 'delete' | 'submit' | 'cancel';

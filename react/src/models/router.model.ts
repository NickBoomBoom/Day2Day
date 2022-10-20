export interface IRouter {
  path: string;
  meta: IMeta;
  component: any;
}

export interface IMeta {
  title: string;
  exact?: boolean;
  hidden?: boolean;
}
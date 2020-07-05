
export interface IState {
  inputValue: string,
  result: IResult[]
}

export interface IProps {

}

export interface IResult {
  params: string;
  handle: string;
  result: string;
}
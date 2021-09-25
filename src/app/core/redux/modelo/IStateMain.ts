export interface IStateMain {
  isLoading: boolean;
  errorMessage: IErrorToast;
}

export interface IErrorToast {
  message: string;
  type: string;
}

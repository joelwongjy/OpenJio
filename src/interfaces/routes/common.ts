export interface RouteState {
  isLoading: boolean;
  isError: boolean;
  isAlertOpen?: boolean;
  alertHeader?: string;
  alertMessage?: string;
  hasConfirm?: boolean;
  closeHandler?: () => void;
  confirmHandler?: () => void;
  cancelHandler?: () => void;
}

export interface RouteParams {
  id: string;
}

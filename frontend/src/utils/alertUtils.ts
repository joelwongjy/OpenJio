import { RouteState } from 'interfaces/routes/common';

export function getAlertCallback(
  setState: <T extends RouteState>(state: Partial<T>) => void,
): (
  isAlertOpen: boolean,
  hasConfirm: boolean,
  alertHeader: string,
  alertMessage: string,
  confirmHandler?: (() => void) | undefined,
  cancelHandler?: (() => void) | undefined
) => void {
  const alertCallback = (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler?: () => void,
    cancelHandler?: () => void,
  ) => {
    setState({
      isAlertOpen,
      hasConfirm,
      alertHeader,
      alertMessage,
    });
    if (confirmHandler) {
      setState({
        confirmHandler: () => {
          confirmHandler();
          setState({ isAlertOpen: false });
        },
      });
    } else {
      setState({ confirmHandler: () => setState({ isAlertOpen: false }) });
    }
    if (cancelHandler) {
      setState({
        cancelHandler: () => {
          cancelHandler();
          setState({ isAlertOpen: false });
        },
      });
    } else {
      setState({ cancelHandler: () => setState({ isAlertOpen: false }) });
    }
  };
  return alertCallback;
}

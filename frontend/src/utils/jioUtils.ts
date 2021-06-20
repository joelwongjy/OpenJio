import { JioFormMode } from 'interfaces/components/jioForm';
import { JioData, JioPatchData, JioPostData } from 'interfaces/models/jios';

export const jioFormVerification = (
  mode: JioFormMode,
  state: JioPostData | JioPatchData,
  jio?: JioData
): boolean => {
  const { name, closeAt, orderLimit, paymentNumber } = state;
  if (mode === JioFormMode.EDIT) {
    return (
      name !== jio!.name ||
      closeAt !== jio!.closeAt ||
      orderLimit !== jio!.orderLimit ||
      paymentNumber !== jio!.paymentNumber
    );
  }
  return name !== '' || orderLimit !== 0 || paymentNumber !== '';
};

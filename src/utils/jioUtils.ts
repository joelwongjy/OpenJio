import { JioFormMode } from 'interfaces/components/jioForm';
import { JioListData, JioPatchData, JioPostData } from 'interfaces/models/jios';

export const jioFormVerification = (
  mode: JioFormMode,
  state: JioPostData | JioPatchData,
  jio?: JioListData
): boolean => {
  const { name, closeAt, orderLimit } = state;
  if (mode === JioFormMode.EDIT) {
    return (
      name !== jio!.name ||
      closeAt !== jio!.closeAt ||
      orderLimit !== jio!.orderLimit
    );
  }
  return name !== '' || orderLimit !== 0;
};

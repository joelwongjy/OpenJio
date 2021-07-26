import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import Alert from 'components/alert';
import Header from 'components/header';
import JoinJioForm from 'components/joinJioForm';
import { RouteState } from 'interfaces/routes/common';
import { getAlertCallback } from 'utils/alertUtils';

type JoinJioState = RouteState;

const JoinJio: React.FC = () => {
  const history = useHistory();

  const [state, setState] = useReducer(
    (s: JoinJioState, a: Partial<JoinJioState>) => ({
      ...s,
      ...a,
    }),
    {
      isLoading: true,
      isError: false,
      isAlertOpen: false,
      alertHeader: '',
      alertMessage: '',
      hasConfirm: false,
      closeHandler: () => {
        setState({ isAlertOpen: false });
      },
      confirmHandler: () => {
        setState({ isAlertOpen: false });
      },
      cancelHandler: () => {
        setState({ isAlertOpen: false });
      },
    }
  );

  const alertCallback = getAlertCallback(setState);

  return (
    <div className="min-h-screen  bg-gray-50">
      <Header />
      <JoinJioForm
        alertCallback={alertCallback}
        cancelCallback={() => history.push('/')}
      />
      <Alert
        isAlertOpen={state.isAlertOpen!}
        hasConfirm={state.hasConfirm!}
        alertHeader={state.alertHeader!}
        alertMessage={state.alertMessage!}
        closeHandler={state.closeHandler!}
        confirmHandler={state.confirmHandler}
        cancelHandler={state.cancelHandler}
      />
    </div>
  );
};

export default JoinJio;

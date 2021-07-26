import React, { useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Alert from 'components/alert';
import CostsForm from 'components/costsForm';
import Header from 'components/header';
import Loading from 'components/loading';
import { JIO, JIOS } from 'constants/routes';
import { JioData } from 'interfaces/models/jios';
import { RouteParams, RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import { getAlertCallback } from 'utils/alertUtils';

interface EnterCostsState extends RouteState {
  jio: JioData | null;
}

const EnterCosts: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();

  const [state, setState] = useReducer(
    (s: EnterCostsState, a: Partial<EnterCostsState>) => ({
      ...s,
      ...a,
    }),
    {
      jio: null,
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

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get(`${JIOS}/${id}`);
        if (!didCancel) {
          setState({
            jio: response.data as JioData,
            isLoading: false,
          });
        }
      } catch (error) {
        if (!didCancel) {
          setState({
            isError: true,
            isLoading: false,
            isAlertOpen: true,
            hasConfirm: false,
            alertHeader: 'Something went wrong',
            alertMessage: 'Please refresh the page and try again',
          });
        }
      }
    };
    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  const alertCallback = getAlertCallback(setState);

  if (state.jio === null) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen  bg-gray-50">
      <Header />
      <CostsForm
        jio={state.jio!}
        alertCallback={alertCallback}
        callback={() => history.push(`${JIOS}${JIO}/${id}`)}
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

export default EnterCosts;

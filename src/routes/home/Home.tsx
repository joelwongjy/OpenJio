import React, { useEffect, useReducer } from 'react';

import JioList from 'components/jioList';
import PageContainer from 'components/pageContainer';
import StatisticList from 'components/statisticList';
import { JIOS, USER } from 'constants/routes';
import { useUser } from 'contexts/UserContext';
import { JioListData, JioUserData } from 'interfaces/models/jios';
import { RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';

interface HomeState extends RouteState {
  toPay: JioListData[];
  openedJios: JioListData[];
  joinedJios: JioListData[];
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
}

const Home: React.FC = () => {
  const { user } = useUser();

  const [state, setState] = useReducer(
    (s: HomeState, a: Partial<HomeState>) => ({
      ...s,
      ...a,
    }),
    {
      toPay: [],
      openedJios: [],
      joinedJios: [],
      isAlertOpen: false,
      isLoading: true,
      isError: false,
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
        const response = await ApiService.get(`${JIOS}${USER}/${user!.id}`);
        const jios = response.data as JioUserData;
        if (!didCancel) {
          setState({
            toPay: jios.toPay,
            openedJios: jios.opened,
            joinedJios: jios.joined,
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

  return (
    <PageContainer>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
        Welcome, {user!.name}!
      </h2>
      <StatisticList />
      <h3 className="text-xl font-bold pt-4 leading-7 text-gray-900 sm:text-2xl sm:truncate">
        Payments Due
      </h3>
      <JioList jios={state.toPay} />
      <h3 className="text-xl font-bold pt-4 leading-7 text-gray-900 sm:text-2xl sm:truncate">
        Joined Jios
      </h3>
      <JioList jios={state.joinedJios} />
      <h3 className="text-xl font-bold pt-4 leading-7 text-gray-900 sm:text-2xl sm:truncate">
        Opened Jios
      </h3>
      <JioList jios={state.openedJios} />
    </PageContainer>
  );
};

export default Home;

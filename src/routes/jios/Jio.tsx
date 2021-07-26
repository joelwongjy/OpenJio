/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, PencilIcon, XIcon } from '@heroicons/react/solid';
import { addMinutes, format, formatDistanceToNow } from 'date-fns';

import Alert from 'components/alert';
import AlertBanner from 'components/alertBanner';
import JioForm from 'components/jioForm';
import Loading from 'components/loading';
import OrderForm from 'components/orderForm';
import PageContainer from 'components/pageContainer';
import TabBar from 'components/tabBar';
import { ENTER_COSTS, JIOS, ORDERS, PAYLAH } from 'constants/routes';
import { useUser } from 'contexts/UserContext';
import { JioFormMode } from 'interfaces/components/jioForm';
import {
  JioData,
  JioListData,
  JioPostData,
  JioState,
} from 'interfaces/models/jios';
import { OrderMode } from 'interfaces/models/orders';
import { RouteParams, RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import { getAlertCallback } from 'utils/alertUtils';
import {
  costsEntered,
  getUserOrder,
  userHasCreatedOrder,
} from 'utils/jioUtils';

interface JioComponentState extends RouteState {
  jio: JioData | null;
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
  isEditing: boolean;
  selectedJio: JioListData | undefined;
}

const Jio: React.FC = () => {
  const { user } = useUser();
  const { id } = useParams<RouteParams>();
  const history = useHistory();

  const [state, setState] = useReducer(
    (s: JioComponentState, a: Partial<JioComponentState>) => ({
      ...s,
      ...a,
    }),
    {
      jio: null,
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
      isEditing: false,
      selectedJio: undefined,
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
          return;
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

  if (state.jio === null) {
    return <Loading />;
  }

  const alertCallback = getAlertCallback(setState);
  const userOrder = user && getUserOrder(user!.id, state.jio!.orders);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const handleDelete = (jio: JioData): void => {
    alertCallback(
      true,
      true,
      'Are you sure?',
      'You will not be able to recover the deleted OpenJio.',
      async () => {
        const response = await ApiService.delete(`${JIOS}/${jio.id}`);
        if (response.status === 200) {
          history.push('/');
        } else {
          // TODO: Handle error
        }
      },
      undefined
    );
  };

  const handleClose = async () => {
    alertCallback(
      true,
      true,
      'Are you sure you want to close this OpenJio?',
      'No more orders will be allowed.',
      async () => {
        const closedJio = {
          ...state.jio!,
          closeAt: new Date(),
          jioState: costsEntered(state.jio!)
            ? JioState.COST_ENTERED
            : JioState.CLOSED,
        };
        const response = await ApiService.patch(
          `${JIOS}/${state.jio!.id}`,
          closedJio
        );
        if (response.status === 200) {
          setState({ jio: closedJio });
        } else {
          // TODO: Handle error
        }
      },
      undefined
    );
  };

  const handleReopen = async () => {
    alertCallback(
      true,
      true,
      'This OpenJio will be reopened for 30 mins!',
      'You can modify the time by editing the OpenJio.',
      async () => {
        const reopenedJio = {
          ...state.jio!,
          closeAt: addMinutes(new Date(), 30),
          jioState: JioState.OPEN,
        };
        const response = await ApiService.patch(
          `${JIOS}/${state.jio!.id}`,
          reopenedJio
        );
        if (response.status === 200) {
          setState({ jio: reopenedJio });
        } else {
          // TODO: Handle error
        }
      },
      undefined
    );
  };

  const handleTogglePaid = async () => {
    alertCallback(
      true,
      true,
      'Are you sure?',
      'Your pay status will be updated.',
      async () => {
        const orderId = userOrder!.id;
        const newOrder = { ...userOrder!, paid: !userOrder!.paid };
        const response = await ApiService.patch(
          `${ORDERS}/${orderId}`,
          newOrder
        );
        if (response.status === 200) {
          const newOrders = state.jio!.orders.slice();
          const index = newOrders.map((order) => order.id).indexOf(orderId);
          newOrders.splice(index, 1, newOrder);
          setState({ jio: { ...state.jio!, orders: newOrders } });
        } else {
          // TODO: Handle error
        }
      },
      undefined
    );
  };

  const mode =
    user && userHasCreatedOrder(user!.id, state.jio!.orders)
      ? OrderMode.EDIT
      : OrderMode.NEW;

  const jioOpen = state.jio.jioState === JioState.OPEN;
  const jioClosed = state.jio.jioState !== JioState.OPEN;
  const jioCostEntered = costsEntered(state.jio!);
  const isOwner = user && state.jio.userId === user!.id;
  const userPaid = userOrder?.paid ?? false;

  return (
    <PageContainer>
      {!user && (
        <AlertBanner
          title="You are not logged in"
          message="Login is required to join an OpenJio."
        />
      )}
      {jioClosed &&
        !jioCostEntered &&
        (isOwner ? (
          <AlertBanner
            title="Enter item prices"
            message="Payments can only be collected after every item cost has been entered."
          />
        ) : (
          <AlertBanner
            title={`Waiting for ${state.jio.username} to enter prices`}
            message="Payments can only be collected after every item cost has been entered."
          />
        ))}
      {state.isEditing ? (
        <JioForm
          mode={JioFormMode.EDIT}
          jio={state.jio!}
          savedCallback={(jio: Omit<JioPostData, 'userId'>) => {
            setState({
              isEditing: false,
              jio: {
                ...state.jio!,
                name: jio.name,
                closeAt: jio.closeAt,
                orderLimit: jio.orderLimit,
              },
            });
          }}
          alertCallback={alertCallback}
          cancelCallback={() => setState({ isEditing: false })}
        />
      ) : (
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate text-center sm:text-left">
              {state.jio!.name}
            </h2>
            <div className="mt-1 grid grid-rows-2 grid-flow-col gap-4 sm:flex sm:flex-row sm:mt-0 sm:space-x-6 justify-center sm:justify-start">
              {jioOpen && (
                <div className="mt-2 flex flex-col items-center">
                  <div className="text-xs sm:text-sm text-gray-500">
                    Closing in{' '}
                  </div>
                  <div className="text-lg sm:text-xl font-semibold">
                    {formatDistanceToNow(new Date(state.jio!.closeAt))}
                  </div>
                </div>
              )}
              <div className="mt-2 flex flex-col items-center mr-6">
                <div className="text-xs sm:text-sm text-gray-500">
                  Opened at
                </div>
                <div className="text-lg sm:text-xl font-semibold">
                  {format(new Date(state.jio!.createdAt), "hh:mm aaaaa'm'")}
                </div>
              </div>
              <div className="mt-2 flex flex-col items-center">
                <div className="text-xs sm:text-sm text-gray-500">
                  {jioClosed ? 'Closed at' : 'Closing at'}
                </div>
                <div className="text-lg sm:text-xl font-semibold">
                  {format(new Date(state.jio!.closeAt), "hh:mm aaaaa'm'")}
                </div>
              </div>
              <div className="mt-2 flex flex-col items-center">
                <div className="text-xs sm:text-sm text-gray-500">
                  Opened by
                </div>
                <div className="text-lg sm:text-xl font-semibold">
                  {state.jio!.username}
                </div>
              </div>
              <div className="mt-2 flex flex-col items-center">
                <div className="text-xs sm:text-sm text-gray-500">
                  Join Code
                </div>
                <div className="text-lg sm:text-xl font-semibold uppercase">
                  {state.jio!.joinCode}
                </div>
              </div>
            </div>
          </div>

          {!isOwner && jioCostEntered && (
            <div>
              {state.jio.paylah && (
                <span className="sm:ml-3 mr-3">
                  <a
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    href={`${PAYLAH}${state.jio.paylah}`}
                  >
                    Pay via PayLah!
                  </a>
                </span>
              )}
              <span className="sm:ml-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  onClick={handleTogglePaid}
                >
                  {userPaid ? 'Mark as unpaid' : 'Mark as paid'}
                </button>
              </span>
            </div>
          )}

          {isOwner && (
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
              {jioOpen && (
                <span className="hidden sm:block">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    onClick={() => setState({ isEditing: true })}
                  >
                    <PencilIcon
                      className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                    Edit
                  </button>
                </span>
              )}

              {jioOpen && (
                <span className="hidden sm:block sm:ml-3">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    onClick={() => handleDelete(state.jio!)}
                  >
                    <XIcon
                      className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                    Delete
                  </button>
                </span>
              )}

              {!jioOpen && (
                <span className="sm:ml-3 mr-3">
                  <a
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    href={`${JIOS}/${state.jio.joinCode}${ENTER_COSTS}`}
                  >
                    Enter Costs
                  </a>
                </span>
              )}

              <span className="sm:ml-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  onClick={jioClosed ? handleReopen : handleClose}
                >
                  {jioClosed ? 'Reopen' : 'Close Now'}
                </button>
              </span>

              {/* Dropdown */}
              {jioOpen && (
                <Menu as="span" className="ml-3 relative sm:hidden">
                  {({ open }) => (
                    <>
                      <Menu.Button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                        More
                        <ChevronDownIcon
                          className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                type="button"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'w-full text-left block px-4 py-2 text-sm text-gray-700'
                                )}
                                onClick={() => setState({ isEditing: true })}
                              >
                                Edit
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                type="button"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'w-full text-left block px-4 py-2 text-sm text-gray-700'
                                )}
                                onClick={() => handleDelete(state.jio!)}
                              >
                                Delete
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              )}
            </div>
          )}
        </div>
      )}
      <TabBar
        mode={mode}
        orders={state.jio!.orders}
        jioUserId={state.jio!.userId}
        jioState={state.jio!.jioState}
      >
        {user && (
          <OrderForm
            mode={mode}
            alertCallback={alertCallback}
            jio={state.jio}
            order={state.jio.orders.find((order) => order.userId === user!.id)}
            jioCallback={(jio: JioData) => setState({ jio })}
          />
        )}
      </TabBar>

      <Alert
        isAlertOpen={state.isAlertOpen!}
        hasConfirm={state.hasConfirm!}
        alertHeader={state.alertHeader!}
        alertMessage={state.alertMessage!}
        closeHandler={state.closeHandler!}
        confirmHandler={state.confirmHandler}
        cancelHandler={state.cancelHandler}
      />
    </PageContainer>
  );
};

export default Jio;

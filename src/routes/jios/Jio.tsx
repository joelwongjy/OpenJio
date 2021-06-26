/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, PencilIcon, XIcon } from '@heroicons/react/solid';
import { format, formatDistanceToNow } from 'date-fns';

import Alert from 'components/alert';
import JioForm from 'components/jioForm';
import Loading from 'components/loading';
import PageContainer from 'components/pageContent';
import TabBar from 'components/tabBar';
import { JIOS } from 'constants/routes';
import { JioFormMode } from 'interfaces/components/jioForm';
import { JioData, JioListData, JioPatchData } from 'interfaces/models/jios';
import { OrderData } from 'interfaces/models/orders';
import { RouteParams, RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import AuthService from 'services/authService';
import { getAlertCallback } from 'utils/alertUtils';

interface JioState extends RouteState {
  jio: JioData | null;
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
  isEditing: boolean;
  selectedJio: JioListData | undefined;
}

const Jio: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();

  const [state, setState] = useReducer(
    (s: JioState, a: Partial<JioState>) => ({
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

  const handleDeleteOrder = (order: OrderData): void => {
    alertCallback(
      true,
      true,
      'Are you sure?',
      'You will not be able to recover the deleted order.',
      async () => {
        if (state.jio == null) {
          return;
        }
        const patchData: JioPatchData = {
          name: state.jio.name,
          closeAt: state.jio.closeAt,
          orderLimit: state.jio.orderLimit,
          orders: state.jio.orders
            .filter((o) => o.id !== order.id)
            .map((c) => ({
              id: c.id,
              items: c.items,
              paid: c.paid,
            })),
        };
        const response = await ApiService.patch(`${JIOS}/${id}`, patchData);
        if (response.status === 200) {
          const newOrders = state.jio.orders.slice();
          const index = newOrders.map((order) => order.id).indexOf(order.id);
          newOrders.splice(index, 1);
          setState({ jio: { ...state.jio, orders: newOrders } });
          await AuthService.getUser();
        } else {
          // TODO: Handle error
        }
      },
      undefined
    );
  };

  if (state.jio === null) {
    return <Loading />;
  }

  return (
    <PageContainer>
      {state.isEditing ? (
        <JioForm
          mode={JioFormMode.EDIT}
          jio={state.jio!}
          savedCallback={() => {
            setState({ isEditing: false });
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
              <div className="mt-2 flex flex-col items-center">
                <div className="text-xs sm:text-sm text-gray-500">
                  Closing in{' '}
                </div>
                <div className="text-lg sm:text-xl font-semibold">
                  {formatDistanceToNow(new Date(state.jio!.closeAt))}
                </div>
              </div>
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
                  Closing at
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
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
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

            <span className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <XIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Close Now
              </button>
            </span>

            {/* Dropdown */}
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
                            onClick={() => handleDelete(state.jio!)}
                          >
                            Add Order
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
          </div>
        </div>
      )}
      <TabBar orders={state.jio!.orders} />

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

import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { TimePicker } from '@material-ui/pickers';
import { addDays, getDate, isBefore, set } from 'date-fns';

import { CREATE, JIOS } from 'constants/routes';
import { useError } from 'contexts/ErrorContext';
import { useUser } from 'contexts/UserContext';
import { JioFormMode } from 'interfaces/components/jioForm';
import { JioData, JioPatchData, JioPostData } from 'interfaces/models/jios';
import ApiService from 'services/apiService';
import { jioFormVerification } from 'utils/jioUtils';

interface JioFormProps {
  mode: JioFormMode;
  jio?: JioData;
  savedCallback?: (jio: Omit<JioPostData, 'userId'>) => void;
  cancelCallback: () => void;
  alertCallback: (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler: undefined | (() => void),
    cancelHandler: undefined | (() => void)
  ) => void;
}

export type JioFormState = JioPostData | JioPatchData;

const JioForm: React.FC<JioFormProps> = ({
  mode,
  jio,
  savedCallback,
  alertCallback,
  cancelCallback,
}) => {
  const { user } = useUser();
  const history = useHistory();
  const { hasError, setHasError } = useError();

  const [state, setState] = useReducer(
    (s: JioFormState, a: Partial<JioFormState>) => ({
      ...s,
      ...a,
    }),
    {
      name: jio?.name ?? '',
      closeAt: jio?.closeAt ?? new Date(),
      orderLimit: jio?.orderLimit ?? 0,
      userId: user!.id,
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleCancel = () => {
    if (!jioFormVerification(mode, state, jio)) {
      cancelCallback();
    } else {
      alertCallback(
        true,
        true,
        'Are you sure?',
        'The information will not be saved.',
        cancelCallback,
        undefined
      );
    }
  };
  const handleAdd = async () => {
    if (state.name === '') {
      setHasError(true);
      return;
    }
    setHasError(false);

    try {
      const response = await ApiService.post(`${JIOS}${CREATE}`, {
        ...state,
      });
      if (response.status === 200) {
        history.push('/');
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      // TODO: Add error handling here
    }
  };

  const handleEdit = async () => {
    if (!jioFormVerification(mode, state, jio) || !jio) {
      setHasError(true);
      return;
    }
    setHasError(false);

    try {
      const response = await ApiService.patch(`${JIOS}/${jio!.id}`, state);
      if (response.status === 200) {
        savedCallback!({
          name: state.name!,
          closeAt: state.closeAt!,
          orderLimit: state.orderLimit,
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      // TODO: Add error handling here
    }
  };

  const renderButtons = () => {
    switch (mode) {
      case JioFormMode.NEW:
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="h-12 group relative w-full inline-flex items-center justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleAdd}
              className="h-12 group relative w-full inline-flex items-center justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              OpenJio
            </button>
          </div>
        );
      case JioFormMode.EDIT:
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="h-12 group relative w-full inline-flex items-center justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleEdit}
              className="h-12 group relative w-full inline-flex items-center justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Save Changes
            </button>
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 bg-cover py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {mode === JioFormMode.NEW ? (
              <span>Create </span>
            ) : (
              <span>Edit </span>
            )}
            <span className="text-orange-600">Open</span>
            Jio
          </h2>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div>
            <label
              className="text-gray-700 dark:text-gray-200 font-semibold"
              htmlFor="orderName"
            >
              Order Name
            </label>
            <input
              id="orderName"
              type="text"
              required
              className="block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              value={state.name}
              onChange={(e) => setState({ name: e!.target.value })}
            />
          </div>
          <div>
            <label
              className="text-gray-700 dark:text-gray-200 font-semibold"
              htmlFor="closeAt"
            >
              Close At
            </label>
            <TimePicker
              className="block w-full text-orange-500"
              clearable
              // eslint-disable-next-line react/jsx-boolean-value
              ampm={true}
              value={state.closeAt}
              onChange={(time) => {
                let closeAt = set(time as Date, { date: getDate(new Date()) });
                if (isBefore(closeAt, new Date())) {
                  closeAt = addDays(closeAt, 1);
                }
                setState({ closeAt });
              }}
            />
          </div>
          <div>
            <label
              className="text-gray-700 dark:text-gray-200 font-semibold"
              htmlFor="username"
            >
              Order Limit
            </label>
            <input
              id="orderLimit"
              type="number"
              required
              className="block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              value={state.orderLimit}
              onChange={(e) =>
                setState({ orderLimit: parseInt(e!.target.value, 10) })
              }
            />
          </div>
          {renderButtons()}
        </form>
        {hasError ? (
          <div
            className="text-sm font-medium text-red-500"
            style={{
              marginTop: '0.5rem',
              visibility: hasError ? 'visible' : 'hidden',
            }}
          >
            An error occured. Please try again.
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default JioForm;

import React from 'react';

interface StepBarProps {
  step: number;
}

const StepsBar: React.FunctionComponent<StepBarProps> = ({ step }) => {
  return (
    <div className="w-full py-6">
      <div className="flex">
        <div className="w-1/3">
          <div className="relative mb-2">
            <div
              className={`${
                step >= 1 ? 'bg-green-500' : 'bg-white border-2 border-gray-200'
              } w-10 h-10 mx-auto  rounded-full text-lg text-white flex items-center`}
            >
              <span
                className={`${
                  step >= 1 ? 'text-white' : 'text-gray-600'
                } text-center w-full`}
              >
                {' '}
                <svg
                  className="w-full fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    className="heroicon-ui"
                    d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm14 8V5H5v6h14zm0 2H5v6h14v-6zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Create</div>
        </div>

        <div className="w-1/3">
          <div className="relative mb-2">
            <div
              className="absolute flex align-center items-center align-middle content-center"
              style={{
                width: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className={`${
                  step >= 2 ? 'bg-green-300' : 'bg-gray-200'
                } w-full rounded items-center align-middle align-center flex-1`}
              >
                <div className="w-0 py-1 rounded" style={{ width: '100%' }} />
              </div>
            </div>

            <div
              className={`${
                step >= 2 ? 'bg-green-500' : 'bg-white border-2 border-gray-200'
              } w-10 h-10 mx-auto  rounded-full text-lg text-white flex items-center`}
            >
              <span
                className={`${
                  step >= 2 ? 'text-white' : 'text-gray-600'
                } text-center w-full`}
              >
                <svg
                  className="w-full fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    className="heroicon-ui"
                    d="M19 10h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2h-2a1 1 0 0 1 0-2h2V8a1 1 0 0 1 2 0v2zM9 12A5 5 0 1 1 9 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v2z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">PayLah</div>
        </div>

        <div className="w-1/3">
          <div className="relative mb-2">
            <div
              className="absolute flex align-center items-center align-middle content-center"
              style={{
                width: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className={`${
                  step === 3 ? 'bg-green-300' : 'bg-gray-200'
                } w-full rounded items-center align-middle align-center flex-1`}
              >
                <div className="w-0 py-1 rounded" style={{ width: '100%' }} />
              </div>
            </div>

            <div
              className={`${
                step === 3
                  ? 'bg-green-500'
                  : 'bg-white border-2 border-gray-200'
              } w-10 h-10 mx-auto  rounded-full text-lg text-white flex items-center`}
            >
              <span
                className={`${
                  step === 3 ? 'text-white' : 'text-gray-600'
                } text-center w-full`}
              >
                <svg
                  className="w-full fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    className="heroicon-ui"
                    d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Finish</div>
        </div>
      </div>
    </div>
  );
};

export default StepsBar;

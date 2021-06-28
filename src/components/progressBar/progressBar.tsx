import React from 'react';

interface ProgressBarProps {
  count: number;
  limit: number;
}

const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({
  count,
  limit,
}) => {
  return (
    <div className="relative">
      <div className="flex mb-1 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block uppercase text-orange-600">
            {count} {count === 1 ? 'order' : 'orders'}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block uppercase text-orange-600">
            max {limit}
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-4 text-xs flex rounded bg-orange-200">
        <div
          style={{ width: `${(count / limit) * 100}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
        />
      </div>
    </div>
  );
};

export default ProgressBar;

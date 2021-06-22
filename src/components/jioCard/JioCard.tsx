import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';

import ProgressBar from 'components/progressBar';
import { JioListData } from 'interfaces/models/jios';

interface JioCardProps {
  jio: JioListData;
}

const JioCard: React.FunctionComponent<JioCardProps> = ({ jio }) => {
  return (
    <div className="bg-white dark:bg-gray-800 md:px-8 px-4 py-6 rounded-xl shadow-sm">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium inline-block text-orange-600">
            {formatDistanceToNow(new Date(jio.closeAt))}
          </p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Closes at {format(new Date(jio.closeAt), "hh:mm aaaaa'm'")}
          </p>
        </div>
        <p className="text-black dark:text-gray-100 text-2xl font-semibold">
          {jio.name}
        </p>
        {jio.orderLimit ? (
          <ProgressBar count={jio.orderCount} limit={jio.orderLimit!} />
        ) : (
          <p className="text-xs font-semibold inline-block py-1 uppercase text-orange-600">
            {jio.orderCount} orders
          </p>
        )}
      </div>
    </div>
  );
};

export default JioCard;

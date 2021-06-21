import React from 'react';

interface StatisticCardProps {
  title: string;
  statistic: string;
}

const StatisticCard: React.FunctionComponent<StatisticCardProps> = ({
  title,
  statistic,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 md:px-8 px-4 py-4 rounded-xl shadow-md">
      <div className="flex flex-col">
        <p className="text-gray-600 dark:text-gray-300 text-md">{title}</p>
        <p className="text-black dark:text-gray-100 text-3xl font-semibold">
          {statistic}
        </p>
      </div>
    </div>
  );
};

export default StatisticCard;

import React from 'react';

import StatisticCard from 'components/statisticCard';

const StatisticList: React.FunctionComponent = () => {
  const statistics = [
    {
      title: 'Orders',
      statistic: '4',
    },
    {
      title: 'Total Spent',
      statistic: '$38.20',
    },
    {
      title: 'Payments Due',
      statistic: '2',
    },
    {
      title: 'Jios Opened',
      statistic: '1',
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
      {statistics.map((stat) => (
        <div key={stat.title}>
          <StatisticCard title={stat.title} statistic={stat.statistic} />
        </div>
      ))}
    </div>
  );
};

export default StatisticList;

import React from 'react';

import Header from 'components/header';
import StatisticList from 'components/statisticList';
import { useUser } from 'contexts/UserContext';

const Home: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="bg-gray-100 bg-cover min-h-screen">
      <Header />
      <div className="lg:px-16 md:px-8 px-4 space-y-6 mt-6">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Welcome, {user!.name}!
        </h2>
        <StatisticList />
      </div>
    </div>
  );
};

export default Home;

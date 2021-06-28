import React from 'react';

import Header from 'components/header';

const PageContainer: React.FC = ({ children }) => {
  return (
    <div className="bg-gray-100 bg-cover min-h-screen">
      <Header />
      <div className="lg:px-16 md:px-8 px-4 space-y-6 py-6">{children}</div>
    </div>
  );
};

export default PageContainer;

import React from 'react';

const Loading: React.FunctionComponent = () => {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css"
        integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM="
        crossOrigin="anonymous"
      />
      <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
        <span className="text-orange opacity-75 align-center align-middle top-1/2 text-center my-0 mx-auto block relative w-0 h-0">
          <i className="fas fa-circle-notch fa-spin fa-5x" />
        </span>
      </div>
    </div>
  );
};

export default Loading;

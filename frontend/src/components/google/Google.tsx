import React from 'react';
import { GoogleLogin } from "react-google-login";

const responseGoogle = (response: unknown) => {
  // eslint-disable-next-line no-console
  console.log(response);
};

const Google: React.FC = () => {

  return (
          <GoogleLogin
          className="h-12 group relative w-full inline-flex items-center justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          clientId="1013775412594-0q94snuu8pi274ncroo3t7n893k4utsg.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          />
  );
};

export default Google;
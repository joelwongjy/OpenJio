/* eslint-disable @typescript-eslint/no-explicit-any */
// https://dev.to/goenning/how-to-retry-when-react-lazy-fails-mb5
export const retryPromise = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  promise: any,
  retriesLeft = 5,
  interval = 1000
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    promise()
      .then(resolve)
      .catch((error: Error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            reject(error);
            return;
          }

          retryPromise(promise, retriesLeft - 1, interval).then(
            resolve,
            reject
          );
        }, interval);
      });
  });
};

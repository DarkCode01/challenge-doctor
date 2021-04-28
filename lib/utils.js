import { pipe, pluck, sum, divide } from "ramda";

export const request = async (
  callback,
  options = {
    startLoading: () => {},
    stopLoading: () => {},
  }
) => {
  // init loading on start
  options.startLoading();

  // body of requets or callback action
  await callback();

  // finish or stop loading
  options.stopLoading();
};

export const calculateMean = (values) => {
  return (
    pipe(pluck("starts"), sum(), (v) => divide(v, values.length))(values) || 1
  );
};

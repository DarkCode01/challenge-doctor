import { useState } from "react";

export const useErrorRequest = () => {
  const [isError, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const toggleError = (flag, message) => {
    setErrMessage(message);
    setError(flag);
  };

  return { isError, errMessage, toggleError };
};

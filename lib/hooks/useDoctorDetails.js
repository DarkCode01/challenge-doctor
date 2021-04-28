import { useState, useEffect } from "react";
import { useErrorRequest } from "lib/hooks/useErrorRequest";
import { api } from "lib/services/api";
import { request } from "lib/utils";

/**
 * Hooks to get doctors.
 *
 */
export const useDoctorDetails = (id) => {
  const { isError, errMessage, toggleError } = useErrorRequest();

  // state
  const [isLoading, setLoading] = useState(true);
  const [details, setDetails] = useState({});

  // get doctor information
  useEffect(async () => {
    await request(
      async () => {
        try {
          const { data } = await api.getDoctorDetails({ id });

          // add details
          setDetails(data.result);
        } catch (err) {
          toggleError(
            true,
            err.response?.data?.message ||
              "Error interno al intentar autenticar."
          );

          console.log(err);
        }
      },
      {
        startLoading: () => setLoading(true),
        stopLoading: () => setLoading(false),
      }
    );
  }, []);

  return {
    isLoading,
    details,
    error: {
      isError,
      errMessage,
      handle: toggleError,
    },
  };
};

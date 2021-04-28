import { useState, useEffect } from "react";
import { useErrorRequest } from "lib/hooks/useErrorRequest";
import { api } from "lib/services/api";
import { request } from "lib/utils";

/**
 * Hooks to get locations.
 *
 */
export const useLocations = () => {
  const { isError, errMessage, toggleError } = useErrorRequest();

  // state
  const [isLoading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);

  // get doctor information
  useEffect(async () => {
    await request(
      async () => {
        try {
          const { data } = await api.getLocations();

          // add details
          setLocations(data.result);
        } catch (err) {
          toggleError(
            true,
            err.response?.data?.message ||
              "Error interno al intentar autenticar."
          );
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
    locations,
    error: {
      isError,
      errMessage,
      handle: toggleError,
    },
  };
};

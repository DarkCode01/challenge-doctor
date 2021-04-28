import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useErrorRequest } from "lib/hooks/useErrorRequest";
import { api } from "lib/services/api";
import { request } from "lib/utils";

/**
 * Hooks to get doctors.
 *
 */
export const useDoctors = () => {
  const router = useRouter();
  const { isError, errMessage, toggleError } = useErrorRequest();

  // state
  const [isLoading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);

  // get doctor information
  useEffect(async () => {
    await request(
      async () => {
        try {
          const { data } = await api.getDoctors();

          // add details
          setDoctors(data.result);
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
    doctors,
    error: {
      isError,
      errMessage,
      handle: toggleError,
    },
  };
};

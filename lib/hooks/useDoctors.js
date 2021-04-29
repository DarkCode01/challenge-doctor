import { useState, useEffect } from "react";
import { useErrorRequest } from "lib/hooks/useErrorRequest";
import { api } from "lib/services/api";
import { request } from "lib/utils";

/**
 * Hooks to get doctors.
 *
 */
export const useDoctors = (page, q) => {
  const { isError, errMessage, toggleError } = useErrorRequest();

  // state
  const [isLoading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [pagination, setPagination] = useState({});

  // get doctor information
  useEffect(async () => {
    await request(
      async () => {
        try {
          const { data } = await api.getDoctors({ page, q });

          // add details
          setDoctors(data.result);
          setPagination({
            count: data.pageCount,
            items: data.itemCount,
            pages: data.pages,
          });
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
  }, [page, q]);

  return {
    isLoading,
    doctors,
    pagination,
    error: {
      isError,
      errMessage,
      handle: toggleError,
    },
  };
};

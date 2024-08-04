/* eslint-disable prettier/prettier */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchVentas } from "../api/fetchVentas";
import { Venta } from "../types/venta";

export const useVentas = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: ventas,
    error,
  } = useQuery<Venta[], Error>({
    queryKey: ["ventas"],
    queryFn: fetchVentas,
  });

  const refreshVentas = () => {
    queryClient.invalidateQueries({ queryKey: ["ventas"] });
  };

  return {
    isLoading,
    isError,
    ventas,
    error,
    refreshVentas,
  };
};

/* eslint-disable prettier/prettier */
import { Venta } from "../types/venta";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchVentas = async (): Promise<Venta[]> => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get<Venta[]>(
    "http://54.157.249.179/api/ventas",
    {
      headers: {
        "x-token": token,
      },
    }
  );

  return response.data;
};

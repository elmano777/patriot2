/* eslint-disable prettier/prettier */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "expo-router";

interface UserData {
  Email: string;
  Password: string;
}

interface UserResponse {
  id: number;
  Nombre: string;
  Email: string;
  Role: string;
  token: string;
}

const login = async (userData: UserData): Promise<UserResponse> => {
  const response = await axios.post<UserResponse>(
    "http://54.157.249.179/api/auth/login",
    userData
  );
  return response.data;
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const loginMutation = useMutation<UserResponse, Error, UserData>({
    mutationFn: login,
    onSuccess: async (data) => {
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("userData", JSON.stringify(data));
      queryClient.setQueryData(["user"], data);
    },
  });

  const { data: user, refetch } = useQuery<UserResponse | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return null;
      const userData = await AsyncStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    },
  });

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userData");
    queryClient.setQueryData(["user"], null);
    router.replace("/"); // Redirige al usuario a la pantalla principal
  };

  return {
    user,
    login: loginMutation.mutate,
    logout,
    isLoading: loginMutation.isPending,
    refetchUser: refetch,
  };
};

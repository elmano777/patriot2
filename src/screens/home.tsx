/* eslint-disable prettier/prettier */
import { StatusBar } from "expo-status-bar";
import { Button, Image, Text, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { userSchema } from "../validations/userZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const login = async (UserData: UserData): Promise<UserResponse> => {
  const response = await axios.post<UserResponse>(
    "http://54.157.249.179/api/auth/login",
    UserData
  );
  return response.data;
};

export default function Home() {
  const [data, setData] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
  });

  const router = useRouter();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const queryClient = useQueryClient();

  const mutation = useMutation<UserResponse, Error, UserData>({
    mutationFn: login,
    onSuccess: async (data) => {
      setData(data.token);
      console.log(data);
      router.replace("/(tabs)/");
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("userData", JSON.stringify(data));
      queryClient.setQueryData(["user"], data);
    },
    onError: (error: Error) => {
      console.error("Error:", error.message);
    },
  });

  const onSubmit = (formData: UserData) => {
    mutation.mutate(formData);
  };

  return (
    <View className="flex items-center justify-center h-full px-12 bg-white">
      <StatusBar style="auto" />
      <View className="flex flex-row items-center mb-5 space-x-4">
        <Image
          source={require("../../assets/images/65671cd627825dadd6139e7b_analytics-color.webp")}
          className="w-24 h-24"
        />
        <View>
          <Text className="text-lg font-bold">Chayan Technology</Text>
          <Text>{data}</Text>
        </View>
      </View>
      <View className="w-full">
        <Controller
          control={control}
          name="Email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="p-2 mb-2 border rounded"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.Email && (
          <Text className="mb-2 text-red-500">{errors.Email.message}</Text>
        )}

        <Controller
          control={control}
          name="Password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="p-2 mb-2 border rounded"
              secureTextEntry
            />
          )}
        />
        {errors.Password && (
          <Text className="mb-2 text-red-500">{errors.Password.message}</Text>
        )}

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

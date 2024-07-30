import { StatusBar } from "expo-status-bar";
import { Button, Image, Text, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { userSchema } from "./src/validations/userZod";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserData {
  Email: string;
  Password: string;
}

export default function App() {
  const [data, setData] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (formData: UserData) => {
    try {
      const response = await axios.post(
        "http://54.157.249.179/api/auth/login",
        formData,
      );
      setData(response.data.token);
      console.log(response.data);
    } catch (error: any) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <View className="items-center justify-center flex-1 p-5 bg-white">
      <StatusBar style="auto" />
      <View className="flex flex-row items-center mb-5 space-x-4">
        <Image
          source={require("./assets/images/65671cd627825dadd6139e7b_analytics-color.webp")}
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

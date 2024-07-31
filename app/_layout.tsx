/* eslint-disable prettier/prettier */
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View } from "react-native";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
        <View className="">
            <Slot/>
        </View>
    </QueryClientProvider>
  );
}

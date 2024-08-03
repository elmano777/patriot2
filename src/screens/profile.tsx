/* eslint-disable prettier/prettier */
import { Text, View, Button, SafeAreaView } from "react-native";
import { useAuth } from "../authProfile";

export default function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) return <Text>No user logged in</Text>;

  return (
    <SafeAreaView className="flex-1">
      <View className="items-center justify-center flex-1 bg-white">
        <View className="items-center justify-center w-3/4 p-6 bg-blue-600 aspect-square rounded-2xl">
          <Text className="mb-4 text-2xl font-bold text-white">
            Welcome, {user.Nombre}
          </Text>
          <Text className="mb-2 text-lg text-white">Email: {user.Email}</Text>
          <Text className="mb-6 text-lg text-white">Role: {user.Role}</Text>
        </View>
        <View className="w-3/4 mt-8">
          <Button title="Logout" onPress={logout} color="#3b82f6" />
        </View>
      </View>
    </SafeAreaView>
  );
}

/* eslint-disable prettier/prettier */
import { Tabs } from "expo-router";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import { Image } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#251B75" },
        tabBarActiveTintColor: "yellow",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "gaaaaa",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="bar-graph" size={size} color={color} />
          ),
          headerLeft: () => (
            <Image
              source={require("../../assets/images/65671cd627825dadd6139e7b_analytics-color.webp")}
              style={{ width: 48, height: 48 , margin: 20 }}
            />
          ),
          headerStyle: { height: 150 }
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <AntDesign name="leftcircleo" size={24} color="red" />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

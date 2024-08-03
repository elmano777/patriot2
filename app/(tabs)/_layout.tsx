/* eslint-disable prettier/prettier */
import { Tabs } from "expo-router";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";
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
          title: "Consumo",
          headerTitle: "",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="bar-graph" size={size} color={color} />
          ),
          headerLeft: () => (
            <>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../assets/images/65671cd627825dadd6139e7b_analytics-color.webp")}
                  style={{ width: 78, height: 48, margin: 10, marginLeft: 20 }}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text>Patriot</Text>
                  <Text>Technology</Text>
                </View>
              </View>
            </>
          ),
          headerStyle: { height: 150 },
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          headerTitle: "",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
          headerLeft: () => (
            <>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../assets/images/65671cd627825dadd6139e7b_analytics-color.webp")}
                  style={{ width: 78, height: 48, margin: 10, marginLeft: 20 }}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text>Patriot</Text>
                  <Text>Technology</Text>
                </View>
              </View>
            </>
          ),
          headerStyle: { height: 150 },
        }}
      />
    </Tabs>
  );
}

/* eslint-disable prettier/prettier */
import { View, Text } from "react-native";
import { Venta } from "../types/venta";

interface VentaItemProps {
  item: Venta;
}

export const VentaItem: React.FC<VentaItemProps> = ({ item }) => (
  <View className="w-full pb-2 mb-4 border-b border-gray-200">
    <View className="flex items-start">
      <Text className="text-blue-700">Empresa ID: {item.empresaId}</Text>
      <Text className="text-blue-700">Código: {item.CodDoc}</Text>
      <Text className="text-blue-700">Documento: {item.NroDoc}</Text>
      <Text className="text-blue-700">Serie: {item.NroSerie}</Text>
    </View>
    <View className="flex items-end">
      <Text className="w-auto h-auto p-2 text-white bg-blue-700 rounded-full">
        Total: ${item.Total}
      </Text>
    </View>
  </View>
);

/* eslint-disable prettier/prettier */
import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Text, View, ActivityIndicator, FlatList } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Venta {
  empresaId: number;
  CodDoc: string;
  NroDoc: number;
  NroSerie: string;
  Total: string;
  FchEmi: string;
}

const fetchVentas = async (): Promise<Venta[]> => {
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

const VentaItem = ({ item }: { item: Venta }) => (
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
      <Text>Fecha Emisión: {new Date(item.FchEmi).toLocaleDateString()}</Text>
    </View>
  </View>
);

export default function Consumo() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const { isLoading, isError, data, error } = useQuery<Venta[], Error>({
    queryKey: ["ventas"],
    queryFn: fetchVentas,
  });

  const onDayPress = useCallback((day: DateData) => {
    setSelectedDate(day.dateString);
  }, []);

  const onMonthChange = useCallback((monthData: DateData) => {
    setCurrentMonth(monthData.dateString);
  }, []);

  const ventasDelDia = useMemo(() => {
    return (
      data?.filter((item) => {
        const fechaEmision = new Date(item.FchEmi).toISOString().split("T")[0];
        return fechaEmision === selectedDate;
      }) || []
    );
  }, [data, selectedDate]);

  const ListHeaderComponent = useCallback(
    () => (
      <>
        <Text className="pb-2 text-2xl font-bold">Ventas</Text>
        <Calendar
          current={currentMonth || undefined}
          onDayPress={onDayPress}
          onMonthChange={onMonthChange}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "#3b82f6" },
          }}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#3b82f6",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#3b82f6",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            dotColor: "#3b82f6",
            selectedDotColor: "#ffffff",
            arrowColor: "#3b82f6",
            monthTextColor: "#3b82f6",
            indicatorColor: "#3b82f6",
          }}
        />
        <Text className="mt-4 mb-2 text-lg font-semibold">
          Ventas del {selectedDate || "día seleccionado"}:
        </Text>
      </>
    ),
    [selectedDate, currentMonth, onDayPress, onMonthChange]
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return (
      <Text>
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </Text>
    );
  }

  return (
    <FlatList
      data={ventasDelDia}
      renderItem={({ item }) => <VentaItem item={item} />}
      keyExtractor={(item) => item.NroDoc.toString()}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={{ flexGrow: 1, padding: 16 }}
    />
  );
}

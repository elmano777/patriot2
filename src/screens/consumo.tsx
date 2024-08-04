/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useMemo } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { DateData } from "react-native-calendars";
import { VentaItem } from "../components/ventaItem";
import { VentaCalendar } from "../components/ventaCalendar";
import { useVentas } from "../hooks/useVentas";

export default function Consumo() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const { isLoading, isError, ventas, error, refreshVentas } = useVentas();

  const onDayPress = useCallback((day: DateData) => {
    setSelectedDate(day.dateString);
  }, []);

  const onMonthChange = useCallback((monthData: DateData) => {
    setCurrentMonth(monthData.dateString);
  }, []);

  const ventasDelDia = useMemo(() => {
    return (
      ventas?.filter((item) => {
        const fechaEmision = new Date(item.FchEmi).toISOString().split("T")[0];
        return fechaEmision === selectedDate;
      }) || []
    );
  }, [ventas, selectedDate]);

  const ListHeaderComponent = useCallback(
    () => (
      <>
        <Text className="pb-2 text-2xl font-bold">Ventas</Text>
        <VentaCalendar
          selectedDate={selectedDate}
          currentMonth={currentMonth}
          onDayPress={onDayPress}
          onMonthChange={onMonthChange}
        />
        <View className="flex-row items-center justify-between mt-4 mb-2">
          <Text className="text-lg font-semibold">
            Ventas del {selectedDate || "día seleccionado"}:
          </Text>
          <TouchableOpacity
            onPress={refreshVentas}
            className="px-4 py-2 bg-blue-500 rounded-full"
          >
            <Text className="font-semibold text-white">Actualizar</Text>
          </TouchableOpacity>
        </View>
      </>
    ),
    [selectedDate, currentMonth, onDayPress, onMonthChange, refreshVentas]
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

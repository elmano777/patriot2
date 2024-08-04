/* eslint-disable prettier/prettier */
import { Calendar } from "react-native-calendars";
import { VentaCalendarProps } from "../types/venta";

export const VentaCalendar = ({
  selectedDate,
  currentMonth,
  onDayPress,
  onMonthChange,
}: VentaCalendarProps) => (
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
);

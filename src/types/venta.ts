/* eslint-disable prettier/prettier */
import { DateData } from "react-native-calendars";

export interface Venta {
  empresaId: number;
  CodDoc: string;
  NroDoc: number;
  NroSerie: string;
  Total: string;
  FchEmi: string;
}

export interface VentaCalendarProps {
  selectedDate: string;
  currentMonth: string;
  onDayPress: (day: DateData) => void;
  onMonthChange: (monthData: DateData) => void;
}

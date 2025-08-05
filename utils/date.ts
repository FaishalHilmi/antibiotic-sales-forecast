import {
  endOfISOWeek,
  setISOWeek,
  startOfISOWeek,
  startOfWeek,
  startOfYear,
} from "date-fns";

// Mengembalikan tanggal awal dan akhir  dari minggu ISO ke-x pada tahun tertentu
export const getDataRangeFromWeek = (weekNumber: number, year: number) => {
  const firstDayOfYear = startOfYear(new Date(year, 0, 1));
  const dateWithWeek = setISOWeek(firstDayOfYear, weekNumber);

  const startDate = startOfYear(dateWithWeek);
  const endDate = endOfISOWeek(dateWithWeek);

  return { firstDayOfYear, dateWithWeek, startDate, endDate };
};

export const getWeekRange = (date: Date) => {
  const startDate = startOfWeek(date, { weekStartsOn: 1 });
  const endDate = startOfWeek(date, { weekStartsOn: 1 });

  return { startDate, endDate };
};

// Helper untuk hitung tanggal awal minggu berdasarkan weekNumber dan year
export const startOfISOWeekFromWeekNumber = (
  week: number,
  year: number
): Date => {
  const firstDay = new Date(year, 0, 1);
  const firstISOWeekStart = startOfISOWeek(firstDay);
  return new Date(
    firstISOWeekStart.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000
  );
};

// Fungsi bantu untuk dapatkan nomor minggu (ISO Week Sederhana)
export const getWeekNumber = (date: Date) => {
  const jan1 = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date.getTime() - jan1.getTime()) / 86400000);
  return Math.ceil((dayOfYear + jan1.getDay() + 1) / 7);
};

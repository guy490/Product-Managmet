import { createContext } from 'react';

const DirectoryContext = createContext({
  path: '',
  setPath: (newPath: string) => {
    newPath.toString();
  },
  selectedYear: '',
  setSelectedYear: (newYear: string) => {
    newYear.toString();
  },
  selectedMonth: { month: '', status: '' },
  setSelectedMonth: (newMonth: { month: string; status: string }) => {
    newMonth.toString();
  },
});

const MonthListContext = createContext({
  months: [{ month: '', status: '' }],
  setMonths: (newMonthsList: { month: string; status: string }[]) => {
    newMonthsList.toString();
  },
});
export { DirectoryContext, MonthListContext };

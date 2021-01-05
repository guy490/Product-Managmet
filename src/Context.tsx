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
  selectedMonth: { month: '', status: '' } || null,
  setSelectedMonth: (newMonth: { month: string; status: string } | null) => {
    newMonth?.toString();
  },
});

export default DirectoryContext;

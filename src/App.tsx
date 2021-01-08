import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ItemManagment from './Body/ItemManagment';
import SelectButton from './Header/SelectButton';
import DirectoryContext from './Context';
import ProductView from './Body/ProductView';

const Main = () => {
  return (
    <div>
      <SelectButton />
      <ItemManagment />
    </div>
  );
};

export default function App() {
  const [path, setPath] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState({
    month: '',
    status: '',
  });

  const pathData = {
    path,
    setPath,
  };
  const selectYearData = {
    selectedYear,
    setSelectedYear,
  };
  const selectMonthData = {
    selectedMonth,
    setSelectedMonth,
  };
  return (
    <DirectoryContext.Provider
      value={{
        ...pathData,
        ...selectYearData,
        ...selectMonthData,
      }}
    >
      <Router>
        <Switch>
          <Route path="/ProductView/:productNum" component={ProductView} />
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </DirectoryContext.Provider>
  );
}

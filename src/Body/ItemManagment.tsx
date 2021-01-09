import React, { useState } from 'react';
import { MonthListContext } from '../Context';
import DateDetails from './DateDetails';
import ProductsListView from './ProductsListView';

const ItemManagment = () => {
  const [months, setMonths] = useState<{ month: string; status: string }[]>([]);
  return (
    <div className="item-managment">
      <MonthListContext.Provider value={{ months, setMonths }}>
        <DateDetails />
        <ProductsListView />
      </MonthListContext.Provider>
    </div>
  );
};

export default ItemManagment;

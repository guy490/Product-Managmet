import React from 'react';
import DateDetails from './DateDetails';
import ProductsListView from './ProductsListView';

const ItemManagment = () => {
  return (
    <div className="item-managment">
      <DateDetails />
      <ProductsListView />
    </div>
  );
};

export default ItemManagment;

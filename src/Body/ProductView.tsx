import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import createFolderList from '../utilities';
import { statusOptions } from '../constants';
import DirectoryContext from '../Context';

const ProductView = (props: { match: { params: { productNum: string } } }) => {
  const {
    match: { params },
  } = props;
  const { path, selectedMonth, selectedYear } = useContext(DirectoryContext);

  return (
    <div className="product-view">
      <button type="button">
        <Link to="/">Back to main</Link>
      </button>
      <div>{params.productNum}</div>
    </div>
  );
};

export default ProductView;

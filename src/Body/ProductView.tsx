import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { createFolderList, getProductPath } from '../utilities';
import DirectoryContext from '../Context';
import FilesTable from './FilesTable';

const ProductView = (props: {
  match: { params: { productNum: string; productStatus: string } };
}) => {
  const {
    match: {
      params: { productNum, productStatus },
    },
  } = props;
  const { path, selectedMonth, selectedYear } = useContext(DirectoryContext);
  const [productFolderList, setProductFolderList] = useState<string[]>(['']);
  const createProductFoldersList = useCallback(async () => {
    const productObj = { num: productNum, status: productStatus };
    const folderList = createFolderList(
      getProductPath(path, selectedYear, selectedMonth, productObj)
    )
      .then((res) => res)
      .catch((err) => err);
    setProductFolderList(await folderList);
  }, [productNum, productStatus, path, selectedYear, selectedMonth]);
  useEffect(() => {
    createProductFoldersList();
  }, [createProductFoldersList]);

  const createTables = (folderList: string[]) => {
    const productObj = { num: productNum, status: productStatus };
    const productPath = `${getProductPath(
      path,
      selectedYear,
      selectedMonth,
      productObj
    )}`;
    return folderList.map((folder: string) => {
      return (
        <FilesTable key={`${folder}`} title={`${folder}`} path={productPath} />
      );
    });
  };
  return (
    <div className="product-view">
      <button type="button">
        <Link to="/">Back to main</Link>
      </button>
      <h3>
        Product {productNum} - {productStatus}
      </h3>
      <div className="table-view">{createTables(productFolderList)}</div>
    </div>
  );
};

export default ProductView;

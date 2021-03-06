/* eslint-disable no-console */
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import {
  checkMonthStatus,
  createFolder,
  createFolderList,
  createMonthsList,
  deleteFolder,
  renameStatus,
} from '../utilities';
import { productStatuses, statusOptions } from '../constants';
import { DirectoryContext, MonthListContext } from '../Context';

const ProductsListView = () => {
  const { path, setSelectedMonth, selectedMonth, selectedYear } = useContext(
    DirectoryContext
  );
  const { setMonths } = useContext(MonthListContext);
  const [productList, setProductList] = useState<
    { num: string; status: string }[]
  >([]);
  const productsPath = `${path}\\${selectedYear}\\${selectedMonth.month} - ${selectedMonth.status}`;
  const createProductList = useCallback(() => {
    const res = createFolderList(productsPath);
    const productObjectsList = res.map((dir) => {
      const splittedDirName = dir.split(' - ');
      const productNum = splittedDirName[0];
      const statusDetails = splittedDirName.slice(1).join(' - ');
      const readableProduct = {
        num: productNum,
        status: statusDetails,
      };
      return readableProduct;
    });
    setProductList(productObjectsList);
  }, [productsPath]);

  const createStatusOptions = () => {
    return statusOptions.map((status) => (
      <option key={`${status}`} value={`${status}`}>
        {status}
      </option>
    ));
  };
  const setProductStatus = (productNum: string, newStatus: string) => {
    const tmpList = productList;
    const productIndex = tmpList.findIndex(
      (product) => product.num === productNum
    );
    tmpList[productIndex].status = newStatus;
    const newProductObj = tmpList[productIndex];
    const leftListSlice = productList.slice(0, productIndex);
    const rightListSlice = productList.slice(
      productIndex + 1,
      productList.length
    );
    const newProductList = [...leftListSlice, newProductObj, ...rightListSlice];
    setProductList(newProductList);
  };
  const deleteProduct = (product: { num: string; status: string }) => {
    ipcRenderer
      .invoke('delete-confirmation', product.num)
      .then((res) => {
        const isDeleteConfirmed = res === 0;
        if (isDeleteConfirmed) {
          const productIndex = productList.findIndex(
            (el) => el.num === product.num
          );
          deleteFolder(`${productsPath}\\${product.num} - ${product.status}`);
          setProductList([
            ...productList.slice(0, productIndex),
            ...productList.slice(productIndex + 1, productList.length),
          ]);
        }
        return res;
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  };
  const createProductsTable = () => {
    productList.sort((a, b) => Number(a.num) - Number(b.num));
    const items = productList.map((product) => {
      return (
        <tr key={product.num}>
          <td className="delete-column">
            <button
              className="delete-product"
              type="button"
              onClick={() => deleteProduct(product)}
            >
              X
            </button>
          </td>
          <td>{product.num}</td>
          <td>
            <select
              onChange={(e) => {
                const oldProductStatus = `${productsPath}\\${product.num} - ${product.status}`;
                const newProductStatus = `${productsPath}\\${product.num} - ${e.target.value}`;
                renameStatus(oldProductStatus, newProductStatus);
                const newMonthStatus = checkMonthStatus(
                  `${path}\\${selectedYear}`,
                  selectedMonth.month,
                  selectedMonth.status
                );
                setSelectedMonth({ ...selectedMonth, status: newMonthStatus });
                const monthList = createMonthsList(`${path}\\${selectedYear}`);
                setMonths(monthList);

                setProductStatus(product.num, e.target.value);
              }}
              value={product.status}
            >
              {createStatusOptions()}
            </select>
          </td>
          <td>
            <button type="button">
              <Link to={`/ProductView/${product.num}&${product.status}`}>
                Open
              </Link>
            </button>
          </td>
        </tr>
      );
    });

    return items;
  };

  const addNewProduct = () => {
    const newProductNum = (
      parseInt(productList[productList.length - 1].num, 10) + 1
    ).toString();
    const newProduct = {
      num: newProductNum,
      status: productStatuses.NEW,
    };
    setProductList([...productList, newProduct]);
    createFolder(`${productsPath}\\${newProduct.num} - ${newProduct.status}`);
  };
  useEffect(() => {
    if (selectedMonth.month !== '') {
      createProductList();
    }
  }, [createProductList, selectedMonth]);
  return (
    <div className="product-list-view">
      <table className="products-table">
        <thead>
          <tr>
            <th className="delete-column">Delete</th>
            <th>Prudct Number</th>
            <th>Prudct Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {createProductsTable()}
          <tr>
            <td colSpan={4}>
              <button type="button" onClick={addNewProduct}>
                New Product
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductsListView;

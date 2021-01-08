import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import createFolderList from '../utilities';
import { statusOptions } from '../constants';
import DirectoryContext from '../Context';

const ProductsListView = () => {
  const { path, selectedMonth, selectedYear } = useContext(DirectoryContext);
  const [productList, setProductList] = useState<
    { num: string; status: string }[]
  >([]);
  const [selectedProduct, setSelectedProduct] = useState<string>();
  const createProductList = useCallback(() => {
    const productsPath = `${path}/${selectedYear}/${selectedMonth.month} - ${selectedMonth.status}`;
    createFolderList(productsPath)
      .then((res) => {
        const productObjectsList = res.map((dir) => {
          const dirName = dir;
          const readableProduct = {
            num: dirName.split(' - ')[0],
            status: dirName.split(' - ')[1],
          };
          return readableProduct;
        });
        return setProductList(productObjectsList);
      })
      .catch((err) => console.error(err));
  }, [selectedYear, selectedMonth, path]);

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

  const createProductsTable = () => {
    productList.sort((a, b) => Number(a.num) - Number(b.num));
    const items = productList.map((product) => {
      return (
        <tr key={product.num}>
          <td>{product.num}</td>
          <td>
            <select
              onChange={(e) => setProductStatus(product.num, e.target.value)}
              value={product.status}
            >
              {createStatusOptions()}
            </select>
          </td>
          <td>
            <Link to={`/ProductView/${product.num}`}>Click Here</Link>
          </td>
        </tr>
      );
    });

    return items;
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
            <th>Prudct Number</th>
            <th>Prudct Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>{createProductsTable()}</tbody>
      </table>
    </div>
  );
};

export default ProductsListView;

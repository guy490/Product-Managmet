import React, { useContext, useState, useEffect } from 'react';
import createFolderList from '../utilities';
import DirectoryContext from '../Context';

const ProductView = () => {
  const { path, selectedMonth, selectedYear } = useContext(DirectoryContext);
  const [productList, setProductList] = useState<
    { product: string; status: string }[]
  >([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const createSelectItems = (items: JSX.Element[]) => {
    const productsPath = `${path}/${selectedYear}/${selectedMonth.month} - ${selectedMonth.status}`;
    createFolderList(productsPath)
      .then((res) => {
        const productObjectsList = res.map((dir) => {
          const dirName = dir;
          const readableProduct = {
            product: dirName.split(' - ')[0],
            status: dirName.split(' - ')[1],
          };
          return readableProduct;
        });
        return setProductList(productObjectsList);
      })
      .catch((err) => console.error(err));
    // items.push(
    //   <option key={i} value={i}>
    //     {i}
    //   </option>
    // );

    // return items;
  };
  useEffect(() => {
    if (selectedMonth && selectedYear) createSelectItems();
  }, [createSelectItems, selectedMonth, selectedYear]);
  return (
    <div className="product-view">
      {/* <select name="country" value={this.state.data.country}>
        {this.countryData.map((e, key) => {
          return (
            <option key={key} value={e.value}>
              {e.name}
            </option>
          );
        })}
      </select> */}
    </div>
  );
};

export default ProductView;

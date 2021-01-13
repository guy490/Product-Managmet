import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { Link } from 'react-router-dom';
import {
  createFolderList,
  getNotesContent,
  getProductPath,
  setNotesContent,
} from '../utilities';
import { DirectoryContext } from '../Context';
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
  const [productNotes, setProductNotes] = useState<string>('');
  const productObj = useMemo(() => {
    return { num: productNum, status: productStatus };
  }, [productNum, productStatus]);

  const productPath = getProductPath(
    path,
    selectedYear,
    selectedMonth,
    productObj
  );

  const createProductFoldersList = useCallback(async () => {
    const folderList = createFolderList(productPath);
    setProductFolderList(folderList);
  }, [productPath]);
  useEffect(() => {
    createProductFoldersList();
  }, [createProductFoldersList]);

  useEffect(() => {
    const data = getNotesContent(
      getProductPath(path, selectedYear, selectedMonth, productObj)
    );

    setProductNotes(data);
  }, [path, productObj, selectedMonth, selectedYear]);

  const updateNotesFile = () => {
    setNotesContent(productPath, productNotes);
  };
  const createTables = (folderList: string[]) => {
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
      <div className="notes">
        <textarea
          className="info"
          value={productNotes}
          onChange={(e) => setProductNotes(e.target.value)}
        />
        <div>
          <button type="button" onClick={() => updateNotesFile()}>
            Save Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;

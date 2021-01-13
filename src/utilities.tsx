/* eslint-disable no-console */
import fs from 'fs';
import { MONTH_STATUS, statusConstants } from './constants';

const { COPYFILE_EXCL } = fs.constants;

const createFolderList = (dirPath: string) => {
  const folderList: string[] = [];
  fs.readdirSync(dirPath).forEach((file) => {
    if (fs.lstatSync(`${dirPath}/${file}`).isDirectory()) {
      folderList.push(file);
    }
  });
  return folderList;
};

const createFileList = (dirPath: string) => {
  const fileList: string[] = [];
  fs.readdirSync(dirPath).forEach((file) => {
    if (fs.lstatSync(`${dirPath}/${file}`).isFile()) {
      fileList.push(file);
    }
  });
  return fileList;
};
const createMonthsList = (path: string) => {
  const res = createFolderList(path);
  const monthList = res.map((dir) => {
    const dirName = dir;
    const readableMonth = {
      month: dirName.split(' - ')[0],
      status: dirName.split(' - ')[1],
    };
    return readableMonth;
  });
  return monthList;
};

const getProductPath = (
  path: string,
  selectedYear: string,
  selectedMonth: { month: string; status: string },
  product: { num: string; status: string }
) => {
  const monthPath = `${selectedMonth.month} - ${selectedMonth.status}`;
  const productPath = `${product.num} - ${product.status}`;
  return `${path}/${selectedYear}/${monthPath}/${productPath}`;
};
const renameStatus = (path: string, newPath: string) => {
  try {
    fs.renameSync(path, newPath);
  } catch (err) {
    console.log(err);
  }
};
const checkMonthStatus = (path: string, month: string, monthStatus: string) => {
  const currentPath = `${path}/${month} - ${monthStatus}`;
  const folderList = createFolderList(currentPath);
  let monthShouldUpdate = true;
  folderList.forEach((folder) => {
    if (
      !folder.endsWith(statusConstants.DONE) &&
      !folder.endsWith(statusConstants.SKIPPED) &&
      !folder.endsWith(statusConstants.CANCELLED)
    ) {
      monthShouldUpdate = false;
    }
  });
  if (monthShouldUpdate) {
    const newPath = `${path}/${month} - ${MONTH_STATUS.DONE}`;
    renameStatus(currentPath, newPath);
    return MONTH_STATUS.DONE;
  }
  const newPath = `${path}/${month} - ${MONTH_STATUS.PROCESS}`;
  renameStatus(currentPath, newPath);
  return MONTH_STATUS.PROCESS;
};

const getNotesContent = (productPath: string) => {
  try {
    return fs.readFileSync(`${productPath}/info.txt`, {
      encoding: 'utf8',
    });
  } catch {
    return '';
  }
};

const setNotesContent = (productPath: string, data: string) => {
  fs.writeFileSync(`${productPath}/info.txt`, data, {
    encoding: 'utf8',
    flag: 'w',
  });
};

const addFileToProduct = (
  sourceFileToCopy: string,
  pathDistionation: string
) => {
  fs.copyFileSync(sourceFileToCopy, pathDistionation, COPYFILE_EXCL);
};
export {
  createFolderList,
  createFileList,
  getProductPath,
  renameStatus,
  checkMonthStatus,
  createMonthsList,
  getNotesContent,
  setNotesContent,
  addFileToProduct,
};

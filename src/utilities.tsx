/* eslint-disable no-console */
import fs from 'fs';
import { MONTH_STATUS, productStatuses } from './constants';

const { COPYFILE_EXCL } = fs.constants;

const createFolderList = (dirPath: string) => {
  const folderList: string[] = [];
  fs.readdirSync(dirPath).forEach((file) => {
    if (fs.lstatSync(`${dirPath}\\${file}`).isDirectory()) {
      folderList.push(file);
    }
  });
  return folderList;
};

const createFileList = (dirPath: string) => {
  const fileList: string[] = [];
  fs.readdirSync(dirPath).forEach((file) => {
    if (fs.lstatSync(`${dirPath}\\${file}`).isFile()) {
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
  return `${path}\\${selectedYear}\\${monthPath}\\${productPath}`;
};
const renameStatus = (path: string, newPath: string) => {
  try {
    fs.renameSync(path, newPath);
  } catch (err) {
    console.log(err);
  }
};
const checkMonthStatus = (
  path: string,
  month: string,
  currentMonthStatus: string
) => {
  const currentPath = `${path}\\${month} - ${currentMonthStatus}`;
  const folderList = createFolderList(currentPath);
  let newMonthStatus = '';
  let monthShouldUpdate = true;
  folderList.forEach((folder) => {
    if (
      !folder.endsWith(productStatuses.DONE) &&
      !folder.endsWith(productStatuses.SKIPPED) &&
      !folder.endsWith(productStatuses.CANCELLED)
    ) {
      monthShouldUpdate = false;
    }
  });
  if (monthShouldUpdate) {
    newMonthStatus = MONTH_STATUS.DONE;
  } else {
    newMonthStatus = MONTH_STATUS.PROCESS;
  }
  const newPath = `${path}\\${month} - ${newMonthStatus}`;
  if (currentPath !== newPath) {
    renameStatus(currentPath, newPath);
  }
  return newMonthStatus;
};

const getNotesContent = (productPath: string) => {
  try {
    return fs.readFileSync(`${productPath}\\info.txt`, {
      encoding: 'utf8',
    });
  } catch {
    return '';
  }
};

const setNotesContent = (productPath: string, data: string) => {
  fs.writeFileSync(`${productPath}\\info.txt`, data, {
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

const createFolder = (folderPath: string) => {
  fs.mkdirSync(folderPath);
};

const deleteFolder = (folderPath: string) => {
  fs.rmdirSync(folderPath, { recursive: true });
};

const deleteFile = (filePath: string) => {
  fs.unlinkSync(filePath);
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
  createFolder,
  deleteFolder,
  deleteFile,
};

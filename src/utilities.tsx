import fs from 'fs';

const createFolderList = async (dirPath: string) => {
  const dir = await fs.promises.opendir(dirPath);
  const tmpArray: string[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      tmpArray.push(dirent.name);
    }
  }
  return tmpArray;
};

export default createFolderList;

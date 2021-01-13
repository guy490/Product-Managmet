import { ipcRenderer } from 'electron';
import React, { useState, useEffect } from 'react';
import { addFileToProduct, createFileList } from '../utilities';

const FilesTable = (props: { title: string; path: string }) => {
  const { title, path } = props;
  const fullPath = `${path}/${title}`;
  const [files, setFiles] = useState<string[]>(['']);
  useEffect(() => {
    const fileList = createFileList(fullPath);
    setFiles(fileList);
  }, [path, title, setFiles, fullPath]);

  const createTableData = () => {
    return files.map((file) => (
      <tr key={`${file}`}>
        <td className="link">
          <div>
            <button type="button">
              <a href={`${fullPath}/${file}`} target="_blank" rel="noreferrer">
                Open
              </a>
            </button>
          </div>
          {file.toLowerCase().endsWith('pdf') ? (
            'PDF FILE'
          ) : (
            <img
              className="img-preview"
              src={`${fullPath}/${file}`}
              alt={`${file}`}
            />
          )}
        </td>
        <td>
          <span className="delete">Delete</span>
        </td>
      </tr>
    ));
  };

  const addFile = () => {
    ipcRenderer
      .invoke('add-file')
      .then((seletedFile) => {
        const splittedPath = seletedFile.split('\\');
        const fileName = splittedPath[splittedPath.length - 1];
        addFileToProduct(seletedFile, `${fullPath}/${fileName}`);
        setFiles([...files, fileName]);
        return seletedFile;
      })

      // eslint-disable-next-line no-alert
      .catch((err) => alert(`${err.message} - please change the file name`));
  };

  const openFolder = () => {
    ipcRenderer.invoke('open-folder', fullPath);
  };
  return (
    <div className="files-table">
      <table>
        <caption>{title}</caption>
        <thead>
          <tr>
            <th>File</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {createTableData()}
          <tr>
            <td colSpan={2}>
              <button type="button" onClick={() => addFile()}>
                Add File
              </button>
              <button type="button" onClick={() => openFolder()}>
                Containing Folder
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FilesTable;

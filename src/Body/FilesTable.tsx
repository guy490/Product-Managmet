import React, { useState, useEffect } from 'react';
import { createFolderList } from '../utilities';

const FilesTable = (props: { title: string; path: string }) => {
  const { title, path } = props;
  const fullPath = `${path}/${title}`;
  const [files, setFiles] = useState<string[]>(['']);
  useEffect(() => {
    const fileList = createFolderList(fullPath);
    setFiles(fileList);
  }, [path, title, setFiles, fullPath]);

  const createTableData = () => {
    return files.map((file) => (
      <tr key={`${file}`}>
        <td className="link">
          <div>
            <a href={`${fullPath}/${file}`} target="_blank" rel="noreferrer">
              Open
            </a>
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
  return (
    <div className="files-table">
      <table>
        <caption>{title}</caption>
        <thead>
          <tr>
            <th>File</th>
            <th>Replace</th>
          </tr>
        </thead>
        <tbody>
          {createTableData()}
          <tr>
            <td colSpan={2}>Add New Row</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FilesTable;

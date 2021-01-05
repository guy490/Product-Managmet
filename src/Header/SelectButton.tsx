import React, { MutableRefObject, useRef, useContext } from 'react';
import { ipcRenderer } from 'electron';
import DirectoryContext from '../Context';

const SelectButton = () => {
  const { setPath } = useContext(DirectoryContext);
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const openSelectFolderWindow = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    ipcRenderer
      .invoke('select-path')
      .then((res) => {
        setPath(res);

        inputRef.current.value = res;

        return res[0];
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  };
  return (
    <div className="select-button">
      <button type="button" onClick={openSelectFolderWindow}>
        Select Path
      </button>
      <input type="text" ref={inputRef} disabled />
    </div>
  );
};

export default SelectButton;

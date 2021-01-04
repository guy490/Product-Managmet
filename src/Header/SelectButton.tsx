import React, { MutableRefObject, useRef } from 'react';
import { ipcRenderer } from 'electron';

const SelectButton = (props: { setPath: (newPath: string) => void }) => {
  const { setPath } = props;
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

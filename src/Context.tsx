import { createContext } from 'react';

const DirectoryContext = createContext({
  contextPath: '',
  contextSetPath: (newPath: string) => {
    newPath.toString();
  },
});

export default DirectoryContext;

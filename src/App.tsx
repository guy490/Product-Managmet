import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ItemManagment from './Body/ItemManagment';
import SelectButton from './Header/SelectButton';
import DirectoryContext from './Context';

const Main = () => {
  const { contextSetPath } = useContext(DirectoryContext);

  return (
    <div>
      <SelectButton setPath={contextSetPath} />
      <ItemManagment />
    </div>
  );
};

export default function App() {
  const [path, setPath] = useState('');

  return (
    <DirectoryContext.Provider
      value={{
        contextPath: path,
        contextSetPath: (newPath: string) => {
          setPath(newPath);
        },
      }}
    >
      <Router>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </DirectoryContext.Provider>
  );
}

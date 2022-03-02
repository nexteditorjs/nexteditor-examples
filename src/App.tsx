import React from 'react';
import Box from '@mui/material/Box';
import Header from './Header';
import Simple from './pages/Simple';
import { useFunctionAsState } from './hooks/use-function-as-state';

import './App.css';

const examplePages: { [index: string]: () => JSX.Element } = {
  simple: Simple,
};

function App() {
  //
  const [currentExample, setCurrentExample] = useFunctionAsState(null);
  //
  const handleChangeExample = (type: string) => {
    const page = examplePages[type];
    if (page) {
      setCurrentExample(page);
    }
  };

  const Example = currentExample ?? examplePages.simple;

  return (
    <Box sx={{ flexGrow: 1,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column' }}
    >
      <Header onChange={handleChangeExample} />
      <div className="editor-page">
        {Example && <Example />}
      </div>
    </Box>
  );
}

export default App;

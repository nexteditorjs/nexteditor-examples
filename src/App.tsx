import React from 'react';
import Box from '@mui/material/Box';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Simple from './pages/Simple';
import ShareDB from './pages/ShareDB';
import Yjs from './pages/Yjs';

import './App.css';

const APP_ROOT = '/examples';

const examplePages: { [index: string]: () => JSX.Element } = {
  simple: Simple,
  yjs: Yjs,
  shareDB: ShareDB,
};

function App() {
  //
  const navigate = useNavigate();
  //
  const handleChangeExample = (type: string) => {
    navigate(`${APP_ROOT}/${type}`);
  };

  const Simple = examplePages.simple;
  const ShareDB = examplePages.shareDB;
  const Yjs = examplePages.yjs;

  return (
    <Box sx={{ flexGrow: 1,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column' }}
    >
      <Header onChange={handleChangeExample} />
      <div className="editor-page">
        <Routes>
          {/* <Route path={`${APP_ROOT}`} element={<Simple />} /> */}
          <Route path={`${APP_ROOT}/simple`} element={<Simple />} />
          <Route path={`${APP_ROOT}/share-db`} element={<ShareDB />} />
          <Route path={`${APP_ROOT}/yjs`} element={<Yjs />} />
          <Route path="*" element={<Navigate to={`${APP_ROOT}/simple`} replace />} />
        </Routes>
      </div>
    </Box>
  );
}

export default App;

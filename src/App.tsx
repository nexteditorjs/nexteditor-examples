import React from 'react';
import Box from '@mui/material/Box';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { genId } from '@nexteditorjs/nexteditor-core';
import Header from './Header';
import Simple from './pages/Simple';
import ShareDB from './pages/ShareDB';
import Yjs from './pages/Yjs';
import Tables from './pages/Tables';
import Markdown from './pages/Markdown';

import './App.css';

const APP_ROOT = '/examples';

function App() {
  //
  const navigate = useNavigate();
  //
  const handleChangeExample = (type: string) => {
    navigate(`${APP_ROOT}/${type}`);
  };

  return (
    <Box sx={{ flexGrow: 1,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column' }}
    >
      <Header onChange={handleChangeExample} />
      <div className="editor-page">
        <Routes>
          <Route path={`${APP_ROOT}/simple`} element={<Simple />} />
          <Route path={`${APP_ROOT}/tables`} element={<Tables />} />
          <Route path={`${APP_ROOT}/markdown-shortcuts`} element={<Markdown />} />
          <Route path={`${APP_ROOT}/sharedb/:docId`} element={<ShareDB />} />
          <Route path={`${APP_ROOT}/sharedb`} element={<Navigate to={`${APP_ROOT}/sharedb/${genId()}`} replace />} />
          <Route path={`${APP_ROOT}/yjs/:docId`} element={<Yjs />} />
          <Route path={`${APP_ROOT}/yjs`} element={<Navigate to={`${APP_ROOT}/yjs/${genId()}`} replace />} />
          <Route path="*" element={<Navigate to={`${APP_ROOT}/simple`} replace />} />
        </Routes>
      </div>
    </Box>
  );
}

export default App;

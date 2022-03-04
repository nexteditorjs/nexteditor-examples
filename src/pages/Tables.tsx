import React from 'react';
import { NextEditor as Editor, LocalDoc } from '@nexteditorjs/nexteditor-core';
import NextEditor from '../NextEditor';

import initData from './docs/tables.json';

const defaultDoc = new LocalDoc(initData);

export default function Tables() {
  //
  const handleCreate = React.useCallback((editor: Editor) => {
    editor.focus();
  }, []);
  //
  return (
    <NextEditor onCreate={handleCreate} initDoc={defaultDoc}/>
  );
}

import React from 'react';
import { createEmptyDoc, NextEditor as Editor, LocalDoc } from '@nexteditorjs/nexteditor-core';
import NextEditor from '../NextEditor';

const defaultDoc = new LocalDoc(createEmptyDoc('', {
  firstLineAsTitle: true,
}));

export default function Simple() {
  //
  const handleCreate = React.useCallback((editor: Editor) => {
    editor.focus();
  }, []);
  //
  return (
    <NextEditor onCreate={handleCreate} initDoc={defaultDoc}/>
  );
}

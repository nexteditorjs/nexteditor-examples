import React from 'react';
import { NextEditor as Editor } from '@nexteditorjs/nexteditor-core';
import NextEditor from '../NextEditor';

export default function Simple() {
  //
  const handleCreate = React.useCallback((editor: Editor) => {
    editor.focus();
  }, []);
  //
  return (
    <NextEditor onCreate={handleCreate}/>
  );
}

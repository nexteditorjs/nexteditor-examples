import React from 'react';
import { NextEditor as Editor, LocalDoc } from '@nexteditorjs/nexteditor-core';
import { MarkdownInputHandler } from '@nexteditorjs/nexteditor-input-handlers';
import NextEditor from '../NextEditor';

import initData from './docs/markdown.json';

const defaultDoc = new LocalDoc(initData);

export default function Markdown() {
  //
  const handleCreate = React.useCallback((editor: Editor) => {
    editor.input.addHandler(new MarkdownInputHandler());
    editor.focus();
  }, []);
  //
  return (
    <NextEditor onCreate={handleCreate} initDoc={defaultDoc}/>
  );
}

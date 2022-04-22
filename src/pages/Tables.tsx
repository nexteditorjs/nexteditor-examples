import React from 'react';
import { NextEditor as Editor, LocalDoc } from '@nexteditorjs/nexteditor-core';
import { NextEditorToolbarHandler } from '@nexteditorjs/nexteditor-ui';
import { MarkdownInputHandler } from '@nexteditorjs/nexteditor-input-handlers';
import NextEditor from '../NextEditor';

import initData from './docs/tables.json';

const defaultDoc = new LocalDoc(initData);

export default function Tables() {
  //
  const handleCreate = React.useCallback((editor: Editor) => {
    editor.addCustom('toolbar-handler', (editor) => new NextEditorToolbarHandler(editor));
    editor.input.addHandler(new MarkdownInputHandler());
    editor.focus();
  }, []);
  //
  return (
    <NextEditor onCreate={handleCreate} initDoc={defaultDoc}/>
  );
}

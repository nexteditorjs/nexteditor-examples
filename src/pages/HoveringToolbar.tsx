import React from 'react';
import { NextEditor as Editor, LocalDoc } from '@nexteditorjs/nexteditor-core';
import { MarkdownInputHandler } from '@nexteditorjs/nexteditor-input-handlers';
import { NextEditorToolbarHandler } from '@nexteditorjs/nexteditor-ui';
import NextEditor from '../NextEditor';

import initData from './docs/toolbar.json';

const defaultDoc = new LocalDoc(initData);

export default function HoveringToolbar() {
  //
  const handleCreate = React.useCallback((editor: Editor) => {
    editor.registerCallback(new NextEditorToolbarHandler(editor));
    editor.input.addHandler(new MarkdownInputHandler());
    editor.focus();
  }, []);
  //
  return (
    <NextEditor onCreate={handleCreate} initDoc={defaultDoc}/>
  );
}

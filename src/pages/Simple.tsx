import React from 'react';
import { createEmptyDoc, NextEditor as Editor, LocalDoc } from '@nexteditorjs/nexteditor-core';
import { EnforceWithDocumentTitleHandler } from '@nexteditorjs/nexteditor-input-handlers';
import NextEditor from '../NextEditor';

const defaultDoc = new LocalDoc(createEmptyDoc('', {
  firstLineAsTitle: true,
}));

export default function Simple() {
  //
  const handleCreate = React.useCallback((editor: Editor) => {
    editor.input.addHandler(new EnforceWithDocumentTitleHandler({
      headingLevel: 2,
      titlePlaceholder: 'Document title',
      contentPlaceholder: 'Enter some text...',
    }));
    editor.focus();
  }, []);
  //
  return (
    <NextEditor onCreate={handleCreate} initDoc={defaultDoc}/>
  );
}

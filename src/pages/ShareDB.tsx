import React, { useCallback } from 'react';
import { createEmptyDoc, NextEditor as Editor, assert, NextEditorDoc } from '@nexteditorjs/nexteditor-core';
import { EnforceWithDocumentTitleHandler, MarkdownInputHandler } from '@nexteditorjs/nexteditor-input-handlers';
import ShareDBDoc from '@nexteditorjs/nexteditor-sharedb';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import NextEditor from '../NextEditor';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function getWebSocketAddress() {
  const host = location.origin.replace(/^http/, 'ws');
  return `${host}/examples/sharedb-server`;
}

export default function ShareDB() {
  //
  const params = useParams();
  const docId = params.docId;
  assert(docId, 'no docId');
  //
  const [doc, setDoc] = React.useState<NextEditorDoc | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  const handleDocError = useCallback((type: string, error: unknown) => {
    console.error(type, error);
    setError(new Error(JSON.stringify(error)));
  }, []);
  //
  React.useEffect(() => {
    //
    const loadDocument = async () => {
      try {
        const doc = await ShareDBDoc.load({
          server: getWebSocketAddress(),
          collectionName: 'examples',
          documentId: docId,
          docTemplate: createEmptyDoc('', {
            firstLineAsTitle: true,
          }),
          onDocError: handleDocError,
        });
        //
        setDoc(doc);
      } catch (err) {
        setError(err as Error);
      }
    }
    //
    loadDocument();
    //
  }, [docId]);

  const handleCreate = React.useCallback((editor: Editor) => {
    editor.input.addHandler(new MarkdownInputHandler());
    editor.input.addHandler(new EnforceWithDocumentTitleHandler(editor, {
      headingLevel: 1,
      titlePlaceholder: 'Document title',
      contentPlaceholder: 'Enter some text...',
    }));
    editor.focus();
  }, []);
  //
  if (error) {
    return (<Typography color="red">{error.message}</Typography>);
  }
  //
  if (!doc) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <CircularProgress size={24} />
      </Box>
    );
  }
  //
  return (
    <NextEditor onCreate={handleCreate} initDoc={doc}/>
  );
}

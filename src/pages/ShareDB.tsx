import React, { useCallback } from 'react';
import { createEmptyDoc, NextEditor as Editor, assert, RemoteCursorInsertion, NextEditorUser, getLogger } from '@nexteditorjs/nexteditor-core';
import { EnforceWithDocumentTitleHandler, MarkdownInputHandler } from '@nexteditorjs/nexteditor-input-handlers';
import ShareDBDoc, { BroadcastCursor, RemoteCursorDecorator } from '@nexteditorjs/nexteditor-sharedb';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import NextEditor from '../NextEditor';
import FakeLogin from './FakeLogin';

const logger = getLogger('sharedb');

function getWebSocketServer() {
  const host = document.location.origin.replace(/^http/, 'ws');
  return `${host}/examples/sharedb-api`;
}

const insertions = [RemoteCursorInsertion];
const decorators = [new RemoteCursorDecorator()];

export default function ShareDB() {
  //
  const params = useParams();
  const docId = params.docId;
  assert(logger, docId, 'no docId');
  //
  const [token, setToken] = React.useState('');
  const [doc, setDoc] = React.useState<ShareDBDoc | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [users, setUsers] = React.useState<NextEditorUser[]>([]);
  const editorRef = React.useRef<Editor | null>(null);

  const handleDocError = useCallback((type: string, error: unknown) => {
    logger.error(`doc error: ${type}, ${JSON.stringify(error)}`);
    setError(new Error(JSON.stringify(error)));
  }, []);

  const handleUserChanged = useCallback((users: NextEditorUser[]) => {
    setUsers(users);
  }, []);
  //
  React.useEffect(() => {
    //
    let doc: ShareDBDoc | undefined;
    const loadDocument = async () => {
      try {
        doc = await ShareDBDoc.load({
          token,
          server: `${getWebSocketServer()}/nexteditor`,
          collectionName: 'examples',
          documentId: docId,
          docTemplate: createEmptyDoc('', {
            firstLineAsTitle: true,
          }),
          onDocError: handleDocError,
        });
        //
        doc.client.remoteUsers.addListener('change', handleUserChanged);
        //
        setDoc(doc);
      } catch (err) {
        setError(err as Error);
      }
    };
    //
    if (token) {
      loadDocument();
    }
    //
    return () => {
      doc?.client.remoteUsers.removeListener('change', handleUserChanged);
    };
    //
  }, [docId, token]);

  const handleCreate = React.useCallback((editor: Editor) => {
    editorRef.current = editor;
    editor.addCustom('broadcast-cursor', (editor) => new BroadcastCursor(editor));
    editor.input.addHandler(new MarkdownInputHandler());
    editor.input.addHandler(new EnforceWithDocumentTitleHandler(editor, {
      headingLevel: 1,
      titlePlaceholder: 'Document title',
      contentPlaceholder: 'Enter some text...',
    }));
    // handle cursor change events
    (editor.doc.externalDoc as ShareDBDoc).client.remoteUsers.defaultHandleCursorChange(editor);
    editor.focus();
  }, []);

  const handleLogin = async (username: string) => {
    try {
      const ws = getWebSocketServer();
      const url = ws.replace(/^ws/, 'http');
      const userId = encodeURIComponent(username);
      const name = encodeURIComponent(username);
      const avatarName = encodeURIComponent(username.toLocaleLowerCase());
      const avatarUrl = encodeURIComponent(`https://picsum.photos/seed/${avatarName}/72/72`);
      const response = await fetch(`${url}/fake-api/examples/${docId}/token?permission=w&userId=${userId}&name=${name}&avatarUrl=${avatarUrl}`);
      const responseData = await response.json();
      setToken(responseData.token);
    } catch (err) {
      logger.error(JSON.stringify(err));
      setError(err as Error);
    }
  };
  //
  if (error) {
    return (<Typography color="red">{error.message}</Typography>);
  }
  //
  if (!token) {
    return (
      <FakeLogin onLogin={handleLogin}/>
    );
  }
  //
  //
  if (!doc) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <div>
      <Box sx={{
        display: 'flex',
        marginBottom: 2,
        justifyContent: 'flex-end',
      }}>{users.map((user) => (
        <div title={user.name} key={user.clientId}><img src={user.avatarUrl} style={{
          width: 30,
          height: 'auto',
          borderRadius: '100%',
          border: `3px solid ${editorRef.current ? editorRef.current.getColor(user.rainbowIndex) : ''}`,
        }}/></div>
      ))}
      </Box>
    <NextEditor onCreate={handleCreate} initDoc={doc} insertions={insertions} decorators={decorators}/>
    </div>
  );
}

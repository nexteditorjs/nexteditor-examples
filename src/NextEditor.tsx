import React from 'react';
import { NextEditor as Editor, createEditor, NextEditorDoc, LocalDoc, NextEditorDecorator, Insertion } from '@nexteditorjs/nexteditor-core';
import TableBlock, { TableBlockCommandProvider } from '@nexteditorjs/nexteditor-table-block';
import ListBlock from '@nexteditorjs/nexteditor-list-block';
import CodeBlock from '@nexteditorjs/nexteditor-code-block';

export interface NextEditorProps {
  initDoc?: NextEditorDoc;
  onCreate?: (editor: Editor) => void;
  insertions?: Insertion[];
  decorators?: NextEditorDecorator[];
}

export default function NextEditor(props: NextEditorProps) {
  const { initDoc, onCreate, insertions, decorators } = props;
  //
  const containerRef = React.useRef(null);
  const editorRef = React.useRef<Editor | null>();
  //
  React.useEffect(() => {
    const parent = containerRef.current;
    if (parent) {
      editorRef.current = createEditor(parent, initDoc ?? new LocalDoc(), {
        components: {
          blocks: [TableBlock, ListBlock, CodeBlock],
          commandProviders: [new TableBlockCommandProvider()],
          insertions,
          decorators,
        },
      });
      // (window as any).editor = editorRef.current;
      if (onCreate) {
        onCreate(editorRef.current);
      }
    }
    //
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [onCreate]);

  return (
    <div className="nexteditor-container" ref={containerRef} style={{
      width: '100%',
      // height: '100%',
    }}>
    </div>
  );
}

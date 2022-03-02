import React from 'react';
import { NextEditor as Editor, createEditor, NextEditorDoc, LocalDoc, editorBlocks } from '@nexteditorjs/nexteditor-core';
import TableBlock from '@nexteditorjs/nexteditor-table-block';

editorBlocks.registerComplexBlockClass(TableBlock);

export interface NextEditorProps {
  initDoc?: NextEditorDoc;
  onCreate?: (editor: Editor) => void;
}

export default function NextEditor(props: NextEditorProps) {
  const { initDoc, onCreate } = props;
  //
  const containerRef = React.useRef(null);
  const editorRef = React.useRef<Editor | null>();
  //
  React.useEffect(() => {
    const parent = containerRef.current;
    if (parent) {
      editorRef.current = createEditor(parent, initDoc ?? new LocalDoc());
      if (onCreate) {
        onCreate(editorRef.current);
      }
    }
    //
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, [onCreate]);

  return (
    <div className="nexteditor-container" ref={containerRef} style={{
      width: '100%',
      height: '100%',
    }}>
    </div>
  );
}

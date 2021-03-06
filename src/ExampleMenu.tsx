import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export interface ExamplesMenuProps {
  anchorEl: Element | null;
  onClose: (type?: string) => void;
}

export default function ExamplesMenu(props: ExamplesMenuProps) {
  const { anchorEl, onClose } = props;
  //
  const open = !!anchorEl;

  //
  return (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={open}
      onClose={() => onClose()}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MenuItem onClick={() => onClose('simple')}>Simple</MenuItem>
      <MenuItem onClick={() => onClose('tables')}>Tables</MenuItem>
      <MenuItem onClick={() => onClose('markdown-shortcuts')}>Markdown shortcuts</MenuItem>
      <MenuItem onClick={() => onClose('sharedb')}>ShareDB document</MenuItem>
      <MenuItem onClick={() => onClose('yjs')}>Yjs document</MenuItem>
      <MenuItem onClick={() => onClose('toolbar')}>Hovering toolbar</MenuItem>
    </Menu>
  );
}

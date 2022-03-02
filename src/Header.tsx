import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import ExamplesMenu from './ExampleMenu';

export interface HeaderProps {
  onChange: (type: string) => void;
}

export default function Header(props: HeaderProps) {
  const { onChange } = props;
  //
  const menuButtonRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleShowMenu = () => {
    setAnchorEl(menuButtonRef.current);
  };

  const handleClose = (type?: string) => {
    setAnchorEl(null);
    if (type) {
      onChange(type);
    }
  };
  //
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            ref={menuButtonRef}
            onClick={handleShowMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Examples
          </Typography>
          <Link color="inherit" href="https://github.com/nexteditorjs">Github</Link>
        </Toolbar>
      </AppBar>
      <ExamplesMenu anchorEl={anchorEl} onClose={handleClose} />
    </>
  );
}

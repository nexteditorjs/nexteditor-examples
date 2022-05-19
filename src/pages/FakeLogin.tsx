import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface Props {
  onLogin: (username: string) => void;
}

export default function FakeLogin(props: Props) {
  //
  const [username, setUsername] = React.useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleLogin = () => {
    props.onLogin(username);
  };
  //
  return (
    <Box style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <TextField id="standard-basic" label="Enter your name" variant="standard" onChange={handleUsernameChange} />
      <Button variant="contained" onClick={handleLogin} style={{ marginTop: 8 }}>OK</Button>
    </Box>
  );
}

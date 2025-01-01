import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Logo from '../atoms/Logo';



const Header: React.FC<{}> = () => {
  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

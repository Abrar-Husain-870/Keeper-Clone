import React from "react";
import HighlightIcon from '@mui/icons-material/Highlight';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';

function Header({ user, onLogout }) {
  return (
    <header>
      <h1><HighlightIcon/> Keeper</h1>
      {user && (
        <div className="header-user-info">
          <span className="user-email">{user.email}</span>
          <IconButton 
            onClick={onLogout} 
            aria-label="logout"
            className="logout-btn"
            style={{ color: '#fff' }}
          >
            <LogoutIcon />
          </IconButton>
        </div>
      )}
    </header>
  );
}

export default Header;

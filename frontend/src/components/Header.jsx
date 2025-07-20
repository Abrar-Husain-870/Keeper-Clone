import React from "react";
import HighlightIcon from '@mui/icons-material/Highlight';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { useAuth } from "../contexts/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteIcon from "@mui/icons-material/Note";

function Header({ user, onLogout, currentView, onViewChange }) {
  return (
    <header>
      <h1><HighlightIcon/> Keeper</h1>
      {user && (
        <div className="header-controls">
          <div className="header-nav">
            <button 
              onClick={() => onViewChange('notes')}
              className={`nav-btn ${currentView === 'notes' ? 'active' : ''}`}
              title="Notes"
            >
              <NoteIcon />
              <span>Notes</span>
            </button>
            <button 
              onClick={() => onViewChange('trash')}
              className={`nav-btn ${currentView === 'trash' ? 'active' : ''}`}
              title="Trash"
            >
              <DeleteIcon />
              <span>Trash</span>
            </button>
          </div>
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
        </div>
      )}
    </header>
  );
}

export default Header;

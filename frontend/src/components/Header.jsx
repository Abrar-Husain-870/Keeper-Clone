import React from "react";
import HighlightIcon from '@mui/icons-material/Highlight';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { useAuth } from "../contexts/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteIcon from "@mui/icons-material/Note";

function Header({ user, onLogout, currentView, onViewChange }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <h1 style={{ 
        margin: 0, 
        color: '#fff', 
        fontFamily: 'McLaren, cursive', 
        fontWeight: '200', 
        fontSize: window.innerWidth <= 768 ? '1.5rem' : '1.8rem',
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        flexShrink: 0
      }}>
        <HighlightIcon style={{ fontSize: window.innerWidth <= 768 ? '1.8rem' : '2rem' }}/> 
        <span>Keeper</span>
      </h1>
      {user && (
        <div className="header-controls" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="header-nav" style={{ display: 'flex', gap: '4px' }}>
            <button 
              onClick={() => onViewChange('notes')}
              className={`nav-btn ${currentView === 'notes' ? 'active' : ''}`}
              title="Notes"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: currentView === 'notes' ? '#fff' : 'none',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: currentView === 'notes' ? '#f5ba13' : '#fff',
                padding: '6px 12px',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.85rem',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: currentView === 'notes' ? '600' : '500',
                borderColor: currentView === 'notes' ? '#fff' : 'rgba(255, 255, 255, 0.3)',
                boxShadow: currentView === 'notes' ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'
              }}
            >
              <NoteIcon />
              <span>Notes</span>
            </button>
            <button 
              onClick={() => onViewChange('trash')}
              className={`nav-btn ${currentView === 'trash' ? 'active' : ''}`}
              title="Trash"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: currentView === 'trash' ? '#fff' : 'none',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: currentView === 'trash' ? '#f5ba13' : '#fff',
                padding: '6px 12px',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.85rem',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: currentView === 'trash' ? '600' : '500',
                borderColor: currentView === 'trash' ? '#fff' : 'rgba(255, 255, 255, 0.3)',
                boxShadow: currentView === 'trash' ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'
              }}
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

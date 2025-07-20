import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Note(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const CHARACTER_LIMIT = 209;
  
  const shouldTruncate = props.content && props.content.length > CHARACTER_LIMIT;
  const displayContent = shouldTruncate && !isExpanded 
    ? props.content.substring(0, CHARACTER_LIMIT) + "..."
    : props.content;

  function handleDelete(event) {
    event.stopPropagation();
    props.onDelete(props.id);
  }

  function handleEdit(event) {
    event.stopPropagation();
    props.onEdit(props.id);
  }

  function handleNoteClick() {
    props.onNoteClick(props.id);
  }

  function handleReadMoreClick(event) {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="note" onClick={handleNoteClick}>
      <h1>{props.title}</h1>
      <p>{displayContent}</p>
      {shouldTruncate && (
        <button 
          className="read-more-btn" 
          onClick={handleReadMoreClick}
          style={{
            background: 'none',
            border: 'none',
            color: '#f5ba13',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '600',
            padding: '4px 0',
            textDecoration: 'underline',
            fontFamily: 'Montserrat, sans-serif'
          }}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
      <div className="note-buttons">
        <IconButton onClick={handleEdit} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Note;

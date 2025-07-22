import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Note(props) {
  const formatDate = (date) => {
    if (!date) return '';
    // Firestore Timestamps have a toDate() method, JS Dates do not
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    if (isNaN(dateObj.getTime())) {
      return ''; // Return empty if the date is invalid
    }
    return dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

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

  return (
    <div className="note" onClick={handleNoteClick}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <div className="note-footer">
        <span className="note-date">{formatDate(props.createdAt)}</span>
        <div className="note-buttons">
          <IconButton onClick={handleEdit} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Note;

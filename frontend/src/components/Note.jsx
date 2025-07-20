import React from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Note(props) {
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

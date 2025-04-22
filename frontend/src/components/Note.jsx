import React from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function Note(props) {
  function handleDelete() {
    props.onDelete(props.id);
  }
  
  function handleEdit() {
    props.onEdit(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <div className="note-buttons">
        <Button 
          onClick={handleEdit} 
          variant="outlined" 
          startIcon={<EditIcon />}
          style={{ marginRight: '8px' }}
        >
          Edit
        </Button>
        <Button 
          onClick={handleDelete} 
          variant="outlined" 
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default Note;

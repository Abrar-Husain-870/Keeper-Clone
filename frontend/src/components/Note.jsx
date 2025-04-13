import React from "react";
// import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <Button onClick={handleClick} variant="outlined" startIcon={<DeleteIcon />}>
        {/* <DeleteIcon/> */}
        Delete
      </Button>
    </div>
  );
}

export default Note;

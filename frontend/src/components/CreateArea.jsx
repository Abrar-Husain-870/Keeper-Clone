import React, { useState, useEffect } from "react";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CancelIcon from '@mui/icons-material/Cancel';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import Button from '@mui/material/Button';


function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(props.isEditing || false);

  const [note, setNote] = useState({
    title: props.editNote ? props.editNote.title : "",
    content: props.editNote ? props.editNote.content : ""
  });
  
  // Update note state when editNote prop changes
  useEffect(() => {
    if (props.editNote) {
      setNote({
        title: props.editNote.title,
        content: props.editNote.content
      });
      setExpanded(true);
    }
  }, [props.editNote]);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    if (!props.isEditing) {
      setNote({
        title: "",
        content: ""
      });
    }
    event.preventDefault();
  }
  
  function handleCancel(event) {
    if (props.onCancel) {
      props.onCancel();
    }
    event.preventDefault();
  }

  function expanded(){
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded ? (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        ) : null}
        <textarea
          name="content"
          onClick={expanded}
          onChange={handleChange}
          value={note.content}
          placeholder={props.isEditing ? "Edit your note..." : "Take a note..."}
          rows={isExpanded ? "3" : "1"}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {props.isEditing && (
            <Zoom in={true}>
              <Button 
                onClick={handleCancel}
                variant="outlined" 
                startIcon={<CancelIcon />}
                style={{ marginRight: '8px' }}
              >
                Cancel
              </Button>
            </Zoom>
          )}
          <Zoom in={isExpanded}>
            <Fab onClick={submitNote}>
              {props.isEditing ? <EditNoteIcon /> : <NoteAddIcon />}
            </Fab>
          </Zoom>
        </div>
      </form>
    </div>
  );
}

export default CreateArea;

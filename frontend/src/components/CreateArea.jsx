import React, { useState, useEffect } from "react";
import DoneIcon from '@mui/icons-material/Done';
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
    } else {
      // Reset form when not editing
      setNote({ title: "", content: "" });
      setExpanded(false);
    }
  }, [props.editNote]);

  function handleChange(event) {
    const { name, value } = event.target;

    // Auto-resize textarea
    if (name === 'content') {
      event.target.style.height = 'auto';
      event.target.style.height = event.target.scrollHeight + 'px';
    }

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    
    // Don't submit if both title and content are empty
    if (!note.title.trim() && !note.content.trim()) {
      return;
    }
    
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    
    // Collapse the create area back to original size
    if (!props.isEditing) {
      setExpanded(false);
    }
  }
  
  function handleCancel(event) {
    if (props.onCancel) {
      props.onCancel();
    }
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  // Check if note is empty (both title and content are empty or whitespace)
  const isNoteEmpty = !note.title.trim() && !note.content.trim();

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder={props.isEditing ? "Edit your note..." : "Take a note..."}
          rows={isExpanded ? 3 : 1}
          style={{
            resize: 'none',
            overflow: 'hidden',
            minHeight: isExpanded ? '60px' : '40px'
          }}
        />
        <Zoom in={isExpanded}>
          <Fab 
            onClick={submitNote}
            disabled={isNoteEmpty}
            style={{
              backgroundColor: isNoteEmpty ? '#ccc' : '#f5ba13',
              color: isNoteEmpty ? '#999' : '#fff',
              cursor: isNoteEmpty ? 'not-allowed' : 'pointer'
            }}
          >
            <DoneIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;

import React from 'react';
import './ExpandedNote.css';

function ExpandedNote({ note, onClose }) {
  if (!note) {
    return null;
  }

  // Stop propagation to prevent the background click handler from firing
  const handleCardClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="expanded-note-backdrop" onClick={onClose}>
      <div className="expanded-note-card" onClick={handleCardClick}>
        <h1>{note.title}</h1>
        <p>{note.content}</p>
      </div>
    </div>
  );
}

export default ExpandedNote;

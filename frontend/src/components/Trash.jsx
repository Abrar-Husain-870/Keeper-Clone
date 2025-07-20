import React, { useState, useEffect } from "react";
import { getTrashedNotes, restoreNoteFromTrash, permanentlyDeleteNote } from "../firestoreApi";
import { useAuth } from "../contexts/AuthContext";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./Trash.css";

function Trash({ onNoteRestored }) {
  const [trashedNotes, setTrashedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      fetchTrashedNotes();
    }
  }, [currentUser]);

  async function fetchTrashedNotes() {
    try {
      setLoading(true);
      const data = await getTrashedNotes(currentUser.uid);
      setTrashedNotes(data);
    } catch (error) {
      console.error('Error fetching trashed notes:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleRestore(noteId) {
    try {
      await restoreNoteFromTrash(noteId);
      fetchTrashedNotes(); // Refresh the trash list
      if (onNoteRestored) {
        onNoteRestored(); // Refresh the main notes list
      }
    } catch (error) {
      console.error('Error restoring note:', error);
    }
  }

  async function handlePermanentDelete(noteId) {
    if (window.confirm('Are you sure you want to permanently delete this note? This action cannot be undone.')) {
      try {
        await permanentlyDeleteNote(noteId);
        fetchTrashedNotes(); // Refresh the trash list
      } catch (error) {
        console.error('Error permanently deleting note:', error);
      }
    }
  }

  function formatDeletedDate(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Deleted yesterday';
    } else if (diffDays < 7) {
      return `Deleted ${diffDays} days ago`;
    } else {
      return `Deleted on ${date.toLocaleDateString()}`;
    }
  }

  if (loading) {
    return (
      <div className="trash-container">
        <div className="trash-header">
          <h2>Trash</h2>
        </div>
        <div className="loading">Loading trashed notes...</div>
      </div>
    );
  }

  return (
    <div className="trash-container">
      <div className="trash-header">
        <h2>Trash</h2>
        <p className="trash-subtitle">
          {trashedNotes.length === 0 
            ? "No notes in trash" 
            : `${trashedNotes.length} note${trashedNotes.length === 1 ? '' : 's'} in trash`
          }
        </p>
      </div>

      {trashedNotes.length === 0 ? (
        <div className="empty-trash">
          <div className="empty-trash-icon">🗑️</div>
          <h3>Trash is empty</h3>
          <p>Notes you delete will appear here</p>
        </div>
      ) : (
        <div className="trashed-notes-container">
          {trashedNotes.map((note) => (
            <div key={note.id} className="trashed-note">
              <div className="trashed-note-content">
                <h3>{note.title || "Untitled"}</h3>
                <p>{note.content}</p>
                <div className="trashed-note-date">
                  {formatDeletedDate(note.deletedAt)}
                </div>
              </div>
              <div className="trashed-note-actions">
                <button
                  onClick={() => handleRestore(note.id)}
                  className="restore-btn"
                  title="Restore note"
                >
                  <RestoreIcon />
                </button>
                <button
                  onClick={() => handlePermanentDelete(note.id)}
                  className="delete-forever-btn"
                  title="Delete permanently"
                >
                  <DeleteForeverIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Trash;

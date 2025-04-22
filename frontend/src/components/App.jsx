import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() { 
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  async function addNote(newNote) {
    try {
      const response = await fetch(`${API_URL}/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });
      if (response.ok) {
        setNotes(prevNotes => [newNote, ...prevNotes]);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(`${API_URL}/api/notes`);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

  async function editNote(id, updatedNote) {
    try {
      const response = await fetch(`${API_URL}/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });
      if (response.ok) {
        setNotes(prevNotes => {
          const newNotes = [...prevNotes];
          newNotes[id] = updatedNote;
          return newNotes;
        });
        setEditingNote(null);
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }

  function startEditing(id) {
    setEditingNote({
      id,
      title: notes[id].title,
      content: notes[id].content
    });
  }

  function cancelEditing() {
    setEditingNote(null);
  }

  async function deleteNote(id) {
    try {
      const response = await fetch(`${API_URL}/api/notes/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setNotes(prevNotes => prevNotes.filter((_, index) => index !== id));
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  return (
    <div>
      <Header />
      {editingNote ? (
        <CreateArea 
          onAdd={(updatedNote) => editNote(editingNote.id, updatedNote)}
          isEditing={true}
          editNote={editingNote}
          onCancel={cancelEditing}
        />
      ) : (
        <CreateArea onAdd={addNote} />
      )}
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={startEditing}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;

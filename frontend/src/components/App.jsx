import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() { 
  const [notes, setNotes] = useState([]);

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
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;

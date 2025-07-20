import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import ExpandedNote from "./ExpandedNote";
import Auth from "./Auth";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { getNotes, createNote, updateNote, deleteNote as apiDeleteNote } from "../api";

function MainApp() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [expandedNote, setExpandedNote] = useState(null);
  const { currentUser, logout } = useAuth();

  async function handleNoteAction(note) {
    if (editingNote) {
      await editNote(editingNote.id, note);
    } else {
      await addNote(note);
    }
  }

  async function addNote(newNote) {
    try {
      await createNote(newNote);
      fetchData();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

  async function editNote(id, updatedNote) {
    try {
      await updateNote(id, updatedNote);
      setNotes(prevNotes => prevNotes.map((note, index) => index === id ? updatedNote : note));
      setEditingNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }

  function startEditing(id) {
    const noteToEdit = notes.find((_, index) => index === id);
    setEditingNote({ ...noteToEdit, id });
    setExpandedNote(null); // Close expanded view when editing
  }

  async function deleteNote(id) {
    try {
      await apiDeleteNote(id);
      setNotes(prevNotes => prevNotes.filter((_, index) => index !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  function handleNoteClick(id) {
    if (!editingNote || editingNote.id !== id) {
      const noteToExpand = notes.find((_, index) => index === id);
      setExpandedNote(noteToExpand);
    }
  }

  function closeExpandedNote() {
    setExpandedNote(null);
  }

  return (
    <div>
      <Header user={currentUser} onLogout={logout} />
      <CreateArea onAdd={handleNoteAction} isEditing={!!editingNote} editNote={editingNote} />
      <ExpandedNote note={expandedNote} onClose={closeExpandedNote} />
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          onEdit={startEditing}
          onNoteClick={handleNoteClick}
        />
      ))}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Auth onAuthSuccess={() => {}} />;
  }
  
  return <MainApp />;
}

export default App;

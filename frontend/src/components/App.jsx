import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import ExpandedNote from "./ExpandedNote";
import Auth from "./Auth";
import Trash from "./Trash";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { getUserNotes, addNote, updateNote, moveNoteToTrash } from "../firestoreApi";

function MainApp() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [expandedNote, setExpandedNote] = useState(null);
  const [currentView, setCurrentView] = useState('notes'); // 'notes' or 'trash'
  const { currentUser, logout } = useAuth();

  async function handleNoteAction(note) {
    if (editingNote) {
      await editNote(editingNote.id, note);
    } else {
      await addNoteToFirestore(note);
    }
  }

  async function addNoteToFirestore(newNote) {
    try {
      await addNote(currentUser.uid, newNote);
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
      if (currentUser) {
        const data = await getUserNotes(currentUser.uid);
        setNotes(data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

  async function editNote(noteId, updatedNote) {
    try {
      await updateNote(noteId, updatedNote);
      fetchData(); // Refresh notes from Firestore
      setEditingNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }

  function startEditing(index) {
    const noteToEdit = notes[index];
    setEditingNote({ ...noteToEdit, id: noteToEdit.id });
    setExpandedNote(null); // Close expanded view when editing
  }

  async function deleteNoteFromFirestore(index) {
    try {
      const noteToDelete = notes[index];
      await moveNoteToTrash(noteToDelete.id);
      fetchData(); // Refresh notes from Firestore
    } catch (error) {
      console.error('Error moving note to trash:', error);
    }
  }

  function handleNoteClick(index) {
    if (!editingNote || editingNote.id !== notes[index].id) {
      const noteToExpand = notes[index];
      setExpandedNote(noteToExpand);
    }
  }

  function closeExpandedNote() {
    setExpandedNote(null);
  }

  return (
    <div>
      <Header 
        user={currentUser} 
        onLogout={logout} 
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      {currentView === 'notes' ? (
        <>
          <CreateArea onAdd={handleNoteAction} isEditing={!!editingNote} editNote={editingNote} />
          <ExpandedNote note={expandedNote} onClose={closeExpandedNote} />
          <div className="notes-container">
            {notes.map((noteItem, index) => (
              <Note
                key={noteItem.id || index}
                id={index}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNoteFromFirestore}
                onEdit={startEditing}
                onNoteClick={handleNoteClick}
              />
            ))}
          </div>
        </>
      ) : (
        <Trash />
      )}
      
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

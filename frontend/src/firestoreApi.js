import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Collection name for notes
const NOTES_COLLECTION = 'notes';

/**
 * Add a new note for a specific user
 * @param {string} userId - The authenticated user's ID
 * @param {Object} noteData - The note data {title, content}
 * @returns {Promise<string>} - The ID of the created note
 */
export const addNote = async (userId, noteData) => {
  try {
    const docRef = await addDoc(collection(db, NOTES_COLLECTION), {
      ...noteData,
      userId: userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding note:', error);
    throw error;
  }
};

/**
 * Get all notes for a specific user
 * @param {string} userId - The authenticated user's ID
 * @returns {Promise<Array>} - Array of user's notes
 */
export const getUserNotes = async (userId) => {
  try {
    // Get all notes for the user (no isDeleted filter to avoid index requirement)
    const q = query(
      collection(db, NOTES_COLLECTION),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const notes = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Filter out deleted notes on the client side
      if (!data.isDeleted) {
        notes.push({
          id: doc.id,
          ...data,
          // Convert Firestore timestamp to JavaScript Date for sorting
          createdAt: data.createdAt?.toDate() || new Date()
        });
      }
    });
    
    // Sort notes by creation date (newest first) on the client side
    notes.sort((a, b) => b.createdAt - a.createdAt);
    
    return notes;
  } catch (error) {
    console.error('Error getting user notes:', error);
    throw error;
  }
};

/**
 * Update a specific note
 * @param {string} noteId - The note's document ID
 * @param {Object} updateData - The data to update {title, content}
 * @returns {Promise<void>}
 */
export const updateNote = async (noteId, updateData) => {
  try {
    const noteRef = doc(db, NOTES_COLLECTION, noteId);
    await updateDoc(noteRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

/**
 * Move a note to trash (soft delete)
 * @param {string} noteId - The note's document ID
 * @returns {Promise<void>}
 */
export const moveNoteToTrash = async (noteId) => {
  try {
    const noteRef = doc(db, NOTES_COLLECTION, noteId);
    await updateDoc(noteRef, {
      isDeleted: true,
      deletedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error moving note to trash:', error);
    throw error;
  }
};

/**
 * Restore a note from trash
 * @param {string} noteId - The note's document ID
 * @returns {Promise<void>}
 */
export const restoreNoteFromTrash = async (noteId) => {
  try {
    const noteRef = doc(db, NOTES_COLLECTION, noteId);
    await updateDoc(noteRef, {
      isDeleted: false,
      deletedAt: null,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error restoring note from trash:', error);
    throw error;
  }
};

/**
 * Permanently delete a note
 * @param {string} noteId - The note's document ID
 * @returns {Promise<void>}
 */
export const permanentlyDeleteNote = async (noteId) => {
  try {
    await deleteDoc(doc(db, NOTES_COLLECTION, noteId));
  } catch (error) {
    console.error('Error permanently deleting note:', error);
    throw error;
  }
};

/**
 * Get all trashed notes for a specific user
 * @param {string} userId - The authenticated user's ID
 * @returns {Promise<Array>} - Array of user's trashed notes
 */
export const getTrashedNotes = async (userId) => {
  try {
    // Get all notes for the user and filter deleted ones on client side
    const q = query(
      collection(db, NOTES_COLLECTION),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const notes = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Only include deleted notes
      if (data.isDeleted) {
        notes.push({
          id: doc.id,
          ...data,
          deletedAt: data.deletedAt?.toDate() || new Date()
        });
      }
    });
    
    // Sort notes by deletion date (newest first)
    notes.sort((a, b) => b.deletedAt - a.deletedAt);
    
    return notes;
  } catch (error) {
    console.error('Error getting trashed notes:', error);
    throw error;
  }
};

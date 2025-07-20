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
    // Simplified query without orderBy to avoid index requirement
    const q = query(
      collection(db, NOTES_COLLECTION),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const notes = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      notes.push({
        id: doc.id,
        ...data,
        // Convert Firestore timestamp to JavaScript Date for sorting
        createdAt: data.createdAt?.toDate() || new Date()
      });
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
 * Delete a specific note
 * @param {string} noteId - The note's document ID
 * @returns {Promise<void>}
 */
export const deleteNote = async (noteId) => {
  try {
    await deleteDoc(doc(db, NOTES_COLLECTION, noteId));
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all origins in development
// In production, we'll specify the frontend URL
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://dkeeper-app.netlify.app', 'https://keeper-clone.netlify.app'] 
    : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// In-memory storage (replace with a database in production)
let notes = [];

// Create a new note
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  notes.unshift({ title, content }); // Add to beginning of array
  res.status(201).json({ message: 'Note created successfully' });
});

// Get all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Update a note
app.put('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  
  if (id >= 0 && id < notes.length) {
    notes[id] = { title, content };
    res.json({ message: 'Note updated successfully' });
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < notes.length) {
    notes = notes.filter((_, index) => index !== id);
    res.json({ message: 'Note deleted successfully' });
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

// Health check endpoint for Render
app.get('/', (req, res) => {
  res.send('DKeeper API is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

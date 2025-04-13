# DKeeper

A note-taking application built with React and Node.js.

## Features

- Create and save notes
- View all your notes in one place
- Delete notes you no longer need
- Modern and clean user interface

## Project Structure

```
dkeeper/
├── backend/         # Express.js backend
└── frontend/        # React frontend
```

## Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start both backend and frontend:
```bash
npm start
```

This will start:
- Backend at http://localhost:3001
- Frontend at http://localhost:8080

## Development

To run services individually:

```bash
# Start backend only
npm run start:backend

# Start frontend only
npm run start:frontend
```

## Building for Production

```bash
npm run build
```

This will create a production build of the frontend in the `frontend/dist` directory.

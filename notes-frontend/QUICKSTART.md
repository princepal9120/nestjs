# Quick Start Guide

## Step 1: Install Dependencies
```bash
cd notes-frontend
npm install
```

## Step 2: Start Backend
Make sure your NestJS backend is running:
```bash
cd ../notes-api
npm run start:dev
```

The backend should be running on http://localhost:3000

## Step 3: Start Frontend
```bash
cd ../notes-frontend
npm run dev
```

The frontend will start on http://localhost:3001 (or next available port)

## Step 4: Login
1. Open http://localhost:3001 in your browser
2. Enter your email and password
3. Start managing your notes!

## Default Port Configuration

- Backend API: http://localhost:3000
- Frontend App: http://localhost:3001

If your backend runs on a different port, update `config/api.ts`

## Features to Test

✅ Login with existing credentials
✅ View all your notes
✅ Create a new note
✅ Edit an existing note
✅ Delete a note
✅ Logout

## Need Help?

Check the full README.md for detailed documentation and troubleshooting.

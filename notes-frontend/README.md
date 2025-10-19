# Notes Frontend Application

A modern, full-featured frontend for the Notes API built with Next.js 14, TypeScript, and Zustand.

## Features

- 🔐 JWT-based authentication (login/logout)
- 📝 Full CRUD operations for notes
- 🎨 Modern, responsive UI with gradient design
- ⚡ Fast state management with Zustand
- 💾 Persistent authentication (localStorage)
- ✨ Loading and error states
- 📱 Mobile-friendly responsive design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Styling**: CSS (Custom responsive design)

## Project Structure

```
notes-frontend/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page (auth routing)
│   └── globals.css         # Global styles
├── components/
│   ├── LoginForm.tsx       # Login form component
│   ├── NotesList.tsx       # Notes list with CRUD operations
│   ├── NoteItem.tsx        # Individual note card
│   └── NoteForm.tsx        # Create/Edit note form
├── store/
│   └── useStore.ts         # Zustand stores (auth & notes)
├── types/
│   └── index.ts            # TypeScript interfaces
├── config/
│   └── api.ts              # API configuration
└── package.json
```

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Your NestJS backend running (default: http://localhost:3000)

### Installation

1. **Install dependencies:**

   ```bash
   cd notes-frontend
   npm install
   ```

2. **Configure API endpoint (if needed):**

   Open `config/api.ts` and update the base URL if your backend runs on a different port:

   ```typescript
   export const API_BASE_URL = "http://localhost:3000";
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open in browser:**

   Navigate to http://localhost:3000 (or the port shown in terminal)

## Usage

### Login

- Use your registered email and password
- JWT token is stored securely in localStorage
- Token persists across page refreshes

### Managing Notes

- **View**: All your notes are displayed in a card grid
- **Create**: Click "New Note" button, fill the form, submit
- **Edit**: Click "Edit" on any note, modify and save
- **Delete**: Click "Delete" on any note (with confirmation)

### Logout

- Click the "Logout" button in the header
- This clears your session and notes data

## API Endpoints Used

The application communicates with these backend endpoints:

- `POST /auth/login` - User authentication
- `GET /api/notes` - Fetch all notes
- `POST /api/notes` - Create new note
- `PATCH /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## State Management

### Auth Store

- Manages authentication state
- Stores JWT token
- Persists to localStorage
- Provides login/logout actions

### Notes Store

- Manages notes array
- Handles loading/error states
- Provides CRUD operations
- Automatically includes JWT in requests

## Key Components

### LoginForm

- Email/password input
- Form validation
- Error handling
- Loading state

### NotesList

- Notes grid display
- Create/Edit toggle
- Delete confirmation
- Error notifications

### NoteForm

- Reusable for create/edit
- Form validation
- Loading states
- Cancel functionality

### NoteItem

- Card-based display
- Edit/Delete actions
- Timestamp display
- Hover effects

## Customization

### Styling

All styles are in `app/globals.css`. The app uses:

- Purple gradient theme
- Responsive grid layout
- Card-based design
- Smooth transitions

### API Configuration

Update `config/api.ts` to change:

- Base URL
- Endpoint paths
- Request configuration

## Development

### Build for production:

```bash
npm run build
```

### Start production server:

```bash
npm start
```

### Linting:

```bash
npm run lint
```

## Troubleshooting

### CORS Issues

If you get CORS errors, ensure your NestJS backend has CORS enabled:

```typescript
// In main.ts
app.enableCors();
```

### Authentication Errors

- Check that your backend is running
- Verify the API_BASE_URL in config/api.ts
- Ensure you're using the correct email/password

### Notes Not Loading

- Check browser console for errors
- Verify JWT token is being sent in headers
- Check backend logs for authentication issues

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is part of the NestJS Notes API course.

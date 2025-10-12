import React, { useEffect, useState } from 'react';
import { useAuthStore, useNotesStore } from '../store/useStore';
import { Note } from '../types';
import NoteItem from './NoteItem';
import NoteForm from './NoteForm';

const NotesList: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null);

    // Get auth state
    const { token, logout } = useAuthStore();

    // Get notes state and actions
    const { notes, loading, error, fetchNotes, createNote, updateNote, deleteNote, clearError } = useNotesStore();

    // Fetch notes on component mount
    useEffect(() => {
        if (token) {
            fetchNotes(token);
        }
    }, [token, fetchNotes]);

    const handleCreateNote = async (data: { title: string; body: string }) => {
        if (!token) return;

        try {
            await createNote(token, data);
            setShowForm(false);
        } catch (error) {
            console.error('Failed to create note:', error);
        }
    };

    const handleUpdateNote = async (data: { title: string; body: string }) => {
        if (!token || !editingNote) return;

        try {
            await updateNote(token, editingNote.id, data);
            setEditingNote(null);
            setShowForm(false);
        } catch (error) {
            console.error('Failed to update note:', error);
        }
    };

    const handleDeleteNote = async (id: number) => {
        if (!token) return;

        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await deleteNote(token, id);
            } catch (error) {
                console.error('Failed to delete note:', error);
            }
        }
    };

    const handleEditClick = (note: Note) => {
        setEditingNote(note);
        setShowForm(true);
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingNote(null);
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
        }
    };

    return (
        <div className="notes-container">
            {/* Header */}
            <div className="notes-header">
                <h1>My Notes</h1>
                <div className="header-actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowForm(!showForm)}
                        disabled={showForm}
                    >
                        {showForm ? 'Close Form' : 'New Note'}
                    </button>
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="error-banner">
                    <span>{error}</span>
                    <button onClick={clearError} className="btn-close">×</button>
                </div>
            )}

            {/* Note Form (Create/Edit) */}
            {showForm && (
                <NoteForm
                    note={editingNote}
                    onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
                    onCancel={handleCancelForm}
                />
            )}

            {/* Loading State */}
            {loading && <div className="loading">Loading notes...</div>}

            {/* Notes List */}
            {!loading && notes.length === 0 && (
                <div className="empty-state">
                    <p>No notes yet. Create your first note!</p>
                </div>
            )}

            {!loading && notes.length > 0 && (
                <div className="notes-grid">
                    {notes.map((note) => (
                        <NoteItem
                            key={note.id}
                            note={note}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteNote}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotesList;

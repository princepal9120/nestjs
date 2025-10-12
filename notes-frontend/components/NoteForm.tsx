import React, { useState, useEffect } from 'react';
import { Note, CreateNoteData } from '../types';

interface NoteFormProps {
    note?: Note | null;
    onSubmit: (data: CreateNoteData) => Promise<void>;
    onCancel: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ note, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<CreateNoteData>({
        title: '',
        body: '',
    });
    const [loading, setLoading] = useState(false);

    // Update form when editing a note
    useEffect(() => {
        if (note) {
            setFormData({
                title: note.title,
                body: note.body,
            });
        }
    }, [note]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onSubmit(formData);
            // Reset form after successful submission
            setFormData({ title: '', body: '' });
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="note-form-container">
            <h3>{note ? 'Edit Note' : 'Create New Note'}</h3>
            <form onSubmit={handleSubmit} className="note-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Enter note title"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="body">Content</label>
                    <textarea
                        id="body"
                        value={formData.body}
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                        required
                        placeholder="Enter note content"
                        rows={6}
                        disabled={loading}
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : note ? 'Update Note' : 'Create Note'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NoteForm;

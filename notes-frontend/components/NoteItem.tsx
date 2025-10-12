import React from 'react';
import { Note } from '../types';

interface NoteItemProps {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (id: number) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete }) => {
    return (
        <div className="note-item">
            <div className="note-header">
                <h3>{note.title}</h3>
                <div className="note-actions">
                    <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => onEdit(note)}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(note.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <p className="note-body">{note.body}</p>
            {note.createdAt && (
                <small className="note-date">
                    Created: {new Date(note.createdAt).toLocaleString()}
                </small>
            )}
        </div>
    );
};

export default NoteItem;

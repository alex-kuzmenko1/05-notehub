import React from "react";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  loading?: boolean;
  onDelete?: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, loading, onDelete }) => {
  if (loading) {
    return <div className={css.loading}>Loading notes...</div>;
  }

  if (!notes.length) {
    return <div className={css.empty}>No notes found</div>;
  }

  return (
    <div className={css.grid}>
      {notes.map((note) => (
        <div key={note.id} className={css.card}>
          <div className={css.header}>
            <h3>{note.title}</h3>
            {note.category && (
              <span className={`${css.tag} ${css[note.category.toLowerCase()]}`}>
                {note.category}
              </span>
            )}
          </div>
          <p className={css.content}>{note.content}</p>
          {onDelete && (
            <button
              className={css.delete}
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NoteList;

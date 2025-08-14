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
    return <div>Loading notes...</div>;
  }

  if (!notes.length) {
    return <div>No notes found</div>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            {note.category && <span className={css.tag}>{note.category}</span>}
            {onDelete && (
              <button
                className={css.button}
                onClick={() => onDelete(note.id)}
              >
                Delete
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;

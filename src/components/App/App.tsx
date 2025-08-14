import React, { useState } from "react";
import { useQuery, keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes, deleteNote } from "../../services/noteService";
import type { Note } from "../../types/note";
import {NoteList} from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import css from "./App.module.css";

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const App: React.FC = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const perPage = 12;

  const {
    data: notesData = { notes: [], totalPages: 0 },
    isLoading,
    isError,
    isFetching,
  } = useQuery<NotesResponse>({
    queryKey: ["notes", currentPage, debouncedSearchQuery],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage,
        search: debouncedSearchQuery,
      }),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    } catch (err) {
      console.error("Error deleting note", err);
    }
  };

  const { notes, totalPages } = notesData;
  const shouldShowPagination = totalPages > 1;

  if (isLoading && !notesData.notes.length) {
    return <div className={css.loading}>Loading...</div>;
  }

  if (isError) {
    return (
      <div className={css.error}>Error loading notes. Please try again.</div>
    );
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />

        {shouldShowPagination && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage - 1}
            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
            disabled={isFetching}
          />
        )}

        <button className={css.button} onClick={handleOpenModal}>
          Create note +
        </button>
      </header>

      <NoteList
        notes={notes}
        loading={isFetching}
        onDelete={handleDeleteNote} 
      />

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onCancel={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default App;

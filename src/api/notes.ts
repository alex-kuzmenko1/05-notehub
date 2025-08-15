import axios from "axios";
import type { Note } from "../types/note";

const API_URL = "https://68516cdd8612b47a2c0a078f.mockapi.io/notes";

export const getNotes = async (): Promise<Note[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

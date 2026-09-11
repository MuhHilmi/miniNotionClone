import api from "./axios";

export const getNotes = () => api.get("/notes").then((res) => res.data);

export const getNote = (id) => api.get(`/notes/${id}`).then((res) => res.data);

export const createNote = (data) => api.post("/notes", data).then((res) => res.data);

export const updateNote = (id, data) => api.put(`/notes/${id}`, data).then((res) => res.data);

export const deleteNote = (id) => api.delete(`/notes/${id}`).then((res) => res.data);

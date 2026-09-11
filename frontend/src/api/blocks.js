import api from "./axios";

export const createBlock = (data) => api.post("/blocks", data).then((res) => res.data);

export const updateBlock = (id, data) => api.put(`/blocks/${id}`, data).then((res) => res.data);

export const deleteBlock = (id) => api.delete(`/blocks/${id}`).then((res) => res.data);

export const reorderBlocks = (noteId, blocks) =>
    api
        .post("/blocks/reorder", { noteId, blocks })
        .then((res) => res.data);

import axios from "axios";

export const taskManagerApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  },
});

export const getTasks = async () => {
  const res = await taskManagerApi.get("/api/")
  return res.data
}

export const getTaskById = async (id: string) => {
  const res = await taskManagerApi.get(`/api/tasks/${id}`)
  return res.data.task
}

export const createTask = async (data: {
  title: string;
  description?: string;
  completed?: boolean;
  tag?: string;
}) => {
  const res = await taskManagerApi.post("/api/tasks", data);
  return res.data;
};

export const updateTask = async (id: string,
  data: {
  title: string;
  description?: string;
  completed?: boolean;
  tag?: string;
}) => {
  const res = await taskManagerApi.put(`/api/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await taskManagerApi.delete(`/api/tasks/${id}`);
  return res.data;
};
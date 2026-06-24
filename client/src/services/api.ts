import axios from "axios";

export const taskManagerApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  },
});

// attach token automatically
taskManagerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("taskduty_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// save to local storage
export const saveToken = (token:string)=> localStorage.setItem("taskduty_token", token)

// get token from local storage
export const getToken = () => localStorage.getItem("taskduty_token")

// remove token
export const removeToken = () => localStorage.removeItem("taskduty_token")

// =============================================================
// TASKS
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

export const softDeleteTask = async (id: string) => {
  const res = await taskManagerApi.patch(`/api/tasks/${id}`);
  return res.data;
};

export const getTrashedTasks = async () => {
  const res = await taskManagerApi.get(`/api/tasks/trash/`);
  return res.data;
};

export const restoreTask = async (id: string) => {
  const res = await taskManagerApi.patch(`/api/tasks/${id}/restore`);
  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await taskManagerApi.delete(`/api/tasks/${id}`);
  return res.data;
};


// AUTH

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await taskManagerApi.post(`api/auth/register`, data);
  return res.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await taskManagerApi.post(`api/auth/login`, data);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await taskManagerApi.get(`/api/auth/me`);
  return res.data;
};

export const verifyEmail = async (token: string) => {
    const res = await taskManagerApi.get(
        `/api/auth/verify-email/${token}`
    );

    return res.data;
};

export const forgotPassword = async (email: string) => {
  const res = await taskManagerApi.post(
    "/api/auth/forgot-password", { email }
  )
  return res.data
}

export const resetPassword = async (
  token:string,
  data: { password: string; confirmPassword: string }
) => {
  const res = await taskManagerApi.post(
    `/api/auth/reset-password/${token}`,
    data
  )
  return res.data
}


import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com/";

export const API = axios.create({
  baseURL: baseUrl,
});

export const getAllPosts = async () => {
  try {
    const res = await API.get("posts");
    return res;
  } catch (error) {
    return error;
  }
};

export const getPost = async ({ id }: any) => {
  try {
    const res = await API.get(`posts/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const createPost = async ({ title, body }: any) => {
  try {
    const res = await API.post(`posts`, {
      body: {
        title,
        body,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const updatePost = async ({ title, body, id }: any) => {
  try {
    const res = await API.put(`posts/${id}`, {
      body: {
        id,
        title,
        body,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const deletePost = async ({ id }: any) => {
  try {
    const res = await API.delete(`posts/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

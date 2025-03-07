import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

axios.defaults.withCredentials = true;

const localStorageToken = localStorage.getItem("token");

export const createPost = async (
  postData: { title: string; content: string },
) => {
  const response = await axios.post(`${BASE_URL}/posts/`, postData, {
    headers: { Authorization: `Bearer ${ localStorageToken}` },
  });

  console.log(">>>> createPost : ", response);
  return response.data;
};

export const getPost = async (postId: number) => {
  const response = await axios.get(`${BASE_URL}/posts/${postId}`);

  console.log(">>>> getPost : ", response);
  return response.data;
};

export const getAllPosts = async (limit = 10, page = 1) => {
  const response = await axios.get(`${BASE_URL}/posts/`, {
    params: { limit, page },
  });

  console.log(">>>> getAllPosts : ", response);
  return response.data;
};

export const updatePost = async (
  postId: number,
  postData: { title: string; content: string },
) => {
  const response = await axios.put(`${BASE_URL}/posts/${postId}`, postData, {
    headers: { Authorization: `Bearer ${localStorageToken}` },
  });

  console.log(">>>> updatePost : ", response);
  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await axios.delete(`${BASE_URL}/posts/${postId}`, {
    headers: { Authorization: `Bearer ${localStorageToken}` },
  });

  console.log(">>>> deletePost : ", response);
  return response.data;
};

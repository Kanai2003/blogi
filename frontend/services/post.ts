
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

axios.defaults.withCredentials = true;


export const createPost = async (
  postData: { title: string; content: string },
  token: string,
) => {
  const response = await axios.post(`${BASE_URL}/posts/`, postData, {
    headers: { Authorization: `Bearer ${token}`, token: token },
  });

  console.log(">>>> createPost : ", response);
  return response.data;
};

export const getPost = async (postId: number, owner_id: number) => {
  const response = await axios.get(`${BASE_URL}/posts/${postId}/${owner_id}`);

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

export const getUserPosts = async (owner_id: number) => {
  const response = await axios.get(`${BASE_URL}/posts/`, {
    params: {owner_id}
  });

  console.log(">>>> getMyPosts : ", response);
  return response.data;
};

export const updatePost = async (
  postId: number,
  postData: { title: string; content: string },
  token: string ,
) => {
  const response = await axios.put(`${BASE_URL}/posts/${postId}`, postData, {
    headers: { Authorization: `Bearer ${token}`, token: token},
  });

  console.log(">>>> updatePost : ", response);
  return response.data;
};

export const deletePost = async (postId: number, token:string ) => {
  const response = await axios.delete(`${BASE_URL}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`, 
      token: token
    },
  });

  console.log(">>>> deletePost : ", response);
  return response.data;
};

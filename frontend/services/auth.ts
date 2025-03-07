"use client"

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

axios.defaults.withCredentials = true;

export const loginUser = async (formData: {
  username: string;
  password: string;
}) => {
  const response = await axios.post(
    `${BASE_URL}/auth/token`,
    new URLSearchParams(formData),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      withCredentials: true,
    }
  );
  console.log(">>>>loginUser : ", response)
  return response.data;
};

export const registerUser = async (formData: {
  name: string;
  username: string;
  password: string;
}) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, formData, {
    withCredentials: true,
  });

  console.log(">>>>registerUser : ", response)
  return response.data;
};

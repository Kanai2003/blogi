/* eslint-disable @typescript-eslint/no-explicit-any */

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (user:any) => ({
  type: LOGIN,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
  payload: null,
});
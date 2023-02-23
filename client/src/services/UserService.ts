import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUser } from "../models/IUser";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/api" }),
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "https://jsonplaceholder.typicode.com",
  // }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    fetchAllUsers: build.query({
      query: () => ({
        url: `/users`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
      }),
      providesTags: (result) => ["User"],
    }),
    createUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/users`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/users/${user._id}`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/users/${user._id}`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

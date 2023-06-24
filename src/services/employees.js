import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/employees" }),
  tagTypes: ["Employee"],
  endpoints: (build) => ({
    getEmployeesByCafe: build.query({
      query: (cafe) => {
        return `?cafe=${cafe}`;
      },
      providesTags: ["Employee"]
    }),
    deleteEmployee: build.mutation({
      async query(id) {
        return await fetch(`/api/employee`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "DELETE",
          body: JSON.stringify({ _id: id })
        });
      },
      invalidatesTags: ["Cafe", "Employee"]
    })
  })
});

export const { useGetEmployeesByCafeQuery, useDeleteEmployeeMutation } =
  employeesApi;

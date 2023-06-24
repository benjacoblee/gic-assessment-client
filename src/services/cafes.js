import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cafesApi = createApi({
  reducerPath: "cafesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/cafes" }),
  tagTypes: ["Cafe"],
  endpoints: (build) => ({
    getCafesByLocation: build.query({
      query: (location) => {
        if (location === "All") {
          return `?location=`;
        }
        return `?location=${location}`;
      },
      providesTags: ["Cafe"]
    }),
    deleteCafe: build.mutation({
      async queryFn(id) {
        return await fetch(`/api/cafe`, {
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

export const { useGetCafesByLocationQuery, useDeleteCafeMutation } = cafesApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ALL } from "../constants";

export const cafesApi = createApi({
  reducerPath: "cafesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/cafes" }),
  tagTypes: ["Cafe"],
  endpoints: (build) => ({
    getCafesByLocation: build.query({
      query: (location) => {
        if (location === ALL) {
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
    }),
    createOrEditCafe: build.mutation({
      async queryFn(data) {
        const { data: cafeData, method } = data;

        const formData = new FormData();

        for (const [key, value] of Object.entries(cafeData)) {
          if (value) {
            formData.append(key, value);
          }
        }

        return await fetch(`/api/cafe`, {
          headers: {
            Accept: "application/json"
          },
          method,
          body: formData
        });
      },
      invalidatesTags: ["Cafe", "Employee"]
    })
  })
});

export const {
  useGetCafesByLocationQuery,
  useDeleteCafeMutation,
  useCreateOrEditCafeMutation
} = cafesApi;

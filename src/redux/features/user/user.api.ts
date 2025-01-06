/* eslint-disable @typescript-eslint/no-explicit-any */
import { TAdmin, TFaculty, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const user = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        //-----------------Get Me-----------------
        getMe: builder.query({
            query: () => {
                return {
                    url: "users/me/",
                    method: "GET"
                };
            },
            providesTags: ["user"],
            transformResponse: (response: TResponseRedux<TAdmin | TStudent | TFaculty>) => {
                return {
                    data: response.data,
                };
            },
        }),
    }),
});

export const { useGetMeQuery } = user;

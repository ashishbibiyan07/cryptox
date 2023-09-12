import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApiHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": "c7f6e350e8msh5af16b8b4f7e781p1b3b37jsn4bf30dfe6866",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const newsFetchApi = (url) => ({ url, headers: newsApiHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        newsFetchApi(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

// const options = {
//   method: "GET",
//   url: "https://bing-news-search1.p.rapidapi.com/news",
//   params: {
//     safeSearch: "Off",
//     textFormat: "Raw",
//   },
//   headers: {
//     "X-BingApis-SDK": "true",
//     "X-RapidAPI-Key": "c7f6e350e8msh5af16b8b4f7e781p1b3b37jsn4bf30dfe6866",
//     "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
//   },
// };

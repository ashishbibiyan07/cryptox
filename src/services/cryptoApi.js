import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": "c7f6e350e8msh5af16b8b4f7e781p1b3b37jsn4bf30dfe6866",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest(`/coin/Qwsogvtv82FCd/exchanges`),
    }),
    getCryptosDetail: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ uuid, timePeriod }) =>
        createRequest(`coin/${uuid}/history?timeperiod=${timePeriod}`),
      // createRequest(`coin/Qwsogvtv82FCd/history?timePeriod=24h`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptosDetailQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;

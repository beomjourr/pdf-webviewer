import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { initVariables } from '../utils/Global';

const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) => async ({
  url, headers, method, data, params, credentials = true,
}) => {
  try {
    const result = await axios({
      url: baseUrl + url, headers, method, data, params, withCredentials: credentials,
    });
    return { data: result?.data };
  } catch (axiosError) {
    const err = axiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

const getFormHeader = () => ({
  'content-type': 'application/x-www-form-urlencoded',
  token: initVariables.token,
});
// const getJsonHeader = () => ({
//   'content-type': 'application/json; charset=utf-8',
// });

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: '',
  }),
  reducerPath: 'HL_API',
  keepUnusedDataFor: 1,
  tagTypes: ['GetTodayList', 'GetExamReport', 'GetRecommendStudyList', 'GetAchieveAllPoint', 'GetAdminExamReport'],
  endpoints: (build) => ({
  }),
});

export const {
} = api;

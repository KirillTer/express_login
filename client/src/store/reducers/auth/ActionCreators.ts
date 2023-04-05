import axios from 'axios';
// import { AppDispatch } from '../store';
// import { IUser } from '../../../models/IUser';
import { IAuthResponse } from '../../../models/IAuth';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const API_URL = 'http://localhost:5001/api'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})

// $api.interceptors.response.use((config) => {
//     return config;
// },async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 403 && error.config && !error.config._isRetry) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
//             localStorage.setItem('token', response.data.accessToken);
//             return $api.request(originalRequest);
//         } catch (e) {
//             console.log('User not authorized')
//         }
//     }
//     throw error;
// })

export default $api;

// common redux action creator
// export const authUser = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(userSlice.actions.usersFetching());
//     const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
//     dispatch(userSlice.actions.usersFetchingSucccess(response.data));
//   } catch(e: any) {
//     dispatch(userSlice.actions.usersFetchingError(e.message));
//   }
// }

// redux toolkit action creator
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (reqParams: any = {email: '', userName: '', password: ''}, thunkAPI) => {
    console.log('registerUser')
    try {
      const response = await $api.post<IAuthResponse>(
        '/registration', {
          email: reqParams.email,
          userName: reqParams.userName,
          password: reqParams.password
        }
      );
      localStorage.setItem('token', response.data.accessToken)
      return response;
    } catch (e: any) {
      localStorage.removeItem('token')
      return thunkAPI.rejectWithValue(e.response.data.message)
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (reqParams: any = {email: '', password: ''}, thunkAPI) => {
    console.log('loginUser')
    try {
      const response = await $api.post<IAuthResponse>(
        '/login', {
          email: reqParams.email,
          password: reqParams.password
        }
      );
      localStorage.setItem('token', response.data.accessToken)
      return response;
    } catch (e: any) {
      localStorage.removeItem('token')
      return thunkAPI.rejectWithValue(e.response.data.message)
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, thunkAPI) => {
    try {
      const response = await $api.post<IAuthResponse>(
        '/logout'
      );
      localStorage.removeItem('token')
      return response;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message)
    }
  }
);

export const refreshUser = createAsyncThunk(
  'user/refreshUser',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IAuthResponse>(
        API_URL + '/refresh',
        {withCredentials: true}
      );
      localStorage.setItem('token', response.data.accessToken)
      return response.data.user;
    } catch (e: any) {
      localStorage.removeItem('token')
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
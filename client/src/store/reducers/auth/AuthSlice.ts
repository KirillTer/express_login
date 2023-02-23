import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../models/IUser';
import { registerUser, loginUser, logoutUser, refreshUser } from './ActionCreators';

interface UserState {
  user: IUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: '',
}

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending.type]: (state) => {
      state.isLoading = true
      state.error = ""
    },
    [registerUser.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.error = ""
      state.user = action.payload.data.user
      state.isAuth = true
    },
    [registerUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      state.user = null
      state.isAuth = false
    },
    [loginUser.pending.type]: (state) => {
      state.isLoading = true
      state.error = ""
      state.user = null
    },
    [loginUser.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.error = ""
      state.user = action.payload.data.user
      state.isAuth = true
    },
    [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      state.user = null
      state.isAuth = false
    },
    [logoutUser.pending.type]: (state) => {
      state.isLoading = true
      state.error = ""
      state.user = null
    },
    [logoutUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false
      state.error = ""
      state.user = action.payload
      state.isAuth = false
    },
    [logoutUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      state.user = null
      state.isAuth = false
    },
    [refreshUser.pending.type]: (state) => {
      state.isLoading = true
      state.error = ""
      state.user = null
      state.isAuth = true
    },
    [refreshUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false
      state.error = ""
      state.user = action.payload
      state.isAuth = true
    },
    [refreshUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      state.user = null
      state.isAuth = false
    },
  },
});

export const actionsReducer = authSlice.actions;
export default authSlice.reducer;
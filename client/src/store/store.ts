import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { userAPI } from "../services/UserService";
import authReducer from './reducers/auth/AuthSlice'
// import { listenerMiddleware } from './middleware/loginMiddleware'

const rootReducer = combineReducers({
  authReducer,
  [userAPI.reducerPath]: userAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({serializableCheck: false})
      // .prepend(listenerMiddleware.middleware)
      .concat(userAPI.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
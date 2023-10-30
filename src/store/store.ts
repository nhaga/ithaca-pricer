import { configureStore } from "@reduxjs/toolkit"
import legsReducer from "../components/Legs/legsSlice"

export const store = configureStore({
  reducer: {
    legs: legsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  userId: string;
  username?: string;
}

const initialState: IUserState = {
  userId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "../user/userSlice";
import { MessageTypes } from "../../types/MessageTypes";

export interface IUserMessage {
  user: IUserState;
  type: MessageTypes.MESSAGE_SEND;
  text: string;
  timestamp: number;
  receivers: IUserState["userId"][];
}

export interface IUser extends IUserState {
  messages: IUserMessage[];
}

interface IChatState {
  users: IUser[];
  currentUserChat: IUser;
}

const initialState: IChatState = {
  users: [],
  currentUserChat: {
    userId: "",
    messages: [],
  } as IUser,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
    addUsers: (state, action: PayloadAction<IUser[]>) => {
      const data = action.payload.map((user) => ({
        userId: user.userId,
        messages: [],
      }));

      state.users = data;
    },
    setCurrentUserChat: (state, action: PayloadAction<IUser>) => {
      state.currentUserChat = action.payload;
    },
    addMessage: (state, action: PayloadAction<IUserMessage>) => {
      state.users.forEach((user) => {
        if (
          action.payload.user.userId === user.userId ||
          action.payload.receivers.includes(user.userId)
        ) {
          user.messages.push(action.payload);
        }
      });

      if (
        action.payload.user.userId === state.currentUserChat.userId ||
        action.payload.receivers.includes(state.currentUserChat.userId)
      ) {
        state.currentUserChat.messages.push(action.payload);
      }

      state.currentUserChat = { ...state.currentUserChat };
    },
  },
});

export const { addUser, addUsers, setCurrentUserChat, addMessage } =
  chatSlice.actions;
export const chatReducer = chatSlice.reducer;

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
        const usersToChange = state.users.filter(
          (userInState) => userInState.userId === user.userId
        );

        usersToChange.forEach((user) => {
          user.messages.push(action.payload);
        });
      });
    },
  },
});

export const { addUser, addUsers, setCurrentUserChat, addMessage } =
  chatSlice.actions;
export const chatReducer = chatSlice.reducer;

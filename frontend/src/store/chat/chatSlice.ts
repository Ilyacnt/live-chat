import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "../user/userSlice";
import { MessageTypes } from "../../types/MessageTypes";

interface IUserMessage {
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
  users: [
    {
      userId: "fi3u12rihfd12",
      messages: [
        {
          type: MessageTypes.MESSAGE_SEND,
          text: "Hello",
          timestamp: 121,
          receivers: ["fi3u12rihfd12"],
        },
      ],
    },
    {
      userId: "hgdssggfds",
      messages: [
        {
          type: MessageTypes.MESSAGE_SEND,
          text: "test",
          timestamp: 121,
          receivers: ["fi3u12rihfd12"],
        },
      ],
    },
  ],
  currentUserChat: {} as IUser,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
    addUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users.push(...action.payload);
    },
    setCurrentUserChat: (state, action: PayloadAction<IUser>) => {
      state.currentUserChat = action.payload;
    },
    addMessage: (state, action: PayloadAction<IUserMessage>) => {
      state.users.forEach((user) => {
        if (action.payload.receivers.includes(user.userId)) {
          user.messages.push();
        }
      });
    },
  },
});

export const { addUser, addUsers, setCurrentUserChat, addMessage } =
  chatSlice.actions;
export const chatReducer = chatSlice.reducer;

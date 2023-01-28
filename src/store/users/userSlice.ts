import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUsers } from "../../types/user.types";

interface usersState {
  usersData: IUsers[];
}

const initialState: usersState = {
  usersData: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<IUsers[]>) => {
      state.usersData = [...state.usersData, ...action.payload];
    },
    updateUsers: (state, action: PayloadAction<IUsers[]>) => {
      state.usersData = action.payload;
    },
  },
});

export const { addUsers, updateUsers } = userSlice.actions;

export const selectUsers = (state: RootState) => state.users.usersData;

export default userSlice;

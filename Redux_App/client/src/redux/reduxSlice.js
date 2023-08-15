import { createSlice } from "@reduxjs/toolkit";

const reduxSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    getRedux: (state, action) => {
      state.users = action.payload.map((user) => {
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          photo: user.photo,
        };
      });
    },
    addRedux: (state, action) => {
      state.users.push(action.payload);
    },
    removeRedux: (state, action) => {
      state.users.push(action.payload);
    },
    /*  updateRedux: (state, action) => {
      const index = state.users.findIndex((x) => x.id === action.payload.id);
      state.users[index] = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        photo: action.payload.photo,
      };
    }, */
  },
});

export const { getRedux, addRedux, removeRedux, updateRedux } =
  reduxSlice.actions;
export default reduxSlice.reducer;

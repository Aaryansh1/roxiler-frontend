import { createSlice } from "@reduxjs/toolkit/";

const userDetailsSlice = createSlice({
  name: "userDetail",
  initialState: {
    value: { userId: 0, name: "", email: "", todoId: 0, todoTitle: "" },
  },
  reducers: {
    storeData: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { storeData } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;

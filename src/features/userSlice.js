import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateDescription: (state, action) => {
      const description = action.payload;
      if(state.user){
        state.user.description = description;
      }
    }
}});

export const { login, logout, updateDescription } = userSlice.actions;

// const [user, setUser] = useState('');
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;

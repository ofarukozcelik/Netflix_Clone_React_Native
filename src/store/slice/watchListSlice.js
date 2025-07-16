import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  watchList: [
    {
      id: 1,
      title: 'Neşe',
    },
    {
      id: 2,
      title: 'Hüseyin',
    },
    {
      id: 3,
      title: 'Zeynep',
    },
  ],
};

const watchListSlice = createSlice({
  name: 'watchList',
  initialState,
  reducers: {
    addWatchList: (state, action) => {
      state.watchList.push(action.payload);
    },
    removeWatchList: (state, action) => {
      state.watchList = state.watchList.filter(
        item => item.id !== action.payload,
      );
    },
  },
});

export const {addWatchList, removeWatchList} = watchListSlice.actions;

export default watchListSlice.reducer;

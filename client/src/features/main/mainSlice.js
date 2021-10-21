import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    openPaths: [],
    selectedPath: null
  },
  reducers: {
    toggleDirectory: (state, action) => {
      const path = action.payload;
      const isOpen = state.openPaths.indexOf(path) > -1;
      if (isOpen) {
        state.openPaths = state.openPaths.filter(openPath => openPath !== path);
      } else {
        state.openPaths.push(path);
      }
    },
    removeOpenDirectory: (state, action) => {
      const path = action.payload;
      if (state.openPaths.indexOf(path) > -1) {
        state.openPaths = state.openPaths.filter(openPath => openPath !== path);
      }
    },
    selectPath: (state, action) => {
      const path = action.payload;
      state.selectedPath = path;
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggleDirectory, removeOpenDirectory, selectPath } = mainSlice.actions

export default mainSlice.reducer

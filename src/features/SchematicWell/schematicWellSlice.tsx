import { createSlice } from '@reduxjs/toolkit';

interface InitialValue {
  depth: number;
}

interface SchematicState {
  schematicWell: InitialValue;
}

export const schematicWellSlice = createSlice({
  name: 'schematicWell',
  initialState: { depth: 0 } as InitialValue,
  reducers: {
    setDepth: (state, action) => {
      const { depth } = action.payload;
      state.depth = depth;
    },
  },
});

export const { setDepth } = schematicWellSlice.actions;

export const selectCurrentDepth = (state: SchematicState) => state.schematicWell.depth;

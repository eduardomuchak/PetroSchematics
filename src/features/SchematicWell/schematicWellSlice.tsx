import { createSlice } from '@reduxjs/toolkit';

interface MousePosition {
  yAxis: number;
  xAxis: number;
}
interface InitialValue {
  depth: number;
  mousePosition: MousePosition;
}

interface SchematicState {
  schematicWell: InitialValue;
}

const initialState = {
  depth: 0,
  mousePosition: {
    yAxis: 0,
    xAxis: 0,
  },
} as InitialValue;

export const schematicWellSlice = createSlice({
  name: 'schematicWell',
  initialState,
  reducers: {
    relativeCoordinates: (state, action) => {
      const event = action.payload;
      const bounds = event.target.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      state.mousePosition = {
        yAxis: Number(y.toFixed(0)),
        xAxis: Number(x.toFixed(0)),
      };
      state.depth = Number(y.toFixed(0));
    },
  },
});

export const { relativeCoordinates } = schematicWellSlice.actions;

export const schematicWellState = (state: SchematicState) => state.schematicWell;

export const selectCurrentDepth = (state: SchematicState) => state.schematicWell.depth;

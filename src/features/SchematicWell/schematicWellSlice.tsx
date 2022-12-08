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
    setDepth: (state, action) => {
      state.depth = action.payload;
    },
    // A função abaixo deve ser usada para calcular a posição do clique do mouse
    // calculando a profundidade máxima e a posição do clique no eixo Y
    relativeCoordinates: (state, action) => {
      // Exemplo: profundidade máxima = 3000m e tamanho da imagem = 1000px
      // 3000m = profundidade máxima (state.depth)
      // 1000px = tamanho da imagem (imageSize.height)
      const event = action.payload;
      const bounds = event.target.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const clickDepth = (state.depth * y) / 1000; // 1000 = imageSize.height;
      state.mousePosition = {
        yAxis: Number(clickDepth.toFixed(0)),
        xAxis: Number(x.toFixed(0)),
      };
    },
  },
});

export const { relativeCoordinates, setDepth } = schematicWellSlice.actions;

export const schematicWellState = (state: SchematicState) => state.schematicWell;

export const selectCurrentDepth = (state: SchematicState) => state.schematicWell.depth;

import { createSlice } from '@reduxjs/toolkit';

import {
  Comment,
  InitialSchematicValue,
  MousePosition,
  SchematicState,
  SubsurfaceEquipment,
  SurfaceEquipment,
} from './interfaces';

const initialState = {
  minDepth: 0,
  maxDepth: 0,
  mousePosition: {
    yAxis: 0,
    xAxis: 0,
  } as MousePosition,
  surfaceEquipmentTable: [] as SurfaceEquipment[],
  subsurfaceEquipmentTable: [] as SubsurfaceEquipment[],
  comments: [] as Comment[],
} as InitialSchematicValue;

export const schematicWellSlice = createSlice({
  name: 'schematicWell',
  initialState,
  reducers: {
    setMaxDepth: (state, action) => {
      state.maxDepth = action.payload;
    },
    setMinDepth: (state) => {
      // Regra:
      // Se existir algum equipamento de subsuperfície ou comentário com profundidade definida
      // a profundidade mínima deve ser a profundidade do equipamento ou comentário com maior profundidade
      // Se não existir nenhum equipamento de subsuperfície ou comentário com profundidade definida
      // a profundidade mínima deve ser 0
      const { subsurfaceEquipmentTable, comments } = state;
      const subsurfaceEquipmentMinDepth = Math.max(
        ...subsurfaceEquipmentTable.map((subsurfaceEquipment) => Number(subsurfaceEquipment.depth)),
      );
      const commentsMinDepth = Math.max(...comments.map((comment) => comment.depth));
      const minDepth = Math.max(subsurfaceEquipmentMinDepth, commentsMinDepth);
      if (minDepth === Infinity || minDepth === null || minDepth === undefined) {
        state.minDepth = 0;
      } else {
        state.minDepth = minDepth;
      }
    },
    setSurfaceEquipment: (state, action) => {
      state.surfaceEquipmentTable = action.payload;
    },
    setSubsurfaceEquipment: (state, action) => {
      state.subsurfaceEquipmentTable = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
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
      const clickDepth = (state.maxDepth * y) / 1000; // 1000 = imageSize.height;
      state.mousePosition = {
        yAxis: Number(clickDepth.toFixed(0)),
        xAxis: Number(x.toFixed(0)),
      };
    },
    openPointOfClick: (state, action) => {
      state.mousePosition = action.payload;
    },
  },
});

export const {
  relativeCoordinates,
  setMaxDepth,
  setSurfaceEquipment,
  setSubsurfaceEquipment,
  openPointOfClick,
  setComments,
  setMinDepth,
} = schematicWellSlice.actions;

export const schematicWellState = (state: SchematicState) => state.schematicWell;

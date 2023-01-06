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
  maxHeight: 30,
  mousePosition: {
    yAxis: 0,
    xAxis: 0,
    isSurface: true,
  } as MousePosition,
  surfaceEquipmentTable: [] as SurfaceEquipment[],
  subsurfaceEquipmentTable: [] as SubsurfaceEquipment[],
  surfaceComments: [] as Comment[],
  subsurfaceComments: [] as Comment[],
} as InitialSchematicValue;

export const schematicWellSlice = createSlice({
  name: 'schematicWell',
  initialState,
  reducers: {
    setMaxDepth: (state, action) => ({
      ...state,
      maxDepth: action.payload,
    }),
    setMinDepth: (state) => {
      // Regra:
      // Se existir algum equipamento de subsuperfície ou comentário com profundidade definida
      // a profundidade mínima deve ser a profundidade do equipamento ou comentário com maior profundidade
      // Se não existir nenhum equipamento de subsuperfície ou comentário com profundidade definida
      // a profundidade mínima deve ser 0
      const { subsurfaceEquipmentTable, subsurfaceComments } = state;
      const subsurfaceEquipmentMinDepth = Math.max(
        ...subsurfaceEquipmentTable.map((subsurfaceEquipment) => Number(subsurfaceEquipment.depth)),
      );
      const commentsMinDepth = Math.max(...subsurfaceComments.map((comment) => comment.yAxis));
      const minDepth = Math.max(subsurfaceEquipmentMinDepth, commentsMinDepth);
      if (minDepth === Infinity || minDepth === null || minDepth === undefined) {
        return {
          ...state,
          minDepth: 0,
        };
      } else {
        return {
          ...state,
          minDepth,
        };
      }
    },
    setMaxHeight: (state, action) => ({
      ...state,
      maxHeight: action.payload,
    }),
    setSurfaceEquipment: (state, action) => ({
      ...state,
      surfaceEquipmentTable: action.payload,
    }),
    setSubsurfaceEquipment: (state, action) => ({
      ...state,
      subsurfaceEquipmentTable: action.payload,
    }),
    setSubsurfaceComments: (state, action) => {
      const filteredEquipments: Comment[] = action.payload.filter((comment: Comment) => {
        if (comment.isSurface === false) {
          return comment;
        } else {
          return null;
        }
      });
      return {
        ...state,
        subsurfaceComments: filteredEquipments,
      };
    },
    setSurfaceComments: (state, action) => {
      const filteredEquipments: Comment[] = action.payload.filter((comment: Comment) => {
        if (comment.isSurface === true) {
          return comment;
        } else {
          return null;
        }
      });
      return {
        ...state,
        surfaceComments: filteredEquipments,
      };
    },
    // A função abaixo deve ser usada para calcular a posição do clique do mouse
    // calculando a profundidade máxima e a posição do clique no eixo Y
    subsurfaceRelativeCoordinates: (state, action) => {
      // Exemplo: profundidade máxima = 3000m e tamanho da imagem = 1000px
      // 3000m = profundidade máxima (state.depth)
      // 1000px = tamanho da imagem (imageSize.height)
      const event = action.payload;
      const bounds = event.target.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const clickDepth = (state.maxDepth * y) / 1000; // 1000 = imageSize.height;
      return {
        ...state,
        mousePosition: {
          yAxis: Number(clickDepth.toFixed(0)),
          xAxis: Number(x.toFixed(0)),
          isSurface: false,
        },
      };
    },
    openPointOfClick: (state, action) => ({
      ...state,
      mousePosition: action.payload,
    }),
    surfaceRelativeCoordinates: (state, action) => {
      const event = action.payload;
      const bounds = event.target.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.bottom;
      const clickHeight = (state.maxHeight * y) / 200;
      return {
        ...state,
        mousePosition: {
          yAxis: Number(Math.abs(clickHeight).toFixed(0)),
          xAxis: Number(x.toFixed(0)),
          isSurface: true,
        },
      };
    },
  },
});

export const {
  subsurfaceRelativeCoordinates,
  setMaxDepth,
  setSurfaceEquipment,
  setSubsurfaceEquipment,
  openPointOfClick,
  setSubsurfaceComments,
  setSurfaceComments,
  setMinDepth,
  surfaceRelativeCoordinates,
} = schematicWellSlice.actions;

export const schematicWellState = (state: SchematicState) => state.schematicWell;

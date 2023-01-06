import { createSlice } from '@reduxjs/toolkit';

import { SelectedField, Well, WellState } from './interfaces';

const initialState = {
  wellsList: [
    {
      _id: '',
      nome_poco: '',
      dt_geracao: '',
      cad_poco: '',
      cod_agp: '',
      lon: '',
      lat: '',
      num_rodada: '',
      nom_campo: '',
      id_poco: '',
      'area campo': '',
      operador: '',
      operador_c: '',
      num_contra: '',
      dat_assina: '',
      dat_termin: '',
      nom_bacia: '',
      cod_campo: '',
      sig_campo: '',
      dat_descob: '',
      dat_inicio: '',
      etapa: '',
      med_lamina: '',
      fluido_pri: '',
      localizaca: '',
      cd_mun_ibge: '',
      nm_mun: '',
      sigla: '',
      id_doc: '',
      sequencial: '',
      imovel: '',
      cultura: '',
      bdoe: '',
      polo: '',
    },
  ] as Well[],
  selectedField: {
    value: '',
    label: '',
  } as SelectedField,
  filteredWellsList: [] as Well[],
} as WellState;

export const wellsSlice = createSlice({
  name: 'wells',
  initialState,
  reducers: {
    setWellsList: (state, action) => ({
      ...state,
      wellsList: action.payload,
    }),
    setSelectedField: (state, action) => ({
      ...state,
      selectedField: action.payload,
    }),
    setInicialFilteredWellsList: (state) => ({
      ...state,
      filteredWellsList: state.wellsList,
    }),
    filterByWellName: (state, action) => ({
      ...state,
      filteredWellsList: state.wellsList.filter((well: Well) => well.nome_poco === action.payload.label),
    }),
    filterWellsByField: (state, action) => ({
      ...state,
      filteredWellsList: state.wellsList.filter((well: Well) => well.nom_campo === action.payload.label),
    }),
  },
});

export const { setWellsList, setSelectedField, filterByWellName, setInicialFilteredWellsList, filterWellsByField } =
  wellsSlice.actions;

export const wellsState = (state: any) => state.wells;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};
export const testeSlice = createSlice({
  name: 'teste',
  initialState,
  reducers: {},
});

export const testeState = (state: any) => state.teste.value;

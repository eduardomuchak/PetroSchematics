export interface Well {
  _id: string;
  nome_poco: string;
  dt_geracao: string;
  cad_poco: string;
  cod_agp: string;
  lon: string;
  lat: string;
  num_rodada: string;
  nom_campo: string;
  id_poco: string;
  'area campo': string;
  operador: string;
  operador_c: string;
  num_contra: string;
  dat_assina: string;
  dat_termin: string;
  nom_bacia: string;
  cod_campo: string;
  sig_campo: string;
  dat_descob: string;
  dat_inicio: string;
  etapa: string;
  med_lamina: string;
  fluido_pri: string;
  localizaca: string;
  cd_mun_ibge: string;
  nm_mun: string;
  sigla: string;
  id_doc: string;
  sequencial: string;
  imovel: string;
  cultura: string;
  bdoe: string;
  polo: string;
}

export interface SelectedWell {
  value: string;
  label: string;
}

export interface WellState {
  wellsList: Well[];
  selectedWell: SelectedWell;
  filteredWellsList: Well[];
}

export interface PageWell {
  id: string;
  name: string;
}

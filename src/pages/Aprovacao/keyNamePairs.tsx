export const keyName = [
  { id: 1, id_pai: 11, type: 'select', title: 'CONTROLE BOLETIM', key: 'controle_boletim' },
  { id: 2, id_pai: 11, type: 'select', title: 'EQUIPAMENTO', key: 'equipamento' },
  { id: 3, id_pai: 11, type: 'select', title: 'STATUS TURNO 1', key: 'status_turno_1' },
  { id: 4, id_pai: 11, type: 'select', title: 'STATUS TURNO 2', key: 'status_turno_2' },
  { id: 5, id_pai: 11, type: 'select', title: 'STATUS TURNO 3', key: 'status_turno_3' },
  { id: 6, id_pai: 11, type: 'time', title: 'HORIMETRO', key: 'horimetro' },
  { id: 7, id_pai: 13, type: 'select', title: 'CONTROLE BOLETIM', key: 'controle_boletim' },
  { id: 8, id_pai: 13, type: 'text', title: 'CLORO LS RESIDUAL 01', key: 'cloro_ls_1' },
  { id: 9, id_pai: 13, type: 'text', title: 'CLORO LS RESIDUAL 02', key: 'cloro_ls_2' },
  { id: 10, id_pai: 13, type: 'text', title: 'P LS', key: 'p_ls' },
  { id: 11, id_pai: 13, type: 'text', title: 'P LI', key: 'p_li' },
  { id: 12, id_pai: 13, type: 'text', title: 'ZN LS', key: 'zn_ls' },
  { id: 13, id_pai: 13, type: 'text', title: 'ZN LI', key: 'zn_li' },
  { id: 14, id_pai: 13, type: 'text', title: 'PH LS REC 01', key: 'ph_ls_1' },
  { id: 15, id_pai: 13, type: 'text', title: 'PH LS REC 02', key: 'ph_ls_2' },
  { id: 16, id_pai: 13, type: 'text', title: 'FE REC', key: 'fe_rec' },
  { id: 17, id_pai: 65, type: 'time', title: 'HORA INICIAL', key: 'hora_inicial' },
  { id: 18, id_pai: 65, type: 'time', title: 'HORA FINAL', key: 'hora_final' },
  { id: 19, id_pai: 65, type: 'select', title: 'EQUIPE', key: 'equipe' },
  { id: 20, id_pai: 65, type: 'text', title: 'ATIVIDADE', key: 'atividade' },
  { id: 21, id_pai: 69, type: 'select', title: 'CONTROLE BOLETIM', key: 'controle_boletim' },
  { id: 22, id_pai: 69, type: 'select', title: 'POÇO', key: 'poco' },
  { id: 23, id_pai: 69, type: 'time', title: 'HORA INICIAL', key: 'hora_inicial' },
  { id: 24, id_pai: 69, type: 'text', title: 'FREQUÊNCIA', key: 'frequencia' },
  { id: 25, id_pai: 69, type: 'text', title: 'TENSÃO', key: 'tensao' },
  { id: 26, id_pai: 69, type: 'text', title: 'CORRENTE VSD', key: 'corrente_vsd' },
  { id: 27, id_pai: 69, type: 'text', title: 'TEMPERATURA MOTOR', key: 'temp_motor' },
  { id: 28, id_pai: 69, type: 'text', title: 'TEMPERATURA INTAKE', key: 'temp_intake' },
  { id: 29, id_pai: 69, type: 'text', title: 'PRESSÃO DESCARGA', key: 'pressao_descarga' },
  { id: 30, id_pai: 69, type: 'text', title: 'PRESSÃO INTAKE', key: 'pressao_intake' },
  // {id: 31, id_pai: 66, type: "select", title: "CONTROLE BOLETIM", key: "controle_boletim"},
  { id: 117, id_pai: 66, type: 'date', title: 'Data', key: 'date' },
  { id: 32, id_pai: 66, type: 'time', title: 'HORA INICIAL', key: 'hora_inicial' },
  { id: 33, id_pai: 66, type: 'select', title: 'VÁLVULA', key: 'xv' },
  { id: 34, id_pai: 66, type: 'text', title: 'PRESSÃO (Kgf/cm²)', key: 'pressao' },
  { id: 35, id_pai: 66, type: 'multiline', title: 'OBSERVAÇÕES', key: 'obs' },
  { id: 36, id_pai: 71, type: 'select', title: 'CONTROLE BOLETIM', key: 'controle_boletim' },
  { id: 37, id_pai: 71, type: 'select', title: 'POÇO', key: 'poco' },
  { id: 38, id_pai: 71, type: 'select', title: 'TIPO DE FLUIDO', key: 'tipo_fluido' },
  { id: 39, id_pai: 71, type: 'time', title: 'HORA INICIAL', key: 'hora_inicial' },
  { id: 40, id_pai: 71, type: 'text', title: 'TIPO DE AMOSTRA', key: 'tipo_amostra' },
  { id: 41, id_pai: 71, type: 'text', title: 'VOLUME', key: 'volume' },
  { id: 42, id_pai: 71, type: 'text', title: 'P COLETA', key: 'p_coleta' },
  { id: 43, id_pai: 71, type: 'time', title: 'T COLETA', key: 't_coleta' },
  { id: 44, id_pai: 71, type: 'text', title: 'PONTO DE AMOSTRAGEM', key: 'ponto_amostragem' },
  { id: 45, id_pai: 71, type: 'multiline', title: 'OBSERVAÇÕES', key: 'obs' },
  { id: 46, id_pai: 67, type: 'select', title: 'CONTROLE BOLETIM', key: 'controle_boletim' },
  { id: 47, id_pai: 67, type: 'select', title: 'POÇO', key: 'poco' },
  { id: 48, id_pai: 67, type: 'time', title: 'HORA INICIAL', key: 'hora_inicial' },
  { id: 49, id_pai: 67, type: 'time', title: 'HORA FINAL', key: 'hora_final' },
  { id: 50, id_pai: 67, type: 'text', title: 'MOTIVO', key: 'motivo' },
  // {id: 51, id_pai: 73, type: "select", title: "POLO", key: ""},
  // {id: 52, id_pai: 73, type: "select", title: "CAMPO", key: ""},
  // {id: 53, id_pai: 73, type: "select", title: "POÇO", key: "poco"},
  // {id: 54, id_pai: 73, type: "date", title: "DATA PROGRAMADA", key: ""},
  // {id: 55, id_pai: 73, type: "date", title: "DATA HORA LANÇAMENTO", key: ""},
  { id: 116, id_pai: 73, type: 'date', title: 'Data', key: 'date' },
  { id: 115, id_pai: 73, type: 'text', title: 'LANÇAMENTO', key: 'lancamento' },
  { id: 56, id_pai: 73, type: 'text', title: 'QUANTIDADE (Un)', key: 'quantidade' },
  { id: 57, id_pai: 73, type: 'bastao', title: 'TIPO BASTÃO', key: 'tipo_bastao' },
  { id: 58, id_pai: 73, type: 'text', title: 'PRESSÃO ANTES BASTÃO (Kgf/cm²)', key: 'pressao_antes_bastao' },
  { id: 59, id_pai: 73, type: 'text', title: 'VAZÃO ANTES BASTÃO (Mm³/d)', key: 'vazao_antes_bastao' },
  { id: 60, id_pai: 73, type: 'time', title: 'HORA ABERTURA', key: 'hora_abertura' },
  { id: 61, id_pai: 73, type: 'text', title: 'ABERTURA DO BEAN (Pol)', key: 'abertura_bean' },
  { id: 62, id_pai: 73, type: 'text', title: 'PRESSÃO FINAL ABERTURA  (Kgf/cm²)', key: 'pressao_final_abertura' },
  { id: 63, id_pai: 73, type: 'text', title: 'VAZÃO ABERTURA (Mm³/d)', key: 'vazao_abertura' },
  { id: 64, id_pai: 73, type: 'multiline', title: 'OBSERVAÇÕES', key: 'obs' },
  // {id: 65, id_pai: 73, type: "select", title: "CONTROLE BOLETIM", key: "controle_boletim"},
  { id: 66, id_pai: 75, type: 'select', title: 'CONTROLE BOLETIM', key: 'controle_boletim' },
  { id: 67, id_pai: 75, type: 'select', title: 'TIPO LANÇAMENTO RASPADORES', key: 'tipo_lancamento_raspadores' },
  { id: 68, id_pai: 75, type: 'time', title: 'HORA ABERTURA', key: 'hora_abertura' },
  { id: 69, id_pai: 75, type: 'text', title: 'NÚMERO LACRE', key: 'numero_lacre' },
  { id: 70, id_pai: 75, type: 'text', title: 'DUTO', key: 'duto' },
  { id: 71, id_pai: 75, type: 'text', title: 'PRESSÃO', key: 'pressao' },
  { id: 72, id_pai: 75, type: 'select', title: 'OPERADOR', key: 'operadora' },
  { id: 73, id_pai: 76, type: 'select', title: 'CONTROLE BOLETIM', key: 'controle_boletim' },
  { id: 74, id_pai: 76, type: 'text', title: 'NOME RECEBIMENTO', key: 'nome_recebimento' },
  { id: 75, id_pai: 76, type: 'time', title: 'HORA INICIAL', key: 'hora_inicial' },
  { id: 76, id_pai: 76, type: 'time', title: 'HORA FINAL', key: 'hora_final' },
  { id: 77, id_pai: 76, type: 'select', title: 'EQUIPAMENTO', key: 'equipamento' },
  { id: 78, id_pai: 76, type: 'text', title: 'LACRE INICIAL', key: 'lacre_inicial' },
  { id: 79, id_pai: 76, type: 'text', title: 'LACRE FIM', key: 'lacre_final' },
  { id: 80, id_pai: 76, type: 'text', title: 'NF', key: 'nf' },
  { id: 81, id_pai: 76, type: 'date', title: 'EMISSÃO', key: 'emissao' },
  { id: 82, id_pai: 76, type: 'text', title: 'NÍVEL CM INICIAL', key: 'nivel_cm_inicial' },
  // {id: 83, id_pai: 70, type: "select", title: "CONTROLE BOLETIM", key: "controle_boletim"},
  // {id: 84, id_pai: 70, type: "select", title: "POÇO", key: "poco"},
  // {id: 85, id_pai: 70, type: "select", title: "TANQUE", key: "tanque"},
  { id: 118, id_pai: 70, type: 'date', title: 'Data', key: 'date' },
  { id: 86, id_pai: 70, type: 'time', title: 'INÍCIO PURGA', key: 'inicio_purga' },
  { id: 87, id_pai: 70, type: 'time', title: 'INÍCIO TESTE', key: 'inicio_teste' },
  { id: 88, id_pai: 70, type: 'text', title: 'TEMPERATURA INICIAL SG (ºC)', key: 'temperatura_inicial_sg' },
  { id: 113, id_pai: 70, type: 'text', title: 'PRESSÃO INICIAL SG (Kgf/cm²)', key: 'pressao_inicial_sg' },
  {
    id: 114,
    id_pai: 70,
    type: 'text',
    title: 'PRESSÃO DIFERENCIAL INICIAL SG (Kgf/cm²)',
    key: 'pressao_diferencial_inicial_sg',
  },
  {
    id: 89,
    id_pai: 70,
    type: 'text',
    title: 'TEMPERATURA DIFERENCIAL INICIAL SG (ºC)',
    key: 'temperatura_diferencial_inicial_sg',
  },
  {
    id: 90,
    id_pai: 70,
    type: 'text',
    title: 'VAZÃO INSTANTÂNEA INICIAL SG (m³/d)',
    key: 'vazao_instantanea_inicial_sg',
  },
  { id: 91, id_pai: 70, type: 'text', title: 'ACUMULADO INICIAL SG (m³/d)', key: 'acumulado_inicial_sg' },
  { id: 92, id_pai: 70, type: 'text', title: 'NÍVEL INICIAL TANQUE (cm)', key: 'nivel_inicial_tanque' },
  { id: 93, id_pai: 70, type: 'text', title: 'TEMPERATURA AMBIENTE INICIAL (ºC)', key: 'temperatura_ambiente_inicial' },
  { id: 94, id_pai: 70, type: 'time', title: 'HORA FIM TESTE', key: 'hora_fim_teste' },
  { id: 95, id_pai: 70, type: 'text', title: 'TEMPERATURA SG (ºC)', key: 'temperatura_sg' },
  { id: 96, id_pai: 70, type: 'text', title: 'PRESSÃO SG (Kgf/cm²)', key: 'pressao_sg' },
  {
    id: 97,
    id_pai: 70,
    type: 'text',
    title: 'PRESSÃO DIFERENCIAL FINAL SG (Kgf/cm²)',
    key: 'pressao_diferencial_final_sg',
  },
  { id: 98, id_pai: 70, type: 'text', title: 'VAZÃO INSTANTANEA FINAL SG (m³/d)', key: 'vazao_instantanea_final_sg' },
  { id: 99, id_pai: 70, type: 'text', title: 'ACUMULADO FINAL SG (m³/d)', key: 'avumulado_final_sg' },
  { id: 100, id_pai: 70, type: 'text', title: 'NÍVEL FINAL TANQUE (cm)', key: 'nivel_final_tanque' },
  { id: 101, id_pai: 70, type: 'text', title: 'TEMPERATURA ÓLEO (ºC)', key: 'temperatura_oleo' },
  { id: 102, id_pai: 70, type: 'text', title: 'TEMPERATURA AMBIENTE FINAL (ºC)', key: 'temperatura_ambiente_final' },
  { id: 103, id_pai: 70, type: 'text', title: 'NÍVEL APÓS ÁGUA LIVRE (cm)', key: 'nivel_apos_agua_livre' },
  { id: 104, id_pai: 70, type: 'multiline', title: 'OBSERVAÇÕES', key: 'obs' },
  // {id: 105, id_pai: 140, type: "select", title: "CONTROLE BOLETIM", key: "controle_boletim"},
  // {id: 106, id_pai: 140, type: "select", title: "POÇO", key: "poco"},
  { id: 119, id_pai: 140, type: 'date', title: 'Data', key: 'date' },
  { id: 107, id_pai: 140, type: 'time', title: 'HORA ABERTURA', key: 'hora_abertura' },
  { id: 108, id_pai: 140, type: 'text', title: 'P LINHA (Kgf/cm²)', key: 'p_linha' },
  { id: 109, id_pai: 140, type: 'text', title: 'P COLUNA (Kgf/cm³)', key: 'p_coluna' },
  { id: 110, id_pai: 140, type: 'text', title: 'P ANULAR A (Kgf/cm²)', key: 'p_anular_a' },
  { id: 111, id_pai: 140, type: 'text', title: 'P ANULAR B (Kgf/cm²)', key: 'p_anular_b' },
  { id: 112, id_pai: 140, type: 'text', title: 'P ANULAR C (Kgf/cm²)', key: 'p_anular_c' },
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  { id: 11, key: 'id_controle_boletim', title: 'Controle Boletim' },
  { id: 12, key: 'var_xv', title: 'Válvula' },
  { id: 13, key: 'hor_hora', title: 'Hora' },
  { id: 14, key: 'num_pressao', title: 'Pressão' },
  { id: 15, key: 'txt_observacoes', title: 'Observações' },
  { id: 16, key: 'var_nome_origem', title: 'Nome Origem' },
  { id: 17, key: 'id_polo', title: 'Polo' },
  { id: 18, key: 'id_campo', title: 'Campo' },
  { id: 19, key: 'id_poco', title: 'Poco' },
  { id: 110, key: 'dat_hora_lancamento', title: 'Hora Lançamento' },
  { id: 111, key: 'int_lancamento', title: 'Lançamento' },
  { id: 112, key: 'qtd_quantidade', title: 'Quantidade (Un)' },
  { id: 113, key: 'id_tipo_bastao', title: 'Tipo Bastão' },
  { id: 114, key: 'num_pressao_antes_bastao', title: 'Pressão Antes do Bastão (Kgf/cm²)' },
  { id: 115, key: 'num_vazao_antes_bastao', title: 'Vazão antes do Bastão (Mm³/d)' },
  { id: 116, key: 'hor_abertura', title: 'Hora de Abertura' },
  { id: 117, key: 'var_abertura_bean', title: 'Abertura do Bean (Pol)' },
  { id: 118, key: 'num_pressao_final_abertura', title: 'Pressão Final Abertura (Kgf/cm²)' },
  { id: 119, key: 'num_vazao_abertura', title: 'Vazão Abertura (Mm³/d)' },
  { id: 120, key: 'id_tanque', title: 'Tanque' },
  { id: 121, key: 'hor_inicio_purga', title: 'Início Purga' },
  { id: 122, key: 'hor_inicio_teste', title: 'Início Teste' },
  { id: 123, key: 'num_temperatura_inicial_sg', title: 'Temperatura Inicial SG (ºC)' },
  { id: 124, key: 'num_pressao_inicial_sg', title: 'Pressão Inicial SG (Kgf/cm²)' },
  { id: 125, key: 'num_pressao_diferencial_inicial_sg', title: 'Pressão Diferencial Inicial SG (Kgf/cm²)' },
  { id: 126, key: 'num_vazao_instantanea_inicial_sg', title: 'Vazao Instantânea Inicial SG (m³/d)' },
  { id: 127, key: 'num_acumulado_inicial_sg', title: 'Acumulado Inicial SG (m³/d)' },
  { id: 128, key: 'num_nivel_inicial_tq', title: 'Nível Inicial TQ (cm)' },
  { id: 129, key: 'num_temperatura_ambiente_inicial', title: 'Temperatura Ambiente Inicial (ºC)' },
  { id: 130, key: 'hor_hora_fim_teste', title: 'Hora Fim Teste' },
  { id: 131, key: 'num_temperatura_final_sg', title: 'Temperatura Final SG (ºC)' },
  { id: 132, key: 'num_pressao_final_sg', title: 'Pressão Final SG (Kgf/cm²)' },
  { id: 133, key: 'num_pressao_diferencial_final_sg', title: 'Pressão Diferencial Final SG (Kgf/cm²)' },
  { id: 134, key: 'num_vazao_instantanea_final_sg', title: 'Vazão Instanânea Final SG (Mm³/d)' },
  { id: 135, key: 'num_acumulado_final_sg', title: 'Acumulado Final SG (m³/d)' },
  { id: 136, key: 'num_nivel_final_tq', title: 'Nível Final TQ (cm)' },
  { id: 137, key: 'num_temperatura_oleo', title: 'Temperatura Óleo (ºC)' },
  { id: 138, key: 'num_temperatura_ambiente_final', title: 'Temperatura Ambiente Final (ºC)' },
  { id: 139, key: 'num_nivel_apos_agua_livre', title: 'Nível Após Água Livre (cm)' },
  { id: 140, key: 'num_pressao_coluna_kgfcm', title: 'Pressão da Coluna (Kgf/cm²)' },
  { id: 141, key: 'num_pressao_anular_a_kgfcm', title: 'Pressão Anular A (Kgf/cm²)' },
  { id: 142, key: 'num_pressao_anular_b_kgfcm', title: 'Pressão Anular B (Kgf/cm²)' },
  { id: 143, key: 'num_pressao_anular_c_kgfcm', title: 'Pressão Anular C (Kgf/cm²)' },
  { id: 144, key: 'id_tipo_lancamento_raspadores', title: 'Tipo Lançamento Raspadores' },
  { id: 145, key: 'num_lacre', title: 'Número Lacre' },
  { id: 146, key: 'id_equipamento', title: 'Equipamento' },
  { id: 147, key: 'var_duto', title: 'Duto' },
  { id: 148, key: 'num_pressao', title: 'Pressão (Kgf/cm²)' },
  { id: 149, key: 'id_tipo_fluido', title: 'Tipo Fluido' },
  { id: 150, key: 'var_tipo_amostra', title: 'Tipo Amostra' },
  { id: 151, key: 'num_volume', title: 'Volume' },
  { id: 152, key: 'num_pressao_coleta', title: 'Pressão Coleta (Kgf/cm²)' },
  { id: 153, key: 'num_temperatura_coleta', title: 'Temperatura Coleta (ºC)' },
  { id: 154, key: 'var_ponto_amostragem', title: 'Ponto Amostragem' },
  { id: 155, key: 'tbi_teste_dhsv', title: 'Teste Dhsv' },
  { id: 156, key: 'bol_vazamento', title: 'Vazamento' },
  { id: 157, key: 'hor_inicio', title: 'Início' },
  { id: 158, key: 'hor_fim', title: 'Fim' },
  { id: 159, key: 'var_acao', title: 'Ação' },
  { id: 160, key: 'txt_motivo', title: 'Motivo' },
  { id: 161, key: 'num_vazao_antes', title: 'Vazão Antes (Mm³/d)' },
  { id: 162, key: 'num_pressao_cab_antes', title: 'Pressão Cab Antes (Kgf/cm²)' },
  { id: 163, key: 'num_pressao_cab_apos', title: 'Pressão Cab Após (Kgf/cm²)' },
  { id: 164, key: 'num_volume_recuperado', title: 'Volume Recuperado' },
  { id: 165, key: 'id_localizacao', title: 'Localização' },
  { id: 166, key: 'id_operador', title: 'Id Operador' },
];
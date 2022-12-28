import { api } from './api';

export async function getApiTurnos(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/api/turnos`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}

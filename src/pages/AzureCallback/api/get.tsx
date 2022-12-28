import { api } from './api';

export async function getApiTurnos(token: string | null): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/api/describe/coletaAmostrar`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { data, status };
}

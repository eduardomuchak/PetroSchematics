export const getAllDocs = async () => {
  const options: any = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'api-key': process.env.REACT_APP_MONGO_API_KEY,
    },
    body: JSON.stringify({
      dataSource: 'Cluster0',
      database: 'app-collect',
      collection: 'form-xv',
      filter: {},
    }),
  };
  const result = await fetch('https://data.mongodb-api.com/app/data-becba/endpoint/data/v1/action/find', options)
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => err);

  return result;
};

export const getAllPocos = async () => {
  const options: any = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'api-key': process.env.REACT_APP_MONGO_API_KEY,
    },
    body: JSON.stringify({
      dataSource: 'Cluster0',
      database: 'app-collect',
      collection: 'pocos',
      filter: {},
    }),
  };
  const result = await fetch('https://data.mongodb-api.com/app/data-becba/endpoint/data/v1/action/find', options)
    .then((response) => response.json())
    .then((response) => response)
    .catch(() => null);

  return result;
};

export const getAllTanques = async () => {
  const options: any = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'api-key': process.env.REACT_APP_MONGO_API_KEY,
    },
    body: JSON.stringify({
      dataSource: 'Cluster0',
      database: 'app-collect',
      collection: 'tanques',
      filter: {},
    }),
  };
  const result = await fetch('https://data.mongodb-api.com/app/data-becba/endpoint/data/v1/action/find', options)
    .then((response) => response.json())
    .then((response) => response)
    .catch(() => null);

  return result;
};

export const insertOneForm = async (item: any, form: string) => {
  const options: any = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'api-key': process.env.REACT_APP_MONGO_API_KEY,
    },
    body: JSON.stringify({
      dataSource: 'Cluster0',
      database: 'app-collect',
      collection: form,
      document: item,
    }),
  };
  const result = await fetch('https://data.mongodb-api.com/app/data-becba/endpoint/data/v1/action/insertOne', options)
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => err);

  return result;
};

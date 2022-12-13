const URL_ENDPOINT = `${process.env.REACT_APP_URL_ENDPOINT}`;
const API_KEY = `${process.env.REACT_APP_MONGO_API_KEY}`;
const Cluster = `${process.env.REACT_APP_DATA_SOURCE_ID}`;
const Database = `${process.env.REACT_APP_DATABASE}`;

export const getAllDocs = async (form: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      dataSource: Cluster,
      database: Database,
      collection: form,
      filter: {},
    }),
  };
  const result = await fetch(`${URL_ENDPOINT}/action/find`, options)
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => err);

  return result;
};

export const getAllPocos = async () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      dataSource: Cluster,
      database: Database,
      collection: 'pocos',
      filter: {},
    }),
  };
  const result = await fetch(`${URL_ENDPOINT}/action/find`, options)
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => err);

  return result;
};

export const getAllTanques = async () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      dataSource: Cluster,
      database: Database,
      collection: 'tanques',
      filter: {},
    }),
  };
  const result = await fetch(`${URL_ENDPOINT}/action/find`, options)
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => err);

  return result;
};

export const insertOneForm = async (item: any, form: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      dataSource: Cluster,
      database: Database,
      collection: form,
      document: item,
    }),
  };
  const result = await fetch(`${URL_ENDPOINT}/action/insertOne`, options)
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => err);

  return result;
};

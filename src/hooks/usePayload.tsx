const md5 = require('md5');

export function usePayload(collection: string, method: string, document?: any) {
  if (method === 'ADD') {
    const DATA_SOURCE = `${process.env.REACT_APP_DATA_SOURCE_ID}`;
    const DATABASE = `${process.env.REACT_APP_DATABASE}`;
    const payload = {
      dataSource: DATA_SOURCE,
      database: DATABASE,
      collection,
      document: { ...document, hash: md5(document) },
    };
    return payload;
  }
  if (method === 'UPDATE') {
    const DATA_SOURCE = `${process.env.REACT_APP_DATA_SOURCE_ID}`;
    const DATABASE = `${process.env.REACT_APP_DATABASE}`;
    const payload = {
      dataSource: DATA_SOURCE,
      database: DATABASE,
      collection,
      filter: { hash: document.hash },
      update: { ...document, _id: undefined },
    };
    return payload;
  }
  if (method === 'DELETE') {
    const DATA_SOURCE = `${process.env.REACT_APP_DATA_SOURCE_ID}`;
    const DATABASE = `${process.env.REACT_APP_DATABASE}`;
    const payload = {
      dataSource: DATA_SOURCE,
      database: DATABASE,
      collection,
      filter: { hash: document.hash },
    };
    return payload;
  }
  if (method === 'GET') {
    const DATA_SOURCE = `${process.env.REACT_APP_DATA_SOURCE_ID}`;
    const DATABASE = `${process.env.REACT_APP_DATABASE}`;
    const payload = {
      dataSource: DATA_SOURCE,
      database: DATABASE,
      collection,
      filter: {},
    };
    return payload;
  }
}

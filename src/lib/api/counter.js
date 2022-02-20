import client from './client';

export const add = () => client.get('api/counter/add');
export const list = () => client.get('api/counter/list');

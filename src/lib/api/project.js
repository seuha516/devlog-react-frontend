import client from './client';

export const write = (project) => client.post('api/project/write', project);
export const list = (query) => {
  return client.get(`api/project/list${query}`);
};
export const read = (id) => client.get(`api/project/read/${id}`);
export const remove = (id) => client.delete(`api/project/remove/${id}`);
export const update = ({ id, project }) =>
  client.patch(`api/project/update/${id}`, project);
export const getlist = () => client.get(`api/project/getlist`);

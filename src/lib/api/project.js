import client from './client';

export const list = (query) => client.get(`project${query}`);
export const write = (project) => client.post('project', project);
export const read = (id) => client.get(`project/${id}`);
export const remove = (id) => client.delete(`project/${id}`);
export const update = ({ id, project }) => client.patch(`project/${id}`, project);
export const catalog = () => client.get(`project/catalog`);
export const like = (id) => client.post(`project/${id}/like`);
export const writeComment = ({ id, comment }) => client.post(`project/${id}/comment`, comment);
export const removeComment = ({ id, comment }) => client.delete(`project/${id}/comment`, comment);

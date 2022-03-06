import client from './client';

export const list = (query) => client.get(`post${query}`);
export const write = (post) => client.post('post', post);
export const read = (id) => client.get(`post/${id}`);
export const remove = (id) => client.delete(`post/${id}`);
export const update = ({ id, post }) => client.patch(`post/${id}`, post);
export const catalog = () => client.get(`post/catalog`);
export const like = (id) => client.post(`post/${id}/like`);
export const writeComment = ({ id, comment }) => client.post(`post/${id}/comment`, comment);
export const removeComment = ({ id, comment }) => client.delete(`post/${id}/comment`, comment);

import client from './client';

export const write = (post) => client.post('api/post/write', post);
export const list = (query) => {
  return client.get(`api/post/list${query}`);
};
export const read = (id) => client.get(`api/post/read/${id}`);
export const remove = (id) => client.delete(`api/post/remove/${id}`);
export const update = ({ id, post }) => client.patch(`api/post/update/${id}`, post);
export const series = ({ series, query }) => client.get(`api/post/series/${series}${query}`);
export const getlist = () => client.get(`api/post/getlist`);

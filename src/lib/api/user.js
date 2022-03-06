import client from './client';

export const login = ({ username, password }) => client.post('auth/login', { username, password });
export const check = () => client.get('auth/check');
export const logout = () => client.get('auth/logout');

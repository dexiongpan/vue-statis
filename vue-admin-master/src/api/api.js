import axios from 'axios';

let base = 'http://47.106.83.36';

// export const requestLogin = params => { return axios.post(`/login`, params).then(res => res.data); };
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`/user/listpage`, { params: params }); };

export const getWorkListPage = params => { return axios.get(`${base}/work/count/list`, { params: params }); };
export const getContentListPage = params => { return axios.get(`${base}/content/count/list`, { params: params }); };


export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
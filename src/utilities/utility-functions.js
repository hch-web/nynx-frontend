export const getEmail = () => sessionStorage.getItem('email');

export const setEmail = payload => sessionStorage.setItem('email', payload);

export const removeEmail = () => sessionStorage.removeItem('email');

export const setToken = payload => localStorage.setItem('token', payload.token);

export const removeToken = () => localStorage.removeItem('token');

export const getToken = () => localStorage.getItem('token');

export const getSearchParamsObject = urlSearchParams => Object.fromEntries(urlSearchParams);

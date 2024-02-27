import axios from 'axios';
import { useStore } from '../store.ts';

export const authenticatedAxios = axios.create();

authenticatedAxios.interceptors.request.use(config => {
  const idToken = useStore.getState().idToken;
  if (idToken !== '') {
    config.headers.Authorization = `Bearer ${idToken}`;
  }

  return config;
});

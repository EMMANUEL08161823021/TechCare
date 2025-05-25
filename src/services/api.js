import axios from 'axios';

const username = import.meta.env.VITE_API_USERNAME;
const password = import.meta.env.VITE_API_PASSWORD;
const baseURL = import.meta.env.VITE_API_BASE_URL;

const token = btoa(`${username}:${password}`); // Encode Basic Auth

const API = axios.create({
  baseURL,
  headers: {
    Authorization: `Basic ${token}`,
  },
});

export const getPatients = () => API.get('/');

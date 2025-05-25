import axios from 'axios';

const username = 'coalition';
const password = 'skills-test';
const baseURL = 'https://fedskillstest.coalitiontechnologies.workers.dev';

const token = btoa(`${username}:${password}`); // Encode Basic Auth

const API = axios.create({
  baseURL,
  headers: {
    Authorization: `Basic ${token}`,
  },
});

export const getPatients = () => API.get('/');

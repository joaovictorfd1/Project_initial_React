import axios from 'axios';

const API = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_LINK_API,
  });
};

export default API;
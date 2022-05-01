import axios from 'axios';

const API = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_LINK_API,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('@user-token')}`
    }
  });
};

export default API;
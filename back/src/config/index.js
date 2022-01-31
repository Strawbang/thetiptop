import axios from 'axios';

const API = process.env.REACT_APP_API || `http://localhost:8080/api/`;

export default axios.create({
  baseURL: API,
});

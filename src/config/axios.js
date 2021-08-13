import axios from 'axios';

const API_URL = 'https://scmp-32371-default-rtdb.firebaseio.com';

const instance = axios.create({
  baseURL: API_URL,
});
export default instance;

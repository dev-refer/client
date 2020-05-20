import axios from 'axios';
axios.defaults.baseURL = 'https://refer-dev.herokuapp.com/';
// axios.defaults.baseURL = 'https://refer-server-development.herokuapp.com/';

axios.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    return error
  }
);

export default axios;
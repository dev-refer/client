import axios from 'axios';
// axios.defaults.baseURL = 'https://refer-dev.herokuapp.com/';
axios.defaults.baseURL = 'http://35.219.28.206/';

axios.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    return error
  }
);

export default axios;
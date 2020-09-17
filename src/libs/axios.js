import axios from 'axios';
// axios.defaults.baseURL = 'https://refer-dev.herokuapp.com/';
// axios.defaults.baseURL = 'http://35.219.28.206/';
axios.defaults.baseURL = 'https://refer-dot-referapp.df.r.appspot.com/';
// axios.defaults.baseURL = 'http://localhost:8000/';

axios.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    throw error
  }
);

export default axios;
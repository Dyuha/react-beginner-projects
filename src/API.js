import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reqres.in/api/',
});


export const usersAPI = {
  getUsers(){
    return instance
      .get('users')
      .then(response => response.data.data)
  },
};


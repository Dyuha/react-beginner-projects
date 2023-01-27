import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: {"apikey": 'U5KV2WWNveysm8Q06EvzkWGC0ARZHJdl'}
});

export const getRatesCurrencies = (symbols, base) => {
  return instance
    .get(`latest?symbols=${symbols}&base=${base}`)
    .then(response => response.data)
    .then(data =>data.rates)
    .catch(error => console.log(error.message))
}

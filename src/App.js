import React, { useState, useEffect, useRef } from 'react';
import { Block } from './Block';
import './index.scss';
import { getRatesCurrencies } from './API';

const App = () => {

  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [toPrice, setToPrice] = useState(0);
  const [fromPrice, setFromPrice] = useState(0);
  const ratesRef = useRef({});
  const defaultCurrencies = ['RUB,USD,EUR,GBP'];

  
  useEffect( () => {
    const getRates = async () => {
      ratesRef.current = await getRatesCurrencies(defaultCurrencies, "USD");
    }
    getRates();
  }, []);

  useEffect(() => onChangeFromPrise(fromPrice), [fromCurrency])
  useEffect(() => onChangeToPrise(toPrice), [toCurrency])

  const onChangeToPrise = (value) => {
    const price = value / ratesRef.current[toCurrency]
    const result = price * ratesRef.current[fromCurrency]
    setFromPrice(result.toFixed(3))
    setToPrice(value)
  }

  const onChangeFromPrise = (value) => {
    const price = value / ratesRef.current[fromCurrency]
    const result = price * ratesRef.current[toCurrency]
    setToPrice(result.toFixed(3))
    setFromPrice(value)
  }

  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrise}/>
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrise}/>
    </div>
  );
}

export default App;



import { useState } from "react";

const useCounter = (estadoInicial = 10) => {
  const [counter, setCounter] = useState(estadoInicial);
  const increment = () => {
    setCounter(counter + 1);
  };
  const decrement = () => {
    setCounter(counter - 1);
  };
  const reset = () => {
    setCounter(estadoInicial);
  };
  return { state: counter, increment, decrement, reset };
};

export default useCounter;

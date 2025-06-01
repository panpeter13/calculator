import styles from "./App.module.css";
import { useState } from "react";

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const operation = ["+", "-", "C", "="];

const App = () => {
  const [displayValue, setDisplayValue] = useState("");
  const [firstNumber, setFirstNumber] = useState(null);
  const [currentOperation, setCurrentOperation] = useState(null);

  const handleClick = (value) => {
    if (value === "C") {
      setDisplayValue("");
      setFirstNumber(null);
      setCurrentOperation(null);
      return;
    }

    if (value === "+" || value === "-") {
      setFirstNumber(Number(displayValue));
      setCurrentOperation(value);
      setDisplayValue("");
      setIsResultShow(false);
      return;
    }

    if (value === "=") {
      if (firstNumber !== null && currentOperation && displayValue !== "") {
        const secondNumber = Number(displayValue);
        let result;

        if (currentOperation === "+") {
          result = firstNumber + secondNumber;
        } else if (currentOperation === "-") {
          result = firstNumber - secondNumber;
        }

        setDisplayValue(String(result));
        setFirstNumber(null);
        setCurrentOperation(null);
      }
      setIsResultShow(true);
      return;
    }

    setDisplayValue(displayValue + value);
  };

  const [isResultShow, setIsResultShow] = useState(false);

  return (
    <div className={styles.calculator}>
      <div className={`${styles.display} ${isResultShow ? styles.result : ""}`}>
        {displayValue}
      </div>
      <div className={styles.button}>
        {numbers.map((num) => (
          <button key={num} onClick={() => handleClick(num)}>
            {num}
          </button>
        ))}
        {operation.map((op) => (
          <button key={op} onClick={() => handleClick(op)}>
            {op}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;

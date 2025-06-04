import styles from "./App.module.css";
import { useState } from "react";

const NUMS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const OPERATIONS = ["+", "-", "C", "="];

const App = () => {
  const [operand1, setOperand1] = useState("");
  const [operand2, setOperand2] = useState("");
  const [operator, setOperator] = useState("");
  const [isResult, setIsResult] = useState(false);

  const handleClick = (value) => {
    if (value === "C") {
      setOperand1("");
      setOperand2("");
      setOperator("");
      setIsResult("");
      return;
    }

    if (value === "+" || value === "-") {
      if (operand1 !== "") {
        setOperator(value);
        setIsResult(false);
      }
      return;
    }

    if (value === "=") {
      if (operand1 && operator && operand2) {
        const result =
          operator === "+"
            ? parseInt(operand1) + parseInt(operand2)
            : parseInt(operand1) - parseInt(operand2);
        setOperand1(String(result));
        setOperand2("");
        setOperator("");
        setIsResult(true);
      }
      return;
    }

    if (!operator) {
      setOperand1((prev) => prev + value);
    } else {
      setOperand2((prev) => prev + value);
    }
  };

  const display = `${operand1}${operator}${operand2}`;

  return (
    <div className={styles.calculator}>
      <div className={`${styles.display} ${isResult ? styles.result : ""}`}>
        {display || "0"}
      </div>
      <div className={styles.button}>
        {NUMS.map((num) => (
          <button key={num} onClick={() => handleClick(num)}>
            {num}
          </button>
        ))}
        {OPERATIONS.map((op) => (
          <button key={op} onClick={() => handleClick(op)}>
            {op}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;

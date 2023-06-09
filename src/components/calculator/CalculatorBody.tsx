import classes from "./CalculatorBody.module.css";
import Button from "./Button";
import { useEffect, useState } from "react";
import { evaluate } from "mathjs";

const keys = [
  "Clear",
  "+/-",
  "Del",
  "*",
  7,
  8,
  9,
  "/",
  4,
  5,
  6,
  "-",
  1,
  2,
  3,
  "+",
  ".",
  0,
  ".",
  "=",
];

const CalculatorBody = () => {
  const [input, setInput] = useState<string>("");
  const [monitor, setMonitor] = useState<string>("");

  useEffect(() => {
    setMonitor(input);
  }, [input]);

  const calculate = () => {
    setInput((prevValue) => {
      const result = evaluate(prevValue);
      const filteredResult = result.toString().includes(".")
        ? result.toFixed(4)
        : result;
      return filteredResult.toString();
    });
  };

  const isOperator = (value: string) => {
    return (
      value === "+" ||
      value === "-" ||
      value === "*" ||
      value === "/" ||
      value === "+/-" ||
      value === "."
    );
  };

  const keyClickHandler = (value: string) => {
    if (input.length === 0 && isOperator(value)) return;

    if (input.slice(-1) === ")" && !isNaN(parseInt(value))) return;

    if (value === "Clear") return setInput("");

    if (value === "+/-")
      return setInput((prevValue) =>
        input.length !== 0 ? `-(${prevValue})` : ""
      );

    if (value === "Del")
      return setInput((prevValue) =>
        input.length > 0 ? prevValue.slice(0, -1) : ""
      );

    if (value === "=") {
      if (input.length === 0) return;
      if (isOperator(input.toString().slice(-1))) return;
      return calculate();
    }

    if (input.length >= 16) return;

    if (isOperator(input.slice(-1)) && isOperator(value))
      setInput(input.slice(0, -1));

    if (input.slice(-1) === "0" && !isNaN(parseInt(value)))
      setInput((prevValue) => prevValue.slice(0, -1));

    setInput((prevValue) => prevValue + value);
  };

  const Buttons = keys.map((item) => (
    <Button
      key={`${item}.${Math.random()}`}
      value={item}
      sendValue={keyClickHandler}
    >
      {item}
    </Button>
  ));

  return (
    <div className={classes.wrapper}>
      <div className={classes.results}>{monitor}</div>
      <div className={classes.numbers}>{Buttons}</div>
    </div>
  );
};

export default CalculatorBody;

import { createContext, useState } from "react";

const CalcContext = createContext<any | undefined>(undefined);

export const CalcProvider = ({ children }: any) => {
  const [input, setInput] = useState<string>("0");
  const [isDark, setIsDark] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent, value: string) => {
    event.stopPropagation(); // Prevent event propagation
    setInput((prevInput) => {
      // Prevent multiple operators in a row
      const operators = ["/", ".", "+", "-", "*"];
      const lastChar = prevInput.slice(-1);

      if (operators.includes(lastChar) && operators.includes(value)) {
        return prevInput; // Ignore if the last character is already an operator
      }

      // Prevent input starting with multiple zeros unless followed by a decimal
      if (prevInput === "0" && value !== ".") {
        return value; // Replace initial "0" with the value
      }

      return prevInput + value; // Append value to the input
    });
  };

  const handleClear = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event propagation

    setInput("0"); // Reset the input
  };

  const handleBackspace = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event propagation

    setInput((prevInput) => {
      // If the input has only one character left, reset it to "0"
      if (prevInput.length <= 1) {
        return "0";
      }
      return prevInput.slice(0, -1); // Remove the last character
    });
  };

  const handleCalculate = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event
    try {
      // Evaluate the input safely
      const result = new Function(`return ${input}`)(); // Safely evaluate the string expression
      setInput(String(result.toFixed(3))); // Update the input with the result
    } catch (error) {
      setInput("Error"); // Display "Error" if the calculation fails
    }
  };
  return (
    <CalcContext.Provider
      value={{
        input,
        isDark,
        handleClick,
        handleClear,
        handleBackspace,
        handleCalculate,
        setIsDark,
      }}
    >
      {children}
    </CalcContext.Provider>
  );
};

export default CalcContext;

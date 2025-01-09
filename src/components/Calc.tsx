import { useState } from "react";
import { FaTimes, FaMinus, FaDivide, FaEquals } from "react-icons/fa";
import Switcher from "./Switcher";

const Calc = () => {
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
      setInput(String(result)); // Update the input with the result
    } catch (error) {
      setInput("Error"); // Display "Error" if the calculation fails
    }
  };

  return (
    <div className="container">
      <div className="flex items-center justify-center h-screen">
        <div
          className="rounded-lg p-4  shadow-md w-full max-w-[300px] flex flex-col gap-4"
          style={{
            backgroundColor: isDark ? "#FFFFFF" : "rgb(0 0 0 / 0.7)",
          }}
          onClick={() => setIsDark(!isDark)} // Toggle isDark on click
        >
          <Switcher isDark={isDark} setIsDark={setIsDark} />
          <div
            className={`rounded-lg text-white h-[100px] overflow-y-hidden text-right flex items-end justify-end p-4 ${
              isDark ? "bg-black " : "bg-gray-300"
            }`}
          >
            <p className="text-5xl">{input}</p>
          </div>
          <div className="flex flex-col  gap-4">
            <div className="grid grid-cols-4 gap-4">
              <div
                onClick={(e) => handleClick(e, "7")}
                className={`rounded-md h-12 w-15 flex justify-center items-center text-2xl bg-white cursor-pointer  ${
                  isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                7
              </div>
              <div
                onClick={(e) => handleClick(e, "8")}
                className={`rounded-md h-12 w-15 flex justify-center items-center text-2xl bg-white cursor-pointer  ${
                  isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                8
              </div>
              <div
                onClick={(e) => handleClick(e, "9")}
                className={`rounded-md h-12 w-15 flex justify-center items-center text-2xl bg-white cursor-pointer  ${
                  isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                9
              </div>
              <div
                onClick={(e) => handleClear(e)}
                className={`rounded-md h-12 w-15 flex justify-center items-center text-xl bg-white cursor-pointer ${
                  isDark && "bg-blue-500 text-white"
                }`}
              >
                AC
              </div>
              <div
                onClick={(e) => handleClick(e, "4")}
                className={`rounded-md h-12 w-15 flex justify-center items-center text-2xl bg-white cursor-pointer  ${
                  isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                4
              </div>
              <div
                onClick={(e) => handleClick(e, "5")}
                className={`rounded-md h-12 w-15 flex justify-center items-center text-2xl bg-white cursor-pointer  ${
                  isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                5
              </div>
              <div
                onClick={(e) => handleClick(e, "6")}
                className={`rounded-md h-12 w-15 flex justify-center items-center text-2xl bg-white cursor-pointer  ${
                  isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                6
              </div>
              <div
                onClick={(e) => handleClick(e, "/")}
                className={`rounded-md h-12 w-15 flex justify-center items-center text-xl bg-white cursor-pointer ${
                  isDark && "bg-blue-500 text-white"
                }`}
              >
                {<FaDivide />}
              </div>
              <div
                onClick={(e) => handleClick(e, "1")}
                className={`rounded-md h-12 w-15 flex justify-center items-center text-2xl bg-white cursor-pointer  ${
                  isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                1
              </div>
              <div
                onClick={(e) => handleClick(e, "2")}
                className={`rounded-md h-12 w-15 flex justify-center items-center text-2xl bg-white cursor-pointer  ${
                  isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                2
              </div>
              <div
                onClick={(e) => handleClick(e, "3")}
                className={`rounded-md h-12 w-15 flex justify-center items-center text-2xl bg-white cursor-pointer  ${
                  isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                3
              </div>
              <div
                onClick={(e) => handleClick(e, "*")}
                className={`rounded-md h-12 w-15 flex justify-center items-center text-xl bg-white cursor-pointer ${
                  isDark && "bg-blue-500 text-white"
                }`}
              >
                {<FaTimes />}
              </div>
              <div
                onClick={(e) => handleClick(e, "0")}
                className={`rounded-md h-12 w-15 flex justify-center items-center text-2xl bg-white cursor-pointer  ${
                  isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                0
              </div>
              <div
                onClick={(e) => handleClick(e, ".")}
                className={`rounded-md h-12 w-15 flex justify-center items-center text-2xl bg-white cursor-pointer  ${
                  isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                .
              </div>
              <div
                onClick={(e) => handleClick(e, "+")}
                className={`rounded-md h-12 w-15 flex justify-center items-center text-2xl bg-white cursor-pointer  ${
                  isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                +
              </div>
              <div
                onClick={(e) => handleClick(e, "-")}
                className={`rounded-md h-12 w-15 flex justify-center items-center text-xl bg-white cursor-pointer ${
                  isDark && "bg-blue-500 text-white"
                }`}
              >
                {<FaMinus />}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <div
                onClick={(e) => handleBackspace(e)}
                className={`rounded-md h-[40px] w-15 flex justify-center items-center text-xl  cursor-pointer ${
                  isDark ? "bg-red-600 text-white" : "bg-black text-white"
                }`}
              >
                DEL
              </div>
              <div
                onClick={(e) => handleCalculate(e)}
                className={`rounded-md h-[40px] w-15 flex justify-center items-center text-xl bg-white cursor-pointer ${
                  isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {<FaEquals />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calc;

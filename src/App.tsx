import "./assets/tailwind.css";
import "@mdi/font/css/materialdesignicons.css";
import Calc from "./components/Calc";
import { CalcProvider } from "./components/Context/CalcContext";

function App() {
  return (
    <>
      <CalcProvider>
        <Calc />
      </CalcProvider>
    </>
  );
}

export default App;

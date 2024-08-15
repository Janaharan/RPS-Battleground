import { Route, Routes } from "react-router-dom";
import "./App.css";
import Game from "./components/GamePage/Game";
import Home from "./components/HomePage/Home";

function App() {
  return <>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/game" element={<Game/>} />
  </Routes>
    {/* <Home/> */}
  </>;
}

export default App;

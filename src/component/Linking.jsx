import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Develop from "./Develop";


function Linking() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Develop />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Linking
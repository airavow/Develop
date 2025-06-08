import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Develop from "./Develop";
import Dashboard from "./Dashboard";
import Signup from "./Signup";

function Linking() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Develop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Linking;

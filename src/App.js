
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./components/Auth/Register";


function App() {
  const [auth, setAuth] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Login setAuth={setAuth} />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register setAuth={setAuth} />} />
      <Route path="/login" element={<Login setAuth={setAuth} />} />
    </Routes>
  );
}

export default App;

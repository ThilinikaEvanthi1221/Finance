import React, { useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";

// Layout used ONLY for pages that should include the footer
function AppLayoutWithFooter() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  const [auth, setAuth] = useState(false);

  return (
    <Routes>
      {/* Routes WITHOUT footer */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login setAuth={setAuth} />} />
      <Route path="/register" element={<Register setAuth={setAuth} />} />

      {/* Routes WITH footer */}
      <Route element={<AppLayoutWithFooter />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* add more routes that should show the footer here */}
      </Route>
    </Routes>
  );
}

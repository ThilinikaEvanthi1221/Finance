import React from "react";
import { Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer({ user: userProp, onLogout }) {
  const navigate = useNavigate();

  // You can pass user via props; otherwise fall back to localStorage or demo values
  const user =
    userProp || {
      name: localStorage.getItem("userName") || "John Doe",
      email: localStorage.getItem("userEmail") || "johndoe@example.com",
    };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      return;
    }
    // Default fallback logout
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  const handleBrandClick = () => {
    // Navigate to dashboard or home
    navigate("/dashboard");
  };

  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* User Info */}
        <div className="text-center md:text-left">
          <p className="font-semibold text-lg">{user.name}</p>
          <p className="text-gray-300 text-sm">{user.email}</p>
        </div>

        {/* Contact / Brand */}
        <div className="text-center">
          <h3 className="font-semibold text-lg mb-2">Contact Us</h3>

          {/* Logo + site name on one line as a button */}
          <button
            onClick={handleBrandClick}
            className="flex items-center justify-center mb-1 hover:opacity-80 transition"
          >
            <Wallet className="h-8 w-8 text-blue-600 mr-2" aria-hidden="true" />
            <span className="text-gray-200 text-sm font-medium">
              financetracker.com
            </span>
          </button>

          <p className="text-gray-300 text-sm">📞 +94 71 234 5678</p>
        </div>

        {/* Logout Button */}
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-6 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} FinanceTracker. All rights reserved.
      </div>
    </footer>
  );
}

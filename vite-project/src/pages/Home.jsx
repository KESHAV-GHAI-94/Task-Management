import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePrimaryClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  const handleSecondaryClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-[#f4f4f9] to-[#e8ecf3] flex items-center justify-center px-6">
        <div className="max-w-5xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-taupe-700">
            Quick<span className="text-blue-500">Task</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 italic">
            "Plan your tasks, track your progress, and achieve your goals."
          </p>
          <p className="text-gray-500 mb-10">
            Productivity is never an accident. It is always the result of
            commitment to excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handlePrimaryClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition"
            >
              {user ? "Go to Dashboard" : "Get Started"}
            </button>
            {user ? null : (
              <button
                onClick={handleSecondaryClick}
                className="border border-gray-400 hover:border-gray-600 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

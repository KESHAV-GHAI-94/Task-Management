import React from "react";
import backgroundsignup from "../assets/backgroundsignup.jpg"
import UseSignin from "../hooks/UseSignin";
import { Link } from "react-router-dom";
import {Eye,EyeOff} from "lucide-react";
const Login = () => {
  const {
    errors,
    showPass,
    setShowPass,
    handleChange,
    handleBlur,
    handleSubmit,
    form,
    touched,
    loading,
  } = UseSignin();
  return (
    <>
      <div className="flex justify-center md:justify-center lg:justify-start lg:px-20 p-5 items-center min-h-screen backdrop-blur-md bg-black/30 bg-cover" style={{ backgroundImage: `url(${backgroundsignup})`  }}>
        <form
          onSubmit={handleSubmit}
          className="bg-white/88 p-4 md:p-10 lg:p-10 rounded-xl shadow-lg w-120"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <label id="signupl">Email</label>
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-1.5 sm:p-3 border rounded-lg text-lg"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label id="signupl">Password</label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-1.5 sm:p-3 border rounded-lg text-lg"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-8 sm:top-10"
            >
              {showPass ? <Eye/> : <EyeOff/>}
            </button>
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 md:p-3 mb-2 mt-3 md:mb-5 rounded-lg text-lg font-semibold text-white 
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-taupe-800 hover:bg-taupe-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="flex flex-col items-center gap-3 mt-2 md:mt-4">
            <div className="flex gap-2">
              <p>Not Having an account?</p>
              <Link className="text-blue-700" to="/signup">
                Sign up
              </Link>
            </div>
            <Link
              className="text-blue-600 hover:underline"
              to="/login/forget-password"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;

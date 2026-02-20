import React from "react";
import useSignup from "../hooks/useSignup";
import { Link } from "react-router-dom";
import OtpModal from "../components/modals/Otpmodal";
import {Eye,EyeOff} from "lucide-react";

const Signup = () => {
  const {
    showOtpModal,
    setOtp,
    loadingOtp,
    errors,
    showPass,
    setShowPass,
    showCPass,
    setShowCPass,
    verifySignupOtp,
    handleChange,
    handleBlur,
    handleSubmit,
    form,
    setShowOtpModal,
    loading,
    otp,
  } = useSignup();
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center min-h-screen p-2 lg:px-20 bg-[#F4F4F9]">
        <form
          onSubmit={handleSubmit}
          className="bg-white/88 p-4 md:p-8 lg:p-10 rounded-xl shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create Account
          </h2>
          <div className="mb-2">
            <label id="signupl">Full Name</label>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-1.5 sm:p-3 border rounded-lg text-lg"
            />
            <p className="text-red-500 text-sm">{errors.name}</p>
          </div>
          <div className="mb-2">
            <label id="signupl">Email</label>
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-1.5 sm:p-3 border rounded-lg text-lg"
            />
            <p className="text-red-500 text-sm">{errors.email}</p>
          </div>
          <div className="mb-2">
            <label id="signupl">Phone</label>
            <input
              name="phone"
              placeholder="phone number"
              maxLength={10}
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-1.5 sm:p-3 border rounded-lg text-lg"
            />
            <p className="text-red-500 text-sm">{errors.phone}</p>
          </div>
          <div className="mb-2 relative">
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
              {showPass ? <Eye /> : <EyeOff />}
            </button>
            <p className="text-red-500 text-sm">{errors.password}</p>
          </div>
          <div className="mb-2 relative">
            <label id="signupl">Confirm Password</label>
            <input
              type={showCPass ? "text" : "password"}
              name="cpassword"
              placeholder="Confirm Password"
              value={form.cpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-1.5 sm:p-3 border rounded-lg text-lg"
            />
            <button
              type="button"
              onClick={() => setShowCPass(!showCPass)}
              className="absolute right-3 top-8 sm:top-10"
            >
              {showCPass ? <Eye /> : <EyeOff />}
            </button>
            <p className="text-red-500 text-sm">{errors.cpassword}</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 md:p-3 mb-3 md:mb-5 mt-4 md:mt-5 rounded-lg text-lg font-semibold text-white 
  ${
    loading ? "bg-gray-400 cursor-not-allowed" : "bg-taupe-800 hover:bg-taupe-600"
  }`}
          >
            {loading ? "Creating User..." : "Sign Up"}
          </button>
          <div className="flex justify-center gap-5">
            <p>Already have an account.</p>
            <Link className="loginlink  text-blue-700" to="/login">
              {" "}
              Sign in.
            </Link>
          </div>
        </form>
        <div className="hidden md:flex flex-col justify-center ml-10 max-w-lg">
  <h1 className="hero-title">From <span className="text-taupe-700">Chaos</span> to <span className="highlight text-[#3b82f6]">Clarity.</span></h1>
  <p className="hero-tagline text-center">Master your day with effortless tracking. Your journey to peak productivity starts right here.</p>
</div>
        {showOtpModal && (
  <OtpModal
    otp={otp}
    setOtp={setOtp}
    onVerify={verifySignupOtp}
    onClose={() => setShowOtpModal(false)}
    loading={loadingOtp}
    email={form.email}
    title="Verify Signup OTP"
    buttonText="Verify OTP"
  />
)}
      </div>
    </>
  );
};

export default Signup;

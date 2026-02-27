import { ForgetpassHandler } from "../../hooks/AuthHooks/ForgetpassHandler";
import OtpModal from "../../components/modals/Otpmodal";
import { useNavigate } from "react-router-dom";
const ForgetPassword = () => {
  const {
    email,
    setEmail,
    otp,
    setOtp,
    showModal,
    setShowModal,
    loading,
    sendOtp,
    verifyOtp,
  } = ForgetpassHandler();
  const Navigate = useNavigate();

  return (
    
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-6 bg-[#F4F4F9]">

      <form
        onSubmit={sendOtp}
        className="w-full max-w-[400px]  p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="
              w-full px-4 py-3 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-400
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-taupe-800 hover:bg-taupe-600 active:scale-95"
            }
          `}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
        <div className="mt-3 text-start md:text-center px-0.5 md:px-10 "><p>If remember Login Back? <span className="text-blue-600 cursor-pointer ps-4" onClick={() => Navigate("/login")}>login</span></p></div>
      </form>

      <div className="hidden md:flex flex-col justify-center ml-10 max-w-lg">
  <h1 className="hero-title"><span className="text-taupe-700">Update</span> your<span className="h text-[#3b82f6]"> credentials</span></h1>
  <p className="hero-tagline text-left">Don't let a forgotten password stall your progress. Click below to get back to your tasks</p>
</div>
      {showModal && (
        <OtpModal
          otp={otp}
          setOtp={setOtp}
          onVerify={verifyOtp}
          onClose={() => setShowModal(false)}
          loading={loading}
          email={email}
          title="Verify Reset OTP"
          buttonText="Verify OTP"
        />
      )}
    </div>
  );
};

export default ForgetPassword;

import React from "react";
const OtpModal = ({
  otp,
  setOtp,
  onVerify,
  onClose,
  loading = false,
  email = null,
  title = "Verify OTP",
  buttonText = "Verify OTP",
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-3">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full  max-w-[380px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
        {email && (
          <p className="text-sm text-gray-500 text-center mb-4">
            OTP sent to <span className="font-medium">{email}</span>
          </p>
        )}
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={onVerify}
          disabled={loading}
          className={`w-full p-3 rounded-lg text-white font-semibold
            ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}
          `}
        >
          {loading ? "Verifying..." : buttonText}
        </button>
      </div>
    </div>
  );
};

export default OtpModal;

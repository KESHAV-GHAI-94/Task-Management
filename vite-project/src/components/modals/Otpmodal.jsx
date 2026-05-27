import React, { useState } from "react";
const OtpModal = ({
  otp,
  setOtp,
  onVerify,
  onClose,
  onResend = null,
  loading = false,
  email = null,
  title = "Verify OTP",
  buttonText = "Verify OTP",
}) => {
  const [resending, setResending] = useState(false);

  const handleResend = async () => {
    if (!onResend) return;
    try {
      setResending(true);
      await onResend();
    } catch (err) {
      console.error("Resend error:", err);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-3">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-base md:text-lg font-semibold text-center mb-4">{title}</h2>
        {email && (
          <p className="text-xs md:text-sm text-gray-500 text-center mb-4">
            OTP sent to <span className="font-medium">{email}</span>
          </p>
        )}
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-1.5 md:p-3 mb-3 md:mb-4 focus:outline-none focus:ring-2 focus:ring-taupe-600"
        />
        <button
          onClick={onVerify}
          disabled={loading}
          className={`w-full p-1.5 md:p-3 rounded-lg text-white font-semibold mb-2
            ${loading ? "bg-gray-400" : "bg-taupe-800 hover:bg-taupe-600"}
          `}
        >
          {loading ? "Verifying..." : buttonText}
        </button>
        {onResend && (
          <button
            onClick={handleResend}
            disabled={resending}
            className={`w-full p-1.5 md:p-2 rounded-lg text-taupe-800 border border-taupe-800 font-medium text-xs md:text-sm hover:bg-taupe-50 transition
              ${resending ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        )}
      </div>
    </div>
  );
};

export default OtpModal;

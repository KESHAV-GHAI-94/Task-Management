import { useState } from "react";
import axios from "axios";
import Api from "../../Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export function ForgetpassHandler() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const sendOtp = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    try {
      setLoading(true);
      await Api.post("user/forget-password", {
        email,
      });
      toast.success("OTP sent to email");
      setShowModal(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };
  const verifyOtp = async () => {
    if (!otp.trim()) {
      toast.error("Please enter OTP");
      return;
    }
    try {
      await Api.post("user/check-forget-otp", {
        email,
        otp,
      });
      toast.success("OTP verified");
      setShowModal(false);
      navigate("/change-password", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };
  return {
    email,
    setEmail,
    otp,
    setOtp,
    showModal,
    setShowModal,
    loading,
    sendOtp,
    verifyOtp,
  };
}

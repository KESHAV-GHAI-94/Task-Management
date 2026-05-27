import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import Api from "../../Api"
export default function UseSignin() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [loadingOtp, setLoadingOtp] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    const trimmedValue = value.trim();
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!trimmedValue) {
        error = "Email is required";
      } else if (!emailRegex.test(trimmedValue)) {
        error = "Invalid email format";
      }
    }
    if (name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!trimmedValue) {
        error = "Password is required";
      } else if (!passwordRegex.test(trimmedValue)) {
        error =
          "Password must be 8+ chars with upper, lower & number";
      }
    }
    return error;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };
  const handleBlur = (e) => {
  const { name, value } = e.target;
  setTouched((prev) => ({
    ...prev,
    [name]: true,
  }));
  if (value.trim() !== "") {
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }
};

  const verifyLoginOtp = async () => {
    if (!otp.trim()) return toast.error("Enter OTP");
    try {
      setLoadingOtp(true);
      const res = await Api.post("/user/verify-otp", {
        email: form.email,
        otp,
      });
      toast.success(res.data.message);
      setShowOtpModal(false);
      
      // Automatically log the user in since they are now verified
      const loginRes = await Api.post("/user/login", {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("token", loginRes.data.token);
      toast.success(loginRes.data.message);
      setUser(loginRes.data.user);
      navigate("/dashboard", { state: { email: form.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const allTouched = {};
    Object.keys(form).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    let newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    if (Object.keys(newErrors).length > 0) {
    Object.values(newErrors).forEach((error) => {
      toast.error(error);
    });
    return;
  }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix validation errors");
      return;
    }
    try {
      setLoading(true);
      const res = await Api.post("/user/login",
        {
          email: form.email,
          password: form.password,
        });
      
      if (res.data.unverified) {
        toast.info(res.data.message);
        setShowOtpModal(true);
        return;
      }

      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message);
      setUser(res.data.user);
      navigate("/dashboard", { state: { email: form.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "login failed");
    } finally {
      setLoading(false);
    }
  };

  const resendLoginOtp = async () => {
    try {
      const res = await Api.post("/user/login", {
        email: form.email,
        password: form.password,
      });
      toast.success("A new OTP has been sent successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Resend failed");
    }
  };

  return {
    errors,
    showPass,
    setShowPass,
    handleChange,
    handleBlur,
    handleSubmit,
    form,
    touched,
    loading,
    showOtpModal,
    setShowOtpModal,
    otp,
    setOtp,
    loadingOtp,
    verifyLoginOtp,
    resendLoginOtp,
  };
}

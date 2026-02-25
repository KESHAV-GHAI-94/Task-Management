import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Api from "../../Api";
import { toast } from "react-toastify";
export function Changepass() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);
  const validate = () => {
    let newErrors = {};
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleReset = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await Api.post("/user/change-password", {
        email,
        newPassword: password,
      });
      toast.success("Password updated successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password");
    }
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    if (!value.trim()) return;
    let error = "";
    if (name === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!value) {
        error = "Password is required";
      } else if (!passwordRegex.test(value))
        error = "8+ chars with upper, lower & number";
    }
    if (name === "confirmPassword") {
      if (!value) {
        error = "Confirm password is required";
      } else if (value !== password) {
        error = "Passwords do not match";
      }
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };
  return {
    email,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    touched,
    handleBlur,
    handleReset,
    showCPass,
    showPass,
    setShowPass,
    setShowCPass
  };
}

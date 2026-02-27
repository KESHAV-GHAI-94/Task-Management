import { Changepass } from "../../hooks/AuthHooks/Changepass";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
// import MainLayout from "./MainLayout";
const ResetPassword = () => {
  const [showPass, setShowPass] = useState(false);
const [showCPass, setShowCPass] = useState(false);
  const {
    email,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    touched,
    handleBlur,
    handleReset,
  } = Changepass();


  
  return (
  <>
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-6 bg-[#F4F4F9]">

      {/* FORM */}
      <form
        onSubmit={handleReset}
        className="bg-white w-full max-w-md p-4 sm:p-6 md:p-8 shadow-xl rounded-xl"
      >
        {/* TITLE */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-center">
          Create Your Own Password
        </h2>

        <p className="text-center text-xs sm:text-sm text-gray-600 mb-5 sm:mb-6">
          Changing password for:
          <span className="font-medium text-black"> {email}</span>
        </p>

        {/* PASSWORD */}
        <div className="mb-3 relative">
          <label className="block text-sm sm:text-base font-medium mb-1">
            Password
          </label>

          <input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handleBlur}
            className="border w-full p-2 sm:p-3 rounded-lg
            text-sm sm:text-base md:text-lg
            focus:outline-none focus:ring-2 focus:ring-taupe-400"
          />

          {/* TOGGLE BUTTON */}
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-8 sm:top-9 md:top-10 text-gray-500"
          >
            {showPass ? <Eye size={18}/> : <EyeOff size={18}/>}
          </button>

          {touched.password && errors.password && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-4 relative">
          <label className="block text-sm sm:text-base font-medium mb-1">
            Confirm Password
          </label>

          <input
            type={showCPass ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={handleBlur}
            className="border w-full p-2 sm:p-3 rounded-lg
            text-sm sm:text-base md:text-lg
            focus:outline-none focus:ring-2 focus:ring-taupe-400"
          />

          {/* TOGGLE BUTTON */}
          <button
            type="button"
            onClick={() => setShowCPass(!showCPass)}
            className="absolute right-3 top-8 sm:top-9 md:top-10 text-gray-500"
          >
            {showCPass ? <Eye size={18}/> : <EyeOff size={18}/>}
          </button>

          {touched.confirmPassword && errors.confirmPassword && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full py-2 sm:py-3 rounded-lg 
          text-sm sm:text-base md:text-lg font-semibold text-white transition
          bg-taupe-800 hover:bg-taupe-600"
        >
          Update Password
        </button>
      </form>

      {/* HERO TEXT */}
      <div className="hidden md:flex flex-col justify-center ml-10 max-w-lg">
        <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
          <span className="text-taupe-700">Productivity</span> is never an{" "}
          <span className="text-blue-500">accident.</span>
        </h1>
      </div>

    </div>
  </>
);
};
export default ResetPassword;

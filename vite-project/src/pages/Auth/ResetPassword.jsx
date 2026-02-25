import { Changepass } from "../../hooks/AuthHooks/Changepass";
// import MainLayout from "./MainLayout";
const ResetPassword = () => {
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
      <form
        onSubmit={handleReset}
        className="p-8 bg-white w-full  max-w-[400px] shadow-xl rounded-xl w-96"
      >
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Create Your Own password
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Changing password for:
          <span className="font-medium text-black"> {email}</span>
        </p>
        
        <label className="p-2">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter new password"
          className="border p-3 mt-2 w-full mb-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-taupe-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handleBlur}
        />
        {touched.password && errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password}</p>
        )}
        <label className="p-2"> Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          className="border p-3  mt-2 w-full mb-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-taupe-400"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={handleBlur}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-4">{errors.confirmPassword}</p>
        )}
        <button className="bg-taupe-800 hover:bg-taupe-600 transition text-white px-5 py-3 w-full rounded-lg font-semibold">
          Update Password
        </button>
      </form>
      <div className="hidden md:flex flex-col justify-center ml-10 max-w-lg">
  <h1 className="hero-title"><span className="text-taupe-700">Productivity</span> is never an <span className="h text-[#3b82f6]">accident. </span></h1>
</div>
    </div>
    </>
  );
};
export default ResetPassword;

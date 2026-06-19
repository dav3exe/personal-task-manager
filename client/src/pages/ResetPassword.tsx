import React, { useState } from "react";
import logo from '../assets/logo.png'

import { Link, useNavigate, useSearchParams } from "react-router-dom";

// ---- BACKEND REMOVED: ResetSuccess component no longer needed ----
// ---- We use Modal instead ----
// import ResetSuccess from "./ResetSuccess";

// ---- BACKEND: imported resetPassword from api service ----
import { resetPassword } from "../services/api";

// ---- BACKEND ADDED: imported Modal component ----
import Modal from "../components/Modal";


// Import eye icons from Lucide React
import { Eye, EyeOff } from "lucide-react";  

type User = {
  password: string;
  confirmpassword: string;
};
type ErrorType = {
  password: boolean;
  confirmpassword: boolean;
};

const ResetPassword = () => {
  const [user, setUser] = useState<User>({
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState<ErrorType>({
    password: false,
    confirmpassword: false,
  });

  
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const navigate = useNavigate();
  const [searchParams] = useSearchParams();


  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [modal, setModal] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({
    show: false,
    type: "success",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputFieldName = name as keyof User;
    setUser({ ...user, [inputFieldName]: value });
    setError({ ...error, [inputFieldName]: false });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;
    const newError: ErrorType = {
      password: false,
      confirmpassword: false,
    };

    if (!user.password.trim() || user.password.length < 8) {
      newError.password = true;
      hasError = true;
    }

    if (!user.confirmpassword.trim() || user.confirmpassword !== user.password) {
      newError.confirmpassword = true;
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    // ---- BACKEND ADDED: get token from URL ----
    const token = searchParams.get("token");

    if (!token) {
      setModal({
        show: true,
        type: "error",
        message: "Invalid reset link. Please request a new one.",
      });
      return;
    }

    try {
      setIsLoading(true);

      const result = await resetPassword(token, {
        password: user.password,
        confirmPassword: user.confirmpassword,
      });

      if (result.success) {
        setModal({
          show: true,
          type: "success",
          message: result.message || "Password reset successful! You can now log in.",
        });
      } else {
        setModal({
          show: true,
          type: "error",
          message: result.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setModal({
        show: true,
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }

    setUser({ password: "", confirmpassword: "" });
  };

  const handleModalClose = () => {
    setModal({ ...modal, show: false });
    if (modal.type === "success") {
      navigate("/auth");
    }
  };

  return (
<main className="grid min-h-screen place-items-center bg-[#f8f6fb] bg-[radial-gradient(circle_at_top_left,rgba(155,81,224,0.12),transparent_28%),linear-gradient(135deg,#ffffff_0%,#f8f6fb_100%)] px-4 py-8 text-[#2d2935]">
      <section
        className="w-full max-w-[420px] rounded-lg border border-[#e8e1ee] bg-white p-6 shadow-[0_24px_70px_rgba(77,50,107,0.14)] sm:p-[30px]"
        aria-label="Reset password"
      >
        <div
          className="flex items-center gap-2.5 font-extrabold text-[#7b35c8] hover:underline cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="grid size-[42px] place-items-center" aria-hidden="true">
            <img src={logo} alt="" className="w-10 h-10" />
          </div>
          <span>TaskDuty</span>
        </div>

        <div className="mt-7">
          <h1 className="text-[26px] font-bold leading-tight tracking-normal sm:text-[30px]">
            Reset password
          </h1>
          <p className="mt-2.5 text-[15px] leading-relaxed text-[#716b7c]">
            Please enter a new password to take you back to your account.
          </p>
        </div>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className="grid gap-2">
            <span className="text-sm font-bold">Password</span>
            <div
              className={`flex min-h-12 items-center gap-2.5 rounded-lg border px-3.5 text-[#716b7c] transition focus-within:border-[#9b51e0] focus-within:shadow-[0_0_0_4px_rgba(155,81,224,0.12)] ${
                error.password ? "border-[#e5484d] bg-[#fff1f2]" : "border-[#e8e1ee] bg-white"
              }`}
            >
              <input
                className="w-full min-w-0 bg-transparent text-[#2d2935] outline-none placeholder:text-[#a9a1b3]"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={user.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                aria-invalid={Boolean(error.password)}
                aria-describedby={error.password ? "reset-password-error" : undefined}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-[#a9a1b3] transition-colors hover:text-[#716b7c] focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error.password && (
              <small className="text-[13px] leading-snug text-[#e5484d]" id="reset-password-error">
                {!user.password.trim()
                  ? "Password cannot be left blank"
                  : "Password must be at least 8 characters"}
              </small>
            )}
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold">Confirm password</span>
            <div
              className={`flex min-h-12 items-center gap-2.5 rounded-lg border px-3.5 text-[#716b7c] transition focus-within:border-[#9b51e0] focus-within:shadow-[0_0_0_4px_rgba(155,81,224,0.12)] ${
                error.confirmpassword ? "border-[#e5484d] bg-[#fff1f2]" : "border-[#e8e1ee] bg-white"
              }`}
            >
              <input
                className="w-full min-w-0 bg-transparent text-[#2d2935] outline-none placeholder:text-[#a9a1b3]"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmpassword"
                id="confirmpassword"
                value={user.confirmpassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                aria-invalid={Boolean(error.confirmpassword)}
                aria-describedby={error.confirmpassword ? "reset-confirm-error" : undefined}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="text-[#a9a1b3] transition-colors hover:text-[#716b7c] focus:outline-none"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error.confirmpassword && (
              <small className="text-[13px] leading-snug text-[#e5484d]" id="reset-confirm-error">
                {!user.confirmpassword.trim()
                  ? "Confirm password cannot be left blank"
                  : "Passwords do not match"}
              </small>
            )}
          </label>

          <button
            className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#9b51e0] font-extrabold text-white shadow-[0_12px_24px_rgba(155,81,224,0.25)] transition hover:-translate-y-px hover:bg-[#7b35c8] hover:shadow-[0_14px_28px_rgba(123,53,200,0.28)] active:translate-y-0 disabled:opacity-80 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset password"}
          </button>

          <span className="flex items-center justify-center gap-1.5 text-[13px] font-light">
            Already have an account?
            <Link to="/auth" className="font-medium text-[#7b35c8] underline transition hover:text-[#9b51e0]">
              Sign in
            </Link>
          </span>
        </form>
      </section>

      {modal.show && (
        <Modal
          type={modal.type}
          message={modal.message}
          onClose={handleModalClose}
        />
      )}
    </main>
  );
};

export default ResetPassword;
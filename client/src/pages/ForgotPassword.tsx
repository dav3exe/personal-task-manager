import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'


import { forgotPassword } from "../services/api";


import Modal from "../components/Modal";

type User = {
  email: string;
};
type ErrorType = {
  email: boolean;
};

const ForgotPassword = () => {
  const [user, setUser] = useState<User>({
    email: "",
  });
  const [error, setError] = useState<ErrorType>({
    email: false,
  });
  const navigate = useNavigate();


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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;


    const newError: ErrorType = { email: false };

    if (!user.email.trim() || !user.email.includes("@")) {
      newError.email = true;
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    try {
      setIsLoading(true);

      const result = await forgotPassword(user.email);

     if (result.success) {

        setModal({
          show: true,
          type: "success",
          message: result.message || "Password reset link sent! Please check your email.",
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

    setUser({ email: "" });
    setError({ email: false });
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
        aria-label="Forgot password"
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
            Forgot password
          </h1>
          <p className="mt-2.5 text-[15px] leading-relaxed text-[#716b7c]">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className="grid gap-2">
            <span className="text-sm font-bold">Email</span>
            <div
              className={`flex min-h-12 items-center gap-2.5 rounded-lg border px-3.5 text-[#716b7c] transition focus-within:border-[#9b51e0] focus-within:shadow-[0_0_0_4px_rgba(155,81,224,0.12)] ${
                error.email ? "border-[#e5484d] bg-[#fff1f2]" : "border-[#e8e1ee] bg-white"
              }`}
            >
              <input
                className="w-full min-w-0 bg-transparent text-[#2d2935] outline-none placeholder:text-[#a9a1b3]"
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={Boolean(error.email)}
                aria-describedby={error.email ? "forgot-email-error" : undefined}
              />
            </div>
            {error.email && (
              <small className="text-[13px] leading-snug text-[#e5484d]" id="forgot-email-error">
                {!user.email.trim()
                  ? "Email cannot be left blank"
                  : "Please enter a valid email address"}
              </small>
            )}
          </label>

          <button
            className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#9b51e0] font-extrabold text-white shadow-[0_12px_24px_rgba(155,81,224,0.25)] transition hover:-translate-y-px hover:bg-[#7b35c8] hover:shadow-[0_14px_28px_rgba(123,53,200,0.28)] active:translate-y-0 disabled:opacity-80 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Recover password"}
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

export default ForgotPassword;
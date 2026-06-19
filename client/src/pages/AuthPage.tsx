import React, { useRef, useState } from "react";
import { CheckCircle2, ClipboardList, Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import { loginUser, registerUser, getToken } from "../services/api";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { useLoginUser, useRegisterUser } from "../hooks/useApi";
import { saveToken } from "../services/api";
import { useAuth } from "../context/AuthContext";
import logo from '../assets/logo.png'


type AuthMode = "signin" | "create";

type AuthFormValues = {
  name: string;
  email: string;
  password: string;
};

type AuthFormErrors = Partial<Record<keyof AuthFormValues, string>>;

const initialValues: AuthFormValues = {
  name: "",
  email: "",
  password: ""
};

function validateForm(values: AuthFormValues, mode: AuthMode): AuthFormErrors {
  const errors: AuthFormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (mode === "create" && values.name.trim().length < 2) {
    errors.name = "Enter your name with at least 2 characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

export default function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode] = React.useState<AuthMode>("signin");
  const [values, setValues] = React.useState<AuthFormValues>(initialValues);
  const [errors, setErrors] = React.useState<AuthFormErrors>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const { setIsLoggedIn, setUser} = useAuth();

  const registerMutation = useRegisterUser();
  const loginMutation = useLoginUser();

  const [modal, setModal] = useState<{
      show: boolean;
      type: "success" | "error" | "verify";
      message: string;
  }>({ show: false, type: "success", message: "" })


  const isCreateAccount = mode === "create";

  function updateField(field: keyof AuthFormValues, value: string) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);

    if (submitted || errors[field]) {
      setErrors(validateForm(nextValues, mode));
    }
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setErrors({});
    setSubmitted(false);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const nextErrors = validateForm(values, mode);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (isCreateAccount) {

        registerMutation.mutate(

            {
                name: values.name.trim(),
                email: values.email.trim(),
                password: values.password
            },

            {
                onSuccess: (data: any) => {
                  setModal({
                      show: true,
                      type: "success",
                      message: "Account created! Check your email to verify your account.",
                  });

                },

                onError: (err:any) => {

                  setServerError(
                      err.response?.data?.message ??
                      "Something went wrong"
                  );
                  
                  setModal({
                      show: true,
                      type: "error",
                      message: serverError,
                  });


                }

            }

        );

    }

    else {

        loginMutation.mutate(

            {
                email: values.email.trim(),
                password: values.password
            },

            {
                onSuccess: (data: any) => {
                  saveToken(data.token)
                  setIsLoggedIn(true)
                  setUser({ name: data.user.name, email: data.user.email });
                  navigate("/my-tasks");

                },

                onError: (err: any) => {
                const message = err.response?.data?.message ?? "Something went wrong";
                setServerError(message);
                setModal({ show: true, type: "error", message });
                }

            }

        );

    }
  }

    const handleCloseModal = () => {
    // const isSuccess = modal.type === "success";
    // const isVerify = modal.type === "verify";

    setModal((prev) => ({ ...prev, show: false }));

    // if (isSuccess) {
    //   setTimeout(() => {
    //     navigate("/my-tasks");
    //   }, 200)
    // } else if (isVerify){
    //   setTimeout(() => {
    //     navigate(`verify-email?token=${verifyToken}`);
    //   }, 200)
      
    // }
  };

  const isLoading =
    registerMutation.isPending ||
    loginMutation.isPending;

  return (
    <main className="grid min-h-screen place-items-center bg-[#f8f6fb] bg-[radial-gradient(circle_at_top_left,rgba(155,81,224,0.12),transparent_28%),linear-gradient(135deg,#ffffff_0%,#f8f6fb_100%)] px-4 py-8 text-[#2d2935]">
      <section
        className="w-full max-w-[420px] rounded-lg border border-[#e8e1ee] bg-white p-6 shadow-[0_24px_70px_rgba(77,50,107,0.14)] sm:p-[30px]"
        aria-label={isCreateAccount ? "Create account" : "Sign in"}
      >
        <div className="flex items-center gap-2.5 font-extrabold text-[#7b35c8] hover:underline"
        onClick={()=>navigate("/")}>
          <div className="grid size-[42px] place-items-center" aria-hidden="true">
            <img src={logo} alt="" className="w-10 h-10" />
          </div>
          <span>TaskDuty</span>
        </div>

        <div className="mt-7">
          <h1 className="text-[26px] font-bold leading-tight tracking-normal sm:text-[30px]">
            {isCreateAccount ? "Create account" : "Welcome back"}
          </h1>
          <p className="mt-2.5 text-[15px] leading-relaxed text-[#716b7c]">
            {isCreateAccount ? "Create your account to start managing tasks." : "Sign in to continue managing your tasks."}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-1.5 rounded-lg bg-[#f3eff8] p-1.5" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            className={`min-h-10 rounded-md text-sm font-bold transition ${
              mode === "signin" ? "bg-white text-[#7b35c8] shadow-[0_6px_18px_rgba(77,50,107,0.1)]" : "text-[#716b7c]"
            }`}
            onClick={() => switchMode("signin")}
            role="tab"
            aria-selected={mode === "signin"}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`min-h-10 rounded-md text-sm font-bold transition ${
              mode === "create" ? "bg-white text-[#7b35c8] shadow-[0_6px_18px_rgba(77,50,107,0.1)]" : "text-[#716b7c]"
            }`}
            onClick={() => switchMode("create")}
            role="tab"
            aria-selected={mode === "create"}
          >
            Create account
          </button>
        </div>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          {isCreateAccount && (
            <label className="grid gap-2">
              <span className="text-sm font-bold">Name</span>
              <div
                className={`flex min-h-12 items-center gap-2.5 rounded-lg border px-3.5 text-[#716b7c] transition focus-within:border-[#9b51e0] focus-within:shadow-[0_0_0_4px_rgba(155,81,224,0.12)] ${
                  errors.name ? "border-[#e5484d] bg-[#fff1f2]" : "border-[#e8e1ee] bg-white"
                }`}
              >
                <UserRound size={18} aria-hidden="true" />
                <input
                  className="w-full min-w-0 bg-transparent text-[#2d2935] outline-none placeholder:text-[#a9a1b3]"
                  type="text"
                  value={values.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "auth-name-error" : undefined}
                />

              </div>
              {errors.name && <small className="text-[13px] leading-snug text-[#e5484d]" id="auth-name-error">{errors.name}</small>}
            </label>
          )}

          <label className="grid gap-2">
            <span className="text-sm font-bold">Email</span>
            <div
              className={`flex min-h-12 items-center gap-2.5 rounded-lg border px-3.5 text-[#716b7c] transition focus-within:border-[#9b51e0] focus-within:shadow-[0_0_0_4px_rgba(155,81,224,0.12)] ${
                errors.email ? "border-[#e5484d] bg-[#fff1f2]" : "border-[#e8e1ee] bg-white"
              }`}
            >
              <Mail size={18} aria-hidden="true" />
              <input
                className="w-full min-w-0 bg-transparent text-[#2d2935] outline-none placeholder:text-[#a9a1b3]"
                type="email"
                value={values.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "auth-email-error" : undefined}
              />
            </div>
            {errors.email && <small className="text-[13px] leading-snug text-[#e5484d]" id="auth-email-error">{errors.email}</small>}
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold">Password</span>
            <div
              className={`flex min-h-12 items-center gap-2.5 rounded-lg border px-3.5 text-[#716b7c] transition focus-within:border-[#9b51e0] focus-within:shadow-[0_0_0_4px_rgba(155,81,224,0.12)] ${
                errors.password ? "border-[#e5484d] bg-[#fff1f2]" : "border-[#e8e1ee] bg-white"
              }`}
            >
              <Lock size={18} aria-hidden="true" />
              <input
                className="w-full min-w-0 bg-transparent text-[#2d2935] outline-none placeholder:text-[#a9a1b3]"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={(event) => updateField("password", event.target.value)}
                placeholder="At least 8 characters"
                autoComplete={isCreateAccount ? "new-password" : "current-password"}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "auth-password-error" : undefined}
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
            <p className=" text-[12px] text-red-500 font-medium hover:underline"
            onClick={()=>navigate("/forgotpassword")}>Forgot password?</p>
            {errors.password && <small className="text-[13px] leading-snug text-[#e5484d]" id="auth-password-error">{errors.password}</small>}
          </label>

          <button
            className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#9b51e0] font-extrabold text-white shadow-[0_12px_24px_rgba(155,81,224,0.25)] transition hover:-translate-y-px hover:bg-[#7b35c8] hover:shadow-[0_14px_28px_rgba(123,53,200,0.28)] active:translate-y-0"
            type="submit"
            disabled={isLoading}
          >
            <CheckCircle2 size={18} aria-hidden="true" />
            {isLoading
                ? "Loading..."
                : isCreateAccount
                    ? "Create account"
                    : "Sign in"
            }
          </button>
        </form>
      </section>

      {modal.show && (
        <Modal
          type={modal.type}
          message={modal.message}
          onClose={handleCloseModal}
        />
      )}

    </main>
  );
}

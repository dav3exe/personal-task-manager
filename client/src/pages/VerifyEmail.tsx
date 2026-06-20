import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../services/api";


const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  // ---- FIX: useRef prevents double call in React StrictMode ----
  const hasVerified = useRef(false);
  

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    

    const verifyUserEmail = async () => {
        try {

            const data = await verifyEmail(token);

          if (data.success) {
            setStatus("success");
            setMessage(data.message);
          } else {
            setStatus("error");
            setMessage(data.message || "Verification failed.");
          }

        } catch (err: any) {

            setStatus("error");

            setMessage(
                err.response?.data?.message ??
                "Something went wrong. Please try again."
            );

        }
    };

    verifyUserEmail();
  }, [searchParams]);

  return (
<div className="min-h-screen bg-[#f8f6fb] bg-[radial-gradient(circle_at_top_left,rgba(155,81,224,0.12),transparent_28%),linear-gradient(135deg,#ffffff_0%,#f8f6fb_100%)] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-[0_24px_70px_rgba(77,50,107,0.14)] p-10 w-full max-w-md flex flex-col items-center gap-6">

        {/* Loading */}
        {status === "loading" && (
          <>
            <div className="w-16 h-16 rounded-full border-4 border-[#9b51e0] border-t-transparent animate-spin" />
            <p className="text-[#716b7c] text-[15px] font-medium">Verifying your email...</p>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-[#2d2935] font-bold text-[22px] text-center">Email Verified!</h2>
            <p className="text-[#716b7c] text-[14px] text-center">{message}</p>
            <button
              onClick={() => navigate("/auth")}
              className="w-full bg-[#9b51e0] text-white py-3 rounded-lg font-semibold transition hover:bg-[#7b35c8]">
              Go to Login
            </button>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-[#2d2935] font-bold text-[22px] text-center">Verification Failed</h2>
            <p className="text-[#716b7c] text-[14px] text-center">{message}</p>
            <button
              onClick={() => navigate("/auth")}
              className="w-full bg-[#9b51e0] text-white py-3 rounded-lg font-semibold transition hover:bg-[#7b35c8]">
              Back to Create Account
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default VerifyEmail;
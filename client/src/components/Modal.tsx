import { type FC } from "react";
import emailIcon from '../assets/email.png'

interface ModalProps {
  type: "success" | "error" | "verify" | "login";
  message: string;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ type, message, onClose }) => {
  const isGood = type === "success"
  const isVerify = type === "verify"
  const login = type === "login"


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm flex flex-col items-center gap-4">

        {/* Icon */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center
          ${isGood ? "bg-green-100" : isVerify ? "bg-purple-200" : "bg-red-100"}`}>
          {isGood ? (
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>

          ) : isVerify ? (<img src={emailIcon} alt="" 
          className="w-8 h-8"/>)

           : (
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        {/* Message */}
        <p className="text-center text-[15px] text-[#444545] font-medium">
          {message}
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className={`w-full py-3 rounded-lg text-white font-semibold text-[15px]
            ${isGood ? "bg-[#974FD0] border border-[#974FD0] hover:bg-[#7234a5]" : isVerify ? "bg-[#974FD0] border border-[#974FD0] hover:bg-[#7234a5]" : login ? "bg-[#974FD0] border border-[#974FD0] hover:bg-[#7234a5]" : "bg-red-500 hover:bg-red-600"}`}>
          {type === "verify" ? "Verify email" : type === "success" ? "OK" : type === "login" ? "Login" : "Try Again"}
        </button>

      </div>
    </div>
  );
};

export default Modal;
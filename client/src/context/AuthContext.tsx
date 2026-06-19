import { createContext, useContext, useState, useEffect } from "react";
import { type User } from "../types/user";
import { type Verified } from "../types/verified";
import { getCurrentUser, removeToken, getToken } from "../services/api";

interface AuthContextType  {
  isLoggedIn: boolean
  setIsLoggedIn: (loggedIn: boolean) => void
  user: User;
  setUser: (user: User) => void
  isVerified: Verified;
  setIsVerified: (verified: Verified) => void
  isCheckingAuth: boolean
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    console.log("isLoggedIn: ", isLoggedIn);
    const [user, setUser] = useState<User>({ name: "", email: "" })
    const [isVerified, setIsVerified] = useState<Verified>({ email: "", password: "" })
    const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

    
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();

      if (!token) {
        // No token found — user is not logged in
        setIsCheckingAuth(false);
        return;
      }

      try {
        // ---- BACKEND CALL: verify token and get user data ----
        const result = await getCurrentUser();

        if (result.success) {
          // Token is valid — restore auth state
          setIsLoggedIn(true);
          setUser({ name: result.user.name, email: result.user.email });
        } else {
          // Token is invalid or expired — clear it
          removeToken();
          setIsLoggedIn(false);
        }
      } catch (error) {
        // Network error — clear token
        removeToken();
        setIsLoggedIn(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);


  return (
  <AuthContext.Provider value={{
      isLoggedIn, setIsLoggedIn,
      user, setUser,
      isVerified, setIsVerified,
      isCheckingAuth

      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
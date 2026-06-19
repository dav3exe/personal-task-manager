import { Router } from "express";
import { deleteUser, forgotPassword, getAllUsers, getMe, getUsersCount, login, register, resetPassword, verifyEmail } from "../controllers/authController";
import { adminOnly, protect } from "../middleware/authMiddleware";

const router = Router()


// Public routes — no token needed
router.post("/register", register)
router.get("/verify-email/:token", verifyEmail)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)

// token required
router.get("/users/count", protect, adminOnly, getUsersCount)
router.get("/users/count/all", protect, adminOnly, getAllUsers)
router.delete("/delete/:id", protect, adminOnly, deleteUser)

// token required
router.get("/me", protect, getMe)

export default router

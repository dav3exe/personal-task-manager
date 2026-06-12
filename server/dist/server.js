"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const dns_1 = __importDefault(require("dns"));
// import authRoutes from "./routes/authRoutes"
// import cors from "cors"
dns_1.default.setServers(['8.8.8.8', '8.8.4.4']);
// Load environment variables first
dotenv_1.default.config();
// Connect to MongoDB
(0, db_1.default)();
const app = (0, express_1.default)();
// CORS — allows frontend to talk to backend
// app.use(
//   cors({
//     origin: [
//       process.env.CLIENT_URL || "http://localhost:5173",
//       "https://nestfinder-real-estate.vercel.app",
//       "http://localhost:5173",
//     ],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// Parse JSON
app.use(express_1.default.json());
// Parse form data
app.use(express_1.default.urlencoded({ extended: true }));
// ============================================================
// ROUTES
// ============================================================
// app.use("/api/auth", authRoutes)
// Health check — to confirm server is running
app.get("/api/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "NestFinder Pro API is running",
    });
});
// ============================================================
// START SERVER
// ============================================================
const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Frontend URL: ${process.env.CLIENT_URL}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map
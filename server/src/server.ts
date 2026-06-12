import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import dns from 'dns';
import taskRoutes from "./routes/taskRoutes"
import cors from "cors"

dns.setServers(['8.8.8.8', '8.8.4.4']);
// Load environment variables first
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS — allows frontend to talk to backend
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:5173",
      "https://nestfinder-real-estate.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON
app.use(express.json());

// Parse form data
app.use(express.urlencoded({extended:true}))


// ============================================================
// ROUTES
// ============================================================
app.use("/api/", taskRoutes)


// Health check — to confirm server is running
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: " Task Manager API is running",
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

export default app;
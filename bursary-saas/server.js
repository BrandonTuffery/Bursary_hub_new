import express from "express";
import next from "next";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./client" });
const handle = app.getRequestHandler();

const server = express();
server.use(cors());
server.use(express.json());
server.use(fileUpload());

// PostgreSQL setup (Render injects DATABASE_URL)
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined
});

// Health check
server.get("/api/health", (_req, res) => res.json({ ok: true }));

// --- Simple auth (MVP): demo-only (email/password stored in students table) ---
import authRouter from "./routes/auth.js";
import bursaryRouter from "./routes/bursaries.js";
import applicationRouter from "./routes/applications.js";
import documentRouter from "./routes/documents.js";

// Attach DB pool to req for routers (tiny DI)
server.use((req, _res, nextFn) => { req.db = pool; nextFn(); });

server.use("/api/auth", authRouter);
server.use("/api/bursaries", bursaryRouter);
server.use("/api/applications", applicationRouter);
server.use("/api/documents", documentRouter);

// Next.js handler
app.prepare().then(() => {
  server.all("*", (req, res) => handle(req, res));
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => console.log(`🚀 Bursary SaaS running on http://localhost:${PORT}`));
});

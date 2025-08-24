import express from "express";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
const router = express.Router();

function auth(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No token" });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET || "devsecret"); next(); }
  catch { return res.status(401).json({ error: "Invalid token" }); }
}

router.post("/upload", auth, async (req, res) => {
  if (!req.files || !req.files.file) return res.status(400).json({ error: "No file" });
  const { application_id } = req.body;
  const file = req.files.file;
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  const filepath = path.join(uploadsDir, `${Date.now()}-${file.name}`);
  await file.mv(filepath);

  const url = `/uploads/${path.basename(filepath)}`; // In production, use S3 and a signed URL

  // Save doc record
  const q = await req.db.query(
    "INSERT INTO documents(application_id, file_url, verification_status) VALUES($1,$2,'Pending') RETURNING *",
    [application_id, url]
  );

  // Placeholder for AI verification hook
  // TODO: call OpenAI / custom verification then update documents.verification_status

  res.json({ document: q.rows[0], verification: { status: "pending", reason: "AI check to be run" } });
});

export default router;

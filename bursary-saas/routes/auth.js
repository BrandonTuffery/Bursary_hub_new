import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "devsecret");
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
  const hash = await bcrypt.hash(password, 10);
  try {
    const q = await req.db.query(
      "INSERT INTO students(name, email, password) VALUES($1,$2,$3) RETURNING id,name,email",
      [name, email, hash]
    );
    res.json(q.rows[0]);
  } catch (e) {
    res.status(400).json({ error: "Email may already exist", details: String(e) });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const q = await req.db.query("SELECT id,name,email,password FROM students WHERE email=$1", [email]);
  if (!q.rowCount) return res.status(400).json({ error: "User not found" });
  const user = q.rows[0];
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Wrong password" });
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });
  res.json({ token });
});

router.get("/me", authMiddleware, async (req, res) => {
  res.json({ user: req.user });
});

export default router;

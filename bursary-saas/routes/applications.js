import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

function auth(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No token" });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET || "devsecret"); next(); }
  catch { return res.status(401).json({ error: "Invalid token" }); }
}

router.post("/", auth, async (req, res) => {
  const { bursary_id, statement } = req.body;
  const q = await req.db.query(
    "INSERT INTO applications(student_id, bursary_id, statement, status) VALUES ($1,$2,$3,'Pending') RETURNING *",
    [req.user.id, bursary_id, statement || null]
  );
  res.json(q.rows[0]);
});

router.get("/", auth, async (req, res) => {
  const q = await req.db.query(
    `SELECT a.*, b.title AS bursary_title 
     FROM applications a 
     JOIN bursaries b ON b.id=a.bursary_id
     WHERE a.student_id=$1 ORDER BY a.id DESC`, [req.user.id]);
  res.json(q.rows);
});

export default router;

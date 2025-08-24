import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const q = await req.db.query("SELECT id, title, description, eligibility, amount, deadline FROM bursaries ORDER BY id DESC");
  res.json(q.rows);
});

export default router;

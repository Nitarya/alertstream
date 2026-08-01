import express from "express";
import cors from "cors";
import { getAll, markAsRead } from "./data.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/notifications", (req, res) => {
  const unreadOnly = req.query.unreadOnly === "true";
  res.json(getAll(unreadOnly));
});

app.patch("/api/notifications/:id/read", (req, res) => {
  const result = markAsRead(req.params.id);
  res.status(result.status).json(result.error ? { error: result.error } : result.data);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

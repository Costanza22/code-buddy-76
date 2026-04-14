import cors from "cors";
import express from "express";
import { getLesson, getTrack, tracks } from "../../src/data/lessons.ts";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "code-buddy-api" });
});

app.get("/api/tracks", (_req, res) => {
  res.json(tracks);
});

app.get("/api/tracks/:trackId", (req, res) => {
  const track = getTrack(req.params.trackId);
  if (!track) {
    res.status(404).json({ error: "Trilha não encontrada" });
    return;
  }
  res.json(track);
});

app.get("/api/tracks/:trackId/lessons/:lessonId", (req, res) => {
  const payload = getLesson(req.params.trackId, req.params.lessonId);
  if (!payload) {
    res.status(404).json({ error: "Aula não encontrada" });
    return;
  }
  res.json(payload);
});

app.listen(PORT, () => {
  console.log(`API em http://127.0.0.1:${PORT}`);
});

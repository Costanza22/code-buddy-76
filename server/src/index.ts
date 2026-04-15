import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import session from "express-session";
import type { Track } from "./tracksTypes.js";
import { registerAuthRoutes } from "./authRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tracksPath = join(__dirname, "../data/tracks.json");

let tracks: Track[];
try {
  tracks = JSON.parse(readFileSync(tracksPath, "utf-8")) as Track[];
} catch (e) {
  console.error("Falha ao ler", tracksPath, "- corre na raiz: npm run export-tracks");
  throw e;
}

function getTrack(id: string): Track | undefined {
  return tracks.find((t) => t.id === id);
}

function getLesson(trackId: string, lessonId: string) {
  const track = getTrack(trackId);
  if (!track) return null;
  const index = track.lessons.findIndex((l) => l.id === lessonId);
  if (index === -1) return null;
  return {
    lesson: track.lessons[index],
    track,
    index,
    prev: track.lessons[index - 1] ?? null,
    next: track.lessons[index + 1] ?? null,
  };
}

const app = express();
const PORT = Number(process.env.PORT) || 3001;
/** 127.0.0.1 evita casos em que `localhost` resolve só para ::1 e o proxy/Postman falham no Windows. */
const HOST = process.env.HOST ?? "127.0.0.1";

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "dev-secret-muda-em-producao",
    name: "codestart.sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  }),
);

registerAuthRoutes(app);

app.get("/api", (_req, res) => {
  const base = `http://${HOST}:${PORT}`;
  res.json({
    service: "code-buddy-api",
    base,
    routes: [
      "GET /api — esta lista",
      "GET /api/health",
      "GET /api/tracks",
      "GET /api/tracks/:trackId",
      "GET /api/tracks/:trackId/lessons/:lessonId",
      "GET /api/auth/me",
      "POST /api/auth/register — JSON: { email, password, name? }",
      "POST /api/auth/login — JSON: { email, password }",
      "POST /api/auth/logout",
    ],
    postman: {
      exampleUrl: `${base}/api/auth/register`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      bodyFields: ["email (string)", "password (string, ≥8 caracteres)", "name (string, opcional)"],
    },
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "code-buddy-api", auth: true });
});

app.get("/api/tracks", (_req, res, next) => {
  try {
    res.json(tracks);
  } catch (e) {
    next(e);
  }
});

app.get("/api/tracks/:trackId", (req, res, next) => {
  try {
    const track = getTrack(req.params.trackId);
    if (!track) {
      res.status(404).json({ error: "Trilha não encontrada" });
      return;
    }
    res.json(track);
  } catch (e) {
    next(e);
  }
});

app.get("/api/tracks/:trackId/lessons/:lessonId", (req, res, next) => {
  try {
    const payload = getLesson(req.params.trackId, req.params.lessonId);
    if (!payload) {
      res.status(404).json({ error: "Aula não encontrada" });
      return;
    }
    res.json(payload);
  } catch (e) {
    next(e);
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: `Cannot ${req.method} ${req.originalUrl}`,
    hint: "Todas as rotas começam por /api. Ex.: POST /api/auth/register (corpo JSON). GET /api devolve a lista.",
  });
});

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({
    error: err instanceof Error ? err.message : "Internal Server Error",
  });
});

app.listen(PORT, HOST, () => {
  console.log(`API em http://${HOST}:${PORT}`);
  console.log(
    "[api] sessão: GET /api/auth/me | POST /api/auth/register | POST /api/auth/login | POST /api/auth/logout",
  );
});

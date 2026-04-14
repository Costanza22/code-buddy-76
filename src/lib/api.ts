import type { Lesson, Track } from "@/data/lessons";

/** Origem da API (sem barra final). Se VITE_API_BASE_URL acabar em /api, remove-se para não duplicar /api nos paths. */
function apiOrigin(): string {
  let o = (import.meta.env.VITE_API_BASE_URL ?? "").trim();
  o = o.replace(/\/+$/, "");
  if (o.endsWith("/api")) {
    o = o.slice(0, -4).replace(/\/+$/, "");
  }
  return o;
}

const cred: RequestInit = { credentials: "include" };

async function parseJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    let msg = text.slice(0, 280) || res.statusText || `HTTP ${res.status}`;
    const t = text.trim();
    if (t.startsWith("{")) {
      try {
        const j = JSON.parse(t) as { error?: string };
        if (typeof j?.error === "string") msg = j.error;
      } catch {
        /* texto não é JSON válido */
      }
    }
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export async function fetchMe(): Promise<AuthUser | null> {
  const res = await fetch(`${apiOrigin()}/api/auth/me`, cred);
  const j = await parseJson<{ user: AuthUser | null }>(res);
  return j.user;
}

export async function postLogin(email: string, password: string): Promise<AuthUser> {
  const res = await fetch(`${apiOrigin()}/api/auth/login`, {
    ...cred,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const j = await parseJson<{ user: AuthUser }>(res);
  return j.user;
}

export async function postRegister(email: string, password: string, name?: string): Promise<AuthUser> {
  const res = await fetch(`${apiOrigin()}/api/auth/register`, {
    ...cred,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name: name || undefined }),
  });
  const j = await parseJson<{ user: AuthUser }>(res);
  return j.user;
}

export async function postLogout(): Promise<void> {
  const res = await fetch(`${apiOrigin()}/api/auth/logout`, { ...cred, method: "POST" });
  await parseJson<{ ok: boolean }>(res);
}

export async function fetchTracks(): Promise<Track[]> {
  const res = await fetch(`${apiOrigin()}/api/tracks`, cred);
  return parseJson<Track[]>(res);
}

export async function fetchTrack(trackId: string): Promise<Track> {
  const res = await fetch(`${apiOrigin()}/api/tracks/${encodeURIComponent(trackId)}`, cred);
  return parseJson<Track>(res);
}

export type LessonPayload = {
  lesson: Lesson;
  track: Track;
  index: number;
  prev: Lesson | null;
  next: Lesson | null;
};

export async function fetchLesson(trackId: string, lessonId: string): Promise<LessonPayload> {
  const res = await fetch(
    `${apiOrigin()}/api/tracks/${encodeURIComponent(trackId)}/lessons/${encodeURIComponent(lessonId)}`,
    cred,
  );
  return parseJson<LessonPayload>(res);
}

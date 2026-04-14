import type { Lesson, Track } from "@/data/lessons";

const base = () => (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

async function parseJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchTracks(): Promise<Track[]> {
  const res = await fetch(`${base()}/api/tracks`);
  return parseJson<Track[]>(res);
}

export async function fetchTrack(trackId: string): Promise<Track> {
  const res = await fetch(`${base()}/api/tracks/${encodeURIComponent(trackId)}`);
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
    `${base()}/api/tracks/${encodeURIComponent(trackId)}/lessons/${encodeURIComponent(lessonId)}`,
  );
  return parseJson<LessonPayload>(res);
}

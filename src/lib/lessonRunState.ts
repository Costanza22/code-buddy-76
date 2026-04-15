const PASS_KEY = "codestart-lesson-passed";
const LAST_KEY = "codestart-lesson-last-run";

function readPassedIds(): Set<string> {
  try {
    const r = localStorage.getItem(PASS_KEY);
    if (!r) return new Set();
    const a = JSON.parse(r) as unknown;
    return new Set(Array.isArray(a) ? (a as string[]) : []);
  } catch {
    return new Set();
  }
}

export function isLessonMarkedPassed(lessonId: string): boolean {
  return readPassedIds().has(lessonId);
}

export function markLessonPassed(lessonId: string): void {
  try {
    const s = readPassedIds();
    s.add(lessonId);
    localStorage.setItem(PASS_KEY, JSON.stringify([...s]));
  } catch {
    /* ignore */
  }
}

type LastMap = Record<string, "ok" | "fail">;

function readLastMap(): LastMap {
  try {
    const r = sessionStorage.getItem(LAST_KEY);
    if (!r) return {};
    const o = JSON.parse(r) as unknown;
    return o && typeof o === "object" ? (o as LastMap) : {};
  } catch {
    return {};
  }
}

export function setLessonLastRunResult(lessonId: string, ok: boolean): void {
  try {
    const m = readLastMap();
    m[lessonId] = ok ? "ok" : "fail";
    sessionStorage.setItem(LAST_KEY, JSON.stringify(m));
  } catch {
    /* ignore */
  }
}

export function getLessonLastRunResult(lessonId: string): "ok" | "fail" | null {
  return readLastMap()[lessonId] ?? null;
}

export function notifyLessonRunUpdated(): void {
  globalThis.dispatchEvent(new Event("codestart-lesson-run"));
}

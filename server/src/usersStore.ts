import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export type StoredUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const usersPath = join(__dirname, "../data/users.json");

function ensureFile(): void {
  if (!existsSync(usersPath)) {
    writeFileSync(usersPath, "[]", "utf-8");
  }
}

export function readUsers(): StoredUser[] {
  ensureFile();
  try {
    return JSON.parse(readFileSync(usersPath, "utf-8")) as StoredUser[];
  } catch {
    return [];
  }
}

export function writeUsers(users: StoredUser[]): void {
  writeFileSync(usersPath, JSON.stringify(users, null, 2), "utf-8");
}

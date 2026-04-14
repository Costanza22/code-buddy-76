import { randomUUID } from "node:crypto";
import type { Express } from "express";
import bcrypt from "bcryptjs";
import { readUsers, writeUsers, type StoredUser } from "./usersStore.js";

const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

function publicUser(u: StoredUser) {
  return { id: u.id, email: u.email, name: u.name };
}

/** Regista rotas com path completo em `app` (sem Router) para evitar 404 em ambientes estranhos. */
export function registerAuthRoutes(app: Express): void {
  app.get("/api/auth/me", (req, res) => {
    const sid = req.session.userId;
    if (!sid) {
      res.json({ user: null });
      return;
    }
    const u = readUsers().find((x) => x.id === sid);
    if (!u) {
      req.session.userId = undefined;
      res.json({ user: null });
      return;
    }
    res.json({ user: publicUser(u) });
  });

  app.post("/api/auth/register", (req, res) => {
    const { email, password, name } = req.body as {
      email?: string;
      password?: string;
      name?: string;
    };
    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      res.status(400).json({ error: "Email e palavra-passe são obrigatórios." });
      return;
    }
    const trimmed = email.trim().toLowerCase();
    if (!emailOk(trimmed)) {
      res.status(400).json({ error: "Email inválido." });
      return;
    }
    if (password.length < 8) {
      res.status(400).json({ error: "A palavra-passe deve ter pelo menos 8 caracteres." });
      return;
    }
    const users = readUsers();
    if (users.some((u) => u.email === trimmed)) {
      res.status(409).json({ error: "Já existe uma conta com este email." });
      return;
    }
    const displayName = typeof name === "string" && name.trim() ? name.trim().slice(0, 80) : trimmed.split("@")[0] ?? "Utilizador";
    const user: StoredUser = {
      id: randomUUID(),
      email: trimmed,
      name: displayName,
      passwordHash: bcrypt.hashSync(password, 10),
    };
    users.push(user);
    writeUsers(users);
    req.session.userId = user.id;
    res.status(201).json({ user: publicUser(user) });
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      res.status(400).json({ error: "Email e palavra-passe são obrigatórios." });
      return;
    }
    const trimmed = email.trim().toLowerCase();
    const user = readUsers().find((u) => u.email === trimmed);
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      res.status(401).json({ error: "Email ou palavra-passe incorretos." });
      return;
    }
    req.session.userId = user.id;
    res.json({ user: publicUser(user) });
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: "Não foi possível terminar a sessão." });
        return;
      }
      res.clearCookie("codestart.sid", { path: "/" });
      res.json({ ok: true });
    });
  });
}

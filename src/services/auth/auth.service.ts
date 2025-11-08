import { pool } from "../../config/db";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../../config/env";

type UserRow = {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: string;
};

export async function register(name: string, email: string, password: string) {
  // check existing
  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
  if ((existing.rowCount ?? 0) > 0) {
    const err: any = new Error("Email already registered");
    err.status = 400;
    throw err;
  }

  const hashed = await bcrypt.hash(password, config.saltRounds);
  const result = await pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email`, [name, email, hashed]);
  return result.rows[0];
}

export async function login(email: string, password: string) {
  const result = await pool.query("SELECT id, name, email, password, role FROM users WHERE email = $1", [email]);
  if (result.rowCount === 0) {
    const err: any = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const user: UserRow = result.rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    const err: any = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const payload = { sub: user.id, name: user.name, email: user.email, role: user.role };
  const secret = config.jwtSecret as string;

  const options: SignOptions = {
    expiresIn: config.jwtExpiresIn as any, // ✅ works with all versions
  };

  const token = jwt.sign(payload, secret, options);

  return token;
}

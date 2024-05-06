import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const fixedUsername = "admin";
const fixedPassword =
  "$2a$10$yMKsUNZXCuHRAzmi7dnIQOnwOCKlPGChs9j5EMWL55MFL.uksyZeK";

export class AuthController {
  static async login(req: Request, res: Response) {
    const { username, password } = req.body;

    if (
      username === fixedUsername &&
      bcrypt.compareSync(password, fixedPassword)
    ) {
      const token = jwt.sign(
        { username: username },
        process.env.JWT_SECRET || "secret_key",
        { expiresIn: "1h" }
      );
      res.json({ token: token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  }
}

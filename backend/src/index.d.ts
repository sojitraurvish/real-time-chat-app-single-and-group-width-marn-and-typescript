import { User } from "./types";

export {};

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}

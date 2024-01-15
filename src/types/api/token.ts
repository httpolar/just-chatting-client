import { User } from "@/types/api/entities/user.ts";

interface POST {
  user: User;
  token: string;
}

export interface TokenResponse {
  POST: POST;
}

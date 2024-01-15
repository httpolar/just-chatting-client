import { User } from "@/types/api/entities/user.ts";

export interface WebsocketMessage {
  id: string | null;
  sender: User | null;
  room: number | null;
  createdAt: string;
  content: string ;
}
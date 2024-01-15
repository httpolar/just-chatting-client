import { create } from "zustand";

const WS_URL = `${import.meta.env.VITE_WS_PROTO}://${import.meta.env.VITE_API_URL}/chat`;

interface State {
  socket: WebSocket | null;
}

interface Actions {
  join: (token: string, room: number) => void;
  leave: () => void;
  send: (content: string) => void;
}

type SocketStore = State & Actions;

export const useSocketStore = create<SocketStore>()((set, get) => ({
  socket: null,
  join: (token: string, room: number) => {
    const url = new URL(`${WS_URL}`);
    url.searchParams.set("room", `${room}`);
    url.searchParams.set("token", token);

    set(() => ({
      socket: new WebSocket(url),
    }));
  },
  leave: () => {
    get().socket?.close();
    set(() => ({ socket: null }));
  },
  send: (content: string) => {
    get().socket?.send(content);
  },
}));

import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Main } from "@/components/main.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Container } from "@/components/container.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useSocketStore } from "@/stores/socket.ts";
import { useUserStore } from "@/stores/user.ts";
import { Textarea } from "@/components/ui/textarea.tsx";
import { SocketMessage } from "@/components/socket-message.tsx";
import { WebsocketMessage } from "@/types/api/entities/socket.ts";
import { nanoid } from "nanoid";
import { messagesHistory } from "@/lib/api.ts";

export const HomeRoute: FC = () => {
  const socketStore = useSocketStore();
  const userStore = useUserStore();

  const [room, setRoom] = useState<string>("");
  const roomAsNumber = Number(room);

  const [textarea, setTextarea] = useState("");

  const [messages, setMessages] = useState<WebsocketMessage[]>([]);

  const handleRoomChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoom(e.target.value);
  };

  const handleJoinRoom = () => {
    if (userStore.user != null && userStore.token != null) {
      socketStore.join(userStore.token, roomAsNumber);
    }
  };

  const handleTextareaSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socketStore.send(textarea);
    setTextarea("");
  };

  const getRoomMessageHistory = async () => {
    if (userStore.token == null) return;

    const res = await messagesHistory(room, userStore.token);
    const json = (await res.json()) as WebsocketMessage[];

    setMessages((s) => {
      const newState = [...new Set([...s, ...json])];
      newState.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

      return newState;
    });
  };

  useEffect(() => {
    if (socketStore.socket == null) {
      return;
    }

    socketStore.socket.onopen = () => {
      void getRoomMessageHistory();
    };

    socketStore.socket.onmessage = (event) => {
      const message = JSON.parse(event.data as string) as WebsocketMessage;
      setMessages((s) => [...s, message]);
    };
  }, [socketStore.socket]);

  return (
    <Main className="min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]">
      <Container className="grid grid-cols-[minmax(300px,400px)_1fr] grid-rows-[1fr] gap-4 h-full max-h-full">
        <div>
          <Card className="max-w-[450px]">
            <CardHeader>
              <CardTitle>Chat Room</CardTitle>
              <CardDescription>
                In order to start chatting, you should join a chat room!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="chat-room">Room Number</Label>
                <Input
                  id="chat-room"
                  type="number"
                  value={room}
                  onChange={handleRoomChange}
                  placeholder="e.g. 1"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleJoinRoom} className="w-full">
                Join
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-[1fr] grid-rows-[1fr_auto] gap-2">
          <div className="flex flex-col justify-end gap-2 max-h-[calc(100vh-4rem-6rem)] h-[calc(100vh-4rem-6rem)] overflow-y-auto">
            {messages.map((msg) => (
              <SocketMessage key={msg.id ?? nanoid(8)} {...msg} />
            ))}
          </div>
          <form
            onSubmit={handleTextareaSubmit}
            className="grid grid-cols-[1fr_auto] min-h-[40px] gap-1"
          >
            <Textarea
              value={textarea}
              onChange={(e) => setTextarea(e.target.value)}
              disabled={socketStore.socket == null}
              className="min-h-[40px] h-[40px]"
            />
            <Button typeof="submit" disabled={socketStore.socket == null} className="h-full">
              Send
            </Button>
          </form>
        </div>
      </Container>
    </Main>
  );
};

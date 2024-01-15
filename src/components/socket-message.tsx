import { FC } from "react";
import { WebsocketMessage } from "@/types/api/entities/socket.ts";

type SocketMessageProps = WebsocketMessage;

export const SocketMessage: FC<SocketMessageProps> = ({ sender, content, createdAt }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-2">
        <h4 className="font-semibold">{sender?.username ?? "System"}</h4>
        <span className="text-muted-foreground">{createdAt}</span>
      </div>
      <p>{content}</p>
    </div>
  );
};

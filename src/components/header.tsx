import { FC } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/container.tsx";

export const Header: FC = () => {
  return (
    <header className="h-16 flex flex-row items-center justify-center border-b">
      <Container>
        <Link to="/">
          <h1 className="font-bold text-xl">Just Chatting</h1>
        </Link>
      </Container>
    </header>
  );
};

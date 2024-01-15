import { FC } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/container.tsx";
import { useUserStore } from "@/stores/user.ts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

export const Header: FC = () => {
  const { user, logout } = useUserStore();

  return (
    <header className="h-16 border-b min-w-0">
      <Container className="h-full w-full flex flex-row flex-1 items-center">
        <div className="flex-1 flex flex-row items-center justify-center">
          <Link to="/">
            <h1 className="font-bold text-xl">Just Chatting</h1>
          </Link>
        </div>

        {user != null && (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem disabled>Profile</DropdownMenuItem>
                  <DropdownMenuItem disabled>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a
                    href="https://github.com/httpolar/just-chatting-client"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </Container>
    </header>
  );
};

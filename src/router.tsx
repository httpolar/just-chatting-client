import { createBrowserRouter } from "react-router-dom";
import { RootRoute } from "@/routes/root.tsx";
import { ErrorRoute } from "@/error-route.tsx";
import { HomeRoute } from "@/routes/home.tsx";
import { RegisterRoute } from "@/routes/register.tsx";
import { LoginRoute } from "@/routes/login.tsx";
import { AuthenticatedOnly } from "@/components/auth/authenticated-only.tsx";
import { UnauthenticatedOnly } from "@/components/auth/unauthenticated-only.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <ErrorRoute />,
    children: [
      {
        index: true,
        id: "home",
        element: (
          <AuthenticatedOnly>
            <HomeRoute />
          </AuthenticatedOnly>
        ),
      },
      {
        path: "register",
        id: "register",
        element: (
          <UnauthenticatedOnly>
            <RegisterRoute />
          </UnauthenticatedOnly>
        ),
      },
      {
        path: "login",
        id: "login",
        element: (
          <UnauthenticatedOnly>
            <LoginRoute />
          </UnauthenticatedOnly>
        ),
      },
    ],
  },
]);

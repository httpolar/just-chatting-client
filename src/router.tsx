import { createBrowserRouter } from "react-router-dom";
import { RootRoute } from "@/routes/root.tsx";
import { ErrorRoute } from "@/error-route.tsx";
import { HomeRoute } from "@/routes/home.tsx";
import { RegisterRoute } from "@/routes/register.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <ErrorRoute />,
    children: [
      {
        index: true,
        element: <HomeRoute />,
      },
      {
        path: "register",
        element: <RegisterRoute />,
      },
    ],
  },
]);

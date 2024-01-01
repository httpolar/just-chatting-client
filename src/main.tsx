import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootRoute } from "@/routes/root.tsx";
import { ErrorRoute } from "@/error-route.tsx";
import { HomeRoute } from "@/routes/home.tsx";
import { RegisterRoute } from "@/routes/register.tsx";

import "@/styles/global.css";

const router = createBrowserRouter([
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

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

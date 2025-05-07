import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Navbar from "./components/navbar";
import ContentLayout from "./components/layouts/content-layout";
import AppLayout from "./components/layouts/app-layout";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AppLayout>
      <Navbar />
      <ContentLayout>
        <Outlet />
      </ContentLayout>
    </AppLayout>
  );
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Energy Insights" },
    { name: "description", content: "Welcome to Energy Insights!" },
  ];
}

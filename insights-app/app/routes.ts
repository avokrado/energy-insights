import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/dashboard.tsx"),
  route("devices", "./routes/devices.tsx"),
  route("*", "./routes/not-found.tsx"),
] satisfies RouteConfig;

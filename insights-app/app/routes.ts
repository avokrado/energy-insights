import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/dashboard/index.tsx"),
  route("devices", "./routes/devices/index.tsx"),
  route("*", "./routes/not-found.tsx"),
] satisfies RouteConfig;

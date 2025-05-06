import type { Device } from "@/types/device";
import type { Route } from "./+types";
import React from "react";
export async function loader() {
  const res = await fetch(`http://localhost:3000/devices`);
  const data = await res.json();
  return { devices: data as Device[] };
}

export default function Devices({
  loaderData: { devices },
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Devices</h1>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>{device.id}</li>
        ))}
      </ul>
    </div>
  );
}

import type { Reading } from "~/types/reading";
import type { Route } from "./+types";

export async function loader() {
  const res = await fetch(`http://localhost:3000/readings`);
  const data = await res.json();
  return { readings: data as Reading[] };
}

export default function Dashboard({
  loaderData: { readings },
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {readings.map((reading) => (
          <li key={reading.id}>{reading.id}</li>
        ))}
      </ul>
    </div>
  );
}

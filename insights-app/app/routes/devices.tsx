import type { Device } from "@/types/device";

import Table, { type Column } from "@/components/ui/table";

import { useLoaderData } from "react-router";
import {
  getDevices,
  createDevice,
  updateDevice,
  deleteDevice,
} from "@/services/api";
import DeleteDevice from "@/components/delete-device";
import UpdateDevice from "@/components/update-device";
import AddDevice from "@/components/add-device";
import type { Route } from "./+types/devices";

export async function loader() {
  const devices = await getDevices();
  return { devices };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  const device: Partial<Device> = {
    id: formData.get("id")?.toString(),
    name: formData.get("name")?.toString(),
    location: formData.get("location")?.toString(),
    type: formData.get("type")?.toString(),
  };

  switch (intent) {
    case "create":
      await createDevice(device);
      break;
    case "update":
      await updateDevice(device);
      break;
    case "delete":
      await deleteDevice(device.id!);
      break;
  }

  return null;
}

export default function Devices() {
  const { devices } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const columns: Column<Device>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Location", accessor: "location" },
    { header: "Type", accessor: "type" },
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Devices</h1>
        <AddDevice />
      </div>
      <Table
        data={devices}
        columns={columns}
        onDelete={(device) => {
          return <DeleteDevice device={device} />;
        }}
        onUpdate={(device) => {
          return <UpdateDevice device={device} />;
        }}
      />
    </div>
  );
}

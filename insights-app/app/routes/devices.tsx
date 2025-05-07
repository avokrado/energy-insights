import type { Device } from "@/types/device";
import Table, { type Column } from "@/components/ui/table";
import { useLoaderData } from "react-router";
import { getDevices } from "@/services/api";
import DeleteDevice from "@/components/delete-device";
import UpdateDevice from "@/components/update-device";
import AddDevice from "@/components/add-device";
import type { Route } from "./+types/devices";
import {
  handleDeleteDeviceAction,
  handleUpdateDeviceAction,
  handleCreateDeviceAction,
} from "@/actions/device";
import { useDisclosure } from "@/hooks/use-disclosure";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
export async function loader() {
  const devices = await getDevices();
  return { devices };
}

export default function Devices() {
  const { devices } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const {
    isOpen: isAddDeviceOpen,
    open: openAddDevice,
    close: closeAddDevice,
  } = useDisclosure();

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
        <Button onClick={openAddDevice} icon={<PlusIcon className="w-4 h-4" />}>
          Add Device
        </Button>
      </div>
      <Table
        data={devices}
        columns={columns}
        onDelete={(device) => <DeleteDevice device={device} />}
        onUpdate={(device) => <UpdateDevice device={device} />}
      />
      <AddDevice isOpen={isAddDeviceOpen} onClose={closeAddDevice} />
    </div>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent")?.toString();
  const data = Object.fromEntries(formData);

  switch (intent) {
    case "create":
      return handleCreateDeviceAction(data);
    case "update":
      return handleUpdateDeviceAction(data);
    case "delete":
      return handleDeleteDeviceAction(data.id as string);
  }

  return null;
}

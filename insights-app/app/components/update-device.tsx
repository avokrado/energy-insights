import React from "react";
import { Button } from "./ui/button";
import { useFetcher } from "react-router";
import type { Device } from "@/types/device";

import { Dialog } from "./ui/dialog";
import { useDisclosure } from "@/hooks/use-disclosure";
import { Input } from "./ui/form/input";

export default function UpdateDevice({ device }: { device: Device }) {
  const fetcher = useFetcher();
  const { isOpen, open, close } = useDisclosure();
  const [formData, setFormData] = React.useState({
    id: device.id,
    name: device.name,
    type: device.type,
    location: device.location,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    fetcher
      .submit(
        {
          ...formData,
          intent: "update",
        },
        { method: "post" }
      )
      .then(() => {
        close();
      });
  };

  return (
    <>
      <Button variant="outline" onClick={open}>
        Update
      </Button>
      <Dialog
        title={`Update ${device.name}`}
        isOpen={isOpen}
        onClose={close}
        showClose={false}
        footer={
          <>
            <Button onClick={close}>Cancel</Button>
            <Button
              onClick={handleConfirm}
              isLoading={fetcher.state === "submitting"}
            >
              Update
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input name="id" value={formData.id} disabled required label="ID" />
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter device name"
            required
            label="Name"
          />
          <Input
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Enter device type"
            required
            label="Type"
          />
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter device location"
            required
            label="Location"
          />
        </div>
      </Dialog>

      {fetcher.state === "submitting" && <p className="text-sm">Updating…</p>}
    </>
  );
}

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
  const isSubmitting = fetcher.state === "submitting";
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    fetcher.submit(form, { method: "post" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    // Clear error when field changes
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  function handleClose() {
    fetcher.data = undefined;
    setErrors({});
    close();
  }

  React.useEffect(() => {
    if (fetcher.data?.errors) {
      setErrors(fetcher.data.errors);
    } else if (fetcher.data?.ok) {
      handleClose();
    }
  }, [fetcher.data]);

  return (
    <>
      <Button variant="outline" onClick={open}>
        Update
      </Button>

      <Dialog
        title={`Update ${device.name}`}
        isOpen={isOpen}
        onClose={handleClose}
        showClose={false}
        footer={
          <>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              form="update-device-form"
              type="submit"
              isLoading={isSubmitting}
            >
              Update
            </Button>
          </>
        }
      >
        <fetcher.Form
          id="update-device-form"
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input type="hidden" name="intent" value="update" />
          <input type="hidden" name="id" value={device.id} />

          <Input
            name="name"
            label="Name"
            placeholder="Enter device name"
            defaultValue={device.name}
            error={errors.name}
            onChange={handleChange}
          />
          <Input
            name="type"
            label="Type"
            placeholder="Enter device type"
            defaultValue={device.type}
            error={errors.type}
            onChange={handleChange}
          />
          <Input
            name="location"
            label="Location"
            placeholder="Enter device location"
            defaultValue={device.location}
            error={errors.location}
            onChange={handleChange}
          />
        </fetcher.Form>
      </Dialog>
    </>
  );
}

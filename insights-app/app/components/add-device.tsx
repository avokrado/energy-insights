import React from "react";
import { Button } from "./ui/button";
import { useFetcher } from "react-router";
import { Dialog } from "./ui/dialog";
import { Input } from "./ui/form/input";

export default function AddDevice({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const fetcher = useFetcher();

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
    onClose();
  }

  React.useEffect(() => {
    if (fetcher.data?.errors) {
      setErrors(fetcher.data.errors);
    } else if (fetcher.data?.ok) {
      handleClose();
    }
  }, [fetcher.data]);

  return (
    <Dialog
      title="Add Device"
      isOpen={isOpen}
      onClose={handleClose}
      showClose={false}
      footer={
        <>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="add-device-form" isLoading={isSubmitting}>
            Add Device
          </Button>
        </>
      }
    >
      <fetcher.Form
        id="add-device-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input type="hidden" name="intent" value="create" />
        <Input
          name="name"
          placeholder="Enter device name"
          label="Name"
          error={errors.name}
          onChange={handleChange}
        />
        <Input
          name="type"
          placeholder="Enter device type"
          label="Type"
          error={errors.type}
          onChange={handleChange}
        />
        <Input
          name="location"
          placeholder="Enter device location"
          label="Location"
          error={errors.location}
          onChange={handleChange}
        />
      </fetcher.Form>
    </Dialog>
  );
}

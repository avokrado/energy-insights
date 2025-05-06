// components/delete-device.tsx
import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { useFetcher } from "react-router";

import { Dialog } from "./ui/dialog";
import { useDisclosure } from "@/hooks/use-disclosure";
import { Input } from "./ui/form/input";

export default function AddDevice() {
  const fetcher = useFetcher();
  const { isOpen, open, close } = useDisclosure();
  const [formData, setFormData] = React.useState({
    name: "",
    type: "",
    location: "",
  });
  const [errors, setErrors] = React.useState({
    name: "",
    type: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      type: "",
      location: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.type.trim()) {
      newErrors.type = "Type is required";
      isValid = false;
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleConfirm = () => {
    if (!validateForm()) {
      return;
    }

    fetcher
      .submit(
        {
          ...formData,
          intent: "create",
        },
        { method: "post" }
      )
      .then(() => {
        close();
        // Reset form data after successful submission
        setFormData({
          name: "",
          type: "",
          location: "",
        });
      });
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={open}
        icon={<PlusIcon className="w-4 h-4" />}
      >
        Add new device
      </Button>
      <Dialog
        title={`Add Device`}
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
              Add Device
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input
            name="name"
            placeholder="Enter device name"
            required
            onChange={handleChange}
            value={formData.name}
            label="Name"
            error={errors.name}
          />
          <Input
            name="type"
            placeholder="Enter device type"
            required
            onChange={handleChange}
            value={formData.type}
            label="Type"
            error={errors.type}
          />
          <Input
            name="location"
            placeholder="Enter device location"
            required
            onChange={handleChange}
            value={formData.location}
            label="Location"
            error={errors.location}
          />
        </div>
      </Dialog>
    </>
  );
}

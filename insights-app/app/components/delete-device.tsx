import { Button } from "./ui/button";
import { useFetcher } from "react-router";
import type { Device } from "@/types/device";

import { Dialog } from "./ui/dialog";
import { useDisclosure } from "@/hooks/use-disclosure";
import React from "react";
export default function DeleteDevice({ device }: { device: Device }) {
  const fetcher = useFetcher();
  const { isOpen, open, close } = useDisclosure();

  const handleConfirm = () => {
    fetcher.submit({ id: device.id, intent: "delete" }, { method: "post" });
  };

  React.useEffect(() => {
    if (fetcher.data?.ok) {
      close();
    }
  }, [fetcher.data]);

  return (
    <>
      <Button
        variant="outline"
        onClick={open}
        className="text-red-600 hover:text-red-800"
      >
        Delete
      </Button>

      <Dialog
        title={`Delete ${device.name}`}
        isOpen={isOpen}
        onClose={close}
        showClose={false}
        footer={
          <>
            <Button onClick={close}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              isLoading={fetcher.state === "submitting"}
            >
              Delete
            </Button>
          </>
        }
      >
        Are you sure you want to delete "{device.name}"?
      </Dialog>
    </>
  );
}

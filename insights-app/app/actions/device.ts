import { data } from "react-router";
import { createDevice, deleteDevice, updateDevice } from "@/services/api";

type DeviceFormData = {
  name?: string;
  type?: string;
  location?: string;
  id?: string;
};

export async function handleCreateDeviceAction(formData: DeviceFormData) {
  const errors: Record<string, string> = {};

  if (!formData.name?.trim()) errors.name = "Name is required";
  if (!formData.type?.trim()) errors.type = "Type is required";
  if (!formData.location?.trim()) errors.location = "Location is required";

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  return await createDevice({
    name: formData.name,
    type: formData.type,
    location: formData.location,
  })
    .then(() => {
      return data({ ok: true }, { status: 200 });
    })
    .catch((error) => {
      return data(
        {
          errors: {
            name: error.message,
          },
        },
        { status: 400 }
      );
    });
}

export async function handleUpdateDeviceAction(formData: DeviceFormData) {
  const errors: Record<string, string> = {};

  if (!formData.name?.trim()) errors.name = "Name is required";
  if (!formData.type?.trim()) errors.type = "Type is required";
  if (!formData.location?.trim()) errors.location = "Location is required";

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  return await updateDevice({
    id: formData.id,
    name: formData.name,
    type: formData.type,
    location: formData.location,
  })
    .then(() => {
      return data({ ok: true }, { status: 200 });
    })
    .catch((error) => {
      return data(
        {
          errors: {
            name: error.message,
          },
        },
        { status: 400 }
      );
    });
}

export async function handleDeleteDeviceAction(id: string) {
  await deleteDevice(id);
  return data({ ok: true }, { status: 200 });
}

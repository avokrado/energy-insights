import { request } from "@/helpers/api";
import type { Device } from "@/types/device";
import type { Reading } from "@/types/reading";

export async function getReadings(): Promise<Reading[]> {
  return request<Reading[]>("/readings");
}

export async function getDevices(): Promise<Device[]> {
  return request<Device[]>("/devices");
}

export async function createDevice(device: Partial<Device>): Promise<Device> {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
  return request<Device>("/devices", {
    method: "POST",
    body: JSON.stringify(device),
  });
}

export async function updateDevice(device: Partial<Device>): Promise<Device> {
  if (!device.id) throw new Error("Device ID is required for update");
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
  return request<Device>(`/devices/${device.id}`, {
    method: "PUT",
    body: JSON.stringify(device),
  });
}

export async function deleteDevice(id: string | number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
  return await request<void>(`/devices/${id}`, {
    method: "DELETE",
  });
}

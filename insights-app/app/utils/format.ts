import type { Reading } from "@/types/reading";

/**
 * Format readings for line graph
 * @param readings - The readings to format
 * @param days - The number of days to filter readings by
 * @returns The formatted readings, limited to 10 readings per device
 */
export function formatReadingsForLineGraph(
  readings: Reading[],
  days: number = 7,
  limiter: number = 10
) {
  // Get date N days ago
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - days);

  // Filter readings by date
  const filteredReadings = readings.filter(
    (reading) => new Date(reading.timestamp) >= daysAgo
  );

  // Group readings by device
  const groupedByDevice = filteredReadings.reduce((acc, reading) => {
    // If the deviceId is not in the accumulator, add it
    if (!acc[reading.deviceId]) {
      acc[reading.deviceId] = [];
    }
    // Add the reading to the deviceId array
    acc[reading.deviceId].push({
      x: new Date(reading.timestamp).toLocaleString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      }),
      y: reading.kWh,
    });
    return acc;
  }, {} as Record<string, { x: string; y: number }[]>);

  // Sort readings by date and limit to 10 readings
  return Object.entries(groupedByDevice).map(([deviceId, readings]) => {
    const sortedReadings = readings.sort(
      (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()
    );

    // If more than 10 readings, take evenly spaced samples
    let limitedReadings = sortedReadings;
    if (sortedReadings.length > limiter) {
      const step = Math.floor(sortedReadings.length / limiter);
      limitedReadings = sortedReadings
        .filter((_, index) => index % step === 0)
        .slice(0, limiter);
    }

    return {
      id: deviceId,
      data: limitedReadings,
    };
  });
}

/**
 * Format readings for bar graph
 * @param readings - The readings to format
 * @param date - Optional date to filter readings by. If not provided, uses latest date from readings
 * @returns The formatted readings
 */
export function formatReadingsForBarGraph(readings: Reading[], date?: Date) {
  // If no date provided, find latest date from readings
  const compareDate =
    date ||
    new Date(Math.max(...readings.map((r) => new Date(r.timestamp).getTime())));

  // Filter readings for provided/latest date (ignoring time)
  const filteredReadings = readings.filter((reading) => {
    const readingDate = new Date(reading.timestamp);
    return (
      readingDate.getDate() === compareDate.getDate() &&
      readingDate.getMonth() === compareDate.getMonth() &&
      readingDate.getFullYear() === compareDate.getFullYear()
    );
  });

  // Group readings by device and sum kWh
  const groupedByDevice = filteredReadings.reduce((acc, reading) => {
    if (!acc[reading.deviceId]) {
      acc[reading.deviceId] = 0;
    }
    acc[reading.deviceId] += reading.kWh;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array format needed for bar chart
  return Object.entries(groupedByDevice).map(([deviceId, kWh]) => ({
    deviceId,
    kWh,
  }));
}

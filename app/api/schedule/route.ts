import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface ScheduleItem {
  day: string;
  date: string;
  location: string;
  hours: string;
  address: string;
}

interface WeekSchedule {
  week: number;
  weekStartDate: string;
  schedules: ScheduleItem[];
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const scheduleData = await request.json();

    // Validate the data (basic validation)
    if (!Array.isArray(scheduleData) || scheduleData.length === 0) {
      return NextResponse.json(
        { error: "Invalid schedule data format" },
        { status: 400 }
      );
    }

    // Check if each week has the required fields
    const isValidData = scheduleData.every(
      (week) =>
        typeof week.week === "number" &&
        typeof week.weekStartDate === "string" &&
        Array.isArray(week.schedules) &&
        week.schedules.length > 0 &&
        week.schedules.every(
          (item: ScheduleItem) =>
            item.day && item.date && item.location && item.hours && item.address
        )
    );

    if (!isValidData) {
      return NextResponse.json(
        { error: "Missing required fields in schedule data" },
        { status: 400 }
      );
    }

    // Write the data to the JSON file
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "schedule.json"
    );
    await fs.writeFile(filePath, JSON.stringify(scheduleData, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating schedule:", error);
    return NextResponse.json(
      { error: "Failed to update schedule" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Read the schedule data from the JSON file
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "schedule.json"
    );
    const fileData = await fs.readFile(filePath, "utf-8");
    const scheduleData: WeekSchedule[] = JSON.parse(fileData);

    return NextResponse.json(scheduleData);
  } catch (error) {
    console.error("Error reading schedule:", error);
    return NextResponse.json(
      { error: "Failed to read schedule" },
      { status: 500 }
    );
  }
}

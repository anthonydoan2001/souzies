"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

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

export default function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState<WeekSchedule | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await fetch("/api/schedule");
        const data = await response.json();

        // Check if we need to roll the schedule forward
        const today = new Date();
        const firstWeek = data[0];
        const lastDayOfWeek1 = new Date(firstWeek.schedules[6].date);

        // If the last day of week 1 has passed, roll the schedule
        if (today > lastDayOfWeek1) {
          // Roll the schedule forward
          const updatedSchedule = rollScheduleForward(data);

          // Update the schedule on the server
          await fetch("/api/schedule", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedSchedule),
          });

          // Find the current week based on today's date
          findCurrentWeek(updatedSchedule);
        } else {
          // Find the current week based on today's date
          findCurrentWeek(data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setLoading(false);
      }
    }

    fetchSchedule();
  }, []);

  // Function to find the current week based on today's date
  const findCurrentWeek = (scheduleData: WeekSchedule[]) => {
    const today = new Date();

    // Find the week that contains today's date
    for (const week of scheduleData) {
      const weekStartDate = new Date(week.weekStartDate);
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekEndDate.getDate() + 6);

      if (today >= weekStartDate && today <= weekEndDate) {
        setCurrentWeek(week);
        return;
      }
    }

    // If today's date is not in any week, default to the first week
    setCurrentWeek(scheduleData[0]);
  };

  // Function to roll the schedule forward
  const rollScheduleForward = (
    scheduleData: WeekSchedule[]
  ): WeekSchedule[] => {
    // Create a copy of the schedule data
    const updatedSchedule = [...scheduleData];

    // Remove the first week
    updatedSchedule.shift();

    // Create a new week 3 based on the last week
    const lastWeek = updatedSchedule[updatedSchedule.length - 1];
    const lastWeekEndDate = new Date(lastWeek.schedules[6].date);

    // Calculate the start date for the new week (day after the last day of the last week)
    const newWeekStartDate = new Date(lastWeekEndDate);
    newWeekStartDate.setDate(newWeekStartDate.getDate() + 1);

    // Create the new week
    const newWeek: WeekSchedule = {
      week: 3,
      weekStartDate: newWeekStartDate.toISOString().split("T")[0],
      schedules: [],
    };

    // Generate the schedule for each day of the new week
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    for (let i = 0; i < 7; i++) {
      const date = new Date(newWeekStartDate);
      date.setDate(date.getDate() + i);

      newWeek.schedules.push({
        day: days[i],
        date: date.toISOString().split("T")[0],
        location: "To be determined",
        hours: "11:00 AM - 7:00 PM",
        address: "To be determined",
      });
    }

    // Add the new week to the schedule
    updatedSchedule.push(newWeek);

    // Update the week numbers
    updatedSchedule.forEach((week, index) => {
      week.week = index + 1;
    });

    return updatedSchedule;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-gray-800">
      <Navbar />
      <main className="container mx-auto px-4 py-16 md:py-20 pt-28 md:pt-32">
        {/* Header with decorative elements */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-6 -left-6 w-16 h-16 border-t-2 border-l-2 border-[#C48C2C] opacity-50 hidden md:block"></div>
          <div className="absolute -bottom-6 -right-6 w-16 h-16 border-b-2 border-r-2 border-[#C48C2C] opacity-50 hidden md:block"></div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#752100] mb-4 font-inknut">
            THIS WEEK&apos;S SCHEDULE
          </h1>
          <div className="w-24 h-1 bg-[#C48C2C] mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Find us at these locations throughout the week. Our schedule is
            updated regularly.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#C48C2C]"></div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Current week info */}
            {currentWeek && (
              <div className="text-center mb-8 bg-[#FFF8E7]/50 p-4 rounded-xl">
                <p className="text-gray-600 text-lg font-medium">
                  {formatDate(currentWeek.weekStartDate)} -{" "}
                  {formatDate(
                    new Date(
                      new Date(currentWeek.weekStartDate).getTime() +
                        6 * 24 * 60 * 60 * 1000
                    )
                      .toISOString()
                      .split("T")[0]
                  )}
                </p>
              </div>
            )}

            {/* Schedule cards with enhanced styling */}
            <div className="grid gap-6">
              {currentWeek?.schedules.map((schedule, index) => (
                <div
                  key={schedule.day}
                  className={`bg-white rounded-xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between transform hover:scale-[1.02] transition-all duration-300 border-l-4 ${
                    index % 2 === 0 ? "border-[#C48C2C]" : "border-[#752100]"
                  }`}
                >
                  <div className="md:w-1/4 mb-4 md:mb-0">
                    <h2
                      className={`text-2xl font-bold ${
                        index % 2 === 0 ? "text-[#752100]" : "text-[#C48C2C]"
                      }`}
                    >
                      {schedule.day}
                    </h2>
                    <p className="text-gray-600 font-medium">
                      {formatDate(schedule.date)}
                    </p>
                  </div>
                  <div className="md:w-1/4 mb-3 md:mb-0">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {schedule.location}
                    </h3>
                  </div>
                  <div className="md:w-1/4 mb-3 md:mb-0 flex items-center">
                    <div className="bg-[#FFF8E7] p-2 rounded-full mr-3 hidden md:block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#C48C2C]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-600">{schedule.hours}</p>
                  </div>
                  <div className="md:w-1/4 flex items-center">
                    <div className="bg-[#FFF8E7] p-2 rounded-full mr-3 hidden md:block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#C48C2C]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-600">{schedule.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Special events section with enhanced styling */}
        <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-[#752100] to-[#C48C2C] rounded-xl shadow-xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

          <h2 className="text-3xl font-bold mb-6 relative z-10">
            Special Events
          </h2>
          <p className="text-lg relative z-10 mb-6">
            Follow us on social media for updates on special events and festival
            appearances! We regularly participate in food festivals and
            community events.
          </p>

          <div className="flex flex-wrap gap-4 relative z-10">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 transition-colors px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 transition-colors px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

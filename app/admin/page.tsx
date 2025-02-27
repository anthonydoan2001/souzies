"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [weeklySchedules, setWeeklySchedules] = useState<WeekSchedule[]>([]);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Fetch schedule data
  useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await fetch("/api/schedule");
        const data = await response.json();

        // Check if we need to roll the schedule forward
        const today = new Date();
        const currentWeek = data[0];
        const lastDayOfWeek1 = new Date(currentWeek.schedules[6].date);

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

          // Use the updated schedule
          setWeeklySchedules(updatedSchedule);
        } else {
          // Use the current schedule
          setWeeklySchedules(data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setLoading(false);
      }
    }

    fetchSchedule();
  }, []);

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

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in a real app, use proper authentication
    if (password === "souzies2025") {
      setIsAuthenticated(true);
      setMessage({ text: "Login successful!", type: "success" });
    } else {
      setMessage({ text: "Invalid password", type: "error" });
    }
  };

  // Handle schedule update
  const handleScheduleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(weeklySchedules),
      });

      if (response.ok) {
        setMessage({ text: "Schedule updated successfully!", type: "success" });
      } else {
        setMessage({ text: "Failed to update schedule", type: "error" });
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
      setMessage({ text: "Error updating schedule", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  // Handle input change for schedule items
  const handleInputChange = (
    index: number,
    field: keyof ScheduleItem,
    value: string
  ) => {
    const updatedSchedules = [...weeklySchedules];
    const currentWeek = updatedSchedules[currentWeekIndex];

    currentWeek.schedules[index] = {
      ...currentWeek.schedules[index],
      [field]: value,
    };

    updatedSchedules[currentWeekIndex] = currentWeek;
    setWeeklySchedules(updatedSchedules);
  };

  // Navigate to next week
  const goToNextWeek = () => {
    if (currentWeekIndex < weeklySchedules.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    }
  };

  // Navigate to previous week
  const goToPreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    }
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAuthenticated) {
        if (e.key === "ArrowLeft") {
          goToPreviousWeek();
        } else if (e.key === "ArrowRight") {
          goToNextWeek();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAuthenticated, currentWeekIndex, weeklySchedules.length]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get current week data
  const currentWeek = weeklySchedules[currentWeekIndex];

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-gray-800">
      <Navbar />
      <main className="container mx-auto px-4 py-16 md:py-20 pt-28 md:pt-32">
        {/* Admin Header with decorative elements */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-6 -left-6 w-16 h-16 border-t-2 border-l-2 border-[#C48C2C] opacity-50 hidden md:block"></div>
          <div className="absolute -bottom-6 -right-6 w-16 h-16 border-b-2 border-r-2 border-[#C48C2C] opacity-50 hidden md:block"></div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#752100] mb-4 font-inknut">
            ADMIN PANEL
          </h1>
          <div className="w-24 h-1 bg-[#C48C2C] mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Manage your food truck schedule and update your locations.
          </p>
        </div>

        {/* Message display with animation */}
        {message.text && (
          <div
            className={`p-6 mb-8 rounded-xl shadow-md max-w-2xl mx-auto transform transition-all duration-500 ${
              message.type === "success"
                ? "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-l-4 border-green-500"
                : "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-l-4 border-red-500"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`p-2 rounded-full ${
                  message.type === "success" ? "bg-green-200" : "bg-red-200"
                } mr-4`}
              >
                {message.type === "success" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>
              <p className="text-lg font-medium">{message.text}</p>
            </div>
          </div>
        )}

        {!isAuthenticated ? (
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-md mx-auto border-t-4 border-[#C48C2C]">
            <h2 className="text-2xl font-bold text-[#752100] mb-6">
              Owner Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-semibold mb-2 text-lg"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C48C2C] focus:border-transparent text-lg transition-all duration-300 text-gray-800"
                    required
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#752100] to-[#8B3A00] text-white py-4 px-6 rounded-lg hover:from-[#8B3A00] hover:to-[#9B4A10] transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Login to Dashboard
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-[#752100] max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-[#752100]">
                Schedule Manager
              </h2>
              <div className="bg-[#FFF8E7] px-4 py-2 rounded-full text-[#752100] font-medium">
                Logged in as Owner
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#C48C2C] mb-4"></div>
                <p className="text-gray-600 text-lg">
                  Loading schedule data...
                </p>
              </div>
            ) : (
              <form onSubmit={handleScheduleUpdate}>
                {/* Week navigation */}
                {weeklySchedules.length > 0 && (
                  <div className="flex justify-between items-center mb-8 bg-[#FFF8E7]/50 p-4 rounded-xl">
                    <button
                      type="button"
                      onClick={goToPreviousWeek}
                      disabled={currentWeekIndex === 0}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                        currentWeekIndex === 0
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-[#752100] text-white hover:bg-[#8B3A00]"
                      } transition-colors`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Previous Week
                    </button>

                    <div className="text-center">
                      <h2 className="text-xl font-bold text-[#752100]">
                        Week {currentWeek?.week}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {currentWeek && formatDate(currentWeek.weekStartDate)} -{" "}
                        {currentWeek &&
                          formatDate(
                            new Date(
                              new Date(currentWeek.weekStartDate).getTime() +
                                6 * 24 * 60 * 60 * 1000
                            )
                              .toISOString()
                              .split("T")[0]
                          )}
                      </p>
                      {/* Schedule automatically rolls forward when the last day of week 1 is over */}
                    </div>

                    <button
                      type="button"
                      onClick={goToNextWeek}
                      disabled={currentWeekIndex === weeklySchedules.length - 1}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                        currentWeekIndex === weeklySchedules.length - 1
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-[#752100] text-white hover:bg-[#8B3A00]"
                      } transition-colors`}
                    >
                      Next Week
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                <div className="overflow-x-auto bg-[#FFF8E7]/30 rounded-xl p-4">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#752100] to-[#8B3A00] text-white">
                        <th className="py-4 px-6 text-left font-bold text-lg">
                          Day
                        </th>
                        <th className="py-4 px-6 text-left font-bold text-lg">
                          Date
                        </th>
                        <th className="py-4 px-6 text-left font-bold text-lg">
                          Location
                        </th>
                        <th className="py-4 px-6 text-left font-bold text-lg">
                          Hours
                        </th>
                        <th className="py-4 px-6 text-left font-bold text-lg">
                          Address
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentWeek?.schedules.map((item, index) => (
                        <tr
                          key={index}
                          className={`border-b ${
                            index % 2 === 0 ? "bg-white" : "bg-[#FFF8E7]/30"
                          } hover:bg-[#FFF8E7]/50 transition-colors duration-150`}
                        >
                          <td className="py-4 px-6">
                            <input
                              type="text"
                              value={item.day}
                              onChange={(e) =>
                                handleInputChange(index, "day", e.target.value)
                              }
                              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C48C2C] focus:border-transparent transition-all duration-200 text-gray-800"
                            />
                          </td>
                          <td className="py-4 px-6">
                            <input
                              type="date"
                              value={item.date}
                              onChange={(e) =>
                                handleInputChange(index, "date", e.target.value)
                              }
                              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C48C2C] focus:border-transparent transition-all duration-200 text-gray-800"
                            />
                          </td>
                          <td className="py-4 px-6">
                            <input
                              type="text"
                              value={item.location}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "location",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C48C2C] focus:border-transparent transition-all duration-200 text-gray-800"
                            />
                          </td>
                          <td className="py-4 px-6">
                            <input
                              type="text"
                              value={item.hours}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "hours",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C48C2C] focus:border-transparent transition-all duration-200 text-gray-800"
                            />
                          </td>
                          <td className="py-4 px-6">
                            <input
                              type="text"
                              value={item.address}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "address",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C48C2C] focus:border-transparent transition-all duration-200 text-gray-800"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <div className="text-gray-600">
                    <p className="font-medium">Keyboard Navigation:</p>
                    <p className="text-sm">
                      Use{" "}
                      <span className="bg-gray-200 px-2 py-1 rounded">←</span>{" "}
                      and{" "}
                      <span className="bg-gray-200 px-2 py-1 rounded">→</span>{" "}
                      arrow keys to navigate between weeks
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-gradient-to-r from-[#752100] to-[#8B3A00] text-white py-3 px-8 rounded-lg hover:from-[#8B3A00] hover:to-[#9B4A10] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        Save Changes
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

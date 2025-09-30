import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";

interface Activity {
  title: string | null;
  description: string | null;
  price: string | null;
  thumbnail: string | null;
  weather?: {
    condition?: string | null;
    max_temp_c?: number | null;
    min_temp_c?: number | null;
  } | null;
}

interface DayItinerary {
  day: string | null;
  activities: Activity[];
}

interface ItineraryComponentProps {
  data: DayItinerary[];
  message?: string;
}

const ItineraryComponent: React.FC<ItineraryComponentProps> = ({ data, message }) => {
  return (
    <div className="w-full max-w-3xl mx-auto my-4 p-4 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg">
      {message && <h2 className="text-xl font-bold mb-3 text-blue-300 flex items-center gap-2 uppercase tracking-wide">{message} <span>🗺️</span></h2>}
      {data.map((day, idx) => (
        <div key={idx} className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-blue-200 uppercase tracking-wide">{day.day ?? `Day ${idx + 1}`}</h3>
          <Table className="rounded-lg overflow-hidden border border-gray-700 text-xs">
            <TableHeader className="bg-gray-800">
              <TableRow>
                <TableHead className="text-gray-300 uppercase">Activity 🎯</TableHead>
                <TableHead className="text-gray-300 uppercase">Description 📝</TableHead>
                <TableHead className="text-gray-300 uppercase">Price 💸</TableHead>
                <TableHead className="text-gray-300 uppercase">Weather 🌦️</TableHead>
                <TableHead className="text-gray-300 uppercase">Image 🖼️</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {day.activities.map((activity, aidx) => (
                <TableRow key={aidx} className="hover:bg-gray-800/60 transition">
                  <TableCell className="font-semibold text-blue-200">{activity.title ?? "-"}</TableCell>
                  <TableCell className="text-gray-300">{activity.description ?? "-"}</TableCell>
                  <TableCell className="text-blue-300">{activity.price ?? "-"}</TableCell>
                  <TableCell className="text-sm">
                    {activity.weather ? (
                      <span className="block text-blue-200">
                        {activity.weather.condition ?? "-"}<br />
                        <span className="text-xs text-blue-300">Max: {activity.weather.max_temp_c ?? "-"}°C, Min: {activity.weather.min_temp_c ?? "-"}°C</span>
                      </span>
                    ) : "-"}
                  </TableCell>
                  <TableCell>
                    {activity.thumbnail ? (
                      <img
                        src={activity.thumbnail}
                        alt={activity.title ?? "Activity image"}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-700 shadow"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default ItineraryComponent;

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
    <div className="w-full max-w-4xl mx-auto my-6 p-6 rounded-2xl bg-gradient-to-br from-blue-100 via-white to-blue-200 shadow-xl">
      {message && <h2 className="text-2xl font-bold mb-4 text-blue-700">{message}</h2>}
      {data.map((day, idx) => (
        <div key={idx} className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">{day.day ?? `Day ${idx + 1}`}</h3>
          <Table className="rounded-xl overflow-hidden border border-blue-200">
            <TableHeader className="bg-blue-50">
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Weather</TableHead>
                <TableHead>Image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {day.activities.map((activity, aidx) => (
                <TableRow key={aidx} className="hover:bg-blue-100/40 transition">
                  <TableCell className="font-medium text-blue-900">{activity.title ?? "-"}</TableCell>
                  <TableCell className="text-gray-700">{activity.description ?? "-"}</TableCell>
                  <TableCell className="text-blue-700">{activity.price ?? "-"}</TableCell>
                  <TableCell className="text-sm">
                    {activity.weather ? (
                      <span className="block text-blue-800">
                        {activity.weather.condition ?? "-"}<br />
                        <span className="text-xs text-gray-500">Max: {activity.weather.max_temp_c ?? "-"}°C, Min: {activity.weather.min_temp_c ?? "-"}°C</span>
                      </span>
                    ) : "-"}
                  </TableCell>
                  <TableCell>
                    {activity.thumbnail ? (
                      <img
                        src={activity.thumbnail}
                        alt={activity.title ?? "Activity image"}
                        className="w-20 h-20 object-cover rounded-lg border border-blue-200 shadow"
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

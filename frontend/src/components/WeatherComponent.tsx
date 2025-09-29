import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";

interface WeatherComponentProps {
  data: any[];
}

const emojiForCondition = (condition: string | null | undefined) => {
  if (!condition) return "❓";
  const cond = condition.toLowerCase();
  if (cond.includes("sun")) return "☀️";
  if (cond.includes("cloud")) return "☁️";
  if (cond.includes("rain")) return "🌧️";
  if (cond.includes("snow")) return "❄️";
  if (cond.includes("storm")) return "⛈️";
  if (cond.includes("clear")) return "🌤️";
  return "🌈";
};

const WeatherComponent: React.FC<WeatherComponentProps> = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
    <div className="w-full max-w-3xl mx-auto my-4 p-4 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg">
      <h2 className="text-xl font-bold mb-3 text-blue-300 flex items-center gap-2 uppercase tracking-wide">Weather Forecast <span>🌦️</span></h2>
      <Table className="rounded-lg overflow-hidden border border-gray-700 text-xs">
        <TableHeader className="bg-gray-800">
          <TableRow>
            <TableHead className="text-gray-300 uppercase">Date 📅</TableHead>
            <TableHead className="text-gray-300 uppercase">Condition 🌤️</TableHead>
            <TableHead className="text-gray-300 uppercase">Max Temp 🔥</TableHead>
            <TableHead className="text-gray-300 uppercase">Min Temp 🧊</TableHead>
            <TableHead className="text-gray-300 uppercase">Rain % 🌧️</TableHead>
            <TableHead className="text-gray-300 uppercase">Humidity 💧</TableHead>
            <TableHead className="text-gray-300 uppercase">Sunrise 🌅</TableHead>
            <TableHead className="text-gray-300 uppercase">Sunset 🌇</TableHead>
            <TableHead className="text-gray-300 uppercase">Location 📍</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((day, idx) => (
            <TableRow key={idx} className="hover:bg-gray-800/60 transition">
              <TableCell className="font-semibold text-blue-200">{day.date ?? "-"}</TableCell>
              <TableCell className="text-lg capitalize">{emojiForCondition(day.condition)} {day.condition ? day.condition : "-"}</TableCell>
              <TableCell className="text-red-400 font-semibold">{day.max_temp_c ?? "-"}°C</TableCell>
              <TableCell className="text-blue-400 font-semibold">{day.min_temp_c ?? "-"}°C</TableCell>
              <TableCell className="text-blue-300">{day.chance_of_rain_pct ?? "-"}%</TableCell>
              <TableCell className="text-blue-300">{day.avg_humidity ?? "-"}%</TableCell>
              <TableCell className="text-yellow-300">{day.sunrise ?? "-"}</TableCell>
              <TableCell className="text-orange-300">{day.sunset ?? "-"}</TableCell>
              <TableCell className="text-blue-200 font-semibold capitalize">{day.location ?? "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WeatherComponent;

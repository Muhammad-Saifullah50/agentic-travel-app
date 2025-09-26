import React from "react";

interface WeatherComponentProps {
  data: any[];
}

const WeatherComponent: React.FC<WeatherComponentProps> = ({ data }) => {

    if (!data || data.length === 0) return
  return (
    <div className="mt-2">
      <table className="w-full text-sm bg-white bg-opacity-10 rounded-xl overflow-hidden">
        <thead>
          <tr>
            <th>Date</th>
            <th>Condition</th>
            <th>Max Temp (°C)</th>
            <th>Min Temp (°C)</th>
            <th>Rain (%)</th>
            <th>Humidity (%)</th>
            <th>Sunrise</th>
            <th>Sunset</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((day, idx) => (
            <tr key={idx}>
              <td>{day.date ?? "-"}</td>
              <td>{day.condition ?? "-"}</td>
              <td>{day.max_temp_c ?? "-"}</td>
              <td>{day.min_temp_c ?? "-"}</td>
              <td>{day.chance_of_rain_pct ?? "-"}</td>
              <td>{day.avg_humidity ?? "-"}</td>
              <td>{day.sunrise ?? "-"}</td>
              <td>{day.sunset ?? "-"}</td>
              <td>{day.location ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherComponent;

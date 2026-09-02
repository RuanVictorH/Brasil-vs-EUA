import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "var(--card-alt)",
          border: "1px solid var(--line)",
          padding: "10px 14px",
          borderRadius: "8px",
          color: "var(--text)",
          fontSize: "12.5px",
          boxShadow: "0 8px 24px var(--shadow)"
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: "6px" }}>{label}</div>
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              margin: "3px 0"
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: entry.color
              }}
            />
            <span style={{ color: "var(--muted)" }}>
              {entry.name === "br" ? "🇧🇷 Brasil" : "🇺🇸 Estados Unidos"}:
            </span>
            <span className="tabular-nums" style={{ fontWeight: 700 }}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ComparativeChart({ chartData, spotlight = "both" }) {
  if (!chartData) return null;

  const { type, title, data } = chartData;

  // Colors: Teal for BR, Indigo for US
  const colorBR = "var(--br)";
  const colorUS = "var(--us)";

  const brOpacity = spotlight === "us" ? 0.25 : 1;
  const usOpacity = spotlight === "br" ? 0.25 : 1;

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--line)",
        borderRadius: "14px",
        padding: "20px",
        marginTop: "24px"
      }}
    >
      <h3
        style={{
          fontSize: "15px",
          fontWeight: 600,
          marginBottom: "18px",
          color: "var(--text)"
        }}
      >
        {title}
      </h3>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === "line" ? (
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" opacity={0.6} />
              <XAxis dataKey="year" stroke="var(--muted)" fontSize={12} tickLine={false} />
              <YAxis stroke="var(--muted)" fontSize={12} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (value === "br" ? "🇧🇷 Brasil" : "🇺🇸 Estados Unidos")}
                wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
              />
              <Line
                type="monotone"
                dataKey="br"
                name="br"
                stroke={colorBR}
                strokeWidth={3}
                dot={{ r: 4, fill: colorBR }}
                strokeOpacity={brOpacity}
              />
              <Line
                type="monotone"
                dataKey="us"
                name="us"
                stroke={colorUS}
                strokeWidth={3}
                dot={{ r: 4, fill: colorUS }}
                strokeOpacity={usOpacity}
              />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" opacity={0.6} />
              <XAxis dataKey="name" stroke="var(--muted)" fontSize={12} tickLine={false} />
              <YAxis stroke="var(--muted)" fontSize={12} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (value === "br" ? "🇧🇷 Brasil" : "🇺🇸 Estados Unidos")}
                wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
              />
              <Bar
                dataKey="br"
                name="br"
                fill={colorBR}
                radius={[4, 4, 0, 0]}
                fillOpacity={brOpacity}
              />
              <Bar
                dataKey="us"
                name="us"
                fill={colorUS}
                radius={[4, 4, 0, 0]}
                fillOpacity={usOpacity}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

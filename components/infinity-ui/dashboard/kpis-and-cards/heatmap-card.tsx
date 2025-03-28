"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { DashboardCard, CardTitle } from "./utils";

type HeatmapDataPoint = {
  x: number;
  y: number;
  value: number;
};

type HeatmapCardProps = {
  title: string;
  subtitle?: string;
  data: HeatmapDataPoint[];
  xLabels: string[];
  yLabels: string[];
  colorRange: string[];
  minValue: number;
  maxValue: number;
  valueFormatter?: (value: number) => string;
};

export default function HeatmapCard({
  title,
  subtitle,
  data,
  xLabels,
  yLabels,
  colorRange,
  minValue,
  maxValue,
  valueFormatter = (value) => value.toString(),
}: HeatmapCardProps) {
  const [hoveredCell, setHoveredCell] = useState<HeatmapDataPoint | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  // Get color for a value
  const getColor = (value: number) => {
    // Normalize value to 0-1 range
    const normalizedValue = Math.max(
      0,
      Math.min(1, (value - minValue) / (maxValue - minValue)),
    );

    // Get color index
    const index = Math.floor(normalizedValue * (colorRange.length - 1));

    // Interpolate between colors if needed
    const remainder = normalizedValue * (colorRange.length - 1) - index;

    if (index >= colorRange.length - 1) {
      return colorRange[colorRange.length - 1];
    }

    if (remainder === 0) {
      return colorRange[index];
    }

    // Simple linear interpolation between colors
    const color1 = colorRange[index];
    const color2 = colorRange[index + 1];

    // Convert hex to rgb
    const r1 = Number.parseInt(color1.slice(1, 3), 16);
    const g1 = Number.parseInt(color1.slice(3, 5), 16);
    const b1 = Number.parseInt(color1.slice(5, 7), 16);

    const r2 = Number.parseInt(color2.slice(1, 3), 16);
    const g2 = Number.parseInt(color2.slice(3, 5), 16);
    const b2 = Number.parseInt(color2.slice(5, 7), 16);

    // Interpolate
    const r = Math.round(r1 + remainder * (r2 - r1));
    const g = Math.round(g1 + remainder * (g2 - g1));
    const b = Math.round(b1 + remainder * (b2 - b1));

    // Convert back to hex
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  // Find data point for a cell
  const getDataPoint = (x: number, y: number) => {
    return data.find((d) => d.x === x && d.y === y) || { x, y, value: 0 };
  };

  return (
    <DashboardCard>
      <div className="flex items-center justify-between">
        <CardTitle title={title} subtitle={subtitle} className="mb-0" />

        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <Info className="h-5 w-5" />
        </button>
      </div>

      {showInfo && (
        <motion.div
          className="mt-2 rounded-lg bg-slate-100 p-3 text-sm text-muted-foreground dark:bg-slate-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          Color intensity represents value magnitude. Hover over cells to see
          exact values.
        </motion.div>
      )}

      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[500px]">
          {/* Y-axis labels */}
          <div className="flex">
            <div className="w-20" /> {/* Empty space for corner */}
            {xLabels.map((label, index) => (
              <div
                key={index}
                className="flex-1 text-center text-xs text-muted-foreground"
              >
                {label}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="mt-2">
            {yLabels.map((yLabel, yIndex) => (
              <div key={yIndex} className="flex items-center">
                <div className="w-20 pr-2 text-right text-xs text-muted-foreground">
                  {yLabel}
                </div>
                <div className="flex flex-1">
                  {xLabels.map((_, xIndex) => {
                    const dataPoint = getDataPoint(xIndex, yIndex);
                    const color = getColor(dataPoint.value);

                    return (
                      <motion.div
                        key={xIndex}
                        className="relative flex-1 cursor-pointer p-1"
                        onMouseEnter={() => setHoveredCell(dataPoint)}
                        onMouseLeave={() => setHoveredCell(null)}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="aspect-square w-full rounded"
                          style={{ backgroundColor: color }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: (yIndex * xLabels.length + xIndex) * 0.01,
                          }}
                        />

                        {hoveredCell === dataPoint && (
                          <motion.div
                            className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-full rounded bg-foreground px-2 py-1 text-xs text-background"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {valueFormatter(dataPoint.value)}
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center">
        <div className="flex h-4 w-64 overflow-hidden rounded">
          {colorRange.map((color, index) => (
            <div
              key={index}
              className="h-full flex-1"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="ml-4 flex w-32 justify-between text-xs text-muted-foreground">
          <span>{valueFormatter(minValue)}</span>
          <span>{valueFormatter(maxValue)}</span>
        </div>
      </div>
    </DashboardCard>
  );
}

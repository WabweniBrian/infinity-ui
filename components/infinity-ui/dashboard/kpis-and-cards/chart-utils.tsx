// Common color schemes for charts
export const chartColors = {
  primary: ["#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"],
  pink: ["#ec4899", "#f472b6", "#f9a8d4", "#fbcfe8", "#fce7f3"],
  orange: ["#f97316", "#fb923c", "#fdba74", "#fed7aa", "#ffedd5"],
  emerald: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5"],
  slate: ["#64748b", "#94a3b8", "#cbd5e1", "#e2e8f0", "#f1f5f9"],
}

// Common chart configurations
export const commonChartConfig = {
  // Remove grid lines in dark mode
  gridClassName: "stroke-slate-200 dark:stroke-slate-700",
  // Responsive container
  responsiveContainerProps: {
    width: "100%",
    height: "100%",
  },
  // Animation duration
  animationDuration: 1500,
}

// Format large numbers
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

// Format percentage
export const formatPercent = (num: number): string => {
  return `${num.toFixed(1)}%`
}


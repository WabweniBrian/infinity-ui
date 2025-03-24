"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Bell,
  BellOff,
  ArrowUpRight,
  ArrowDownRight,
  BarChart,
  Zap,
  Globe,
  RefreshCw,
} from "lucide-react";
import { EconomicEvent, events, ImpactLevel } from "@/data/economic-calendar";

const EconomicCalendar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedImpact, setSelectedImpact] = useState<ImpactLevel[]>([
    "low",
    "medium",
    "high",
  ]);
  const [expandedEvents, setExpandedEvents] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Group events by date
  const groupedEvents = events.reduce(
    (groups, event) => {
      const dateStr = event.date.toDateString();
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(event);
      return groups;
    },
    {} as Record<string, EconomicEvent[]>,
  );

  // Sort dates
  const sortedDates = Object.keys(groupedEvents).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  // Filter events
  const filteredEvents = events.filter((event) => {
    // Search filter
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.country.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Date filter
    if (
      selectedDate &&
      event.date.toDateString() !== selectedDate.toDateString()
    )
      return false;

    // Country filter
    if (
      selectedCountries.length > 0 &&
      !selectedCountries.includes(event.countryCode)
    )
      return false;

    // Impact filter
    if (!selectedImpact.includes(event.impact)) return false;

    return true;
  });
  // Get unique countries from events
  const countries = Array.from(
    new Set(events.map((event) => event.countryCode)),
  ).sort();

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    console.log("Refreshing data...");

    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Toggle event expansion
  const toggleEventExpansion = (eventId: string) => {
    setExpandedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId],
    );
  };

  // Toggle country selection
  const toggleCountry = (countryCode: string) => {
    setSelectedCountries((prev) =>
      prev.includes(countryCode)
        ? prev.filter((code) => code !== countryCode)
        : [...prev, countryCode],
    );
  };

  // Toggle impact level
  const toggleImpact = (impact: ImpactLevel) => {
    setSelectedImpact((prev) =>
      prev.includes(impact)
        ? prev.filter((i) => i !== impact)
        : [...prev, impact],
    );
  };

  // Toggle alert for event
  const toggleAlert = (eventId: string, hasAlert: boolean) => {
    console.log(`Setting alert for event ${eventId} to ${hasAlert}`);
  };

  // Format date
  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
  };

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get impact color
  const getImpactColor = (impact: ImpactLevel) => {
    switch (impact) {
      case "low":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "medium":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  // Get impact label
  const getImpactLabel = (impact: ImpactLevel) => {
    switch (impact) {
      case "low":
        return "Low";
      case "medium":
        return "Medium";
      case "high":
        return "High";
      default:
        return "";
    }
  };

  // Get country flag emoji
  const getCountryFlag = (countryCode: string) => {
    // Convert country code to flag emoji
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));

    return String.fromCodePoint(...codePoints);
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center gap-2">
          <Calendar className="text-blue-400" size={20} />
          <h2 className="text-xl font-bold text-white">Economic Calendar</h2>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              size={16}
              className={isRefreshing ? "animate-spin" : ""}
            />
          </motion.button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex w-full items-center gap-2 md:w-auto">
            <button
              className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-2 text-slate-400 hover:text-white"
              onClick={() => setSelectedDate(null)}
            >
              <Calendar size={16} />
              <span className="text-sm">
                {selectedDate ? formatDate(selectedDate) : "All Dates"}
              </span>
            </button>

            <motion.button
              className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-2 text-slate-400 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              <span className="text-sm">Filters</span>
              {showFilters ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </motion.button>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Impact Filter */}
                <div>
                  <h3 className="mb-2 text-sm font-medium text-white">
                    Impact
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(["low", "medium", "high"] as ImpactLevel[]).map(
                      (impact) => (
                        <button
                          key={impact}
                          className={`flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm ${
                            selectedImpact.includes(impact)
                              ? getImpactColor(impact)
                              : "border-slate-700 bg-slate-800 text-slate-400"
                          }`}
                          onClick={() => toggleImpact(impact)}
                        >
                          <BarChart size={14} />
                          <span>{getImpactLabel(impact)}</span>
                        </button>
                      ),
                    )}
                  </div>
                </div>

                {/* Countries Filter */}
                <div>
                  <h3 className="mb-2 text-sm font-medium text-white">
                    Countries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {countries.map((countryCode) => (
                      <button
                        key={countryCode}
                        className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm ${
                          selectedCountries.length === 0 ||
                          selectedCountries.includes(countryCode)
                            ? "border border-blue-500/30 bg-blue-600/20 text-blue-400"
                            : "border border-slate-700 bg-slate-800 text-slate-400"
                        }`}
                        onClick={() => toggleCountry(countryCode)}
                      >
                        <span>{getCountryFlag(countryCode)}</span>
                        <span>{countryCode}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Calendar Content */}
      <div className="divide-y divide-slate-800">
        {filteredEvents.length > 0 ? (
          sortedDates.map((dateStr) => {
            const dateEvents = groupedEvents[dateStr].filter((event) =>
              filteredEvents.some((e) => e.id === event.id),
            );

            if (dateEvents.length === 0) return null;

            return (
              <div key={dateStr} className="p-4">
                <h3 className="mb-4 text-lg font-medium text-white">
                  {formatDate(new Date(dateStr))}
                </h3>

                <div className="space-y-3">
                  {dateEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Event Header */}
                      <div
                        className="flex cursor-pointer items-start justify-between p-4"
                        onClick={() => toggleEventExpansion(event.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div className="text-sm font-medium text-white">
                              {formatTime(event.date)}
                            </div>
                            <div
                              className={`mt-1 rounded-full px-2 py-0.5 text-xs ${getImpactColor(event.impact)}`}
                            >
                              {getImpactLabel(event.impact)}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xl">
                                {getCountryFlag(event.countryCode)}
                              </span>
                              <span className="text-sm text-slate-400">
                                {event.country}
                              </span>
                            </div>
                            <h4 className="mt-1 font-medium text-white">
                              {event.title}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            className={`rounded-lg p-1.5 ${event.hasAlert ? "bg-yellow-500/10 text-yellow-400" : "text-slate-400 hover:text-white"}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAlert(event.id, event.hasAlert || false);
                            }}
                          >
                            {event.hasAlert ? (
                              <Bell size={16} />
                            ) : (
                              <BellOff size={16} />
                            )}
                          </button>

                          <div className="rounded-lg p-1.5 text-slate-400">
                            {expandedEvents.includes(event.id) ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Event Details */}
                      <AnimatePresence>
                        {expandedEvents.includes(event.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-4 pb-4">
                              <div className="rounded-lg bg-slate-800 p-3">
                                <div className="grid grid-cols-3 gap-3">
                                  <div className="text-center">
                                    <div className="mb-1 text-xs text-slate-400">
                                      Previous
                                    </div>
                                    <div className="text-sm font-medium text-white">
                                      {event.previous || "N/A"}{" "}
                                      {event.unit || event.currency || ""}
                                    </div>
                                  </div>

                                  <div className="text-center">
                                    <div className="mb-1 text-xs text-slate-400">
                                      Forecast
                                    </div>
                                    <div className="text-sm font-medium text-white">
                                      {event.forecast || "N/A"}{" "}
                                      {event.unit || event.currency || ""}
                                    </div>
                                  </div>

                                  <div className="text-center">
                                    <div className="mb-1 text-xs text-slate-400">
                                      Actual
                                    </div>
                                    {event.isReleased ? (
                                      <div
                                        className={`text-sm font-medium ${
                                          event.actual &&
                                          event.forecast &&
                                          Number.parseFloat(event.actual) >
                                            Number.parseFloat(event.forecast)
                                            ? "text-green-400"
                                            : event.actual &&
                                                event.forecast &&
                                                Number.parseFloat(
                                                  event.actual,
                                                ) <
                                                  Number.parseFloat(
                                                    event.forecast,
                                                  )
                                              ? "text-red-400"
                                              : "text-white"
                                        }`}
                                      >
                                        {event.actual || "N/A"}{" "}
                                        {event.unit || event.currency || ""}
                                      </div>
                                    ) : (
                                      <div className="text-sm font-medium text-slate-400">
                                        Pending
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {event.description && (
                                <div className="mt-3 text-sm text-slate-300">
                                  {event.description}
                                </div>
                              )}

                              {event.isReleased &&
                                event.actual &&
                                event.forecast && (
                                  <div
                                    className={`mt-3 flex items-center gap-2 text-sm ${
                                      Number.parseFloat(event.actual) >
                                      Number.parseFloat(event.forecast)
                                        ? "text-green-400"
                                        : Number.parseFloat(event.actual) <
                                            Number.parseFloat(event.forecast)
                                          ? "text-red-400"
                                          : "text-slate-400"
                                    }`}
                                  >
                                    {Number.parseFloat(event.actual) >
                                    Number.parseFloat(event.forecast) ? (
                                      <ArrowUpRight size={16} />
                                    ) : Number.parseFloat(event.actual) <
                                      Number.parseFloat(event.forecast) ? (
                                      <ArrowDownRight size={16} />
                                    ) : (
                                      <Zap size={16} />
                                    )}
                                    <span>
                                      {Number.parseFloat(event.actual) >
                                      Number.parseFloat(event.forecast)
                                        ? "Better than expected. Potentially bullish for " +
                                          event.countryCode
                                        : Number.parseFloat(event.actual) <
                                            Number.parseFloat(event.forecast)
                                          ? "Worse than expected. Potentially bearish for " +
                                            event.countryCode
                                          : "As expected. Neutral impact on " +
                                            event.countryCode}
                                    </span>
                                  </div>
                                )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center">
            <Globe className="mx-auto mb-4 text-slate-500" size={48} />
            <h3 className="mb-2 text-lg font-medium text-white">
              No events found
            </h3>
            <p className="text-slate-400">
              Try adjusting your filters or search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EconomicCalendar;

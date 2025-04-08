"use client";

import { useState, useEffect } from "react";
import { format, addHours, parseISO, differenceInDays } from "date-fns";
import {
  CalendarIcon,
  Clock,
  Trash2,
  X,
  CheckSquare,
  CalendarDays,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useCalendarContext } from "@/lib/calendar-context";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function EventModal() {
  const { toast } = useToast();

  const {
    showEventModal,
    setShowEventModal,
    selectedDate,
    selectedEvent,
    setSelectedEvent,
    addEvent,
    updateEvent,
    deleteEvent,
    categories,
    activeItemType,
    setActiveItemType,
  } = useCalendarContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(selectedDate);
  const [endDate, setEndDate] = useState<Date | undefined>(
    selectedDate ? addHours(selectedDate, 1) : undefined,
  );
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [isAllDay, setIsAllDay] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState("weekly");
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [recurrenceEndDate, setRecurrenceEndDate] = useState<Date | undefined>(
    undefined,
  );
  const [itemType, setItemType] = useState<"event" | "task">("event");
  const [completed, setCompleted] = useState(false);

  // Reset form when modal opens/closes or selected event changes
  useEffect(() => {
    if (showEventModal) {
      if (selectedEvent) {
        // Edit mode
        setTitle(selectedEvent.title);
        setDescription(selectedEvent.description || "");
        setItemType(selectedEvent.type as "event" | "task");
        setCompleted(selectedEvent.completed || false);

        const start = parseISO(selectedEvent.start);
        const end = parseISO(selectedEvent.end);

        setStartDate(start);
        setEndDate(end);
        setStartTime(format(start, "HH:mm"));
        setEndTime(format(end, "HH:mm"));
        setCategoryId(selectedEvent.categoryId || categories[0]?.id || "");
        setIsAllDay(selectedEvent.isAllDay || false);
        setIsRecurring(selectedEvent.isRecurring || false);
        setRecurrencePattern(selectedEvent.recurrencePattern || "weekly");
        setRecurrenceInterval(selectedEvent.recurrenceInterval || 1);
        setRecurrenceEndDate(
          selectedEvent.recurrenceEndDate
            ? parseISO(selectedEvent.recurrenceEndDate)
            : undefined,
        );
      } else {
        // Create mode - use the active item type from sidebar
        setTitle("");
        setDescription("");
        setItemType(activeItemType);
        setCompleted(false);
        setStartDate(selectedDate);
        setEndDate(selectedDate ? addHours(selectedDate, 1) : undefined);
        setStartTime("09:00");
        setEndTime("10:00");
        setCategoryId(
          activeItemType === "task" ? "task" : categories[0]?.id || "",
        );
        setIsAllDay(false);
        setIsRecurring(false);
        setRecurrencePattern("weekly");
        setRecurrenceInterval(1);
        setRecurrenceEndDate(undefined);
      }
    }
  }, [showEventModal, selectedEvent, selectedDate, categories, activeItemType]);

  const handleClose = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: `Please enter a title for the ${itemType}`,
        variant: "destructive",
      });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: "Error",
        description: "Please select start and end dates",
        variant: "destructive",
      });
      return;
    }

    // Create start and end datetime objects
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!isAllDay) {
      start.setHours(startHours, startMinutes);
      end.setHours(endHours, endMinutes);
    } else {
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    }

    // Check if end date is before start date
    if (end < start) {
      toast({
        title: "Error",
        description: "End time cannot be before start time",
        variant: "destructive",
      });
      return;
    }

    const eventData = {
      title,
      description,
      start: start.toISOString(),
      end: end.toISOString(),
      categoryId: itemType === "task" ? "task" : categoryId,
      isAllDay,
      isRecurring, // Allow recurring for both types
      recurrencePattern: isRecurring ? recurrencePattern : undefined,
      recurrenceInterval: isRecurring ? recurrenceInterval : undefined,
      recurrenceEndDate:
        isRecurring && recurrenceEndDate
          ? recurrenceEndDate.toISOString()
          : undefined,
      type: itemType,
      completed: itemType === "task" ? completed : undefined,
    };

    console.log("Event data being saved:", eventData);

    try {
      if (selectedEvent && selectedEvent.id) {
        // Update existing event
        updateEvent(selectedEvent.id, eventData);
        toast({
          title: "Success",
          description: `${itemType === "event" ? "Event" : "Task"} updated successfully`,
        });
      } else {
        // Create new event
        addEvent(eventData);
        toast({
          title: "Success",
          description: `${itemType === "event" ? "Event" : "Task"} created successfully`,
        });
      }

      // Update the active item type in the sidebar to match what was just created/edited
      setActiveItemType(itemType);
      handleClose();
    } catch (error) {
      console.error("Error saving event:", error);
      toast({
        title: "Error",
        description: "Failed to save. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      toast({
        title: "Success",
        description: `${selectedEvent.type === "event" ? "Event" : "Task"} deleted successfully`,
      });
      handleClose();
    }
  };

  const getModalTitle = () => {
    if (selectedEvent && selectedEvent.id) {
      return `Edit ${selectedEvent.type === "event" ? "Event" : "Task"}`;
    }
    return `Add ${itemType === "event" ? "Event" : "Task"}`;
  };

  // Calculate if this is a multi-day event
  const isMultiDay =
    startDate && endDate && differenceInDays(endDate, startDate) > 0;

  return (
    <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
      <DialogContent className="overflow-hidden rounded-xl p-0 sm:max-w-[550px]">
        <DialogHeader className="px-6 pb-2 pt-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-primary">
              {getModalTitle()}
            </DialogTitle>
          </div>
        </DialogHeader>

        {!selectedEvent && (
          <div className="px-6 pt-2">
            <Tabs
              value={itemType}
              onValueChange={(v) => setItemType(v as "event" | "task")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-full bg-muted p-1">
                <TabsTrigger
                  value="event"
                  className="rounded-full data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Event
                </TabsTrigger>
                <TabsTrigger
                  value="task"
                  className="rounded-full data-[state=active]:bg-background data-[state=active]:text-violet-500 data-[state=active]:shadow-sm"
                >
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Task
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        <div className="max-h-[calc(75vh-120px)] space-y-4 overflow-y-auto px-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder={`Add ${itemType} title`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg"
            />
          </div>

          {itemType === "task" && (
            <div className="flex items-center gap-2">
              <Label
                htmlFor="completed"
                className="flex cursor-pointer items-center gap-2"
              >
                <Switch
                  id="completed"
                  checked={completed}
                  onCheckedChange={setCompleted}
                />
                <span>Completed</span>
              </Label>
            </div>
          )}

          {itemType === "event" && (
            <div className="flex items-center gap-2">
              <Label
                htmlFor="all-day"
                className="flex cursor-pointer items-center gap-2"
              >
                <Switch
                  id="all-day"
                  checked={isAllDay}
                  onCheckedChange={setIsAllDay}
                />
                <span>All day</span>
              </Label>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start rounded-lg text-left font-normal",
                      !startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="pointer-events-auto w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {!isAllDay && (
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <div className="flex items-center rounded-lg border border-input px-3">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="time"
                    id="start-time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="flex-1 border-0 bg-transparent py-2 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start rounded-lg text-left font-normal",
                      !endDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="pointer-events-auto w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {!isAllDay && (
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <div className="flex items-center rounded-lg border border-input px-3">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="time"
                    id="end-time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="flex-1 border-0 bg-transparent py-2 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
            )}
          </div>

          {itemType === "event" && (
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((c) => c.id !== "task")
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "h-3 w-3 rounded-full",
                              category.color,
                            )}
                          />
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] rounded-lg"
            />
          </div>

          {/* Recurring options for both events and tasks */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label
                htmlFor="recurring"
                className="flex cursor-pointer items-center gap-2"
              >
                <Switch
                  id="recurring"
                  checked={isRecurring}
                  onCheckedChange={setIsRecurring}
                />
                <span>Recurring {itemType}</span>
              </Label>
            </div>

            {isRecurring && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recurrence-pattern">Repeat every</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="recurrence-interval"
                      type="number"
                      min="1"
                      value={recurrenceInterval}
                      onChange={(e) =>
                        setRecurrenceInterval(
                          Number.parseInt(e.target.value) || 1,
                        )
                      }
                      className="w-20 rounded-lg"
                    />
                    <Select
                      value={recurrencePattern}
                      onValueChange={setRecurrencePattern}
                    >
                      <SelectTrigger className="w-[120px] rounded-lg">
                        <SelectValue placeholder="Select pattern" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">day</SelectItem>
                        <SelectItem value="weekly">week</SelectItem>
                        <SelectItem value="monthly">month</SelectItem>
                        <SelectItem value="yearly">year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {recurrencePattern === "weekly" && (
                  <div className="space-y-2">
                    <Label>Repeat on</Label>
                    <div className="flex gap-2">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => {
                        const isSelected = false; // TODO: Implement day selection
                        return (
                          <div
                            key={index}
                            className={cn(
                              "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "bg-background hover:bg-accent",
                            )}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Ends</Label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="end-never"
                        name="end-type"
                        checked={!recurrenceEndDate}
                        onChange={() => setRecurrenceEndDate(undefined)}
                        className="form-radio rounded-full"
                      />
                      <Label htmlFor="end-never" className="cursor-pointer">
                        Never
                      </Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="end-on"
                        name="end-type"
                        checked={!!recurrenceEndDate}
                        onChange={() => {
                          if (!recurrenceEndDate) {
                            // Set default end date to 1 year from start
                            const defaultEndDate = new Date(
                              startDate || new Date(),
                            );
                            defaultEndDate.setFullYear(
                              defaultEndDate.getFullYear() + 1,
                            );
                            setRecurrenceEndDate(defaultEndDate);
                          }
                        }}
                        className="form-radio rounded-full"
                      />
                      <Label htmlFor="end-on" className="cursor-pointer">
                        On
                      </Label>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[150px] justify-start rounded-lg text-left font-normal",
                              !recurrenceEndDate &&
                                "text-muted-foreground opacity-50",
                            )}
                            disabled={!recurrenceEndDate}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {recurrenceEndDate
                              ? format(recurrenceEndDate, "MMM d, yyyy")
                              : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="pointer-events-auto w-auto p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={recurrenceEndDate}
                            onSelect={setRecurrenceEndDate}
                            disabled={(date) =>
                              date < (startDate || new Date())
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="end-after"
                        name="end-type"
                        className="form-radio rounded-full"
                      />
                      <Label htmlFor="end-after" className="cursor-pointer">
                        After
                      </Label>
                      <Input
                        type="number"
                        min="1"
                        defaultValue="10"
                        className="w-20 rounded-lg"
                        disabled
                      />
                      <span className="text-sm">occurrences</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="border-t px-6 py-4">
          <div className="flex w-full items-center justify-between">
            {selectedEvent && (
              <Button
                variant="outline"
                className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={handleDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            )}

            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                className={cn(
                  "rounded-full",
                  itemType === "event"
                    ? "to-primary-400 hover:from-primary-600 hover:to-primary-500 bg-gradient-to-r from-primary"
                    : "bg-gradient-to-r from-violet-500 to-violet-400 hover:from-violet-600 hover:to-violet-500",
                )}
                onClick={handleSubmit}
              >
                {selectedEvent ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

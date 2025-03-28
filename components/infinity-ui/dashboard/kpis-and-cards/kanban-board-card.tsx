"use client";

import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Plus, MoreHorizontal, Clock, User } from "lucide-react";
import { DashboardCard, CardTitle } from "./utils";
import Image from "next/image";

type TaskPriority = "low" | "medium" | "high";
type TaskStatus = "todo" | "in-progress" | "review" | "done";

type Task = {
  id: string;
  title: string;
  description?: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
  dueDate?: Date;
  priority: TaskPriority;
  status: TaskStatus;
  tags?: string[];
};

type KanbanColumn = {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  color: string;
};

type KanbanBoardCardProps = {
  title: string;
  subtitle?: string;
  columns: KanbanColumn[];
  onTaskMove?: (
    taskId: string,
    sourceColumn: TaskStatus,
    targetColumn: TaskStatus,
  ) => void;
  onAddTask?: (columnId: TaskStatus) => void;
};

export default function KanbanBoardCard({
  title,
  subtitle,
  columns,
  onTaskMove,
  onAddTask,
}: KanbanBoardCardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [boardColumns, setBoardColumns] = useState(columns);

  // Handle task drag between columns
  const handleDragEnd = (
    task: Task,
    sourceColumn: KanbanColumn,
    targetColumn: KanbanColumn,
  ) => {
    if (sourceColumn.id === targetColumn.id) return;

    // Update local state
    const updatedColumns = boardColumns.map((column) => {
      if (column.id === sourceColumn.id) {
        return {
          ...column,
          tasks: column.tasks.filter((t) => t.id !== task.id),
        };
      }
      if (column.id === targetColumn.id) {
        return {
          ...column,
          tasks: [...column.tasks, { ...task, status: targetColumn.id }],
        };
      }
      return column;
    });

    setBoardColumns(updatedColumns);

    // Call external handler if provided
    if (onTaskMove) {
      onTaskMove(task.id, sourceColumn.id, targetColumn.id);
    }
  };

  // Format date for display
  const formatDate = (date?: Date) => {
    if (!date) return "";

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Get color for priority
  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      case "medium":
        return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400";
      case "high":
        return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
    }
  };

  return (
    <DashboardCard className="p-4">
      <CardTitle title={title} subtitle={subtitle} />

      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {boardColumns.map((column) => (
          <div
            key={column.id}
            className="flex w-64 flex-shrink-0 flex-col rounded-lg border bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50"
          >
            <div
              className="flex items-center justify-between rounded-t-lg p-2"
              style={{ backgroundColor: `${column.color}15` }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: column.color }}
                />
                <h3 className="text-sm font-medium">{column.title}</h3>
                <span className="rounded-full bg-slate-200 px-1.5 py-0.5 text-xs dark:bg-slate-700">
                  {column.tasks.length}
                </span>
              </div>

              <button
                className="rounded-full p-1 text-muted-foreground hover:bg-slate-200 hover:text-foreground dark:hover:bg-slate-700"
                onClick={() => onAddTask?.(column.id)}
                aria-label={`Add task to ${column.title}`}
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <Reorder.Group
              axis="y"
              values={column.tasks}
              onReorder={(tasks) => {
                setBoardColumns((prev) =>
                  prev.map((col) =>
                    col.id === column.id ? { ...col, tasks } : col,
                  ),
                );
              }}
              className="flex flex-col gap-2 p-2"
              layoutScroll
            >
              <AnimatePresence>
                {column.tasks.map((task) => (
                  <Reorder.Item
                    key={task.id}
                    value={task}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <motion.div
                      className={`rounded-md border bg-background p-2 shadow-sm ${
                        activeTask?.id === task.id ? "ring-2 ring-primary" : ""
                      }`}
                      layoutId={task.id}
                      onClick={() =>
                        setActiveTask(activeTask?.id === task.id ? null : task)
                      }
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      drag
                      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
                      dragElastic={0.1}
                      onDragEnd={(_, info) => {
                        // Find the column where the task was dropped
                        const boardRect = document
                          .querySelector(".board")
                          ?.getBoundingClientRect();
                        if (!boardRect) return;

                        const dropPoint = info.point.x;
                        const columnWidth = 256; // width + gap

                        // Calculate which column the task was dropped in
                        const columnIndex = Math.floor(
                          (dropPoint - boardRect.left) / columnWidth,
                        );
                        const targetColumn = boardColumns[columnIndex];

                        if (targetColumn && targetColumn.id !== task.status) {
                          handleDragEnd(task, column, targetColumn);
                        }
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-medium">{task.title}</h4>
                        <button className="text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="h-3 w-3" />
                        </button>
                      </div>

                      {activeTask?.id === task.id && task.description && (
                        <motion.p
                          className="mt-1 text-xs text-muted-foreground"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {task.description}
                        </motion.p>
                      )}

                      <div className="mt-2 flex flex-wrap gap-1">
                        {task.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] dark:bg-slate-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div
                          className={`rounded-full px-1.5 py-0.5 text-[10px] ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </div>

                        <div className="flex items-center gap-2">
                          {task.dueDate && (
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                              <Clock className="h-2 w-2" />
                              <span>{formatDate(task.dueDate)}</span>
                            </div>
                          )}

                          {task.assignee && (
                            <div className="relative flex h-4 w-4 items-center justify-center overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                              {task.assignee.avatar ? (
                                <Image
                                  src={
                                    task.assignee.avatar ||
                                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                  }
                                  fill
                                  alt={task.assignee.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <User className="h-2 w-2 text-slate-600 dark:text-slate-300" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </Reorder.Item>
                ))}
              </AnimatePresence>

              {column.tasks.length === 0 && (
                <div className="flex h-20 items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground dark:border-slate-700">
                  No tasks
                </div>
              )}
            </Reorder.Group>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

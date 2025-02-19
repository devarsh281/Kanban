import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Column } from "./Column";
import { Column as ColumnType, Task } from "./types";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { motion } from "framer-motion";

const COLUMNS: ColumnType[] = [
  { id: "OPEN", title: "OPEN" },
  { id: "IN_PROGRESS", title: "IN PROGRESS" },
  { id: "QA", title: "QA REVIEW" },
  { id: "COMPLETED", title: "COMPLETED" },
];

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Project Planning",
    description: "Define project goals, scope, and requirements",
    status: "OPEN",
    priority: "High",
  },
  {
    id: "2",
    title: "UI/UX Design",
    description:
      "Design wireframes, mockups, and prototypes for the application",
    status: "OPEN",
    priority: "Medium",
  },
  {
    id: "3",
    title: "Backend Development",
    description: "Set up server, database, and implement core APIs",
    status: "IN_PROGRESS",
    priority: "Low",
  },
  {
    id: "4",
    title: "Quality Assurance",
    description: "Perform manual testing and write automated test cases",
    status: "QA",
    priority: "Medium",
  },
  {
    id: "5",
    title: "Deployment",
    description: "Prepare the application for production and deploy to cloud",
    status: "COMPLETED",
    priority: "High",
  },
];
export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("All");

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority =
      selectedPriority === "All" ||
      task.priority.toLowerCase() === selectedPriority.toLowerCase();
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="p-4">
      <motion.div
        className="max-w-screen mb-16 flex flex-col sm:flex-row gap-4 bg-gray-100 p-6 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 10 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow text-lg rounded-md border-2 border-emerald-600 focus:border-emerald-800 focus:ring focus:ring-violet-200 focus:ring-opacity-50 relative pl-10 w-full"
        />

        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger className="w-full sm:w-32 rounded-md border-2 border-emerald-600 focus:border-emerald-800 focus:ring focus:ring-violet-200 focus:ring-opacity-50">
            <SelectValue placeholder="Select Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Priorities</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>
      <motion.div
        className="mb-12 flex flex-col sm:flex-row gap-4 bg-gray-100 p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: -30 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column, index) => {
            return (
              <Column
                key={column.id}
                column={column}
                tasks={filteredTasks.filter(
                  (task) => task.status === column.id
                )}
                index={index}
              />
            );
          })}
        </DndContext>
      </motion.div>
    </div>
  );
}


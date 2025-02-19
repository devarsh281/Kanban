import { useDraggable } from "@dnd-kit/core";
import type { Task } from "./types";

type CardProps = {
  task: Task;
};

export function Card({ task }: CardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="relative rounded-lg bg-white p-4 shadow-md transition-all duration-200 ease-linear hover:shadow-lg"
    >
      <div className="my-4 flex items-center justify-between">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
      <p className="mt-2 text-sm text-gray-600">{task.description}</p>
    </div>
  );
}

function getPriorityColor(priority: string): string {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}



// import { useState } from "react";
// import { DndContext, DragEndEvent } from "@dnd-kit/core";
// import { Column } from "./Column";
// import { Column as ColumnType, Task } from "./types";
// import { Input } from "../ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { motion } from "framer-motion";

// const COLUMNS: ColumnType[] = [
//   { id: "OPEN", title: "OPEN" },
//   { id: "IN_PROGRESS", title: "IN PROGRESS" },
//   { id: "QA", title: "QA REVIEW" },
//   { id: "COMPLETED", title: "COMPLETED" },
// ];

// const INITIAL_TASKS: Task[] = [
//   {
//     id: "1",
//     title: "Project Planning",
//     description: "Define project goals, scope, and requirements",
//     status: "OPEN",
//     priority: "High",
//   },
//   {
//     id: "2",
//     title: "UI/UX Design",
//     description:
//       "Design wireframes, mockups, and prototypes for the application",
//     status: "OPEN",
//     priority: "Medium",
//   },
//   {
//     id: "3",
//     title: "Backend Development",
//     description: "Set up server, database, and implement core APIs",
//     status: "IN_PROGRESS",
//     priority: "Low",
//   },
//   {
//     id: "4",
//     title: "Quality Assurance",
//     description: "Perform manual testing and write automated test cases",
//     status: "QA",
//     priority: "Medium",
//   },
//   {
//     id: "5",
//     title: "Deployment",
//     description: "Prepare the application for production and deploy to cloud",
//     status: "COMPLETED",
//     priority: "High",
//   },
// ];

// export default function Home() {
//   const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [selectedPriority, setSelectedPriority] = useState<string>("All");
//   const [suggestions, setSuggestions] = useState<string[]>([]);

//   function handleDragEnd(event: DragEndEvent) {
//     const { active, over } = event;

//     if (!over) return;

//     const taskId = active.id as string;
//     const newStatus = over.id as Task["status"];

//     setTasks(() =>
//       tasks.map((task) =>
//         task.id === taskId
//           ? {
//               ...task,
//               status: newStatus,
//             }
//           : task
//       )
//     );
//   }

//   const filteredTasks = tasks.filter((task) => {
//     const matchesSearch =
//       task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       task.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesPriority =
//       selectedPriority === "All" ||
//       task.priority.toLowerCase() === selectedPriority.toLowerCase();
//     return matchesSearch && matchesPriority;
//   });

//   const updateSuggestions = (value: string) => {
//     const newSuggestions = tasks
//       .filter((task) => task.title.toLowerCase().includes(value.toLowerCase()))
//       .map((task) => task.title);
//     setSuggestions(newSuggestions);
//   };

//   return (
//     <div className="p-4">
//       <motion.div
//         className="max-w-screen mb-16 flex flex-col sm:flex-row gap-4 bg-gray-100 p-6 rounded-2xl shadow-lg"
//         initial={{ opacity: 0, y: 0 }}
//         animate={{ opacity: 1, y: 10 }}
//         transition={{ duration: 0.8, delay: 0.1 }}
//       >
//         <div className="input-wrapper relative flex-grow">
//           <Input
//             type="text"
//             placeholder="Search tasks..."
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               updateSuggestions(e.target.value);
//             }}
//             onFocus={(e) => {
//               e.target.style.borderColor = 'var(--focus-border-color, #4a5568)'; 
//             }}
//             onBlur={(e) => {
//               e.target.style.borderColor = 'var(--default-border-color, #4ade80)';
//             }}
//             className="text-lg rounded-md border-2 border-emerald-600 focus:border-emerald-800 focus:ring focus:ring-violet-200 focus:ring-opacity-50 relative pl-10 w-full transition-all duration-300"
//           />
//           {searchQuery && suggestions.length > 0 && (
//             <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg mt-1 max-h-60 overflow-y-auto">
//               {suggestions.map((suggestion, index) => (
//                 <li 
//                   key={index} 
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => setSearchQuery(suggestion)}
//                 >
//                   {suggestion}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <Select value={selectedPriority} onValueChange={setSelectedPriority}>
//           <SelectTrigger className="w-full sm:w-32 rounded-md border-2 border-emerald-600 focus:border-emerald-800 focus:ring focus:ring-violet-200 focus:ring-opacity-50">
//             <SelectValue placeholder="Select Priority" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="All">All Priorities</SelectItem>
//             <SelectItem value="High">High</SelectItem>
//             <SelectItem value="Medium">Medium</SelectItem>
//             <SelectItem value="Low">Low</SelectItem>
//           </SelectContent>
//         </Select>
//       </motion.div>
//       <motion.div
//         className="mb-12 flex flex-col sm:flex-row gap-4 bg-gray-100 p-6 rounded-xl shadow-lg"
//         initial={{ opacity: 0, y: 60 }}
//         animate={{ opacity: 1, y: -30 }}
//         transition={{ duration: 0.8, delay: 0.1 }}
//       >
//         <DndContext onDragEnd={handleDragEnd}>
//           {COLUMNS.map((column, index) => {
//             return (
//               <Column
//                 key={column.id}
//                 column={column}
//                 tasks={filteredTasks.filter(
//                   (task) => task.status === column.id
//                 )}
//                 index={index}
//               />
//             );
//           })}
//         </DndContext>
//       </motion.div>
//     </div>
//   );
// }
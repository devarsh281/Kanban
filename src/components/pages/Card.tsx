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

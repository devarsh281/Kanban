import { useDroppable } from "@dnd-kit/core";
import { Card } from "./Card";
import type { Column as ColumnType, Task } from "./types";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  index: number;
};

const titleColors = [
  "text-blue-500",
  "text-violet-500",
  "text-orange-500",
  "text-red-500",
];

export function Column({ column, tasks, index }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const titleColorClass = titleColors[index % titleColors.length];

  return (
    <div className="flex">
      <div
        ref={setNodeRef}
        className="flex flex-col rounded-xl bg-white p-4 min-h-screen"
      >
        <h2
          className={`${titleColorClass} mb-4 font-semibold border-b-4 border-solid shadow-2xl rounded-md p-4 text-center`}
          style={{
            borderColor: titleColorClass.split("-")[1],
          }}
        >
          {column.title}
        </h2>
        <div className="flex flex-1 flex-col gap-4">
          {tasks.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

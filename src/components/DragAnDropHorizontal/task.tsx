import { TaskPropsInitData } from "./initial-data";
import { Draggable } from "@hello-pangea/dnd";

interface TaskProps {
  task: TaskPropsInitData;
  index: number;
}

export function Task({ task, index }: TaskProps) {
  const isDragDisabled = task.id === "task-1";

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`size-10 flex justify-center items-center rounded-full gap-2 border border-zinc-600 bg-zinc-700 mb-2 p-2
            focus:outline-none focus:border-red-500
              ${
                isDragDisabled
                  ? "bg-blue-900"
                  : snapshot.isDragging
                  ? "bg-green-500"
                  : ""
              }
            `}
        >
          {task.content[0]}
        </div>
      )}
    </Draggable>
  );
}

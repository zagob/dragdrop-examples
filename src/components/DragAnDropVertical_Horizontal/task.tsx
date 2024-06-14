import { TaskPropsInitData } from "./initial-data";
import { Draggable } from "@hello-pangea/dnd";

interface TaskProps {
  task: TaskPropsInitData;
  index: number;
}

export function Task({ task, index }: TaskProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`border border-zinc-600 bg-zinc-700 mb-2 p-2
              ${snapshot.isDragging && "bg-green-500"}
            `}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
}

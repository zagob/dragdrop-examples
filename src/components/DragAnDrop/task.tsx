import { TaskPropsInitData } from "./initial-data";
// import { Draggable } from "react-beautiful-dnd";
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
          // {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`flex gap-2 border border-zinc-600 bg-zinc-700 mb-2 rounded-sm p-2
              ${snapshot.isDragging && "bg-green-500"}
            `}
        >
          <div
            {...provided.dragHandleProps}
            className="size-5 bg-orange-500 rounded"
          />
          {task.content}
        </div>
      )}
    </Draggable>
  );
}

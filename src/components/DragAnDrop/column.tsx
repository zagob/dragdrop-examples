import { ColumnPropsInitData, TaskPropsInitData } from "./initial-data";
import { Task } from "./task";
// import { Droppable } from "react-beautiful-dnd";
import { Droppable } from "@hello-pangea/dnd";

interface ColumnProps {
  column: ColumnPropsInitData;
  tasks: TaskPropsInitData[];
}

export function Column({ column, tasks }: ColumnProps) {
  return (
    <div className="m-2 border border-zinc-600 rounded-sm max-w-md">
      <h3 className="p-2">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-2 ${
              snapshot.isDraggingOver &&
              "bg-blue-200 transition-all ease-linear"
            }`}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

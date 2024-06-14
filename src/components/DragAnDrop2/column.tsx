import { ColumnPropsInitData, TaskPropsInitData } from "./initial-data";
import { Task } from "./task";
// import { Droppable } from "react-beautiful-dnd";
import { Droppable } from "@hello-pangea/dnd";

interface ColumnProps {
  column: ColumnPropsInitData;
  tasks: TaskPropsInitData[];
  isDropDisabled?: boolean;
}

export function Column({ column, tasks, isDropDisabled }: ColumnProps) {
  return (
    <div className="m-2 border border-zinc-600 rounded-sm w-[300px] flex flex-col">
      <h3 className="p-2">{column.title}</h3>
      <Droppable
        // type={column.id === "column-3" ? "done" : "active"}
        droppableId={column.id}
        isDropDisabled={isDropDisabled}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-2 flex-grow min-h-[100px] ${
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

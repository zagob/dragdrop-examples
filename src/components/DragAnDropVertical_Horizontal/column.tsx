import { memo, useEffect, useRef, useState } from "react";
import { ColumnPropsInitData, TaskPropsInitData } from "./initial-data";
import { Task } from "./task";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface ColumnProps {
  column: ColumnPropsInitData;
  tasks: TaskPropsInitData[];
  index: number;
}

export function Column({ column, tasks, index }: ColumnProps) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="m-2 border border-zinc-600 rounded-sm flex flex-col w-[300px]"
        >
          <h3 {...provided.dragHandleProps} className="p-2">
            {column.title}
          </h3>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`p-2 flex-grow ${
                  snapshot.isDraggingOver &&
                  "bg-blue-200 transition-all ease-linear"
                }`}
              >
                <InnerList tasks={tasks} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

const InnerList = memo(({ tasks }: { tasks: TaskPropsInitData[] }) => {
  return tasks.map((task, index) => (
    <Task key={task.id} task={task} index={index} />
  ));
});

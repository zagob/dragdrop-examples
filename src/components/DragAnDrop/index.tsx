/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  DragDropContext,
  //   DragStart,
  //   DragUpdate,
  DropResult,
  ResponderProvided,
} from "@hello-pangea/dnd";
import {
  ColumnPropsInitData,
  InitialData,
  TaskPropsInitData,
  initialData,
} from "./initial-data";
import { Column } from "./column";

export function DragAndDrop() {
  const [state, setState] = useState<InitialData>(initialData);

  //   function onDragStart(start: DragStart) {
  //     const div = document.getElementById("content");
  //     div?.classList.add("text-orange-500");
  //   }

  //   function onDragUpdate(update: DragUpdate) {
  //     const { destination } = update;
  //     const opacity = destination
  //       ? destination.index / Object.keys(state.tasks).length
  //       : 0;
  //     const div = document.getElementById("content");
  //     div?.classList.add(`opacity-${opacity}`);
  //   }

  function onDragEnd(result: DropResult, provided: ResponderProvided) {
    const div = document.getElementById("content");
    div?.classList.remove("text-orange-500");

    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    };

    setState(newState);
  }
  return (
    <DragDropContext
      // onDragStart={onDragStart}
      // onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <div id="content" className="bg-zinc-800 text-zinc-50 h-screen p-10">
        <div>
          {state.columnOrder.map((columnId) => {
            const column: ColumnPropsInitData = state.columns[columnId];
            const tasks: TaskPropsInitData[] = column.taskIds.map(
              (taskId) => state.tasks[taskId]
            );

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </div>
      </div>
    </DragDropContext>
  );
}

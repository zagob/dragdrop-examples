/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  DragDropContext,
  DragStart,
  //   DragStart,
  //   DragUpdate,
  DropResult,
  ResponderProvided,
} from "@hello-pangea/dnd";
import { InitialData, initialData } from "./initial-data";
import { Column } from "./column";

export function DragAndDropHorizontal() {
  const [state, setState] = useState<InitialData>(initialData);

  function onDragStart(start: DragStart) {
    const homeIndex = state.columnOrder.indexOf(start.source.droppableId);

    setState((old) => ({
      ...old,
      homeIndex,
    }));
  }

  function onDragEnd(result: DropResult, _provided: ResponderProvided) {
    setState((old) => ({
      ...old,
      homeIndex: null,
    }));
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

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
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
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
  }

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div id="content" className="bg-zinc-800 text-zinc-50 h-screen p-10">
        <div className="flex gap-2">
          {state.columnOrder.map((columnId, index) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

            const homeIndex = state.homeIndex ?? 0;

            const isDropDisabled = index < homeIndex;

            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                isDropDisabled={isDropDisabled}
              />
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
}

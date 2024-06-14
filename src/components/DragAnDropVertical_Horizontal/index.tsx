/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useCallback, useState } from "react";
import {
  DragDropContext,
  DragStart,
  //   DragStart,
  //   DragUpdate,
  DropResult,
  ResponderProvided,
  Droppable,
} from "@hello-pangea/dnd";
import {
  ColumnPropsInitData,
  InitialData,
  TaskPropsInitData,
  initialData,
} from "./initial-data";
import { Column } from "./column";

export function DragAndDropVerticalHorizontal() {
  const [state, setState] = useState<InitialData>(initialData);

  const onDragEnd = useCallback(
    (result) => {
      const { destination, source, draggableId, type } = result;

      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      if (type === "column") {
        const newColumnOrder = Array.from(state.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);

        const newState = {
          ...state,
          columnOrder: newColumnOrder,
        };
        setState(newState);
        return;
      }

      const home = state.columns[source.droppableId];
      const foreign = state.columns[destination.droppableId];

      if (home === foreign) {
        const newTaskIds = Array.from(home.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newHome = {
          ...home,
          taskIds: newTaskIds,
        };

        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [newHome.id]: newHome,
          },
        };

        setState(newState);
        return;
      }

      // moving from one list to another
      const homeTaskIds = Array.from(home.taskIds);
      homeTaskIds.splice(source.index, 1);
      const newHome = {
        ...home,
        taskIds: homeTaskIds,
      };

      const foreignTaskIds = Array.from(foreign.taskIds);
      foreignTaskIds.splice(destination.index, 0, draggableId);
      const newForeign = {
        ...foreign,
        taskIds: foreignTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newHome.id]: newHome,
          [newForeign.id]: newForeign,
        },
      };
      setState(newState);
    },
    [state]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-column" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            id="content"
            className="bg-zinc-800 text-zinc-50 h-screen p-10"
          >
            <div className="flex gap-2">
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];

                // return (

                //   <InnerList  key={column.id}
                //   column={column}
                //   index={index}
                //   taskMap={state.tasks}  />
                // )
                const tasks = column.taskIds.map(
                  (taskId) => state.tasks[taskId]
                );

                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const InnerList = memo(
  ({
    column,
    taskMap,
    index,
  }: {
    column: ColumnPropsInitData;
    taskMap: any;
    index: number;
  }) => {
    const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
    return <Column column={column} tasks={tasks} index={index} />;
  }
);

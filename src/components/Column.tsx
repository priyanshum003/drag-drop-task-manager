import React from 'react';
import Task from './Task';
import { ColumnType, TaskType } from '../types';
import { Droppable } from 'react-beautiful-dnd';

type ColumnProps = {
  column: ColumnType;
  tasks: TaskType[];
  onEditTask: (id: string, title: string, description: string) => void;
  onDeleteTask: (id: string) => void;
};

const Column: React.FC<ColumnProps> = ({ column, tasks, onEditTask, onDeleteTask }) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          className="column"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h2>{column.title}</h2>
          <div>
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;

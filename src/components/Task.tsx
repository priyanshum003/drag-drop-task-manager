import React, { useState } from 'react';
import { TaskType } from '../types';
import { Draggable } from 'react-beautiful-dnd';

export type TaskProps = {
  task: TaskType;
  index: number;
  onEditTask: (id: string, title: string, description: string) => void;
  onDeleteTask: (id: string) => void;
};

const Task: React.FC<TaskProps> = ({ task, index, onEditTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleSave = () => {
    onEditTask(task.id, newTitle, newDescription);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEditing ? (
            <>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={() => onDeleteTask(task.id)}>Delete</button>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;

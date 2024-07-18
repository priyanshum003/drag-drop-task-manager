# Task Management App Documentation

## Overview

The Task Management App is a simple, responsive web application designed to help users manage tasks across different stages: "To Do," "In Progress," and "Done." This project serves as a learning exercise to understand and implement drag-and-drop functionality using React and `react-beautiful-dnd`. Users can add, edit, delete, and reorder tasks through a user-friendly interface.

![image](https://github.com/user-attachments/assets/c117178d-6711-444d-8f41-ac0848b30a01)


**Live Demo:** [Click Here](https://66990fdc2b97e7beb431c2ae--heartfelt-mermaid-ad03f4.netlify.app/)

## Features

- **Add Tasks**: Users can add new tasks with a title and description.
- **Edit Tasks**: Users can edit the title and description of existing tasks.
- **Delete Tasks**: Users can delete tasks.
- **Drag-and-Drop**: Users can drag and drop tasks between columns to change their status or reorder them within the same column.
- **Responsive Design**: The app is designed to work well on various screen sizes, including desktops, tablets, and mobile devices.

## Drag-and-Drop Functionality

### Libraries Used

- **React**: A JavaScript library for building user interfaces.
- **react-beautiful-dnd**: A React library for creating drag-and-drop interfaces.

### How Drag-and-Drop Works

The drag-and-drop functionality is powered by `react-beautiful-dnd`, which provides components and utilities to handle dragging and dropping elements within a React application.

### Key Components and Functions

#### DragDropContext

The `DragDropContext` component wraps the part of the application where drag-and-drop interactions will occur. It provides the context for drag-and-drop operations and requires an `onDragEnd` callback to handle the end of a drag event.

```jsx
<DragDropContext onDragEnd={onDragEnd}>
  {/* Columns and tasks go here */}
</DragDropContext>
```

#### Droppable
The `Droppable` component is used to create a droppable area where draggable items can be dropped. Each column in the app is a Droppable area.
```jsx
<Droppable droppableId={column.id}>
  {(provided) => (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      className="column"
    >
      {/* Tasks go here */}
      {provided.placeholder}
    </div>
  )}
</Droppable>
```

#### Draggable
The `Draggable` component is used to make items draggable. Each task in the app is a Draggable item.

```jsx
{tasks.map((task, index) => (
  <Draggable key={task.id} draggableId={task.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="task"
      >
        {/* Task content goes here */}
      </div>
    )}
  </Draggable>
))}
```

onDragEnd Callback
The `onDragEnd` function is called when a drag-and-drop interaction ends. It is responsible for updating the application state to reflect the new order of items.

1. Check if Dropped Outside: If the item is dropped outside a droppable area, the function returns early.
2. Reordering Within the Same Column: If the item is dropped in the same column, the task IDs are reordered within that column.
3. Moving to a Different Column: If the item is dropped in a different column, the task ID is removed from the source column and added to the destination column.

```jsx
const onDragEnd = (result) => {
  const { destination, source, draggableId } = result;

  if (!destination) {
    return;
  }

  if (destination.droppableId === source.droppableId && destination.index === source.index) {
    return;
  }

  const startColumn = data.columns[source.droppableId];
  const finishColumn = data.columns[destination.droppableId];

  if (startColumn === finishColumn) {
    const newTaskIds = Array.from(startColumn.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...startColumn,
      taskIds: newTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    setData(newState);
    return;
  }

  const startTaskIds = Array.from(startColumn.taskIds);
  startTaskIds.splice(source.index, 1);
  const newStart = {
    ...startColumn,
    taskIds: startTaskIds,
  };

  const finishTaskIds = Array.from(finishColumn.taskIds);
  finishTaskIds.splice(destination.index, 0, draggableId);
  const newFinish = {
    ...finishColumn,
    taskIds: finishTaskIds,
  };

  const newState = {
    ...data,
    columns: {
      ...data.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    },
  };

  setData(newState);
};
```

## Conclusion
This Task Management App is a practical implementation for learning how to incorporate drag-and-drop functionality using React and react-beautiful-dnd. The project demonstrates how to manage task states, handle user interactions, and maintain a responsive design. The code provided serves as a foundation for more complex task management systems and other applications requiring similar functionality.




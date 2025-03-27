import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Task } from '../types/Task';
import TaskContext from '../context/TaskContext';

// TaskDetails component: Displays the details of a specific task.
const TaskDetails: React.FC = () => {
  // Extract the task ID from the URL parameters
  const { id } = useParams<{ id: string }>();
  // Access the task context to get the getTask function
  const taskContext = useContext(TaskContext);

  // If the task context is not found, display an error message
  if (!taskContext) {
    return <div>Error: TaskContext not found!</div>;
  }

  // Get the task from the task context using the task ID
  const task = taskContext.getTask(id || '');

  // If the task is not found, display a message
  if (!task) {
    return <div>Task not found!</div>;
  }

  return (
    // Center the content horizontally
    <div className="center-container">
    {/* Container for the task details */}
    <div className="container d-flex flex-column align-items-center">
      {/* Heading for the task details */}
      <h1>Task Details</h1>
      {/* Task title */}
      <h2>{task.title}</h2>
      {/* Task description */}
      <p><strong>Description:</strong></p>
      <p>{task.description}</p>
      {/* Task due date */}
      <p><strong>Due Date:</strong> {task.dueDate.toLocaleDateString()}</p>
      {/* Task status */}
      <p><strong>Status:</strong> {task.status}</p>
      {/* Link to go back to the task dashboard */}
      <Link to="/">
        {/* Button to go back to the task dashboard */}
        <button className="btn-custom">Back to Task Dashboard</button>
      </Link>
    </div>
    </div>
  );
};

export default TaskDetails;

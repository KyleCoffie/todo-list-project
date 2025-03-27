import React, { useContext } from 'react';
import { Task } from '../types/Task';
import TaskContext from '../context/TaskContext';
import { Link } from 'react-router-dom';

import LogoutButton from '../LogoutButton';

import '../index.css';

// TaskDashboard component: Displays the list of tasks and provides options to create, view, edit, and delete tasks.
const TaskDashboard: React.FC = () => {
  // Access the task context to get the tasks and deleteTask function
  const taskContext = useContext(TaskContext);

  // If the task context is not found, display an error message
  if (!taskContext) {
    return <div>Error: TaskContext not found!</div>;
  }

  // Destructure the tasks and deleteTask function from the task context
  const { tasks, deleteTask } = taskContext;

  return (
    // Center the content horizontally
    <div className="center-container">
    {/* Container for the task dashboard */}
    <div className="container d-flex flex-column align-items-center">
      {/* Heading for the task dashboard */}
      <h1>Task Dashboard</h1>
      {/* Link to the create task page */}
      <Link to="/create">
        {/* Button to create a new task */}
        <button className="btn-custom">Create Task</button>
      </Link>
      {/* Logout button */}
      <LogoutButton />
      {/* Unordered list to display the tasks */}
      <ul className="list-unstyled">
        {/* Map over the tasks and display each task in a list item */}
        {tasks.map((task) => (
          // List item for each task
          <li key={task.id} className="d-flex flex-column align-items-center">
            {/* Task title */}
            <h2>{task.title}</h2>
            {/* Task description */}
            <p>{task.description}</p>
            {/* Task due date */}
            <p>Due Date: {task.dueDate.toLocaleDateString()}</p>
            {/* Task status */}
            <p>Status: {task.status}</p>
            {/* Link to view the task details */}
            <Link to={`/task/${task.id}`}>
              {/* Button to view the task details */}
              <button className="btn-custom btn-secondary">View Details</button>
            </Link>
            {/* Link to edit the task */}
            <Link to={`/edit/${task.id}`}>
              {/* Button to edit the task */}
              <button className="btn-custom btn-secondary">Edit</button>
            </Link>
            {/* Button to delete the task */}
            <button className="btn-custom btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default TaskDashboard;

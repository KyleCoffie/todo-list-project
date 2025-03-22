import React, { useContext } from 'react';
import { Task } from '../types/Task';
import TaskContext from '../context/TaskContext';
import { Link } from 'react-router-dom';

import LogoutButton from '../LogoutButton';

import '../index.css';

const TaskDashboard: React.FC = () => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    return <div>Error: TaskContext not found!</div>;
  }

  const { tasks, deleteTask } = taskContext;

  return (
    <div className="center-container">
    <div className="container d-flex flex-column align-items-center">
      <h1>Task Dashboard</h1>
      <Link to="/create">
        <button className="btn-custom">Create Task</button>
      </Link>
      <LogoutButton />
      <ul className="list-unstyled">
        {tasks.map((task) => (
          <li key={task.id} className="d-flex flex-column align-items-center">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate.toLocaleDateString()}</p>
            <p>Status: {task.status}</p>
            <Link to={`/task/${task.id}`}>
              <button className="btn-custom btn-secondary">View Details</button>
            </Link>
            <Link to={`/edit/${task.id}`}>
              <button className="btn-custom btn-secondary">Edit</button>
            </Link>
            <button className="btn-custom btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default TaskDashboard;

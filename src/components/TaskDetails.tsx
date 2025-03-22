import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Task } from '../types/Task';
import TaskContext from '../context/TaskContext';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    return <div>Error: TaskContext not found!</div>;
  }

  const task = taskContext.getTask(id || '');

  if (!task) {
    return <div>Task not found!</div>;
  }

  return (
    <div className="center-container">
    <div className="container d-flex flex-column align-items-center">
      <h1>Task Details</h1>
      <h2>{task.title}</h2>
      <p><strong>Description:</strong></p>
      <p>{task.description}</p>
      <p><strong>Due Date:</strong> {task.dueDate.toLocaleDateString()}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <Link to="/">
        <button className="btn-custom">Back to Task Dashboard</button>
      </Link>
    </div>
    </div>
  );
};

export default TaskDetails;

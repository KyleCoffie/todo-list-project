import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Task } from '../types/Task';
import TaskContext from '../context/TaskContext';
import { Form, Button } from 'react-bootstrap';

const TaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    return <div>Error: TaskContext not found!</div>;
  }

  const { addTask, updateTask, getTask } = taskContext;

  const [task, setTask] = useState<Task>({
    id: '',
    title: '',
    description: '',
    dueDate: new Date(),
    status: '',
  });

  useEffect(() => {
    if (id) {
      const existingTask = getTask(id);
      if (existingTask) {
        setTask(existingTask);
      }
    }
  }, [id, getTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (id) {
    // Ensure task.dueDate is a Date object before updating
    const updatedTask = { ...task, dueDate: new Date(task.dueDate) };
    updateTask(updatedTask);
    navigate(`/task/${id}`);
  } else {
    // Ensure task.dueDate is a Date object before adding
    const newTask = { ...task, id: Date.now().toString(), dueDate: new Date(task.dueDate) };
    addTask(newTask);
    navigate('/');
  }
};

  return (
    <div className="center-container">
    <div className="container d-flex flex-column align-items-center">
      <h1>{id ? 'Edit Task' : 'Create Task'}</h1>
        <Form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label className="form-label-custom">Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label className="form-label-custom">Description:</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={task.description}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="dueDate">
          <Form.Label className="form-label-custom">Due Date:</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={task.dueDate instanceof Date ? task.dueDate.toISOString().split('T')[0] : task.dueDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="status">
          <Form.Label className="form-label-custom">Status:</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="Complete">Complete</option>
            <option value="Incomplete">Incomplete</option>
            <option value="In Progress">In Progress</option>
          </Form.Control>
        </Form.Group>

        <Button className="btn-custom" variant="primary" type="submit" style={{marginRight: "10px"}}>
          {id ? 'Save Changes' : 'Create Task'}
        </Button>
        <Button className="btn-custom" variant="secondary" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Form>
    </div>
    </div>
  );
};

export default TaskForm;

import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Task } from '../types/Task';
import TaskContext from '../context/TaskContext';
import { Form, Button } from 'react-bootstrap';

// TaskForm component: Allows users to create new tasks or edit existing ones.
const TaskForm: React.FC = () => {
  // Extract the task ID from the URL parameters (if it exists)
  const { id } = useParams<{ id: string }>();
  // Get the navigation function from react-router-dom
  const navigate = useNavigate();
  // Access the task context to get the addTask, updateTask, and getTask functions
  const taskContext = useContext(TaskContext);

  // If the task context is not found, display an error message
  if (!taskContext) {
    return <div>Error: TaskContext not found!</div>;
  }

  // Destructure the addTask, updateTask, and getTask functions from the task context
  const { addTask, updateTask, getTask } = taskContext;

  // Initialize the task state with default values
  const [task, setTask] = useState<Task>({
    id: '',
    title: '',
    description: '',
    dueDate: new Date(),
    status: '',
  });

  // useEffect hook to fetch the existing task if the ID is provided
  useEffect(() => {
    if (id) {
      // Get the existing task from the task context
      const existingTask = getTask(id);
      // If the task exists, update the task state
      if (existingTask) {
        setTask(existingTask);
      }
    }
  }, [id, getTask]);

  // Function to handle changes to the form inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    // Extract the name and value from the input element
    const { name, value } = e.target;
    // Update the task state with the new value
    setTask({
      ...task,
      [name]: value,
    });
  };

 // Function to handle form submission
const handleSubmit = (e: React.FormEvent) => {
  // Prevent the default form submission behavior
  e.preventDefault();
  // If the ID exists, update the existing task
  if (id) {
    // Ensure task.dueDate is a Date object before updating
    const updatedTask = { ...task, dueDate: new Date(task.dueDate) };
    // Update the task in the task context
    updateTask(updatedTask);
    // Navigate to the task details page
    navigate(`/task/${id}`);
  } else {
    // Ensure task.dueDate is a Date object before adding
    const newTask = { ...task, id: Date.now().toString(), dueDate: new Date(task.dueDate) };
    // Add the new task to the task context
    addTask(newTask);
    // Navigate to the task dashboard
    navigate('/');
  }
};

  return (
    // Center the content horizontally
    <div className="center-container">
    {/* Container for the task form */}
    <div className="container d-flex flex-column align-items-center">
      {/* Heading for the task form */}
      <h1>{id ? 'Edit Task' : 'Create Task'}</h1>
        {/* Form for creating or editing tasks */}
        <Form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }}>
        {/* Form group for the task title */}
        <Form.Group className="mb-3" controlId="title">
          {/* Label for the title input */}
          <Form.Label className="form-label-custom">Title:</Form.Label>
          {/* Input for the task title */}
          <Form.Control
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Form group for the task description */}
        <Form.Group className="mb-3" controlId="description">
          {/* Label for the description input */}
          <Form.Label className="form-label-custom">Description:</Form.Label>
          {/* Textarea for the task description */}
          <Form.Control
            as="textarea"
            name="description"
            value={task.description}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>

        {/* Form group for the task due date */}
        <Form.Group className="mb-3" controlId="dueDate">
          {/* Label for the due date input */}
          <Form.Label className="form-label-custom">Due Date:</Form.Label>
          {/* Input for the task due date */}
          <Form.Control
            type="date"
            name="dueDate"
            value={task.dueDate instanceof Date ? task.dueDate.toISOString().split('T')[0] : task.dueDate}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Form group for the task status */}
        <Form.Group className="mb-3" controlId="status">
          {/* Label for the status select */}
          <Form.Label className="form-label-custom">Status:</Form.Label>
          {/* Select for the task status */}
          <Form.Control
            as="select"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            {/* Option for the Complete status */}
            <option value="Complete">Complete</option>
            {/* Option for the Incomplete status */}
            <option value="Incomplete">Incomplete</option>
            {/* Option for the In Progress status */}
            <option value="In Progress">In Progress</option>
          </Form.Control>
        </Form.Group>

        {/* Button to submit the form */}
        <Button className="btn-custom" variant="primary" type="submit" style={{marginRight: "10px"}}>
          {id ? 'Save Changes' : 'Create Task'}
        </Button>
        {/* Button to cancel the form and navigate back to the task dashboard */}
        <Button className="btn-custom" variant="secondary" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Form>
    </div>
    </div>
  );
};

export default TaskForm;

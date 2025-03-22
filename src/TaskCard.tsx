import React from 'react';
import { useTaskContext } from './context/TaskContext';
import { useNavigate } from 'react-router-dom';

// Define the props interface
interface TaskCardProps {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title, description, completed }) => {
    const { deleteTask } = useTaskContext();
    const navigate = useNavigate();

    // Handle task deletion
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTask(id);
        }
    };

    return (
        <div
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
                backgroundColor: completed ? '#e0ffe0' : '#ffe0e0',
            }}
        >
            <h2>{title}</h2>
            <p>{description}</p>
            <p>
                <strong>Status: </strong>
                {completed ? 'Completed' : 'Pending'}
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    onClick={() => navigate(`/edit/${id}`)}
                    style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', padding: '8px' }}
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    style={{ backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', padding: '8px' }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;

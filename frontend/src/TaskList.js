import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tasks/')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTask = () => {
    axios.post('http://127.0.0.1:8000/api/tasks/', { title: newTask, completed: false })
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error(error));
    setNewTask('');
  };

  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <input
        className="border p-2 rounded mr-2"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addTask}>Add Task</button>
      <ul className="mt-4">
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between items-center">
            <span>{task.title}</span>
            <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

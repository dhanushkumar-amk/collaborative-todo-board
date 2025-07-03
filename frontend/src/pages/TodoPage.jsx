// ---- In TodoPage.jsx (component rendering user list and tasks) ----
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const TodoPage = () => {
  const { token, url, socket, user } = useContext(AppContext);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: '', description: '' });
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('taskCreated', (task) => {
      setTasks((prev) => [...prev, task]);
    });

    socket.on('taskUpdated', (task) => {
      setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t)));
    });

    socket.on('taskDeleted', (taskId) => {
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    });

    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
      socket.off('onlineUsers');
    };
  }, [socket]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${url}api/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch {
        toast.error('Failed to fetch tasks');
      }
    };
    fetchTasks();
  }, [token]);

  const createTask = async () => {
    if (!newTask.title.trim()) return toast.error('Title is required');
    try {
      const res = await axios.post(`${url}api/tasks`, newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => [...prev, res.data]);
      setNewTask({ title: '', description: '' });
    } catch {
      toast.error('Failed to create task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${url}api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const saveEdit = async (id) => {
    try {
      const res = await axios.put(`${url}api/tasks/${id}`, editedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
      setEditingId(null);
      setEditedTask({ title: '', description: '' });
    } catch {
      toast.error('Failed to update task');
    }
  };

  const startEditing = (task) => {
    setEditingId(task._id);
    setEditedTask({ title: task.title, description: task.description });
  };

  return (
    <div className="flex min-h-screen">
      <Toaster position="top-right" />

      <aside className="w-64 border-r bg-white p-4">
        <h2 className="text-lg font-semibold mb-2">Online Users</h2>
        <ul className="space-y-1">
          {onlineUsers.map((u, i) => (
            <li key={i} className="text-green-600">🟢 {u.name || 'Unknown'}</li>
          ))}
        </ul>
      </aside>

      <main className="flex-grow bg-green-50 py-10 px-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Title"
              className="border p-2 rounded w-1/3"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="border p-2 rounded flex-grow"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <button
              onClick={createTask}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >ADD</button>
          </div>

          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task._id} className="bg-green-100 p-4 rounded-lg shadow flex justify-between items-center">
                {editingId === task._id ? (
                  <>
                    <input className="w-1/4 border rounded p-1" value={editedTask.title} onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })} />
                    <input className="flex-grow border rounded p-1 mx-2" value={editedTask.description} onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })} />
                    <button onClick={() => saveEdit(task._id)}><FaSave /></button>
                    <button onClick={() => setEditingId(null)}><FaTimes /></button>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      <p className="text-gray-600">{task.description}</p>
                    </div>
                    <div className="flex gap-3 text-xl">
                      <button onClick={() => startEditing(task)}><FaEdit className="text-blue-600" /></button>
                      <button onClick={() => deleteTask(task._id)}><FaTrash className="text-red-600" /></button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default TodoPage;

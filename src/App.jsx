import './App.css';
import { useEffect, useState } from 'react';
import ToDoForm from './components/ToDoForm';

const API_URL = '/api/v1/task';
const API_KEY = 'IGmOtQu55Iua_yO7W2G1AIsECXW4se7CN55bbqqhiTW8fgb2iA';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      }
    })
    .then(res => {
      if (!res.ok) throw new Error("Response Failed!");
      return res.json();
    })
    .then(data => setTaskList(data.items.map(task => ({
      taskName: task.taskName,
      id: task._uuid,
      isCompleted: task.isCompleted,
      tags: task.tags || []
    }))))
    .catch(err => console.log(err));
  };

  const onFormSubmit = (taskName) => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify([{ taskName, isCompleted: false, tags: [] }])
    })
    .then(res => {
      if (!res.ok) throw new Error("Response Failed!");
      return res.json();
    })
    .then(data => setTaskList(prev => [{
      taskName: data.items[0].taskName,
      id: data.items[0]._uuid,
      isCompleted: data.items[0].isCompleted,
      tags: data.items[0].tags
    }, ...prev]))
    .catch(err => console.log(err));
  };

  const toggleCompletion = (id) => {
    const updatedTasks = taskList.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTaskList(updatedTasks);

    const updatedTask = updatedTasks.find(task => task.id === id);
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ isCompleted: updatedTask.isCompleted })
    })
    .catch(err => console.log(err));
  };

  const editTaskName = (id, newName) => {
    const updatedTasks = taskList.map(task =>
      task.id === id ? { ...task, taskName: newName } : task
    );
    setTaskList(updatedTasks);

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ taskName: newName })
    })
    .catch(err => console.log(err));
  };

  const handleEdit = (id, newName) => {
    editTaskName(id, newName);
  };

  const toggleEdit = (id) => {
    setEditId(id === editId ? null : id);
  };

  const deleteTask = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
      },
    })
    .then(res => {
      if (!res.ok) throw new Error("Delete Failed!");
      setTaskList(prev => prev.filter(task => task.id !== id));
    })
    .catch(err => console.log(err));
  };

  return (
    <div className='App'>
      <ToDoForm onFormSubmit={onFormSubmit} />
        <div className='tasksToggle'>
          <button onClick={getTasks}>GET Tasks</button>
          <button onClick={() => setTaskList([])}>Clear Tasks</button>
        </div>

      {taskList.map((task) => (
        <div key={task.id} className='Task'>
          {editId === task.id ? (
            <>
              <input
                type="text"
                value={task.taskName}
                onChange={(e) => handleEdit(task.id, e.target.value)}
                className="input"
              />
              <button className='Done' onClick={() => toggleEdit(task.id)}>Done</button>
            </>
          ) : (
            <>
              <h3>{task.taskName}</h3>
              <p>Completed: {task.isCompleted ? "Yes" : "No"}</p>
              <button className={task.isCompleted ? 'MarkIncomplete' : 'MarkComplete'} onClick={() => toggleCompletion(task.id)}>
                {task.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
              </button>
              <button className='Edit' onClick={() => toggleEdit(task.id)}>Edit</button>
              <button style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }} className='Delete' onClick={() => deleteTask(task.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
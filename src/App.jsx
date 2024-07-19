import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainPage from './pages/MainPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';

const API_URL = '/api/v1/task';

function App() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
      }
    })
    .then(res => {
      if (!res.ok) throw new Error("Response Failed!");
      return res.json();
    })
    .then(data => setTaskList(data.items.map(task => ({
      taskName: task.taskName,
      taskAuthorName: task.taskAuthorName,
      taskAuthorLastname: task.taskAuthorLastname,
      taskDate: task.taskDate,
      id: task._uuid,
      isCompleted: task.isCompleted,
      tags: task.tags || []
    }))))
    .catch(err => console.error("Fetch error: ", err));
  }, []);

  const createTask = (task) => {
    const { taskName, taskAuthorName, taskAuthorLastname, taskDate } = task;
    return fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify([{ taskName, taskAuthorName, taskAuthorLastname, taskDate, isCompleted: false, tags: [] }])
    })
    .then(res => {
      if (!res.ok) {
        return res.text().then(text => {
          console.error("Error response text:", text);
          throw new Error(`Create Failed! ${text}`);
        });
      }
      return res.json();
    });
  };

  const updateTask = (task) => {
    const { id, taskName, taskAuthorName, taskAuthorLastname, taskDate } = task;
    const url = `${API_URL}/${id}`;
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({ taskName, taskAuthorName, taskAuthorLastname, taskDate, isCompleted: false, tags: [] })
    })
    .then(res => {
      if (!res.ok) {
        return res.text().then(text => {
          console.error("Error response text:", text);
          throw new Error(`Update Failed! ${text}`);
        });
      }
      return res.json();
    });
  };

  const handleTaskSubmit = (task) => {
    const { id } = task;
    const apiCall = id ? updateTask : createTask;
    
    apiCall(task)
      .then(data => {
        const newTask = data;
        setTaskList(prevTasks =>
          id
            ? prevTasks.map(task => task.id === id ? newTask : task)
            : [newTask, ...prevTasks]
        );
      })
      .catch(err => {
        console.error("Task submission error: ", err);
      });
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
        "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({ isCompleted: updatedTask.isCompleted })
    })
    .catch(err => console.error("Completion toggle error: ", err));
  };

  const deleteTask = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    })
    .then(res => {
      if (!res.ok) throw new Error("Delete Failed!");
      setTaskList(prev => prev.filter(task => task.id !== id));
    })
    .catch(err => console.error("Task deletion error: ", err));
  };

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={
            <MainPage
              taskList={taskList}
              toggleCompletion={toggleCompletion}
              deleteTask={deleteTask}
            />
          } />
          <Route path='/' element={<MainPage />}/>
          <Route path="/create" element={<CreatePage onFormSubmit={handleTaskSubmit} />} />
          <Route path="/edit/:id" element={<EditPage taskList={taskList} onFormSubmit={handleTaskSubmit} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
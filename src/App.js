import './App.css';
import ToDo from './components/ToDo';
import { useState } from 'react';

const API_KEY = 'm38_BSqboehzM1mA-YQsw03E5XUJoEbBLsLRN6j7t-6SsjgVaw';

function App() {
  const [taskList, setTaskList] = useState([]);

  const onFormSubmit = (task) => {
    console.log("Submitting Task:", task);

    fetch('/api/v1/task', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify([{task}])
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw new Error(`Server Error: ${error.message}`);
          });
        }
        return res.json();
      })
      .then(data => {
        console.log("Server Response:", data);
        setTaskList(prev => [
          {
            task: data.taskName,
            id: data.taskId,
          },
          ...prev
        ]);
      })
      .catch(err => console.error("Error:", err.message));
  };

  return (
    <div className="App">
      <ToDo onFormSubmit={onFormSubmit} />
      {taskList.map(task => (
        <div key={task.id}>
          <p>{task.task}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
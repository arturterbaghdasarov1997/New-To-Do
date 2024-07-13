import { useState } from "react";

const ToDo = ({ onFormSubmit }) => {
  const [task, setTask] = useState({ taskName: '', isCompleted: false });

  const onSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(task);
    setTask({ taskName: '', isCompleted: false });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter Task"
        value={task.taskName}
        onChange={(e) => setTask({ ...task, taskName: e.target.value })}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default ToDo;
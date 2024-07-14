import { useState } from "react";

const ToDoForm = ({ onFormSubmit }) => {
    const [taskName, setTaskName] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(taskName);
        setTaskName("");
    }

    return (
        <form className="taskForm" onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="addTask"
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
            />
            <button
                style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}
                disabled={taskName.trim() === ""}
            >
                Submit
            </button>
        </form>
    );
}

export default ToDoForm;
import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState(false);

  function handleCreateNewTask() {
    if (!newTaskTitle) {
      setError(true);
      return;
    }
    setError(false);
    setTasks([...tasks, {
      id: Math.floor(Math.random() * 10000),
      title: newTaskTitle,
      isComplete: false
    }]);
    setNewTaskTitle('');
  }


  function handleToggleTaskCompletion(id: number) {
    const hasCompleted = tasks.map(task => task.id === id ? { ...task, isComplete: !task.isComplete } : task)
    setTasks(hasCompleted);
  }

  function handleRemoveTask(id: number) {
    tasks.filter((task) => {
      const taskWithFilter = tasks.filter((task) => task.id !== id);
      setTasks(taskWithFilter)
    });
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
            style={error === true ? { border: `2px solid red` } : { border: `2px solid transparent` }}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}
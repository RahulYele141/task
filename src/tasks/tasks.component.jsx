import React, { useState } from "react";

import "./tasks.style.css";

const tasks = [
  {
    task: "Clean bedroom",
    subtasks: ["Do laundry", "Organize desk", "Wipe floors"],
  },
  {
    task: "Study",
    subtasks: ["Review chemistry", "Do a React coding challenge"],
  },
  {
    task: "Build website",
    subtasks: ["Choose tech stack", "Design pages", "Develop", "Publish"],
  },
];

const updatedTasks = tasks.map((item) => {
  item.completed = false;
  item.subtasks = item.subtasks.map((st) => {
    return { subtask: st, completed: false };
  });
  return item;
});

const Tasks = () => {
  const [tasksList, setTasksList] = useState(updatedTasks);
  const [newTask, setNewTask] = useState("");
  const [newSubtask, setNewSubtask] = useState("");

  const taskCompleted = (index) => {
    const modifiedTasks = tasksList.map((item, ind) => {
      if (ind === index) {
        item.completed = !item.completed;
        item.subtasks = item.subtasks.map((st) => {
          if (ind === index) {
            st.completed = !st.completed;
          }
          return st;
        });
      }
      return item;
    });
    setTasksList(modifiedTasks);
  };

  const subTaskCompleted = (taskIndex, subtaskIndex) => {
    const updated = tasksList.map((task, index) => {
      if (index === taskIndex) {
        const updatedSubtasks = task.subtasks.map((st, inx) => {
          if (inx === subtaskIndex) {
            st.completed = !st.completed;
          }
          return st;
        });
        task.subtasks = updatedSubtasks;
      }

      task.completed =
        task.subtasks.filter((tk) => tk?.completed === false)?.length > 0
          ? false
          : true;
      return task;
    });

    setTasksList(updated);
  };

  const removeTasks = () => {
    const filtered = tasksList.filter((tk) => tk.completed === false);

    filtered.map((ft) => {
      ft.subtasks = ft.subtasks.filter((tk) => tk.completed === false);
      return ft;
    });
    setTasksList(filtered);
  };

  const readTask = (e) => {
    setNewTask(e.target.value);
  };

  const readSubtask = (e) => {
    setNewSubtask(e.target.value);
  };

  const addTask = () => {
    const newTasks = tasksList;
    newTasks.push({
      task: newTask,
      subtasks: [],
      completed: false,
    });
    setTasksList(newTasks);
  };

  const addSubtask = (tasks, index) => {
    const newSubt = tasks.map((task, ind) => {
      if (ind === index) {
        task.subtasks.push({ subtask: newSubtask, completed: false });
      }
      return task;
    });
    setTasksList(newSubt);
  };

  return (
    <div className='root'>
      <button
        onClick={() => {
          removeTasks();
        }}>
        Clear completed tasks
      </button>

      <div className='centered'>
        <div>
          <input className='input-field' onChange={readTask} />
        </div>
        <button
          onClick={() => {
            addTask();
          }}>
          Add task
        </button>
        {tasksList.map((item, index) => (
          <div key={index}>
            <div className='tasks'>
              <div
                onClick={() => {
                  taskCompleted(index);
                }}
                className={` ${item.completed ? "task-completed " : ""}`}>
                {item.task}
              </div>
              <input
                className='input-field'
                onChange={readSubtask}
                key={index}
              />
              <div
                className='add-task'
                type='button'
                onClick={() => {
                  addSubtask(tasksList, index);
                }}>
                +
              </div>
            </div>
            <div>
              {item.subtasks.map((subtask, ind) => (
                <span
                  key={ind}
                  onClick={() => {
                    subTaskCompleted(index, ind);
                  }}
                  className={`subtask ${
                    subtask.completed ? "task-completed" : ""
                  }`}>
                  {subtask.subtask}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;

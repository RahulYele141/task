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
    e.preventDefault();
    setNewTask(e.target.value);
  };

  const readSubtask = (e, index) => {
    const subtask1 = e.target.value;
    console.log(subtask1);
    setNewSubtask(subtask1);
  };

  const addTask = () => {
    setTasksList([
      ...tasksList,
      {
        task: newTask,
        subtasks: [],
        completed: false,
      },
    ]);
    setNewTask("");
  };

  const addSubtask = (tasks, index) => {
    const newSubt = tasks.map((task, ind) => {
      if (ind === index) {
        task.subtasks.push({ subtask: newSubtask, completed: false });
      }
      return task;
    });
    setTasksList(newSubt);
    setNewSubtask("");
  };

  return (
    <div className='root'>
      <div className='centered'>
        <span>
          <input
            className='input-field form-control'
            onChange={readTask}
            placeholder='Add a new task'
            value={newTask}
          />
          <button
            className='btn btn-outline-primary'
            onClick={() => {
              addTask();
            }}>
            Add task
          </button>
        </span>
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
                // name={index}
                className='input-field form-control'
                onChange={(e) => {
                  readSubtask(e, index);
                }}
                id={index}
                key={index}
                placeholder='Add a new subtask'
                value={newSubtask}
              />
              <div
                className='add-task '
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
      <button
        className='btn btn-outline-secondary'
        onClick={() => {
          removeTasks();
        }}>
        Clear completed tasks
      </button>
    </div>
  );
};

export default Tasks;

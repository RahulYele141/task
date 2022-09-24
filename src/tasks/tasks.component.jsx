import React, { useState } from "react";

import "./tasks.style.css";

const tasks = [
  {
    task: "Clean bedroom",
    subtasks: ["Do laundry", "Organize desk", "Wipe floors"],
    id: "1663924572195",
  },
  {
    task: "Study",
    subtasks: ["Review chemistry", "Do a React coding challenge"],
    id: "1663924572185",
  },
  {
    task: "Build website",
    subtasks: ["Choose tech stack", "Design pages", "Develop", "Publish"],
    id: "1663924572175",
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
  const [newSubtask, setNewSubtask] = useState({ parent: "", subtask: "" });
  const [toggle, setToggle] = useState(true);
  const [isEdit, setIsEdit] = useState(null);

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

  const readSubtask = (e, parent) => {
    e.preventDefault();
    setNewSubtask({ parent: parent, subtask: e.target.value });
  };

  const addTask = () => {
    setTasksList([
      ...tasksList,
      {
        task: newTask,
        subtasks: [],
        completed: false,
        id: new Date().getTime().toString(),
      },
    ]);
    setNewTask("");
  };

  const addSubtask = (index) => {
    console.log(index);
    setTasksList(
      tasksList.map((task, ind) => {
        if (ind === index) {
          task.subtasks.push({ subtask: newSubtask.subtask, completed: false });
          console.log("log 1");
          return task;
        }
        return task;
      })
    );
    setNewSubtask("");
  };

  const updateTask = (index) => {
    setTasksList(
      tasksList.map((task) => {
        if (!toggle && task.id === isEdit) {
          task.subtasks[index].subtask = newSubtask.subtask;
          console.log("log 2");
          return task;
        }
        return task;
      })
    );
    setNewSubtask("");
    setToggle(true);
  };

  const editSubtask = (id, index) => {
    const newEditItem = tasksList.find((task) => task.id === id);
    console.log(newEditItem);
    setNewSubtask({
      parent: newEditItem.task,
      subtask: newEditItem.subtasks[index].subtask,
    });
    setIsEdit(id);
    setToggle(false);
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
                className='input-field form-control'
                onChange={(e) => {
                  readSubtask(e, item.task);
                }}
                id={index}
                key={index}
                placeholder='Add a new subtask'
                value={
                  newSubtask.parent === item.task ? newSubtask.subtask : ""
                }
              />
              {
                <div
                  className='add-task '
                  type='button'
                  onClick={() => {
                    addSubtask(index);
                  }}>
                  +
                </div>
              }
            </div>
            <div>
              {item.subtasks.map((subtask, ind) => (
                <span key={ind}>
                  <p
                    key={ind}
                    onClick={() => {
                      subTaskCompleted(index, ind);
                    }}
                    className={`subtask ${
                      subtask.completed ? "task-completed" : ""
                    }`}>
                    {subtask.subtask}
                  </p>
                  {!toggle ? (
                    <p
                      onClick={() => {
                        updateTask(ind);
                      }}>
                      save
                    </p>
                  ) : (
                    <p
                      onClick={() => {
                        editSubtask(item.id, ind);
                      }}>
                      edit
                    </p>
                  )}
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

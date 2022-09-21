import React, { useEffect, useState } from "react";

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

const Tasks = () => {
  const [tasksModified, setTasksModified] = useState(tasks);
  const [completed, setCompleted] = useState(false);
  const [subtaskCompleted, setSubtaskCompleted] = useState(false);

  console.log(tasksModified);
  useEffect(() => {
    tasks.map((item) => {
      item.completed = false;
      item.subtasks = item.subtasks.map((st) => {
        return { subtask: st, completed: false };
      });
    });
    console.log(tasks);
  }, []);

  const taskCompleted = (tasks, index) => {
    tasks.map((item, ind) => {
      if (ind === index) {
        item.completed = !item.completed;
        setCompleted(!completed);
        item.subtasks.map((st) => {
          if (ind === index) {
            const subtask = (st.completed = !st.completed);
            setSubtaskCompleted(!subtaskCompleted);
            return subtask;
          }
        });
      }
      return item;
    });
  };

  const subTaskCompleted = (task, index) => {
    task.map((task) => {
      const newst = task.subtasks.map((st, ind) => {
        if (ind === index) {
          st.completed = !st.completed;
          setSubtaskCompleted(!subtaskCompleted);
        }
        return st.completed;
      });
      console.log(newst);
      const check = newst.every((e) => e === true);
      console.log("check", check);
      if (check === true) return (task.completed = true);
      return (task.completed = false);
    });
  };

  const removeTasks = (tasks) => {
    const reset = tasksModified.map((task, index) => {
      if ((task.completed = true)) {
        console.log("true");
        return index;
      } else {
        console.log("false");
      }
    });
    console.log("reset", reset);
    console.log(tasksModified);
    /*const reset = tasks.map((task) => {
      task.completed = false;
      task.subtasks.map((st) => {
        st.completed = false;
        return true;
      });
      return true;
    });
    console.log("reset", reset);
    const re = reset.every((e) => e === true);
    console.log("re", re);
    if (re === true) return setCompleted(false) || setSubtaskCompleted(false);
    return setCompleted(true);*/
  };

  return (
    <div className='root'>
      <button
        onClick={() => {
          removeTasks(tasks);
        }}>
        Clear completed tasks
      </button>
      {tasksModified.map((item, index) => (
        <div key={index} className='tasks'>
          <div
            onClick={() => {
              taskCompleted(tasks, index);
            }}
            className={`${item.completed ? "task-completed " : ""}`}>
            {item.task}:
          </div>
          <div>
            {item.subtasks.map((subtask, ind) => (
              <div
                key={ind}
                onClick={() => {
                  subTaskCompleted([item], ind);
                }}
                className={`subtask ${
                  subtask.completed ? "task-completed" : ""
                }`}>
                {subtask.subtask ? subtask.subtask : subtask}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;

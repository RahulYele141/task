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
  const [completed, setCompleted] = useState(false);
  const [subtaskCompleted, setSubtaskCompleted] = useState(false);

  useEffect(() => {
    console.log("inside effect");
    tasks.map((item) => {
      item.completed = false;
      item.subtasks = item.subtasks.map((st) => {
        return { subtask: st, completed: false };
      });
    });
  }, []);

  const taskCompleted = (tasks, index) => {
    console.log(tasks);
    tasks.map((item, ind) => {
      if (ind === index) {
        item.completed = true;
        setCompleted(!completed);
      }
      return item;
    });
  };

  const subTaskCompleted = (tasks, index) => {
    console.log(tasks);
    tasks.map((item, ind) => {
      if (ind === index) {
        item.completed = true;
        console.log(item);
        setSubtaskCompleted(!completed);
      }
      return item;
    });
  };

  return (
    <div>
      {console.log("UI is rendered")}
      <button>Clear completed tasks</button>
      {tasks.map((item, index) => (
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
                  subTaskCompleted(item.subtasks, ind);
                }}
                className={`subtask ${
                  subtask.completed ? "task-completed " : ""
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

import React, { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    tasks.map((item) => {
      item.completed = false;
      item.subtasks = item.subtasks.map((st) => {
        return { subtask: st, completed: false };
      });
      return tasks;
    });
  }, []);

  console.log(tasks);

  const onClickHandler = (item, index) => {
    console.log(item[index]);

    const taskR = item.map((sb, ind) => {
      if (ind === index) {
        console.log(ind, index);
      }
    });
    console.log(taskR);
  };

  return (
    <div>
      <button onClick={onClickHandler}>Clear completed tasks</button>
      {tasks.map((item, index) => (
        <div onClick={() => {}} key={index} className='tasks'>
          <div>{item.task}:</div>
          <div>
            {item.subtasks.map((subtask, ind) => (
              <div
                onClick={() => {
                  onClickHandler(subtask, index);
                }}
                key={ind}
                className='subtask'>
                {subtask}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;

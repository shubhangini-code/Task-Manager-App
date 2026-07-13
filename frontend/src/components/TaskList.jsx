import React from "react";
import TaskTile from "./TaskTile";
import folderImg from "../assets/folder-white.svg";
import { useCallback } from "react";
const TaskList = ({
  tasks,
  showCreateTaskScreen,
  showEditTaskScreen,
  showViewTaskScreen,
  setActiveTask,
  fetchAllTasks,
}) => {
  const viewTask = useCallback((task) => {
    console.log("click");
    setActiveTask(task);
    showViewTaskScreen();
  });
  return (
    <div className="task-list-screen content-section">
      <div className="content-section">
        <div className="task-list-header-main">
          <p className="task-heading">Task🔥</p>
          <button
            className="add-task-btn cursor-pointer"
            onClick={showCreateTaskScreen}
          >
            <img src={folderImg} alt="add task Icon" />
            Add New Task
          </button>
        </div>
        {/* {TaskList} */}
        <div className="task-list-container">
          {tasks.map((task) => (
            <TaskTile
              key={task._id + "-task-tile"}
              task={task}
              onClick={() => viewTask(task)}
              showEditTaskScreen={showEditTaskScreen}
              setActiveTask={setActiveTask}
              fetchAllTasks={fetchAllTasks}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;

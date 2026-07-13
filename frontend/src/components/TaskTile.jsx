import React, { useCallback, useState } from "react";
import CheckedBlue from "../assets/blue-checked.svg";
import AlarmClock from "../assets/alarm-clock.svg";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import moment from "moment";
//import ViewTask from "./ViewTask";
import DeleteTask from "./DeleteTask";
// const taskTile = ({ task, showCreateTaskScreen, showEditTask }) => {
const TaskTile = ({
  task,
  onClick,
  // viewTask,
  showEditTaskScreen,
  setActiveTask,
  fetchAllTasks,
}) => {
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);

  const handleDeleteTask = useCallback((e) => {
    e.stopPropagation();
    setShowDeleteTaskPopup(true);
  }, []);

  const closeDeleteTaskPopup = useCallback(() => {
    setShowDeleteTaskPopup(false);
  }, []);

  const handleEditTask = (e) => {
    e.stopPropagation();
    setActiveTask(task);
    showEditTaskScreen();
  };

  return (
    <>
      <div
        className="task-tile-container cursor-pointer"
        // onClick={() => viewTask(task)}
        onClick={onClick}
      >
        <span className="task-icon-wrapper">
          <img src={CheckedBlue} className="task-icon" alt="Task Icn" />
        </span>
        <div className="task-text-wrapper">
          <p className="task-primary-text">{task.title}</p>
          <p className="task-secondary-text">{task.description}</p>
        </div>
        <div className="action-items-container">
          {task.due_date && (
            <div className="flex date-container">
              <img src={AlarmClock} alt="alarm Clock" />
              <p className="date-text">
                {moment(task.due_date).format("DD MM YYYY")}
              </p>
            </div>
          )}
          <div
            className="delete-container cursor-pointer"
            onClick={handleEditTask}
          >
            <img src={Edit} alt="Edit Task Icon" />
          </div>
          <div
            className="delete-container cursor-pointer"
            onClick={handleDeleteTask}
          >
            <img src={Delete} alt="Delete Task Icon" />
          </div>
        </div>
      </div>
      {/* //Delete Modal */}
      {showDeleteTaskPopup && (
        <DeleteTask
          isOpen={showDeleteTaskPopup}
          onClose={closeDeleteTaskPopup}
          task={task}
          fetchAllTasks={fetchAllTasks}
        />
      )}
    </>
  );
};

export default TaskTile;

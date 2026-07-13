import React, { useCallback, useState } from "react";
import InputField from "./ui/InputField";
import TitleImg from "../assets/title-placeholder-img.svg";
import UserIcon from "../assets/user-icon.png";
import Memo from "../assets/memo.svg";
import clsx from "clsx";
import Calender from "../assets/calendar.svg";
import createTaskAPI from "./api/CreateTask";

const CreateTask = ({ showTaskListScreen, fetchAllTasks }) => {
  const [taskTile, settaskTile] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTitleChange = useCallback(function (event) {
    settaskTile(event.target.value);
  }, []);
  const handleDescriptionChange = useCallback(function (event) {
    setTaskDescription(event.target.value);
  }, []);
  const handleDateChange = useCallback(function (date) {
    setTaskDueDate(date);
  }, []);

  //Validation
  const validate = useCallback(function (values) {
    const { taskTile, taskDescription } = values;
    if (taskTile && taskDescription) {
      return true;
    } else {
      const errorMsg = "Please fill out the title and Description";
      console.error(errorMsg);
      return false;
    }
  }, []);

  const handleResponse = useCallback(function (responseData) {
    console.log(responseData);
    if (responseData.success) {
      console.log("handle Succesfully");
      fetchAllTasks();
    }
  }, []);

  const handleError = useCallback(function (errorMsg) {
    alert(errorMsg);
    console.log(errorMsg);
  }, []);

  const createNewTask = useCallback(
    (values) => {
      createTaskAPI(values, handleResponse, handleError, setLoading);
    },
    [handleError, handleResponse],
  );

  const handleAddTask = useCallback(() => {
    const values = {
      title: taskTile,
      description: taskDescription,
      due_date: taskDueDate,
    };

    const isValid = validate({
      taskTile,
      taskDescription,
    });

    if (isValid) {
      createNewTask(values);
    }
  }, [createNewTask, taskTile, taskDescription, taskDueDate, validate]);

  return (
    <div className="content-section create-task-section">
      <div className="create-task-card">
        <img src={UserIcon} alt="" width={263} />
        <h1 className="create-task-title-text">Create New Task</h1>
        {/* create input field for title */}
        <InputField
          name={"new-task-title"}
          value={taskTile}
          onChange={handleTitleChange}
          type={"text"}
          inputImg={TitleImg}
          placeholder={"Title"}
        />
        {/* Custom input field for description */}
        <InputField
          name={"new-task-description"}
          value={taskDescription}
          onChange={handleDescriptionChange}
          label={"Description"}
          type={"textarea"}
          inputImg={Memo}
          placeholder={"Description"}
          className={"input-margin"}
        />
        {/* CreateInput field for due date */}
        <InputField
          name={"new-task-due -date"}
          value={taskDueDate}
          onChange={handleDateChange}
          label={"Due Date"}
          type={"date"}
          inputImg={Calender}
          placeholder={"due date"}
          className={"input-margin"}
        />

        <div className="add-edit-task-btns">
          <button
            className={clsx(
              "btn",
              "add-task-btn",
              loading ? "disable-add-task-btn" : "cursor-pointer",
            )}
            disabled={loading}
            onClick={handleAddTask}
          >
            {loading ? "Addinbg Task" : "Add Task"}
          </button>
          <button
            className="btn cancel-btn cursor-pointer"
            onClick={showTaskListScreen}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;

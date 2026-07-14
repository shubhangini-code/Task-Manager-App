import React, { useCallback, useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import NoTask from "./NoTask";
import TaskList from "./TaskList";
import fetchTaskAPI from "./api/fetchTask";
import ViewTask from "./ViewTask";
import EditTask from "./EditTask";

const TaskMain = () => {
  const [currentComponent, setCurrComponent] = useState("loading");
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState();

  const showNoTaskScreen = useCallback(function () {
    setCurrComponent("noTask");
  });

  const showCreateTaskScreen = useCallback(function () {
    setCurrComponent("createTask");
  });

  const showTaskListScreen = useCallback(function () {
    setCurrComponent("taskList");
  });

  const showEditTaskScreen = useCallback(function () {
    setCurrComponent("editTask");
  });

  const showViewTaskScreen = useCallback(function () {
    setCurrComponent("viewTask");
  });

  const handleResponse = useCallback(
    function (responseData) {
      console.log("API Response:", responseData);

      const extractedTasks = responseData.tasks;
      console.log("Extracted Tasks:", extractedTasks);
      setTasks(extractedTasks);
      if (extractedTasks.length) {
        showTaskListScreen();
      } else {
        showNoTaskScreen();
      }
    },
    [showTaskListScreen, showNoTaskScreen],
  );

  const handleError = useCallback(function (errorMsg) {
    alert(errorMsg);
    console.error(errorMsg);
  }, []);

  const fetchAllTasks = useCallback(
    function () {
      fetchTaskAPI(handleResponse, handleError);
    },
    [handleResponse, handleError],
  );

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <>
      {/* {currentComponent === "loading" && <Loading />} */}
      {currentComponent === "loading" && (
        //  <p>Loading...</p>
        <div className="loader"></div>
      )}
      <div id="container-div">
        {currentComponent === "noTask" && (
          <NoTask showCreateTaskScreen={showCreateTaskScreen} />
        )}
        {currentComponent === "taskList" && (
          <TaskList
            tasks={tasks}
            showCreateTaskScreen={showCreateTaskScreen}
            showEditTaskScreen={showEditTaskScreen}
            showViewTaskScreen={showViewTaskScreen}
            setActiveTask={setActiveTask}
            fetchAllTasks={fetchAllTasks}
          />
        )}
        {currentComponent === "createTask" && (
          <CreateTask
            showTaskListScreen={showTaskListScreen}
            fetchAllTasks={fetchAllTasks}
          />
        )}
        {currentComponent === "viewTask" && (
          <ViewTask
            task={activeTask}
            showTaskListScreen={showTaskListScreen}
            showEditTaskScreen={showEditTaskScreen}
            setActiveTask={setActiveTask}
            fetchAllTasks={fetchAllTasks}
          />
        )}
        {currentComponent === "editTask" && (
          <EditTask
            task={activeTask}
            showTaskListScreen={showTaskListScreen}
            fetchAllTasks={fetchAllTasks}
          />
        )}
      </div>
    </>
  );
};

export default TaskMain;

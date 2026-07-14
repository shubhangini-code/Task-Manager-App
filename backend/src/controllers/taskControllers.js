// // New Task

// import Task from "../models/taskModels";

// const newtask = async (req, res) => {
//   try {
//     //1.Extract Data from the body
//     const { title, description, due_date } = req.body;

//     //Validation on the incoming data
//     if (!title || !description) {
//       return res
//         .status(400)
//         .json({ message: "Title and Description not found" });
//     }

//     // Create a new task
//     const newTask = await Task.create({ title, description, due_date });

//     //Give 2000k res
//     res.status(201).json({
//       success: true,
//       message: "Task Created Successfully",
//       task: newTask,
//     });
//   } catch (error) {
//     //Give Error response
//     console.error(error.message);
//     res.status(400).json({
//       success: false,
//       message: "Failed to create a task",
//     });
//   }
// };

// export { newtask };

import Task from "../models/taskModels.js";

const newTask = async (req, res) => {
  try {
    //1.Extract Data from the body

    const { title, description, due_date } = req.body;

    //Validation on the incoming data
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and Description not found",
      });
    }

    // Create a new task
    const task = await Task.create({
      title,
      description,
      due_date,
    });

    //Give 2000k res
    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      task,
    });
  } catch (error) {
    //Give Error response
    console.error(error.message);

    res.status(400).json({
      success: false,
      message: "Failed to create a task",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      success: true,
      tasks,
      message: "fetched all task successfully",
    });
  } catch (error) {
    console.error("Failed to fetch error", error);
    res.status(400).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};

// const getTasks = async (req, res) => {
//   return res.json({
//     success: true,
//     message: "getTasks route reached",
//   });
// };
// const getTasks = async (req, res) => {
//   try {
//     console.log("GET /tasks called");

//     const tasks = await Task.find();

//     console.log(tasks);

//     return res.status(200).json({
//       success: true,
//       tasks,
//       message: "Fetched all tasks successfully",
//     });
//   } catch (error) {
//     console.error("Error fetching tasks:", error);

//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date } = req.body;
    if (!id) {
      return res.status(400).json({ message: "task id required" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        due_date: due_date || null,
      },
      { returnDocument: "after" },
    );
    res.status(200).json({
      success: true,
      updatedTask,
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error("Failed to update task", error);
    res.status(400).json({
      success: false,
      message: "Failed to update tasks",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    // if (id) {
    //   return res.status(400).json({ success: false });
    // }
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task id is required",
      });
    }
    await Task.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Task deleted completely" });
  } catch (error) {
    console.error("Failed to delete the task", error);
    res.status(400).json({
      success: false,
      message: "Failed to delete a task",
    });
  }
};
export { newTask, getTasks, updateTask, deleteTask };

import ToDo from "../Model/todoSchema.js";

// Creating New ToDo
export const CreateToDo = async (req, res) => {
  const todo = new ToDo({
    text: req.body.text,
    completed: req.body.completed,
    user : req.user._id, // Associate Todo with Loggedin User
  });

  try {
    const newToDo = await todo.save();
    res.status(201).json({ msg: "ToDo Creted Successfully", newToDo });
  } catch (err) {
    console.log("Error is newToDo ", err);
    res.status(400).json({ msg: "Server Error in ToDo" });
  }
};

// Fetching Existing ToDo from DataBase
export const GetToDo = async (req, res) => {
  try {
    const todos = await ToDo.find({ user : req.user._id }); // Fetch Todos only for Loggedin User
    if (!todos) {
      return res.status(404).json({ message: "Create ToDo First" });
    }
    res.status(201).json({ msg: "ToDo Fetched Successfully", todos });
  } catch (err) {
    console.log("Error is GetToDo ", err);
    res.status(400).json({ msg: "Server Error in GetToDo" });
  }
};

// Updating Existing ToDo from DataBase
export const UpdateToDo = async (req, res) => {
  try {
    const todos = await ToDo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({ msg: "ToDo Updated Successfully", todos });
  } catch (err) {
    console.log("Error is UpdateToDo ", err);
    res.status(400).json({ msg: "Server Error in UpdateToDo" });
  }
};

// Deleting Existing ToDo from DataBase
export const DeleteToDo = async (req, res) => {
  try {
    const todos = await ToDo.findByIdAndDelete(req.params.id);
    if (!todos) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(201).json({ msg: "ToDo Deleted Successfully", todos });
  } catch (err) {
    console.log("Error is DeleteToDo ", err);
    res.status(400).json({ msg: "Server Error in DeleteToDo" });
  }
};

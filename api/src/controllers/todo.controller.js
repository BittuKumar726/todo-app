import { asyncHandler } from "../utils/asyncHandler.js";
import { Todo } from "../models/todo.model.js";
import { apiResponseWithStatusCode } from "../utils/ApiResponse.js";

// Save todo form data
const todoFormData = asyncHandler(async (req, res) => {
  const { title, desc, status } = req.body;

  // Validate if title is empty
  if (title.trim() === "") {
    return apiResponseWithStatusCode(res, 400, "Title field is required");
  }

  // Validate if status is empty
  if (status.trim() === "") {
    return apiResponseWithStatusCode(res, 400, "Status field is required");
  }

  // Create a new Todo item
  const todo = await Todo.create({
    title,
    desc,
    status,
  });

  // Find the added Todo item by its ID
  const addedTodo = await Todo.findById(todo._id).select("-_id");

  // Handle error if Todo creation fails
  if (!addedTodo) {
    return apiResponseWithStatusCode(
      res,
      500,
      "Something went wrong while submitting todo data!!"
    );
  }

  // Respond with success message and added Todo item
  return apiResponseWithStatusCode(
    res,
    200,
    "Todo data saved successfully!!",
    addedTodo
  );
});

// Get list of Todos
const getTodoList = asyncHandler(async (req, res) => {
  // Fetch all Todos where status is not 'removed'
  const todoList = await Todo.find({ status: { $ne: "removed" } });

  // Handle error if fetching Todos fails
  if (!todoList) {
    return apiResponseWithStatusCode(
      res,
      500,
      "Something went wrong while fetching todo items!!"
    );
  }

  // Respond with success message and list of Todos
  return apiResponseWithStatusCode(
    res,
    200,
    "Todo items fetched successfully!!",
    todoList
  );
});

// Update a Todo item
const updateTodoItem = asyncHandler(async (req, res) => {
  const { _id, title, desc, status } = req.body;

  // Validate if title is empty
  if (title.trim() === "") {
    return apiResponseWithStatusCode(res, 400, "Title field is required");
  }

  // Validate if status is empty
  if (status.trim() === "") {
    return apiResponseWithStatusCode(res, 400, "Status field is required");
  }

  // Find and update the Todo item by its ID
  const todo = await Todo.findByIdAndUpdate(
    _id,
    {
      title,
      desc,
      status,
    },
    { new: true }
  );

  // Handle error if Todo update fails
  if (!todo) {
    return apiResponseWithStatusCode(
      res,
      500,
      "Something went wrong while updating todo item!!"
    );
  }

  // Respond with success message and updated Todo item
  return apiResponseWithStatusCode(
    res,
    200,
    "Todo item updated successfully!!",
    todo
  );
});

// Remove a Todo item
const removeTodoItem = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  // Find and update the Todo item status to 'removed'
  const todo = await Todo.findByIdAndUpdate(
    _id,
    {
      status: "removed",
    },
    { new: true }
  );

  // Handle error if Todo removal fails
  if (!todo) {
    return apiResponseWithStatusCode(
      res,
      500,
      "Something went wrong while removing todo item!"
    );
  }

  // Respond with success message for Todo removal
  return apiResponseWithStatusCode(
    res,
    200,
    "Todo item Removed successfully!",
    {}
  );
});

// Export functions for use in other modules
export { todoFormData, getTodoList, updateTodoItem, removeTodoItem };

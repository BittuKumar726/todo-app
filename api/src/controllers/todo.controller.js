import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Todo } from "../models/todo.model.js";
import {
  ApiResponse,
  apiResponseWithStatusCode,
} from "../utils/ApiResponse.js";

// Save todo form data
const todoFormData = asyncHandler(async (req, res) => {
  const { title, desc, status } = req.body;
  console.log(req.body, "req");
  if (title.trim() === "") {
    return apiResponseWithStatusCode(res, 400, "Title field is required");
  }

  if (status.trim() === "") {
    return apiResponseWithStatusCode(res, 400, "Status field is required");
  }

  const todo = await Todo.create({
    title,
    desc,
    status,
  });

  const addedTodo = await Todo.findById(todo._id).select("-_id");

  if (!addedTodo) {
    return apiResponseWithStatusCode(
      res,
      500,
      "Something went wrong while submitting todo data!!"
    );
  }

  return apiResponseWithStatusCode(
    res,
    200,
    "Todo data saved successfully!!",
    addedTodo
  );
});

const getTodoList = asyncHandler(async (req, res) => {
  const todoList = await Todo.find({ status: { $ne: "removed" } });

  if (!todoList) {
    return apiResponseWithStatusCode(
      res,
      500,
      "Something went wrong while fetching todo items!!"
    );
  }

  return apiResponseWithStatusCode(
    res,
    200,
    "Todo items fetched successfully!!",
    todoList
  );
});

const updateTodoItem = asyncHandler(async (req, res) => {
  const { _id, title, desc, status } = req.body;

  if (title.trim() === "") {
    return apiResponseWithStatusCode(res, 400, "Title field is required");
  }

  if (status.trim() === "") {
    return apiResponseWithStatusCode(res, 400, "Status field is required");
  }

  const todo = await Todo.findByIdAndUpdate(
    _id,
    {
      title,
      desc,
      status,
    },
    { new: true }
  );

  if (!todo) {
    return apiResponseWithStatusCode(
      res,
      500,
      "Something went wrong while updating todo item!!"
    );
  }

  return apiResponseWithStatusCode(
    res,
    200,
    "Todo item updated successfully!!",
    todo
  );
});

const removeTodoItem = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  const todo = await Todo.findByIdAndUpdate(
    _id,
    {
      status: "removed",
    },
    { new: true }
  );

  if (!todo) {
    return apiResponseWithStatusCode(
      res,
      500,
      "Something went wrong while removing todo item!"
    );
  }

  return apiResponseWithStatusCode(
    res,
    200,
    "Todo item Removed successfully!",
    {}
  );
});

export { todoFormData, getTodoList, updateTodoItem, removeTodoItem };

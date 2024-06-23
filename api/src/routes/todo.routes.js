import { Router } from "express";
import {
  getTodoList,
  removeTodoItem,
  todoFormData,
  updateTodoItem,
} from "../controllers/todo.controller.js";

// Initialize Express Router
const router = Router();

// Define routes for different Todo operations
router.route("/save/form").post(todoFormData); // Route to save Todo form data
router.route("/list").get(getTodoList); // Route to get the list of Todo items
router.route("/update").post(updateTodoItem); // Route to update a Todo item
router.route("/remove").post(removeTodoItem); // Route to remove a Todo item

// Export the router with defined routes
export default router;

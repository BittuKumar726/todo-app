import { Router } from "express";
import {
  getTodoList,
  removeTodoItem,
  todoFormData,
  updateTodoItem,
} from "../controllers/todo.controller.js";
const router = Router();

// ---------------Secured routes-----------------
router.route("/save/form").post(todoFormData);
router.route("/list").get(getTodoList);
router.route("/update").post(updateTodoItem);
router.route("/remove").post(removeTodoItem);

export default router;

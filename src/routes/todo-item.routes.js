import { Router } from "express";
const router = Router();

import todoItem from "../controllers/todo-item.controller.js";

// Get All
router.get("/?activity_group_id", todoItem.getSingleTodo);

// Get One
router.get("/:id", todoItem.getSingleTodo);

// Create
router.post("/", todoItem.createTodo);

// Update
router.patch("/:id", todoItem.updateTodo);

// Delete
router.delete("/:id", todoItem.deleteTodo);

export default router;

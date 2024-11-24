import express from "express"
import { CreateToDo, DeleteToDo, GetToDo, UpdateToDo } from "../Controller/ToDoController.js";
import { authMiddleware } from "./middlewares/auth.js";

const router = express.Router();

router.post("/create", authMiddleware, CreateToDo);
router.get("/fetch", authMiddleware, GetToDo);
router.put("/update/:id", authMiddleware, UpdateToDo);
router.delete("/delete/:id", authMiddleware, DeleteToDo);

export default router;
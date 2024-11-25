const express = require("express");
const UserController = require("./controllers/UserController");
const TasksController = require("./controllers/TaskController");

const router = express.Router();

// Rotas para os usuários
router.get("/users", UserController.index);
router.get("/users/:id", UserController.show);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);

//auth
router.post("/auth/register", UserController.store);
router.post("/auth/login", UserController.login);

// tasks
router.get("/tasks", TasksController.index);
router.get("/tasks/:userId", TasksController.taskByUser);
router.post("/task", TasksController.store);
router.put("/task/:id", TasksController.update);
router.delete("/task/:id", TasksController.delete);

module.exports = router;

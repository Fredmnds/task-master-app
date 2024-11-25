const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcrypt");

class TaskController {

  async index(req, res) {
    try {
      const tasks = await Task.findAll();
      return res.json(tasks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar tarefas" });
    }
  }

  async store(req, res) {
    try {
      const { title, description, status, creatorId, suporterId } = req.body;

      const task = await Task.create({ title, description, status, creatorId, suporterId });

      res.status(201).json(task);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar nova tarefa" });
    }
  }

  async taskByUser(req, res) {
    try {
      const { userId } = req.params;

      const tasks = await Task.findAll({
        where: { creatorId: userId },
        include: [
          {
            model: User,
            as: "creator",
            attributes: ["id", "name", "email"],
          },
          {
            model: User,
            as: "suporter",
            attributes: ["id", "name", "email"],
          },
        ],
      });

      res.status(200).json(tasks || []);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar tarefas e usuários" });
    }
  }


  async update(req, res) {
    try {
      const { id } = req.params;
      const { description, assignedUsers, status, supporterEmail } = req.body;

      const task = await Task.findByPk(id);

      if (supporterEmail) {
        const user = await User.findOne({ where: { email: supporterEmail } });

        if (!user) {
          return res.status(404).json({ error: "Usuário com esse e-mail não encontrado" });
        }

        task.suporterId = user.id;
        console.log(user.id);
      }

      if (!task) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }
      task.description = description;
      task.status = status;

      await task.save();

      if (assignedUsers && assignedUsers.length > 0) {
        await task.addAssignedUsers(assignedUsers);
      }

      return res.status(200).json({ message: "Tarefa atualizada com sucesso!", task });

    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar tarefa" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const task = await Task.findByPk(id);

      if (!task) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      await task.destroy();
      return res.status(200).json({ message: "Tarefa excluída com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar tarefa" });
    }
  }

}

module.exports = new TaskController();

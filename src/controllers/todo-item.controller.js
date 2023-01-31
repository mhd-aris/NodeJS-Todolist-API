import models from "../models/index.js";
const { Todo } = models;

let todoAttributes = [
  "id",
  "activity_group_id",
  "title",
  "is_active",
  "priority",
  "created_at",
  "updated_at",
  "deleted_at",
];

// Get all Todos
const getTodo = (req, res) => {
  const { activity_group_id } = req.query;
  if (activity_group_id) {
    Todo.findAll({
      where: { activity_group_id },
      attributes: todoAttributes,
    })
      .then((data) => {
        return res.json({
          status: "Success",
          message: "Success",
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
        return res
          .json(400)
          .json({ status: "Failed", message: "Data not found!", data: {} });
      });
  } else {
    Todo.findAll({
      attributes: todoAttributes,
    })
      .then((data) => {
        return res.json({
          status: "Success",
          message: "Success",
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
        return res
          .json(400)
          .json({ status: "Failed", message: "Data not found!", data: {} });
      });
  }
};

//Get single Todo
const getSingleTodo = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Bad Request",
      message: "id cannot be null",
      data: {},
    });
  }
  Todo.findOne({
    attributes: todoAttributes,
    where: {
      id: id,
    },
  })
    .then((data) => {
      if (data == null) {
        return res.status(404).json({
          status: "Not Found",
          message: `Todo with ID ${id} Not Found`,
          data: {},
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Success",
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${id} Not Found`,
        data: {},
      });
    });
};

// Create Todo
const createTodo = (req, res) => {
  const { title, activity_group_id, is_active } = req.body;
  if (!title && !activity_group_id) {
    return res.status(400).json({
      status: "Bad Request",
      message: "title cannot be null",
    });
  }
  Todo.create(
    {
      title,
      activity_group_id,
      is_active,
    },
    {
      attributes: todoAttributes,
    }
  )
    .then((data) => {
      return res.status(201).json({
        status: "Success",
        message: "Success",
        data: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "Internal Server Error",
        message: "Please try again later",
        data: {},
      });
    });
};

// Update Todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      status: "Bad Request",
      message: "title cannot be null",
      data: {},
    });
  }
  if (!id) {
    return res.status(400).json({
      status: "Bad Request",
      message: "id cannot be null",
      data: {},
    });
  }
  // try {
  //   let todo = await Todo.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  //   console.log(todo, title);
  //   todo.title = title;
  //   await todo.save();
  //   return res.status(200).json({
  //     status: "Success",
  //     message: "Success",
  //     data: todo,
  //   });
  // } catch (err) {
  //   console.log(err);
  //   return res.status(404).json({
  //     status: "Not Found",
  //     message: `Todo with ID ${id} Not Found`,
  //     data: {},
  //   });
  // }
  Todo.findOne({ where: { id }, attributes: todoAttributes })
    .then((todo) => {
      if (todo == null) {
        return res.status(404).json({
          status: "Not Found",
          message: `Todo with ID ${id} Not Found`,
          data: {},
        });
      }
      todo.title = title;
      todo
        .save()
        .then((result) => {
          res.status(200).json({
            status: "Success",
            message: "Success",
            data: todo,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(404).json({
            status: "Not Found",
            message: `Todo with ID ${id} Not Found`,
            data: {},
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${id} Not Found`,
        data: {},
      });
    });
};

// Delete Todo
const deleteTodo = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Bad Request",
      message: `id cannot be null`,
    });
  }
  Todo.destroy({
    where: {
      id,
    },
  })
    .then((data) => {
      res.status(200).json({
        status: "Success",
        message: "Success",
        data: {},
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${id} Not Found`,
        data: {},
      });
    });
};

export default {
  getTodo,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};

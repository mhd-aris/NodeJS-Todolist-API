const getTodoModel = (sequelize, { DataTypes }) => {
  const Todo = sequelize.define("todos", {
    title: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.STRING,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
    },
    createdAt: { type: DataTypes.DATE, field: "created_at" },
    updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    deletedAt: { type: DataTypes.DATE, field: "deleted_at" },
  });

  return Todo;
};

export default getTodoModel;
